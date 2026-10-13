import { useEffect, useRef } from 'react';
import { Animated, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors, radius, spacing } from '@/constants/theme';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=85';

const interests = ['🎮 Gaming', '⛩️ Anime', '🎧 Música', '🕹️ Retro'];

export default function HomeScreen() {
  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 420, useNativeDriver: true }).start();
  }, [fade]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Animated.View style={{ opacity: fade }}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.brand}>ping<Text style={styles.brandDot}>.</Text></Text>
            <Text style={styles.location}>VILLAVICENCIO · META</Text>
          </View>
          <Pressable accessibilityRole="button" onPress={() => router.push('/profile')} style={styles.avatar}><Text style={styles.avatarText}>P</Text></Pressable>
        </View>

        <View style={styles.greeting}>
          <Text style={styles.kicker}>TU COMUNIDAD, A TU RITMO</Text>
          <Text style={styles.title}>¿Qué vamos a descubrir hoy?</Text>
          <Text style={styles.subtitle}>Conecta por tus gustos. Encuentra a tu gente fuera de la pantalla.</Text>
        </View>

        <ImageBackground source={{ uri: HERO_IMAGE }} imageStyle={styles.heroImage} style={styles.hero}>
          <View style={styles.heroShade}>
            <View style={styles.livePill}><View style={styles.liveDot} /><Text style={styles.liveText}>PLANES PARA EXPLORAR</Text></View>
            <Text style={styles.heroTitle}>Tu próxima historia empieza en persona.</Text>
            <Text style={styles.heroCopy}>Sigue las pistas, encuentra a tu jugador y comparte el momento.</Text>
            <Pressable accessibilityRole="button" onPress={() => router.push('/clues')} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Buscar jugador  ↗</Text>
            </Pressable>
          </View>
        </ImageBackground>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tu universo</Text>
          <Pressable onPress={() => router.push('/profile')}><Text style={styles.link}>Editar intereses</Text></Pressable>
        </View>
        <View style={styles.chips}>{interests.map((interest) => <View key={interest} style={styles.chip}><Text style={styles.chipText}>{interest}</Text></View>)}</View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explora Ping</Text>
          <Text style={styles.sectionHint}>A TU MANERA</Text>
        </View>
        <View style={styles.tiles}>
          <Pressable onPress={() => router.push('/location')} style={[styles.tile, styles.mapTile]}>
            <Text style={styles.tileEmoji}>📍</Text><Text style={styles.tileTitle}>Mapa social</Text><Text style={styles.tileCopy}>Descubre lugares y eventos en Villavicencio.</Text><Text style={styles.tileArrow}>Abrir mapa ↗</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/clues')} style={[styles.tile, styles.clueTile]}>
            <Text style={styles.tileEmoji}>🧩</Text><Text style={styles.tileTitle}>Caza de pistas</Text><Text style={styles.tileCopy}>Encuentra a alguien a partir de sus gustos.</Text><Text style={styles.tileArrow}>Empezar ↗</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/profile')} style={styles.tile}>
            <Text style={styles.tileEmoji}>🎭</Text><Text style={styles.tileTitle}>Mi identidad</Text><Text style={styles.tileCopy}>Comparte tu vibra, anime y juegos favoritos.</Text><Text style={styles.tileArrow}>Ver perfil ↗</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/shop')} style={styles.tile}>
            <Text style={styles.tileEmoji}>✨</Text><Text style={styles.tileTitle}>Personalización</Text><Text style={styles.tileCopy}>Dale tu propio estilo a tu espacio.</Text><Text style={styles.tileArrow}>Explorar ↗</Text>
          </Pressable>
        </View>

        <View style={styles.communityCard}>
          <View style={styles.communityIcon}><Text style={styles.communityIconText}>♫</Text></View>
          <View style={styles.communityBody}>
            <Text style={styles.communityTitle}>Encuentra tu party</Text>
            <Text style={styles.communityCopy}>Gamers, fans del anime y amantes de la música: las mejores conexiones empiezan con algo en común.</Text>
          </View>
        </View>
        <Text style={styles.footer}>PING · CONEXIONES QUE SALEN DE LA PANTALLA</Text>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.xxl, width: '100%', maxWidth: 900, alignSelf: 'center' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xl },
  brand: { color: colors.text, fontSize: 32, fontWeight: '900', letterSpacing: -1.5 },
  brandDot: { color: colors.accent },
  location: { color: colors.textMuted, fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginTop: 1 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#B98AD0' },
  avatarText: { color: colors.text, fontSize: 17, fontWeight: '900' },
  greeting: { marginBottom: spacing.lg },
  kicker: { color: colors.accent, fontSize: 10, fontWeight: '900', letterSpacing: 1.7 },
  title: { color: colors.text, fontSize: 29, lineHeight: 35, fontWeight: '900', marginTop: spacing.sm, letterSpacing: -0.6 },
  subtitle: { color: colors.textMuted, fontSize: 14, lineHeight: 21, marginTop: spacing.sm, maxWidth: 560 },
  hero: { minHeight: 310, borderRadius: radius.lg, overflow: 'hidden', backgroundColor: '#25192D', justifyContent: 'flex-end' },
  heroImage: { borderRadius: radius.lg },
  heroShade: { minHeight: 310, justifyContent: 'flex-end', padding: spacing.lg, backgroundColor: 'rgba(8, 5, 12, 0.58)' },
  livePill: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: 'rgba(20, 17, 25, 0.84)', borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 8, marginBottom: spacing.md },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#B9F3C7', marginRight: 8 },
  liveText: { color: '#F7F3F9', fontSize: 9, fontWeight: '900', letterSpacing: 1.1 },
  heroTitle: { color: '#FFFFFF', fontSize: 27, lineHeight: 32, fontWeight: '900', maxWidth: 430 },
  heroCopy: { color: '#E8E1EA', fontSize: 13, lineHeight: 20, marginTop: spacing.sm, maxWidth: 460 },
  primaryButton: { alignSelf: 'flex-start', backgroundColor: colors.accent, borderRadius: radius.pill, paddingHorizontal: 19, minHeight: 46, justifyContent: 'center', marginTop: spacing.lg },
  primaryButtonText: { color: '#21182A', fontSize: 13, fontWeight: '900' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.xl, marginBottom: spacing.md },
  sectionTitle: { color: colors.text, fontSize: 20, fontWeight: '900', letterSpacing: -0.3 },
  link: { color: '#C9A3E8', fontSize: 12, fontWeight: '800' },
  sectionHint: { color: colors.textMuted, fontSize: 9, fontWeight: '800', letterSpacing: 1.1 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#1A1620', borderWidth: 1, borderColor: '#35273E', borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 9 },
  chipText: { color: '#EDE5F2', fontSize: 12, fontWeight: '700' },
  tiles: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tile: { flexGrow: 1, flexBasis: 220, minHeight: 165, backgroundColor: '#151319', borderColor: '#2B2630', borderWidth: 1, borderRadius: radius.lg, padding: spacing.md },
  mapTile: { backgroundColor: '#191623' },
  clueTile: { backgroundColor: '#201824' },
  tileEmoji: { fontSize: 22, marginBottom: spacing.sm },
  tileTitle: { color: colors.text, fontSize: 16, fontWeight: '900' },
  tileCopy: { color: colors.textMuted, fontSize: 12, lineHeight: 18, marginTop: 5, flex: 1 },
  tileArrow: { color: '#D4B3E9', fontSize: 12, fontWeight: '900', marginTop: spacing.md },
  communityCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.lg, padding: spacing.md, borderRadius: radius.lg, backgroundColor: '#17141B', borderWidth: 1, borderColor: '#302837' },
  communityIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#34203F', alignItems: 'center', justifyContent: 'center' },
  communityIconText: { color: '#E0B9FF', fontSize: 26, fontWeight: '900' },
  communityBody: { flex: 1 },
  communityTitle: { color: colors.text, fontSize: 15, fontWeight: '900' },
  communityCopy: { color: colors.textMuted, fontSize: 12, lineHeight: 18, marginTop: 4 },
  footer: { color: '#77717D', fontSize: 9, fontWeight: '800', letterSpacing: 1.3, textAlign: 'center', marginTop: spacing.xl },
});
