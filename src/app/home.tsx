import { useEffect, useRef } from 'react';
import { Animated, ImageBackground, StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { colors, radius, spacing } from '@/constants/theme';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1400&q=85';

export default function HomeScreen() {
  const fade = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 650, useNativeDriver: true }),
      Animated.timing(rise, { toValue: 0, duration: 650, useNativeDriver: true }),
    ]).start();
  }, [fade, rise]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Animated.View style={{ opacity: fade, transform: [{ translateY: rise }] }}>
        <Text style={styles.eyebrow}>PING · PLAY YOUR STORY</Text>
        <Text style={styles.title}>Tu próxima conexión empieza aquí.</Text>
        <Text style={styles.subtitle}>Encuentra personas en tus eventos con pistas, gana puntos y crea tu identidad de jugador.</Text>

        <ImageBackground source={{ uri: HERO_IMAGE }} imageStyle={styles.heroImage} style={styles.hero}>
          <View style={styles.heroShade}>
            <View style={styles.liveBadge}><View style={styles.liveDot} /><Text style={styles.liveText}>EVENTO ACTIVO</Text></View>
            <Text style={styles.heroTitle}>¿Listo para el encuentro?</Text>
            <Text style={styles.heroDescription}>Sigue las pistas. Descubre a tu jugador. Haz que la historia avance.</Text>
            <Pressable style={styles.heroButton} onPress={() => router.push('/clues')}>
              <Text style={styles.heroButtonText}>EMPEZAR BÚSQUEDA  →</Text>
            </Pressable>
          </View>
        </ImageBackground>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Tu zona de juego</Text>
          <Text style={styles.sectionCaption}>ELIGE TU SIGUIENTE PASO</Text>
        </View>
        <View style={styles.actionGrid}>
          <Pressable style={styles.actionCard} onPress={() => router.push('/clues')}>
            <Text style={styles.actionIcon}>⌕</Text>
            <Text style={styles.actionTitle}>Cazar pistas</Text>
            <Text style={styles.actionDescription}>Descubre quién es tu objetivo.</Text>
          </Pressable>
          <Pressable style={styles.actionCard} onPress={() => router.push('/profile')}>
            <Text style={styles.actionIcon}>✦</Text>
            <Text style={styles.actionTitle}>Mi perfil</Text>
            <Text style={styles.actionDescription}>Muestra tus intereses y estilo.</Text>
          </Pressable>
          <Pressable style={styles.actionCard} onPress={() => router.push('/shop')}>
            <Text style={styles.actionIcon}>◇</Text>
            <Text style={styles.actionTitle}>Tienda</Text>
            <Text style={styles.actionDescription}>Canjea puntos por cosméticos.</Text>
          </Pressable>
          <Pressable style={styles.actionCard} onPress={() => router.push('/location')}>
            <Text style={styles.actionIcon}>◎</Text>
            <Text style={styles.actionTitle}>Mapa en vivo</Text>
            <Text style={styles.actionDescription}>Mira tu ubicación en el evento.</Text>
          </Pressable>
        </View>
        <View style={styles.eventCard}>
          <View style={styles.eventIcon}><Text style={styles.eventIconText}>P</Text></View>
          <View style={styles.eventBody}>
            <Text style={styles.eventLabel}>MODO DEMOSTRACIÓN</Text>
            <Text style={styles.eventName}>Evento de prueba · Cúcuta</Text>
            <Text style={styles.eventInfo}>Prueba las funciones antes de conectar el backend.</Text>
          </View>
          <View style={styles.dot} />
        </View>
        <Text style={styles.footnote}>Los puntos, las compras y las búsquedas siguen siendo de demostración local. Para compartirlos entre teléfonos hace falta conectar un backend y cuentas reales.</Text>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.xxl, maxWidth: 900, width: '100%', alignSelf: 'center' },
  eyebrow: { color: colors.accent, fontSize: 11, fontWeight: '900', letterSpacing: 2.4 },
  title: { color: colors.text, fontSize: 34, lineHeight: 40, fontWeight: '900', marginTop: spacing.md, maxWidth: 580 },
  subtitle: { color: colors.textMuted, fontSize: 15, lineHeight: 23, marginTop: spacing.sm, maxWidth: 600 },
  hero: { minHeight: 300, marginTop: spacing.xl, borderRadius: radius.lg, overflow: 'hidden', justifyContent: 'flex-end', backgroundColor: '#21152B' },
  heroImage: { borderRadius: radius.lg },
  heroShade: { minHeight: 300, justifyContent: 'flex-end', padding: spacing.lg, backgroundColor: 'rgba(5,5,5,0.57)' },
  liveBadge: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: 'rgba(5,5,5,0.72)', borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 8, marginBottom: spacing.md },
  liveDot: { width: 7, height: 7, borderRadius: 5, backgroundColor: colors.success, marginRight: 8 },
  liveText: { color: colors.text, fontSize: 10, fontWeight: '900', letterSpacing: 1.4 },
  heroTitle: { color: colors.text, fontSize: 27, lineHeight: 32, fontWeight: '900', maxWidth: 440 },
  heroDescription: { color: '#F0EAF2', fontSize: 14, lineHeight: 21, marginTop: spacing.xs, maxWidth: 480 },
  heroButton: { alignSelf: 'flex-start', backgroundColor: colors.accent, borderRadius: radius.md, paddingHorizontal: spacing.md, minHeight: 48, justifyContent: 'center', marginTop: spacing.lg },
  heroButtonText: { color: colors.background, fontSize: 12, fontWeight: '900', letterSpacing: 0.5 },
  sectionHeading: { marginTop: spacing.xl, marginBottom: spacing.sm },
  sectionTitle: { color: colors.text, fontSize: 21, fontWeight: '900' },
  sectionCaption: { color: colors.textMuted, fontSize: 10, fontWeight: '800', letterSpacing: 1.6, marginTop: 5 },
  actionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  actionCard: { flexGrow: 1, flexBasis: 145, minHeight: 140, backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, padding: spacing.md },
  actionIcon: { color: colors.accent, fontSize: 25, fontWeight: '900', marginBottom: spacing.sm },
  actionTitle: { color: colors.text, fontSize: 15, fontWeight: '900' },
  actionDescription: { color: colors.textMuted, fontSize: 12, lineHeight: 17, marginTop: 5 },
  eventCard: { backgroundColor: colors.surfaceElevated, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, padding: spacing.md, marginTop: spacing.lg, flexDirection: 'row', alignItems: 'center' },
  eventIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  eventIconText: { color: colors.accent, fontSize: 20, fontWeight: '900' },
  eventBody: { flex: 1 },
  eventLabel: { color: colors.primaryLight, fontSize: 10, fontWeight: '900', letterSpacing: 1.1 },
  eventName: { color: colors.text, fontSize: 15, fontWeight: '800', marginTop: 4 },
  eventInfo: { color: colors.textMuted, fontSize: 12, lineHeight: 17, marginTop: 4 },
  dot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.success, marginLeft: spacing.sm },
  footnote: { color: colors.textMuted, fontSize: 11, lineHeight: 17, marginTop: spacing.lg },
});
