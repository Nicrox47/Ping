import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AuthField } from '@/features/auth/AuthField';
import { isValidEmail, validatePassword } from '@/features/auth/validation';
import { colors, radius, spacing } from '@/constants/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    if (!isValidEmail(email)) {
      Alert.alert('Correo inválido', 'Ingresa un correo electrónico válido.');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Contraseña inválida', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    // La autenticación real se conectará al servicio de backend en el siguiente incremento.
    router.replace('/home');
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>‹ Volver</Text>
      </Pressable>

      <Text style={styles.title}>Bienvenido a Ping</Text>
      <Text style={styles.subtitle}>Inicia sesión para entrar a tus eventos.</Text>

      <View style={styles.form}>
        <AuthField
          label="Correo electrónico"
          value={email}
          placeholder="correo@ejemplo.com"
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <AuthField
          label="Contraseña"
          value={password}
          placeholder="Mínimo 8 caracteres"
          secure
          onChangeText={setPassword}
        />

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </Pressable>

        <Pressable onPress={() => router.push('/register')} style={styles.linkButton}>
          <Text style={styles.link}>¿No tienes cuenta? <Text style={styles.linkStrong}>Regístrate</Text></Text>
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
  buttonText: { color: colors.text, fontSize: 17, fontWeight: '800' },
  linkButton: { alignItems: 'center', marginTop: spacing.lg },
  link: { color: colors.textMuted, fontSize: 14 },
  linkStrong: { color: colors.accent, fontWeight: '800' },
});
