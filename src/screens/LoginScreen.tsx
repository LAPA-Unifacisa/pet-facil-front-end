import { router } from 'expo-router';
import { SignInIcon } from 'phosphor-react-native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Bem-vindo de volta</Text>
        <Text style={styles.title}>Entrar</Text>
      </View>

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
        {!!formError && <Text style={styles.formError}>{formError}</Text>}
      </View>

      <View style={styles.footer}>
        <Button
          label="Entrar"
          onPress={handleSubmit}
          disabled={!result.success}
          loading={submitting}
          icon={<SignInIcon size={20} color={colors.textOnPrimary} weight="regular" />}
        />
        <Button
          label="Ainda não tem conta? Cadastre-se"
          variant="ghost"
          onPress={() => router.push('/register')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  header: {
    marginTop: spacing.xl,
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
  form: {
    gap: spacing.md,
  },
  formError: {
    ...typography.caption,
    color: colors.error,
  },
  footer: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
});
