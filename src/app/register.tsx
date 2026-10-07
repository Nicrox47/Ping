import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AuthField } from '@/features/auth/AuthField';
import { isValidEmail, validateName, validatePassword } from '@/features/auth/validation';
import { colors, radius, spacing } from '@/constants/theme';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleRegister() {
    if (!validateName(name)) {
      Alert.alert('Nombre inválido', 'Ingresa tu nombre para continuar.');
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert('Correo inválido', 'Ingresa un correo electrónico válido.');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert('Contraseña inválida', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    Alert.alert('Cuenta lista', 'La conexión con el servicio de autenticación se agregará en el siguiente incremento.', [
      { text: 'Continuar', onPress: () => router.replace('/home') },
    ]);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>‹ Volver</Text>
      </Pressable>

      <Text style={styles.title}>Crea tu cuenta</Text>
      <Text style={styles.subtitle}>Empieza a descubrir personas en tus eventos.</Text>

      <View style={styles.form}>
        <AuthField label="Nombre" value={name} placeholder="Tu nombre" onChangeText={setName} />
        <AuthField label="Correo electrónico" value={email} placeholder="correo@ejemplo.com" keyboardType="email-address" onChangeText={setEmail} />
        <AuthField label="Contraseña" value={password} placeholder="Mínimo 8 caracteres" secure onChangeText={setPassword} />

        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </Pressable>

        <Pressable onPress={() => router.replace('/login')} style={styles.linkButton}>
          <Text style={styles.link}>¿Ya tienes cuenta? <Text style={styles.linkStrong}>Inicia sesión</Text></Text>
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
    minHeight: 56, borderRadius: radius.md, backgroundColor: colors.accent,
    alignItems: 'center', justifyContent: 'center', marginTop: spacing.xl,
  },
  buttonText: { color: colors.background, fontSize: 17, fontWeight: '800' },
  linkButton: { alignItems: 'center', marginTop: spacing.lg },
  link: { color: colors.textMuted, fontSize: 14 },
  linkStrong: { color: colors.primaryLight, fontWeight: '800' },
});
