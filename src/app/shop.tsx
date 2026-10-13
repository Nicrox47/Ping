import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors, radius, spacing } from '@/constants/theme';
import { SHOP_ITEMS } from '@/features/shop/catalog';

type RewardTab = 'all' | 'digital' | 'real';

export default function ShopScreen() {
  const [tab, setTab] = useState<RewardTab>('all');
  const items = useMemo(() => SHOP_ITEMS.filter((item) => tab === 'all' || (tab === 'digital' ? item.kind === 'digital' : item.kind === 'real')), [tab]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Pressable accessibilityRole="button" onPress={() => router.back()}><Text style={styles.back}>‹ Volver</Text></Pressable>
      <Text style={styles.eyebrow}>PING REWARDS</Text>
      <Text style={styles.title}>Tus puntos, experiencias reales.</Text>
      <Text style={styles.subtitle}>Personaliza tu perfil o guarda puntos para algo rico, un detalle geek o tu próxima salida.</Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Un mismo sistema, dos formas de disfrutarlo</Text>
        <Text style={styles.infoCopy}>Las recompensas digitales se disfrutan en tu perfil. Las físicas se canjean con un cupón en comercios aliados cuando estén disponibles.</Text>
      </View>

      <View style={styles.tabs}>
        {([{ key: 'all', label: 'Todo' }, { key: 'digital', label: 'Digitales' }, { key: 'real', label: 'En el mundo real' }] as const).map((option) => (
          <Pressable key={option.key} accessibilityRole="button" accessibilityState={{ selected: tab === option.key }} onPress={() => setTab(option.key)} style={[styles.tab, tab === option.key && styles.activeTab]}>
            <Text style={[styles.tabText, tab === option.key && styles.activeTabText]}>{option.label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.grid}>
        {items.map((item) => {
          const physical = item.kind === 'real';
          const ready = item.availability === 'digital';
          return (
            <View key={item.id} style={styles.item}>
              <View style={[styles.symbol, physical && styles.realSymbol]}><Text style={styles.symbolText}>{item.symbol}</Text></View>
              <View style={styles.itemBody}>
                <View style={styles.badges}>
                  <Text style={styles.category}>{physical ? 'RECOMPENSA FÍSICA' : 'PARA TU PERFIL'}</Text>
                  {physical && <View style={styles.partnerBadge}><Text style={styles.partnerText}>COMERCIO ALIADO</Text></View>}
                </View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.price}>{item.price.toLocaleString('es-CO')} puntos</Text>
                <View style={[styles.action, !ready && styles.actionDisabled]}>
                  <Text style={[styles.actionText, !ready && styles.actionDisabledText]}>{ready ? 'Disponible al conectar puntos' : 'Próximamente en comercios aliados'}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.noteCard}>
        <Text style={styles.noteTitle}>¿Cómo se canjea una recompensa física?</Text>
        <Text style={styles.noteCopy}>1. Elige una recompensa disponible.</Text>
        <Text style={styles.noteCopy}>2. Confirma el canje y recibe un cupón QR único.</Text>
        <Text style={styles.noteCopy}>3. Muéstralo en el comercio aliado para que validen la entrega.</Text>
        <Text style={styles.footnote}>Los puntos, los canjes y la emisión de cupones deben conectarse a tu cuenta y al sistema de validación antes de habilitar compras reales.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingTop: spacing.lg, paddingBottom: spacing.xxl, maxWidth: 820, width: '100%', alignSelf: 'center' },
  back: { color: '#D4B3E9', fontSize: 15, fontWeight: '800' },
  eyebrow: { color: colors.accent, fontSize: 11, fontWeight: '900', letterSpacing: 2, marginTop: spacing.xl },
  title: { color: colors.text, fontSize: 30, lineHeight: 36, fontWeight: '900', marginTop: spacing.sm, letterSpacing: -0.6 },
  subtitle: { color: colors.textMuted, fontSize: 14, lineHeight: 21, marginTop: spacing.sm, marginBottom: spacing.lg },
  infoCard: { backgroundColor: '#21182A', borderRadius: radius.lg, borderWidth: 1, borderColor: '#493457', padding: spacing.md, marginBottom: spacing.lg },
  infoTitle: { color: colors.text, fontSize: 15, fontWeight: '900' },
  infoCopy: { color: '#D6CADC', fontSize: 12, lineHeight: 19, marginTop: 6 },
  tabs: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: spacing.md },
  tab: { borderRadius: radius.pill, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  activeTab: { backgroundColor: colors.accent, borderColor: colors.accent },
  tabText: { color: colors.textMuted, fontSize: 12, fontWeight: '800' },
  activeTabText: { color: '#24192A' },
  grid: { gap: spacing.md },
  item: { flexDirection: 'row', gap: spacing.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, borderRadius: radius.lg },
  symbol: { width: 58, height: 58, borderRadius: radius.md, backgroundColor: '#30203B', alignItems: 'center', justifyContent: 'center' },
  realSymbol: { backgroundColor: '#26362D' },
  symbolText: { color: colors.accent, fontSize: 27, fontWeight: '900' },
  itemBody: { flex: 1 },
  badges: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 7, marginBottom: 5 },
  category: { color: '#C7A2E5', fontSize: 9, fontWeight: '900', letterSpacing: 0.8 },
  partnerBadge: { backgroundColor: '#25362B', borderRadius: radius.pill, paddingHorizontal: 7, paddingVertical: 4 },
  partnerText: { color: '#BFE9C8', fontSize: 8, fontWeight: '900', letterSpacing: 0.5 },
  itemName: { color: colors.text, fontSize: 16, fontWeight: '900' },
  itemDescription: { color: colors.textMuted, fontSize: 12, lineHeight: 18, marginTop: 4 },
  price: { color: colors.accent, fontSize: 13, fontWeight: '900', marginTop: spacing.sm },
  action: { alignSelf: 'flex-start', borderRadius: radius.sm, paddingHorizontal: 11, paddingVertical: 9, marginTop: spacing.sm, backgroundColor: '#2D2540' },
  actionDisabled: { backgroundColor: '#242129' },
  actionText: { color: '#E5D0F5', fontSize: 11, fontWeight: '800' },
  actionDisabledText: { color: '#B7ADB9' },
  noteCard: { padding: spacing.md, backgroundColor: '#151319', borderWidth: 1, borderColor: '#302837', borderRadius: radius.lg, marginTop: spacing.lg, gap: 7 },
  noteTitle: { color: colors.text, fontSize: 15, fontWeight: '900', marginBottom: 3 },
  noteCopy: { color: '#D7CFDB', fontSize: 12, lineHeight: 18 },
  footnote: { color: colors.textMuted, fontSize: 11, lineHeight: 17, marginTop: spacing.sm },
});
