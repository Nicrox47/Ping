import { createElement } from 'react';
import { StyleSheet, View } from 'react-native';

type MapPreviewProps = {
  latitude: number;
  longitude: number;
  userLatitude?: number;
  userLongitude?: number;
};

export default function MapPreview({
  latitude,
  longitude,
  userLatitude,
  userLongitude,
}: MapPreviewProps) {
  const centerLatitude = userLatitude ?? latitude;
  const centerLongitude = userLongitude ?? longitude;
  const delta = 0.025;
  const bbox = [
    centerLongitude - delta,
    centerLatitude - delta,
    centerLongitude + delta,
    centerLatitude + delta,
  ].join('%2C');
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${centerLatitude}%2C${centerLongitude}`;

  return (
    <View style={styles.container}>
      {createElement('iframe' as never, {
        title: 'Mapa de ubicación de Ping',
        src,
        loading: 'lazy',
        referrerPolicy: 'no-referrer-when-downgrade',
        style: {
          width: '100%',
          height: '100%',
          border: 0,
          display: 'block',
        },
      } as never)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 300, overflow: 'hidden', borderRadius: 16, backgroundColor: '#191919' },
});
