# Ping

## Encuentros por interés en común

Aplicación móvil gamificada para facilitar encuentros entre personas que comparten intereses dentro de un mismo evento.

### Equipo
- Julián Caicedo
- Samuel Esteban Riveros (@samuel34c)

### Objetivo
Ping permite que los asistentes a un evento se conecten mediante intereses en común y reciban pistas progresivas para encontrarse físicamente, confirmar el encuentro y obtener puntos.

### MVP
- Registro e inicio de sesión
- Perfil e intereses
- Eventos y check-in
- Emparejamiento por intereses
- Sistema progresivo de pistas
- Verificación del encuentro
- Sistema de puntos
- Ranking
- Reporte y bloqueo básico

### Arquitectura
El proyecto seguirá una arquitectura de **monolito modular**, separando responsabilidades por módulos de dominio para mantener el código organizado y facilitar el trabajo paralelo del equipo.

### Flujo principal
1. El usuario crea su cuenta o inicia sesión.
2. Completa su perfil y selecciona intereses.
3. Se une a un evento.
4. Ping encuentra una coincidencia de intereses dentro del evento.
5. Los usuarios reciben pistas progresivas.
6. Los participantes se encuentran.
7. Ambos confirman el encuentro.
8. Se asignan puntos y se actualiza el ranking.

### Equipo de desarrollo
El repositorio se trabajará mediante ramas por funcionalidad y commits descriptivos. Las funcionalidades se integrarán a la rama principal mediante revisiones y pruebas antes de la entrega.

## Estado
Proyecto académico en desarrollo.
