import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors, radius, spacing } from '@/constants/theme';
import { CLUES, getReward } from '@/features/game/clue-system';

export default function CluesScreen() {
  const [points, setPoints] = useState(100);
  const [unlocked, setUnlocked] = useState(0);
  const [found, setFound] = useState(false);
  const reward = getReward(unlocked);

  function unlockNextClue() {
    const next = CLUES[unlocked + 1];
    if (!next) {
      Alert.alert('No hay más pistas', 'Ya desbloqueaste todas las pistas disponibles.');
      return;
    }
    if (points < next.unlockCost) {
      Alert.alert('Puntos insuficientes', `Necesitas ${next.unlockCost} puntos para desbloquear esta pista.`);
      return;
    }
    setPoints((current) => current - next.unlockCost);
    setUnlocked((current) => current + 1);
  }

  function markFound() {
    if (found) return;
    setPoints((current) => current + reward);
    setFound(true);
    Alert.alert('¡Encuentro registrado!', `Ganaste ${reward} puntos por encontrar al jugador. Esta es una demostración local.`);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable onPress={() => router.back()}><Text style={styles.back}>‹ Volver</Text></Pressable>
      <Text style={styles.eyebrow}>MODO ENCUENTRO</Text>
      <Text style={styles.title}>Encuentra al jugador.</Text>
      <Text style={styles.subtitle}>Usa las pistas para descubrir a la persona asignada en el evento. Puedes buscar con la información inicial o gastar puntos para saber más.</Text>
      <View style={styles.pointsCard}>
        <Text style={styles.smallLabel}>TUS PUNTOS DE DEMOSTRACIÓN</Text>
        <Text style={styles.points}>{points} pts</Text>
        <Text style={styles.muted}>Recompensa actual por encontrarle: {reward} puntos</Text>
      </View>
      {CLUES.slice(0, unlocked + 1).map((clue, index) => (
        <View key={clue.id} style={styles.clueCard}>
          <Text style={styles.clueNumber}>PISTA {index + 1}</Text>
          <Text style={styles.clueText}>{clue.text}</Text>
          {index === 0 && <Text style={styles.free}>Pista inicial · Gratis</Text>}
        </View>
      ))}
      <View style={styles.ruleCard}>
        <Text style={styles.ruleTitle}>Decide cuándo saber más</Text>
        <Text style={styles.muted}>Cada pista extra reduce en 25 puntos la recompensa del encuentro, hasta un mínimo de 25. El costo de desbloqueo se descuenta aparte.</Text>
        <Pressable style={[styles.button, (unlocked >= CLUES.length - 1 || found) && styles.disabled]} onPress={unlockNextClue} disabled={unlocked >= CLUES.length - 1 || found}>
          <Text style={styles.buttonText}>{unlocked >= CLUES.length - 1 ? 'Todas las pistas desbloqueadas' : `Desbloquear pista · ${CLUES[unlocked + 1].unlockCost} pts`}</Text>
        </Pressable>
      </View>
      <Pressable style={[styles.button, styles.secondaryButton, found && styles.disabled]} onPress={markFound} disabled={found}>
        <Text style={styles.secondaryButtonText}>{found ? 'Encuentro registrado' : `Encontré al jugador · +${reward} pts`}</Text>
      </Pressable>
      <Text style={styles.footnote}>Prototipo: puntos y encuentros son temporales y se reinician al salir de esta pantalla. Aún no se verifican encuentros con otros usuarios.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingTop: spacing.xxl, paddingBottom: spacing.xxl, maxWidth: 760, width: '100%', alignSelf: 'center' },
  back: { color: colors.accent, fontSize: 16, fontWeight: '700' },
  eyebrow: { color: colors.accent, fontSize: 12, fontWeight: '900', letterSpacing: 2, marginTop: spacing.xxl },
  title: { color: colors.text, fontSize: 32, lineHeight: 38, fontWeight: '800', marginTop: spacing.sm },
  subtitle: { color: colors.textMuted, fontSize: 15, lineHeight: 23, marginTop: spacing.sm, marginBottom: spacing.lg },
  pointsCard: { backgroundColor: colors.primary, borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.lg },
  smallLabel: { color: colors.text, fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  points: { color: colors.accent, fontSize: 34, fontWeight: '900', marginVertical: spacing.xs },
  muted: { color: colors.textMuted, fontSize: 13, lineHeight: 20 },
  clueCard: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  clueNumber: { color: colors.accent, fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  clueText: { color: colors.text, fontSize: 16, lineHeight: 23, fontWeight: '700', marginTop: spacing.xs },
  free: { color: colors.success, fontSize: 12, marginTop: spacing.sm },
  ruleCard: { backgroundColor: colors.surfaceElevated, borderRadius: radius.lg, padding: spacing.lg, marginTop: spacing.sm },
  ruleTitle: { color: colors.text, fontSize: 18, fontWeight: '800', marginBottom: spacing.xs },
  button: { minHeight: 54, borderRadius: radius.md, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', padding: spacing.md, marginTop: spacing.md },
  buttonText: { color: colors.background, fontSize: 14, fontWeight: '900', textAlign: 'center' },
  secondaryButton: { backgroundColor: colors.primary, marginTop: spacing.md },
  secondaryButtonText: { color: colors.text, fontSize: 15, fontWeight: '900', textAlign: 'center' },
  disabled: { opacity: 0.45 },
  footnote: { color: colors.textMuted, fontSize: 12, lineHeight: 18, marginTop: spacing.lg },
});
