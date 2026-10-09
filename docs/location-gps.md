# Ubicación y mapa en Ping

## Primera implementación

- Usa Expo Location para solicitar permiso de ubicación en primer plano.
- Obtiene la posición actual del dispositivo y escucha actualizaciones mientras la pantalla de ubicación está abierta.
- Muestra un mapa OpenStreetMap en web y un mapa nativo en iOS/Android.
- Calcula localmente la distancia aproximada a un evento de demostración.
- El seguimiento se detiene al salir de la pantalla o al pulsar el botón para detenerlo.
- Esta versión no envía coordenadas a un servidor ni comparte la ubicación con otros usuarios.

## Permisos y privacidad

La ubicación requiere permiso explícito. En web, la geolocalización requiere un contexto seguro (localhost o HTTPS) y permiso del navegador. En el dispositivo, el usuario debe aceptar el permiso del sistema y tener los servicios de ubicación activos.

## Pendiente antes de producción

- Sustituir las coordenadas de demostración por la ubicación guardada en cada evento.
- Configurar claves/proveedor de mapas si se decide cambiar de proveedor.
- Implementar autorización en el backend para cualquier operación de check-in.
- No usar GPS como única prueba antifraude: la ubicación del dispositivo puede ser inexacta o manipulada.
- No implementar seguimiento en segundo plano en el MVP.
