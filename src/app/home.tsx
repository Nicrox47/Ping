import { StyleSheet, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { colors, radius, spacing } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>PING</Text>
      <Text style={styles.title}>Tu próximo encuentro empieza aquí.</Text>
      <View style={styles.card}>
        <View>
          <Text style={styles.cardLabel}>EVENTO ACTIVO</Text>
          <Text style={styles.eventName}>Evento de prueba</Text>
          <Text style={styles.eventInfo}>0 coincidencias · 0 puntos</Text>
        </View>
        <View style={styles.dot} />
      </View>
      <Pressable style={styles.button} onPress={() => router.push('/location')}>
        <Text style={styles.buttonText}>Ver mapa y mi ubicación</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg, paddingTop: spacing.xxl },
  eyebrow: { color: colors.accent, fontSize: 13, fontWeight: '900', letterSpacing: 3 },
  title: {
    color: colors.text, fontSize: 32, lineHeight: 38, fontWeight: '800',
    marginTop: spacing.sm, maxWidth: 360,
  },
  card: {
    backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1,
    borderColor: colors.border, padding: spacing.lg, marginTop: spacing.xl,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  cardLabel: { color: colors.primaryLight, fontSize: 12, fontWeight: '900' },
  eventName: { color: colors.text, fontSize: 21, fontWeight: '800', marginTop: spacing.sm },
  eventInfo: { color: colors.textMuted, marginTop: spacing.xs },
  dot: { width: 14, height: 14, borderRadius: 10, backgroundColor: colors.success },
  button: {
    minHeight: 56, borderRadius: radius.md, backgroundColor: colors.accent,
    justifyContent: 'center', alignItems: 'center', marginTop: spacing.lg,
  },
  buttonText: { color: colors.background, fontSize: 16, fontWeight: '800' },
});
