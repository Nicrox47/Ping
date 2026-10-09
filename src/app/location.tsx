import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import type { LocationSubscription } from 'expo-location';
import { router } from 'expo-router';
import MapPreview from '@/features/location/MapPreview';
import { distanceInMeters, formatDistance } from '@/features/location/distance';
import { colors, radius, spacing } from '@/constants/theme';

const DEMO_EVENT = {
  name: 'Evento de prueba',
  address: 'Cúcuta, Norte de Santander',
  latitude: 7.8891,
  longitude: -72.4967,
};

type Coordinates = { latitude: number; longitude: number };

export default function LocationScreen() {
  const [position, setPosition] = useState<Coordinates | null>(null);
  const [permissionMessage, setPermissionMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [tracking, setTracking] = useState(false);
  const subscription = useRef<LocationSubscription | null>(null);

  const stopTracking = async () => {
    subscription.current?.remove();
    subscription.current = null;
    setTracking(false);
  };

  const startTracking = async () => {
    setLoading(true);
    setPermissionMessage('');
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) {
        setPermissionMessage('Necesitamos permiso de ubicación mientras usas Ping para mostrar tu posición en el mapa.');
        setLoading(false);
        return;
      }

      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setPosition({
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      });

      if (subscription.current) subscription.current.remove();
      subscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          distanceInterval: 10,
          timeInterval: 3000,
        },
        (update) => setPosition({
          latitude: update.coords.latitude,
          longitude: update.coords.longitude,
        }),
      );
      setTracking(true);
    } catch {
      setPermissionMessage(
        Platform.OS === 'web'
          ? 'No pudimos obtener tu ubicación. Comprueba los permisos del navegador y que estés usando localhost o HTTPS.'
          : 'No pudimos obtener tu ubicación. Comprueba que el GPS esté activado y vuelve a intentarlo.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => () => { subscription.current?.remove(); }, []);

  const distance = position
    ? distanceInMeters(position.latitude, position.longitude, DEMO_EVENT.latitude, DEMO_EVENT.longitude)
    : null;

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>PING · UBICACIÓN</Text>
      <Text style={styles.title}>Tu ubicación en tiempo real</Text>
      <Text style={styles.subtitle}>
        Muestra tu posición actual y la distancia aproximada al evento de demostración. Ping solo solicita ubicación mientras usas esta pantalla.
      </Text>

      <View style={styles.eventCard}>
        <Text style={styles.eventLabel}>EVENTO DE DEMOSTRACIÓN</Text>
        <Text style={styles.eventName}>{DEMO_EVENT.name}</Text>
        <Text style={styles.eventAddress}>📍 {DEMO_EVENT.address}</Text>
      </View>

      <MapPreview
        latitude={DEMO_EVENT.latitude}
        longitude={DEMO_EVENT.longitude}
        userLatitude={position?.latitude}
        userLongitude={position?.longitude}
      />

      <View style={styles.statusCard}>
        <View style={[styles.statusDot, tracking && styles.statusDotActive]} />
        <View style={styles.statusText}>
          <Text style={styles.statusTitle}>{tracking ? 'GPS activo' : position ? 'Ubicación obtenida' : 'Ubicación desactivada'}</Text>
          <Text style={styles.statusDescription}>
            {distance !== null
              ? `Distancia aproximada al evento: ${formatDistance(distance)}`
              : 'Activa la ubicación para mostrar tu posición y calcular la distancia.'}
          </Text>
          {position && (
            <Text style={styles.coordinates}>
              {position.latitude.toFixed(5)}, {position.longitude.toFixed(5)}
            </Text>
          )}
        </View>
      </View>

      {permissionMessage ? <Text accessibilityRole="alert" style={styles.warning}>{permissionMessage}</Text> : null}

      <Pressable
        accessibilityRole="button"
        onPress={tracking ? stopTracking : startTracking}
        disabled={loading}
        style={[styles.button, loading && styles.buttonDisabled]}
      >
        {loading ? <ActivityIndicator color={colors.background} /> : (
          <Text style={styles.buttonText}>{tracking ? 'Detener seguimiento' : position ? 'Actualizar ubicación en vivo' : 'Permitir y obtener ubicación'}</Text>
        )}
      </Pressable>
      <Text style={styles.privacy}>
        Privacidad: la ubicación se usa en esta pantalla y no se envía a otros usuarios ni se guarda en un servidor.
      </Text>
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>Volver</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', alignSelf: 'center', maxWidth: 1100, backgroundColor: colors.background, padding: spacing.lg, paddingTop: spacing.xl, gap: spacing.md },
  eyebrow: { color: colors.accent, fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  title: { color: colors.text, fontSize: 30, lineHeight: 37, fontWeight: '900' },
  subtitle: { color: colors.textMuted, fontSize: 14, lineHeight: 21, maxWidth: 760 },
  eventCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, gap: 5 },
  eventLabel: { color: colors.primaryLight, fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  eventName: { color: colors.text, fontSize: 19, fontWeight: '800' },
  eventAddress: { color: colors.textMuted, fontSize: 13 },
  statusCard: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md },
  statusDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.textMuted, marginTop: 5 },
  statusDotActive: { backgroundColor: colors.success },
  statusText: { flex: 1, gap: 4 },
  statusTitle: { color: colors.text, fontSize: 15, fontWeight: '800' },
  statusDescription: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  coordinates: { color: colors.accent, fontSize: 12, marginTop: 4 },
  warning: { color: colors.danger, fontSize: 13, lineHeight: 19 },
  button: { minHeight: 52, paddingHorizontal: spacing.md, borderRadius: radius.md, backgroundColor: colors.accent, justifyContent: 'center', alignItems: 'center' },
  buttonDisabled: { opacity: 0.65 },
  buttonText: { color: colors.background, fontWeight: '900', fontSize: 14, textAlign: 'center' },
  privacy: { color: colors.textMuted, fontSize: 12, lineHeight: 18 },
  back: { alignSelf: 'flex-start', paddingVertical: spacing.sm },
  backText: { color: colors.primaryLight, fontWeight: '800' },
});
