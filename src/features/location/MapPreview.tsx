import MapView, { Marker } from 'react-native-maps';
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
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
        }}
        region={{
          latitude: userLatitude ?? latitude,
          longitude: userLongitude ?? longitude,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
        }}
        showsUserLocation
        showsMyLocationButton
      >
        <Marker coordinate={{ latitude, longitude }} title="Evento Ping" description="Ubicación del evento" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 300, overflow: 'hidden', borderRadius: 16 },
  map: { flex: 1 },
});
