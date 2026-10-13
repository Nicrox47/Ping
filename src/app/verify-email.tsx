import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { AuthField } from '@/features/auth/AuthField';
import { colors, radius, spacing } from '@/constants/theme';
import { supabase } from '@/lib/supabase';
import { isAccountRole } from '@/features/auth/roles';

export default function VerifyEmailScreen() {
  const params = useLocalSearchParams<{ email?: string }>();
  const [email, setEmail] = useState(typeof params.email === 'string' ? params.email : '');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function verifyCode() {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedToken = token.replace(/\s/g, '');
    if (!normalizedEmail || !/^\d{6,8}$/.test(normalizedToken)) {
      setErrorMessage('Escribe tu correo y el código numérico que recibiste.');
      setMessage('');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setMessage('');
    const { data, error } = await supabase.auth.verifyOtp({
      email: normalizedEmail,
      token: normalizedToken,
      type: 'email',
    });
    setLoading(false);

    if (error) {
      setErrorMessage('No pudimos verificar el código. Revisa que esté correcto y que no haya vencido.');
      return;
    }

    const roleValue = data.user?.user_metadata?.role;
    const role = typeof roleValue === 'string' && isAccountRole(roleValue) ? roleValue : 'customer';
    setMessage('Correo verificado. ¡Bienvenido a Ping!');
    router.replace(role === 'organizer' ? '/organizer' : '/home');
  }

  async function resendCode() {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      setErrorMessage('Escribe el correo donde quieres recibir el código.');
      return;
    }
    setLoading(true);
    setErrorMessage('');
    setMessage('');
    const { error } = await supabase.auth.resend({ type: 'signup', email: normalizedEmail });
    setLoading(false);
    if (error) {
      setErrorMessage('No pudimos reenviar el código. Espera un momento e inténtalo de nuevo.');
      return;
    }
    setMessage('Si el registro está pendiente, enviaremos un nuevo código a tu correo.');
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Pressable onPress={() => router.replace('/register')}>
        <Text style={styles.back}>‹ Volver al registro</Text>
      </Pressable>
      <Text style={styles.title}>Verifica tu correo</Text>
      <Text style={styles.subtitle}>Ingresa el código que te enviamos por correo para activar tu cuenta de Ping.</Text>
      <View style={styles.form}>
        <AuthField label="Correo electrónico" value={email} placeholder="correo@ejemplo.com" keyboardType="email-address" onChangeText={setEmail} />
        <AuthField label="Código de verificación" value={token} placeholder="Código de 6 a 8 dígitos" onChangeText={setToken} />
        {!!errorMessage && <Text accessibilityRole="alert" style={styles.error}>{errorMessage}</Text>}
        {!!message && <Text accessibilityRole="status" style={styles.success}>{message}</Text>}
        <Pressable disabled={loading} style={[styles.button, loading && styles.disabled]} onPress={verifyCode}>
          <Text style={styles.buttonText}>{loading ? 'Verificando…' : 'Verificar correo'}</Text>
        </Pressable>
        <Pressable disabled={loading} onPress={resendCode} style={styles.linkButton}>
          <Text style={styles.link}>{loading ? 'Procesando…' : 'Reenviar código'}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: colors.background, padding: spacing.lg, paddingTop: spacing.xxl, paddingBottom: spacing.xxl },
  back: { color: colors.accent, fontSize: 16, fontWeight: '700' },
  title: { color: colors.text, fontSize: 32, fontWeight: '800', marginTop: spacing.xxl },
  subtitle: { color: colors.textMuted, fontSize: 15, lineHeight: 22, marginTop: spacing.sm },
  form: { marginTop: spacing.xl },
  button: { minHeight: 56, borderRadius: radius.md, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginTop: spacing.xl },
  disabled: { opacity: 0.6 },
  buttonText: { color: colors.background, fontSize: 17, fontWeight: '800' },
  linkButton: { alignItems: 'center', marginTop: spacing.lg, padding: spacing.sm },
  link: { color: colors.primaryLight, fontSize: 15, fontWeight: '700' },
  error: { color: colors.danger, marginTop: spacing.md, lineHeight: 20 },
  success: { color: colors.success, marginTop: spacing.md, lineHeight: 20 },
});
