# Arquitectura de Ping

## Estilo arquitectónico

Ping utilizará un monolito modular. La aplicación se desplegará como una sola aplicación, pero su código se dividirá por dominios funcionales.

## Módulos

- Autenticación y usuarios
- Intereses
- Eventos y check-in
- Matching
- Pistas y encuentro
- Puntos y ranking
- Seguridad y reportes
- Administración

## Principios

1. Alta cohesión dentro de cada módulo.
2. Bajo acoplamiento entre módulos.
3. Componentes reutilizables para la interfaz.
4. Servicios separados de las pantallas.
5. Tipos compartidos para evitar datos inconsistentes.
6. Validación antes de integrar cambios a develop.
7. main se reserva para versiones estables de entrega.

## Flujo de ramas

- main: versión estable.
- develop: integración del desarrollo.
- feat/*: funcionalidad específica.
- fix/*: corrección de errores.
- docs/*: documentación.

## Objetivo del MVP

Construir un flujo completo: usuario → evento → intereses → matching → pistas → encuentro → puntos → ranking.
