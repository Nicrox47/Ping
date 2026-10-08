# Diseño adaptable

Ping debe funcionar en celular, tablet y computador sin duplicar la aplicación.

## Criterios

- Mobile first.
- Contenido centrado con un ancho máximo en pantallas grandes.
- Componentes reutilizables.
- Formularios y tarjetas que puedan reorganizarse según el ancho.
- Navegación adecuada para pantallas táctiles y escritorio.
- Evitar tamaños fijos que provoquen desplazamiento horizontal.

## Breakpoints de referencia

- Mobile: menos de 768 px.
- Tablet: 768–1023 px.
- Desktop: 1024 px o más.

La utilidad `useResponsiveLayout` centraliza estas decisiones para que las pantallas futuras no implementen breakpoints diferentes entre sí.
