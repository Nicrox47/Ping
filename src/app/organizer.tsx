import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors, radius, spacing } from '@/constants/theme';

export default function OrganizerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>PING ORGANIZADOR</Text>
      <Text style={styles.title}>Gestiona tus eventos</Text>
      <Text style={styles.subtitle}>
        Crea eventos, define el lugar en el mapa, publica promociones y consulta el comportamiento de tus asistentes.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Próximo paso</Text>
        <Text style={styles.cardText}>
          El módulo de eventos permitirá configurar nombre, descripción, portada, fecha, ubicación, capacidad, publicación y promoción.
        </Text>
      </View>

      <Text style={styles.back} onPress={() => router.replace('/home')}>Volver al inicio</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg, paddingTop: spacing.xxl },
  eyebrow: { color: colors.accent, fontSize: 12, fontWeight: '800', letterSpacing: 1.5 },
  title: { color: colors.text, fontSize: 32, fontWeight: '800', marginTop: spacing.sm },
  subtitle: { color: colors.textMuted, fontSize: 15, lineHeight: 23, marginTop: spacing.sm },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radius.md, padding: spacing.lg, marginTop: spacing.xl },
  cardTitle: { color: colors.text, fontSize: 18, fontWeight: '800' },
  cardText: { color: colors.textMuted, fontSize: 14, lineHeight: 21, marginTop: spacing.sm },
  back: { color: colors.primaryLight, fontWeight: '800', marginTop: spacing.xl },
});
