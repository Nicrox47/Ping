import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors, radius, spacing } from '@/constants/theme';
import { SHOP_ITEMS } from '@/features/shop/catalog';

export default function ShopScreen() {
  const [points, setPoints] = useState(250);
  const [owned, setOwned] = useState<string[]>([]);

  function buyItem(itemId: string, name: string, price: number) {
    if (owned.includes(itemId)) {
      Alert.alert('Ya lo tienes', 'Este artículo ya está en tu colección.');
      return;
    }
    if (points < price) {
      Alert.alert('Te faltan puntos', `Necesitas ${price - points} puntos más para comprarlo.`);
      return;
    }
    setPoints((current) => current - price);
    setOwned((current) => [...current, itemId]);
    Alert.alert('¡Artículo desbloqueado!', `${name} se añadió a tu colección de demostración.`);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable onPress={() => router.back()}><Text style={styles.back}>‹ Volver</Text></Pressable>
      <Text style={styles.eyebrow}>PING STORE</Text>
      <Text style={styles.title}>Tu estilo, tus puntos.</Text>
      <Text style={styles.subtitle}>Canjea puntos ganados en los encuentros por artículos cosméticos para personalizar tu perfil.</Text>
      <View style={styles.wallet}>
        <Text style={styles.walletLabel}>SALDO DE DEMOSTRACIÓN</Text>
        <Text style={styles.balance}>{points} pts</Text>
      </View>
      {SHOP_ITEMS.map((item) => {
        const isOwned = owned.includes(item.id);
        return (
          <View key={item.id} style={styles.item}>
            <View style={styles.symbol}><Text style={styles.symbolText}>{item.symbol}</Text></View>
            <View style={styles.itemBody}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.price}>{item.price} puntos</Text>
              <Pressable style={[styles.buyButton, isOwned && styles.ownedButton, points < item.price && !isOwned && styles.disabled]} disabled={isOwned || points < item.price} onPress={() => buyItem(item.id, item.name, item.price)}>
                <Text style={[styles.buyText, isOwned && styles.ownedText]}>{isOwned ? 'Desbloqueado' : 'Canjear artículo'}</Text>
              </Pressable>
            </View>
          </View>
        );
      })}
      <Text style={styles.footnote}>Prototipo local: saldo y compras no se guardan ni se sincronizan entre dispositivos todavía.</Text>
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
  wallet: { backgroundColor: colors.primary, borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.lg },
  walletLabel: { color: colors.text, fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  balance: { color: colors.accent, fontSize: 34, fontWeight: '900', marginTop: spacing.xs },
  item: { flexDirection: 'row', gap: spacing.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, borderRadius: radius.lg, marginBottom: spacing.md },
  symbol: { width: 58, height: 58, borderRadius: radius.md, backgroundColor: colors.surfaceElevated, alignItems: 'center', justifyContent: 'center' },
  symbolText: { color: colors.accent, fontSize: 28, fontWeight: '900' },
  itemBody: { flex: 1 },
  itemName: { color: colors.text, fontSize: 17, fontWeight: '800' },
  itemDescription: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginTop: 4 },
  price: { color: colors.accent, fontSize: 13, fontWeight: '900', marginTop: spacing.sm },
  buyButton: { minHeight: 42, borderRadius: radius.sm, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.md, marginTop: spacing.sm, alignSelf: 'flex-start' },
  buyText: { color: colors.background, fontWeight: '900' },
  ownedButton: { backgroundColor: colors.surfaceElevated },
  ownedText: { color: colors.success },
  disabled: { opacity: 0.4 },
  footnote: { color: colors.textMuted, fontSize: 12, lineHeight: 18, marginTop: spacing.md },
});
