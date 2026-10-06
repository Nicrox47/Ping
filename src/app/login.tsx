import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { router } from 'expo-router';
import { colors, radius, spacing } from '@/constants/theme';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()}><Text style={styles.back}>‹ Volver</Text></Pressable>
      <Text style={styles.title}>Bienvenido a Ping</Text>
      <Text style={styles.subtitle}>Inicia sesión para entrar a tus eventos.</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          placeholder="correo@ejemplo.com"
          placeholderTextColor={colors.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          placeholder="••••••••"
          placeholderTextColor={colors.textMuted}
          secureTextEntry
          style={styles.input}
        />
        <Pressable style={styles.button} onPress={() => router.push('/home')}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
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
  label: { color: colors.text, fontSize: 14, fontWeight: '700', marginBottom: spacing.sm, marginTop: spacing.md },
  input: {
    minHeight: 54, backgroundColor: colors.surface, borderWidth: 1,
    borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: spacing.md,
    color: colors.text, fontSize: 16,
  },
  button: {
    minHeight: 56, borderRadius: radius.md, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center', marginTop: spacing.xl,
  },
  buttonText: { color: colors.text, fontSize: 17, fontWeight: '800' },
});
