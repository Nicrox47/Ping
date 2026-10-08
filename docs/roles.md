# Roles de cuenta en Ping

Ping tendrá tres roles claramente separados.

## 1. Usuario final (customer)

Es la cuenta que busca y participa en eventos.

Funciones principales:
- Crear y administrar su perfil.
- Seleccionar intereses.
- Buscar y descubrir eventos.
- Consultar información y ubicación del evento.
- Unirse y hacer check-in.
- Recibir coincidencias y pistas.
- Confirmar encuentros.
- Obtener puntos y consultar rankings.
- Reportar o bloquear usuarios.

## 2. Organizador (organizer)

Es la cuenta responsable de crear y gestionar eventos.

Funciones principales:
- Crear, editar, publicar y cancelar eventos.
- Definir nombre, descripción, fechas, capacidad y portada.
- Definir lugar mediante dirección y mapa.
- Consultar asistentes y check-ins.
- Promocionar eventos dentro de Ping.
- Consultar métricas del evento.
- Gestionar el estado del evento.

La promoción deberá contemplar, como mínimo, un estado de promoción y posteriormente podrá ampliarse con campañas, fechas, presupuesto y métricas.

## 3. Administrador (admin)

Es un rol de plataforma y no debe estar disponible como registro público normal.

Funciones previstas:
- Gestionar usuarios y roles.
- Gestionar organizadores y eventos.
- Aprobar o rechazar eventos cuando la configuración lo requiera.
- Revisar reportes y acciones de moderación.
- Consultar estadísticas generales.
- Gestionar configuraciones de la plataforma.
- Revisar actividad y auditoría.
- Activar/desactivar funcionalidades según configuración.

## Seguridad de roles

El rol no debe confiarse únicamente a la interfaz. Cuando exista backend, cada operación deberá validarse también en el servidor mediante permisos.

## Navegación por rol

- customer → experiencia de eventos, matching, pistas, encuentros y puntos.
- organizer → panel de eventos, creación, ubicación, promoción y métricas.
- admin → panel de administración, estadísticas, moderación y configuración.
