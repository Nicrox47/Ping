# Mecánicas de juego de Ping

## Encontrar jugadores mediante pistas
- Al entrar a un evento, la experiencia asigna un jugador objetivo y presenta una pista inicial gratuita.
- El jugador puede intentar el encuentro con las pistas actuales o pagar puntos para desbloquear más.
- La recompensa por encuentro disminuye a medida que se desbloquean pistas adicionales.
- Valores iniciales de prototipo: 100 puntos base, -25 por pista extra y mínimo de 25 puntos.
- Costos de desbloqueo de ejemplo: 15, 25 y 40 puntos. El costo se descuenta aparte de la recompensa.
- En producción, el servidor debe validar la asignación del objetivo, las pistas desbloqueadas, los costos, la recompensa y evitar que un mismo encuentro se cobre dos veces.

## Perfil
- Nombre visible, descripción personal e intereses.
- La descripción es opcional y el usuario debe evitar compartir datos privados como dirección, teléfono o información sensible.
- Los cosméticos de tienda podrán mostrarse en el perfil cuando exista persistencia de cuenta.

## Tienda
- Los puntos se canjean por elementos cosméticos, como avatares, marcos, insignias y temas.
- No se venden ventajas para revelar datos privados ni se muestra la ubicación exacta de otro asistente.
- El catálogo y saldo actuales son de demostración y viven en estado local; todavía no hay backend ni persistencia.

## Próximos pasos antes de producción
1. Diseñar tablas para perfil, saldo, inventario, eventos, objetivos y pistas.
2. Crear API transaccional para descontar puntos y conceder recompensas.
3. Implementar asignación de objetivos y confirmación segura del encuentro.
4. Guardar perfil y compras, y añadir pruebas de reglas de economía.
