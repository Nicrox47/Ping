import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors, radius, spacing } from '@/constants/theme';

const metrics = [
  ['Usuarios', '1,248'],
  ['Organizadores', '86'],
  ['Eventos activos', '24'],
  ['Encuentros verificados', '632'],
];

export default function AdminScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>PING ADMIN</Text>
      <Text style={styles.title}>Panel de administración</Text>
      <Text style={styles.subtitle}>
        Control central de usuarios, organizadores, eventos, reportes, métricas y configuración de la plataforma.
      </Text>

      <View style={styles.grid}>
        {metrics.map(([label, value]) => (
          <View key={label} style={styles.metric}>
            <Text style={styles.value}>{value}</Text>
            <Text style={styles.label}>{label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Módulos administrativos</Text>
        <Text style={styles.cardText}>Usuarios y roles · Eventos · Reportes · Estadísticas · Configuración · Auditoría.</Text>
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
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.xl },
  metric: { flexGrow: 1, flexBasis: '45%', backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radius.md, padding: spacing.md, minWidth: 140 },
  value: { color: colors.accent, fontSize: 25, fontWeight: '800' },
  label: { color: colors.textMuted, fontSize: 13, marginTop: 4 },
  card: { backgroundColor: colors.surfaceElevated, borderRadius: radius.md, padding: spacing.lg, marginTop: spacing.lg },
  cardTitle: { color: colors.text, fontSize: 18, fontWeight: '800' },
  cardText: { color: colors.textMuted, fontSize: 14, lineHeight: 22, marginTop: spacing.sm },
  back: { color: colors.primaryLight, fontWeight: '800', marginTop: spacing.xl },
});
