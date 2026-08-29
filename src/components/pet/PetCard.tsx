import { PawPrintIcon, XIcon } from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Pet } from '@/src/contexts/PetContext';
import { borderRadius, colors, spacing, typography } from '@/src/theme';

interface PetCardProps {
  pet: Pet;
  onRemove: () => void;
}

export default function PetCard({ pet, onRemove }: PetCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <PawPrintIcon size={24} color={colors.primaryDark} weight="regular" />
        <Pressable
          onPress={onRemove}
          accessibilityLabel={`Remover ${pet.nome}`}
          style={styles.removeButton}
        >
          <XIcon size={10} color={colors.textOnPrimary} weight="bold" />
        </Pressable>
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {pet.nome}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.xs,
    width: 64,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: borderRadius.full,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButton: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: borderRadius.full,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    ...typography.small,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
