import { StyleSheet, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { BrandLogo } from '@/components/BrandLogo';
import { colors, radius, spacing } from '@/constants/theme';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.glow} />
      <BrandLogo />
      <View style={styles.content}>
        <Text style={styles.title}>Encuentra tu conexión.</Text>
        <Text style={styles.subtitle}>
          Comparte intereses, sigue las pistas y encuentra a alguien nuevo en tu evento.
        </Text>
      </View>
      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.primaryText}>Comenzar</Text>
        </Pressable>
        <Text style={styles.footer}>Conecta. Busca. Encuentra.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: colors.background, alignItems: 'center',
    justifyContent: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.xxl,
  },
  glow: {
    position: 'absolute', width: 280, height: 280, borderRadius: 200,
    backgroundColor: colors.primary, opacity: 0.14, top: 90,
  },
  content: { alignItems: 'center', marginTop: spacing.xxl, maxWidth: 360 },
  title: { color: colors.text, fontSize: 30, lineHeight: 36, fontWeight: '800', textAlign: 'center' },
  subtitle: {
    color: colors.textMuted, fontSize: 16, lineHeight: 24,
    textAlign: 'center', marginTop: spacing.md,
  },
  actions: { width: '100%', alignItems: 'center', marginTop: spacing.xxl },
  primaryButton: {
    width: '100%', minHeight: 56, borderRadius: radius.md,
    backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center',
  },
  pressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
  primaryText: { color: colors.background, fontSize: 17, fontWeight: '800' },
  footer: { color: colors.textMuted, fontSize: 12, marginTop: spacing.md },
});
