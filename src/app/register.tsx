import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AuthField } from '@/features/auth/AuthField';
import { isValidEmail, validateName, validatePassword } from '@/features/auth/validation';
import { colors, radius, spacing } from '@/constants/theme';
import { ACCOUNT_ROLES, type AccountRole } from '@/features/auth/roles';
import { supabase } from '@/lib/supabase';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<AccountRole>('customer');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleRegister() {
    const normalizedEmail = email.trim().toLowerCase();
    if (!validateName(name)) {
      setErrorMessage('Ingresa tu nombre (mínimo 2 caracteres).');
      return;
    }
    if (!isValidEmail(normalizedEmail)) {
      setErrorMessage('Ingresa un correo electrónico válido.');
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    const { error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        data: {
          full_name: name.trim(),
          role: role === 'organizer' ? 'organizer' : 'customer',
        },
      },
    });
    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    router.push({ pathname: '/verify-email', params: { email: normalizedEmail } });
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>‹ Volver</Text>
      </Pressable>
      <Text style={styles.title}>Crea tu cuenta</Text>
      <Text style={styles.subtitle}>Empieza a descubrir personas en tus eventos.</Text>
      <View style={styles.form}>
        <AuthField label="Nombre" value={name} placeholder="Tu nombre" onChangeText={setName} />
        <AuthField label="Correo electrónico" value={email} placeholder="correo@ejemplo.com" keyboardType="email-address" onChangeText={setEmail} />
        <AuthField label="Contraseña" value={password} placeholder="Mínimo 8 caracteres" secure onChangeText={setPassword} />
        <Text style={styles.roleLabel}>Tipo de cuenta</Text>
        <View style={styles.roles}>
          {ACCOUNT_ROLES.filter((item) => item.id !== 'admin').map((item) => (
            <Pressable
              key={item.id}
              onPress={() => setRole(item.id)}
              style={[styles.roleCard, role === item.id && styles.roleCardActive]}
            >
              <Text style={[styles.roleTitle, role === item.id && styles.roleTitleActive]}>{item.title}</Text>
              <Text style={styles.roleDescription}>{item.description}</Text>
            </Pressable>
          ))}
        </View>
        {!!errorMessage && <Text accessibilityRole="alert" style={styles.error}>{errorMessage}</Text>}
        <Pressable disabled={loading} style={[styles.button, loading && styles.disabled]} onPress={handleRegister}>
          <Text style={styles.buttonText}>{loading ? 'Creando cuenta…' : 'Crear cuenta'}</Text>
        </Pressable>
        <Pressable onPress={() => router.replace('/login')} style={styles.linkButton}>
          <Text style={styles.link}>¿Ya tienes cuenta? <Text style={styles.linkStrong}>Inicia sesión</Text></Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { flexGrow: 1, backgroundColor: colors.background, padding: spacing.lg, paddingTop: spacing.xxl, paddingBottom: spacing.xxl },
  back: { color: colors.accent, fontSize: 16, fontWeight: '700' },
  title: { color: colors.text, fontSize: 32, fontWeight: '800', marginTop: spacing.xxl },
  subtitle: { color: colors.textMuted, fontSize: 15, marginTop: spacing.sm },
  form: { marginTop: spacing.xl },
  roleLabel: { color: colors.text, fontSize: 14, fontWeight: '800', marginTop: spacing.lg },
  roles: { gap: spacing.sm, marginTop: spacing.sm },
  roleCard: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radius.md, padding: spacing.md },
  roleCardActive: { borderColor: colors.accent, backgroundColor: colors.surfaceElevated },
  roleTitle: { color: colors.text, fontSize: 16, fontWeight: '800' },
  roleTitleActive: { color: colors.accent },
  roleDescription: { color: colors.textMuted, fontSize: 12, lineHeight: 18, marginTop: 4 },
  button: {
    minHeight: 56, borderRadius: radius.md, backgroundColor: colors.accent,
    alignItems: 'center', justifyContent: 'center', marginTop: spacing.xl,
  },
  disabled: { opacity: 0.6 },
  buttonText: { color: colors.background, fontSize: 17, fontWeight: '800' },
  linkButton: { alignItems: 'center', marginTop: spacing.lg },
  link: { color: colors.textMuted, fontSize: 14 },
  linkStrong: { color: colors.primaryLight, fontWeight: '800' },
  error: { color: colors.danger, marginTop: spacing.md, lineHeight: 20 },
});
