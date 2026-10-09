import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { colors, radius, spacing } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>PING</Text>
      <Text style={styles.title}>Tu próximo encuentro empieza aquí.</Text>
      <Text style={styles.subtitle}>Encuentra a otros asistentes con pistas, gana puntos y personaliza tu experiencia.</Text>
      <View style={styles.card}>
        <View>
          <Text style={styles.cardLabel}>EVENTO ACTIVO</Text>
          <Text style={styles.eventName}>Evento de prueba</Text>
          <Text style={styles.eventInfo}>Prepárate para encontrar a tu jugador objetivo.</Text>
        </View>
        <View style={styles.dot} />
      </View>
      <Pressable style={styles.button} onPress={() => router.push('/clues')}>
        <Text style={styles.buttonText}>Buscar jugador con pistas</Text>
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={() => router.push('/profile')}>
        <Text style={styles.secondaryButtonText}>Personalizar mi perfil</Text>
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={() => router.push('/shop')}>
        <Text style={styles.secondaryButtonText}>Tienda de puntos</Text>
      </Pressable>
      <Pressable style={styles.tertiaryButton} onPress={() => router.push('/location')}>
        <Text style={styles.tertiaryButtonText}>Ver mapa y mi ubicación</Text>
      </Pressable>
      <Text style={styles.footnote}>Prototipo: la búsqueda, los puntos y la tienda aún funcionan de forma local, sin conexión entre cuentas.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingTop: spacing.xxl, paddingBottom: spacing.xxl, maxWidth: 760, width: '100%', alignSelf: 'center' },
  eyebrow: { color: colors.accent, fontSize: 13, fontWeight: '900', letterSpacing: 3 },
  title: { color: colors.text, fontSize: 32, lineHeight: 38, fontWeight: '800', marginTop: spacing.sm, maxWidth: 420 },
  subtitle: { color: colors.textMuted, fontSize: 15, lineHeight: 22, marginTop: spacing.sm },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginTop: spacing.xl, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardLabel: { color: colors.primaryLight, fontSize: 12, fontWeight: '900' },
  eventName: { color: colors.text, fontSize: 21, fontWeight: '800', marginTop: spacing.sm },
  eventInfo: { color: colors.textMuted, marginTop: spacing.xs, flexShrink: 1 },
  dot: { width: 14, height: 14, borderRadius: 10, backgroundColor: colors.success, marginLeft: spacing.md },
  button: { minHeight: 56, borderRadius: radius.md, backgroundColor: colors.accent, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.md, marginTop: spacing.lg },
  buttonText: { color: colors.background, fontSize: 16, fontWeight: '800', textAlign: 'center' },
  secondaryButton: { minHeight: 54, borderRadius: radius.md, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.md, marginTop: spacing.md },
  secondaryButtonText: { color: colors.text, fontSize: 15, fontWeight: '800', textAlign: 'center' },
  tertiaryButton: { minHeight: 48, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.md, marginTop: spacing.sm },
  tertiaryButtonText: { color: colors.textMuted, fontSize: 14, fontWeight: '700' },
  footnote: { color: colors.textMuted, fontSize: 12, lineHeight: 18, marginTop: spacing.lg },
});