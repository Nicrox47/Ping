import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AuthField } from '@/features/auth/AuthField';
import { isValidEmail, validatePassword } from '@/features/auth/validation';
import { colors, radius, spacing } from '@/constants/theme';
import { supabase } from '@/lib/supabase';
import { isAccountRole } from '@/features/auth/roles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleLogin() {
    const normalizedEmail = email.trim().toLowerCase();
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
    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });
    setLoading(false);

    if (error) {
      setErrorMessage(error.message.includes('Email not confirmed')
        ? 'Debes verificar tu correo antes de iniciar sesión.'
        : 'No pudimos iniciar sesión. Revisa tu correo y contraseña.');
      return;
    }

    const roleValue = data.user.user_metadata?.role;
    const role = typeof roleValue === 'string' && isAccountRole(roleValue) ? roleValue : 'customer';
    router.replace(role === 'organizer' ? '/organizer' : '/home');
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>‹ Volver</Text>
      </Pressable>

      <Text style={styles.title}>Bienvenido a Ping</Text>
      <Text style={styles.subtitle}>Inicia sesión para entrar a tus eventos.</Text>

      <View style={styles.form}>
        <AuthField label="Correo electrónico" value={email} placeholder="correo@ejemplo.com" keyboardType="email-address" onChangeText={setEmail} />
        <AuthField label="Contraseña" value={password} placeholder="Mínimo 8 caracteres" secure onChangeText={setPassword} />
        {!!errorMessage && <Text accessibilityRole="alert" style={styles.error}>{errorMessage}</Text>}

        <Pressable disabled={loading} style={[styles.button, loading && styles.disabled]} onPress={handleLogin}>
          <Text style={styles.buttonText}>{loading ? 'Iniciando sesión…' : 'Iniciar sesión'}</Text>
        </Pressable>

        <Pressable onPress={() => router.push('/register')} style={styles.linkButton}>
          <Text style={styles.link}>¿No tienes cuenta? <Text style={styles.linkStrong}>Regístrate</Text></Text>
        </Pressable>
        <Pressable onPress={() => router.push('/verify-email')} style={styles.linkButton}>
          <Text style={styles.link}>¿Necesitas verificar tu correo?</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg, paddingTop: spacing.xxl },
  back: { color: colors.accent, fontSize: 16, fontWeight: '700' },
  title: { color: colors.text, fontSize: 32, fontWeight: '800', marginTop: spacing.xxl },
  subtitle: { color: colors.textMuted, fontSize: 15, marginTop: spacing.sm },
  form: { marginTop: spacing.xl },
  button: {
    minHeight: 56,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  disabled: { opacity: 0.6 },
  buttonText: { color: colors.text, fontSize: 17, fontWeight: '800' },
  linkButton: { alignItems: 'center', marginTop: spacing.lg },
  link: { color: colors.textMuted, fontSize: 14 },
  error: { color: colors.danger, marginTop: spacing.md, lineHeight: 20 },
});
