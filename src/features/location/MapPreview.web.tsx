import { createElement } from 'react';
import { StyleSheet, View } from 'react-native';

type MapPreviewProps = { latitude: number; longitude: number; userLatitude?: number; userLongitude?: number };

export default function MapPreview({ latitude, longitude, userLatitude, userLongitude }: MapPreviewProps) {
  const userLat = userLatitude ?? null;
  const userLon = userLongitude ?? null;
  const centerLat = userLat ?? latitude;
  const centerLon = userLon ?? longitude;
  const userPoint = userLat === null || userLon === null ? 'null' : '[' + userLat + ',' + userLon + ']';
  const html = `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<style>html,body,#map{height:100%;width:100%;margin:0;background:#111}.leaflet-popup-content-wrapper{border-radius:8px}</style>
</head><body><div id="map"></div><script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script><script>
const eventPoint = [${latitude},${longitude}];
const userPoint = ${userPoint};
const map = L.map('map').setView([${centerLat},${centerLon}],15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap'}).addTo(map);
L.marker(eventPoint).addTo(map).bindPopup('Ubicación del evento');
if(userPoint){L.circleMarker(userPoint,{radius:8,color:'#8E24AA',fillColor:'#FFE51B',fillOpacity:1}).addTo(map).bindPopup('Tu ubicación actual');map.fitBounds(L.latLngBounds([eventPoint,userPoint]).pad(0.25),{maxZoom:16});}
</script></body></html>`;
  return <View style={styles.container}>{createElement('iframe' as never, { title: 'Mapa de ubicación de Ping', srcDoc: html, loading: 'lazy', allow: 'geolocation', style: { width: '100%', height: '100%', border: 0, display: 'block' } } as never)}</View>;
}

const styles = StyleSheet.create({ container: { height: 300, overflow: 'hidden', borderRadius: 16, backgroundColor: '#191919' } });