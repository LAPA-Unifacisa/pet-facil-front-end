import { router } from 'expo-router';
import { PawPrintIcon, SignInIcon } from 'phosphor-react-native';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/src/components/ui/Button';
import Input from '@/src/components/ui/Input';
import { useAuth } from '@/src/hooks/useAuth';
import { loginSchema } from '@/src/schemas/loginSchema';
import { colors, spacing, typography } from '@/src/theme';

export default function LoginScreen() {
  const { login } = useAuth();
  const [form, setForm] = useState({ login: '', senha: '' });
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const result = loginSchema.safeParse(form);
  const fieldErrors = result.success ? {} : result.error.flatten().fieldErrors;

  const handleSubmit = async () => {
    if (!result.success) return;

    setSubmitting(true);
    setFormError(null);
    const response = await login(result.data.login, result.data.senha);
    setSubmitting(false);

    if (!response.success) {
      setFormError(response.error ?? 'Não foi possível entrar.');
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.bg}>
        <View style={styles.blobTopRight} />
        <View style={styles.blobTopLeft} />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <View style={styles.logoBadge}>
                <PawPrintIcon size={26} color={colors.textOnPrimary} weight="fill" />
              </View>
              <Text style={styles.eyebrow}>Bem-vindo de volta</Text>
              <Text style={styles.title}>Entrar</Text>
              <Text style={styles.subtitle}>
                Acesse sua conta para agendar banho, tosa e cuidar do seu melhor amigo.
              </Text>
            </View>

            <View style={styles.card}>
              <View style={styles.form}>
                <Input
                  label="E-mail"
                  value={form.login}
                  onChangeText={(value) => setForm((prev) => ({ ...prev, login: value }))}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  error={fieldErrors.login?.[0]}
                />
                <Input
                  label="Senha"
                  value={form.senha}
                  onChangeText={(value) => setForm((prev) => ({ ...prev, senha: value }))}
                  secureTextEntry
                  error={fieldErrors.senha?.[0]}
                />

                {!!formError && (
                  <View style={styles.errorBox}>
                    <Text style={styles.errorText}>{formError}</Text>
                  </View>
                )}
              </View>

              <Button
                label="Entrar"
                onPress={handleSubmit}
                disabled={!result.success}
                loading={submitting}
                icon={<SignInIcon size={20} color={colors.textOnPrimary} weight="regular" />}
              />
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerCaption}>Ainda não tem conta?</Text>
              <Button label="Criar conta" variant="ghost" onPress={() => router.push('/register')} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  bg: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  blobTopRight: {
    position: 'absolute',
    top: -70,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.primary,
    opacity: 0.12,
  },
  blobTopLeft: {
    position: 'absolute',
    top: 140,
    left: -90,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: colors.primary,
    opacity: 0.08,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },

  header: {
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  logoBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
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
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textPrimary,
    opacity: 0.65,
    maxWidth: 280,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ECE0CC',
    padding: spacing.lg,
    gap: spacing.lg,
    shadowColor: '#2B211A',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 3,
  },
  form: {
    gap: spacing.md,
  },
  errorBox: {
    backgroundColor: 'rgba(193, 88, 74, 0.1)',
    borderRadius: 12,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
  },

  footer: {
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  footerCaption: {
    ...typography.caption,
    color: colors.textPrimary,
    opacity: 0.65,
  },
});