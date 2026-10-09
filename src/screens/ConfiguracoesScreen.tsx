import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import {
  CameraIcon,
  CaretRightIcon,
  PlusIcon,
  SignOutIcon,
  UserCircleIcon,
} from 'phosphor-react-native';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PetCard from '@/src/components/pet/PetCard';
import { useAppointments } from '@/src/hooks/useAppointments';
import { useAuth } from '@/src/hooks/useAuth';
import { usePets } from '@/src/hooks/usePets';
import { fileUrl } from '@/src/services/api';
import { borderRadius, colors, spacing, typography } from '@/src/theme';

export default function ConfiguracoesScreen() {
  const { currentUser, logout, setAvatar } = useAuth();
  const { pets, removePet } = usePets();
  const { refresh: refreshAppointments } = useAppointments();
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const avatarUri = fileUrl(currentUser?.avatar);

  const handlePickAvatar = async () => {
    if (uploadingAvatar) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (result.canceled) return;

    const asset = result.assets[0];
    setUploadingAvatar(true);
    try {
      await setAvatar(asset.uri, asset.mimeType);
    } catch (error) {
      Alert.alert(
        'Foto de perfil',
        error instanceof Error ? error.message : 'Não foi possível enviar a foto.',
      );
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleRemovePet = async (petId: string) => {
    try {
      await removePet(petId);
      await refreshAppointments();
    } catch (error) {
      Alert.alert('Pets', error instanceof Error ? error.message : 'Não foi possível remover o pet.');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Sua conta</Text>
        <Text style={styles.title}>Configurações</Text>
      </View>

      <View style={styles.profileCard}>
        <Pressable
          onPress={handlePickAvatar}
          style={styles.avatarWrapper}
          accessibilityLabel="Escolher foto de perfil"
        >
          <View style={styles.avatar}>
            {uploadingAvatar ? (
              <ActivityIndicator color={colors.primary} />
            ) : avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
            ) : (
              <UserCircleIcon size={32} color={colors.primaryDark} weight="regular" />
            )}
          </View>
          <View style={styles.avatarBadge}>
            <CameraIcon size={12} color={colors.textOnPrimary} weight="fill" />
          </View>
        </Pressable>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{currentUser?.nomeCompleto}</Text>
          <Text style={styles.profileEmail}>{currentUser?.login}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Meus pets</Text>
        <View style={styles.petsRow}>
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} onRemove={() => handleRemovePet(pet.id)} />
          ))}
          <Pressable
            onPress={() => router.push('/configuracoes/novo-pet')}
            style={styles.addPet}
            accessibilityLabel="Adicionar pet"
          >
            <PlusIcon size={22} color={colors.primaryDark} weight="regular" />
          </Pressable>
        </View>
      </View>

      <View style={styles.menuList}>
        <Pressable
          onPress={handlePickAvatar}
          disabled={uploadingAvatar}
          style={[styles.menuRow, styles.menuRowDivider]}
        >
          <View style={styles.menuIcon}>
            <CameraIcon size={18} color={colors.primaryDark} weight="regular" />
          </View>
          <Text style={styles.menuLabel}>
            {currentUser?.avatar ? 'Trocar foto de perfil' : 'Escolher foto de perfil'}
          </Text>
          <CaretRightIcon size={16} color={colors.textTertiary} weight="regular" />
        </Pressable>
        <Pressable onPress={logout} style={styles.menuRow}>
          <View style={styles.menuIcon}>
            <SignOutIcon size={18} color={colors.primaryDark} weight="regular" />
          </View>
          <Text style={styles.menuLabel}>Sair</Text>
          <CaretRightIcon size={16} color={colors.textTertiary} weight="regular" />
        </Pressable>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  header: {
    marginTop: spacing.md,
  },
  eyebrow: {
    ...typography.small,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.heading1,
    color: colors.textPrimary,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 22,
    height: 22,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  profileEmail: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  section: {
    gap: spacing.sm,
  },
  sectionTitle: {
    ...typography.heading3,
    color: colors.textPrimary,
  },
  petsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  addPet: {
    width: 54,
    height: 54,
    borderRadius: borderRadius.full,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuList: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + spacing.xs,
    padding: spacing.md,
  },
  menuRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIcon: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.md,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    flex: 1,
  },
});
