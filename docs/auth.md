# Módulo de autenticación

## Alcance

El primer incremento de autenticación prepara las pantallas y validaciones de:

- Inicio de sesión.
- Registro.
- Nombre de usuario.
- Correo electrónico.
- Contraseña.

## Validaciones actuales

- Nombre: mínimo 2 caracteres.
- Correo: formato válido.
- Contraseña: mínimo 8 caracteres.

## Próximo incremento

Las pantallas están preparadas para conectarse al servicio de autenticación y persistir la sesión. Este commit no simula una autenticación real: el acceso a Home es únicamente de demostración hasta integrar el backend.
