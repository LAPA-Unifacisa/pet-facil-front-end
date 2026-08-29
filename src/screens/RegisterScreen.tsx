import { router } from 'expo-router';
import { UserPlusIcon } from 'phosphor-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/src/components/ui/Button';
import Input from '@/src/components/ui/Input';
import { useAuth } from '@/src/hooks/useAuth';
import { registerSchema } from '@/src/schemas/registerSchema';
import { colors, spacing, typography } from '@/src/theme';
import { maskCPF } from '@/src/utils/cpf';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    nomeCompleto: '',
    login: '',
    cpf: '',
    senha: '',
    confirmarSenha: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const result = registerSchema.safeParse(form);
  const fieldErrors = result.success ? {} : result.error.flatten().fieldErrors;

  const handleSubmit = async () => {
    if (!result.success) return;

    setSubmitting(true);
    setFormError(null);
    const response = await register(result.data);
    setSubmitting(false);

    if (!response.success) {
      setFormError(response.error ?? 'Não foi possível concluir o cadastro.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Comece agora</Text>
          <Text style={styles.title}>Criar conta</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Nome completo"
            value={form.nomeCompleto}
            onChangeText={(value) => setForm((prev) => ({ ...prev, nomeCompleto: value }))}
            error={fieldErrors.nomeCompleto?.[0]}
          />
          <Input
            label="E-mail"
            value={form.login}
            onChangeText={(value) => setForm((prev) => ({ ...prev, login: value }))}
            autoCapitalize="none"
            keyboardType="email-address"
            error={fieldErrors.login?.[0]}
          />
          <Input
            label="CPF"
            value={form.cpf}
            onChangeText={(value) => setForm((prev) => ({ ...prev, cpf: maskCPF(value) }))}
            keyboardType="number-pad"
            maxLength={14}
            error={fieldErrors.cpf?.[0]}
          />
          <Input
            label="Senha"
            value={form.senha}
            onChangeText={(value) => setForm((prev) => ({ ...prev, senha: value }))}
            secureTextEntry
            error={fieldErrors.senha?.[0]}
          />
          <Input
            label="Repetir senha"
            value={form.confirmarSenha}
            onChangeText={(value) => setForm((prev) => ({ ...prev, confirmarSenha: value }))}
            secureTextEntry
            error={fieldErrors.confirmarSenha?.[0]}
          />
          {!!formError && <Text style={styles.formError}>{formError}</Text>}
        </View>

        <View style={styles.footer}>
          <Button
            label="Cadastrar"
            onPress={handleSubmit}
            disabled={!result.success}
            loading={submitting}
            icon={<UserPlusIcon size={20} color={colors.textOnPrimary} weight="regular" />}
          />
          <Button
            label="Já tem conta? Entrar"
            variant="ghost"
            onPress={() => router.push('/login')}
          />
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  header: {
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
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
    marginTop: spacing.lg,
  },
});
