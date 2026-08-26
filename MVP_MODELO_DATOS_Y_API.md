# NextAI Arena — modelo de datos y contratos iniciales

## Objetivo

Este documento define el contrato común entre la interfaz, el futuro backoffice, la base de datos y las integraciones del MVP. La implementación concreta del ORM y proveedor se decidirá antes de crear migraciones.

## Convenciones

- Todas las entidades usan un `id` estable tipo UUID.
- Fechas almacenadas en UTC; la interfaz adapta la zona horaria del usuario.
- Precios con `amount`, `currency` y `billing_period`; nunca se guarda un precio como texto libre.
- Los campos editables por proveedor conservan `source`, `verified_at` y `verification_status`.
- Los estados se modelan como enums, no como textos arbitrarios.
- Las eliminaciones de contenido relevante son lógicas para conservar trazabilidad.
- Las respuestas de API no exponen secretos, tokens ni datos privados innecesarios.

## Entidades del MVP

### `User`

`id`, `email`, `display_name`, `role`, `audience_segment`, `locale`, `country`, `status`, `created_at`, `updated_at`.

Roles iniciales: `user`, `brand`, `specialist`, `editor`, `admin`.

Segmentos: `b2b`, `b2c`, `both`, `unknown`.

### `Tool`

`id`, `slug`, `name`, `vendor_name`, `description`, `official_url`, `logo_url`, `primary_category_id`, `audiences`, `difficulty`, `languages`, `countries`, `status`, `editorial_status`, `last_verified_at`, `created_at`, `updated_at`.

Estados: `draft`, `pending_review`, `published`, `archived`.

### `Category`

`id`, `slug`, `name`, `description`, `display_order`, `status`.

Categorías iniciales: Productividad y conocimiento; Contenido, marketing y creatividad; Automatización, agentes e integraciones; Ventas, atención al cliente y operaciones; Desarrollo, datos y tecnología.

### `Tag` y `ToolTag`

Permiten relacionar herramientas con necesidades, sectores y tecnologías sin crear categorías principales innecesarias.

### `ToolPlan`

`id`, `tool_id`, `name`, `pricing_type`, `amount`, `currency`, `billing_period`, `has_free_trial`, `free_trial_days`, `limits_summary`, `source`, `verified_at`.

Tipos: `free`, `freemium`, `paid`, `custom`, `unknown`.

### `Integration`

`id`, `name`, `slug`, `type`; relación `ToolIntegration` con `tool_id`, `integration_id`, `source`, `verified_at`.

### `Review`

`id`, `tool_id`, `user_id`, `season_id`, `rating`, `text`, `status`, `moderation_reason`, `created_at`, `updated_at`.

Estados: `pending`, `published`, `rejected`, `invalidated`.

### `Vote`

`id`, `tool_id`, `season_id`, `user_id`, `status`, `risk_flags`, `invalidated_reason`, `created_at`.

Restricción obligatoria: combinación única `user_id + tool_id + season_id` para votos activos.

### `SavedTool`

`user_id`, `tool_id`, `created_at`; clave única compuesta para evitar duplicados.

### `Season` y `SeasonEntry`

`Season`: `id`, `slug`, `name`, `description`, `category_id`, `starts_at`, `ends_at`, `status`, `rules_version`, `created_at`.

`SeasonEntry`: `id`, `season_id`, `tool_id`, `entry_status`, `editorial_score`, `organic_score`, `final_rank`, `joined_at`.

Estados de temporada: `draft`, `scheduled`, `active`, `closed`, `archived`.

El patrocinio nunca se almacena como sustituto de `organic_score` o `final_rank`.

### `Specialist` y `Lead`

`Specialist`: `id`, `user_id`, `business_name`, `description`, `services`, `sectors`, `languages`, `location`, `status`, `verified_at`.

`Lead`: `id`, `source`, `user_id`, `tool_id`, `specialist_id`, `contact_email`, `message`, `status`, `assigned_to`, `created_at`, `updated_at`.

Estados de lead: `new`, `reviewing`, `assigned`, `contacted`, `qualified`, `closed`, `spam`.

### `SponsorPlacement` y `AffiliateLink`

`SponsorPlacement`: `id`, `season_id`, `tool_id`, `label`, `starts_at`, `ends_at`, `status`, `commercial_reference`.

`AffiliateLink`: `id`, `tool_id`, `network`, `destination_url`, `disclosure_label`, `status`.

Ambos deben poder identificarse en eventos y en la interfaz. Ninguno modifica el ranking orgánico.

### `Event` y `ModerationCase`

`Event`: `id`, `event_name`, `user_id`, `tool_id`, `category_id`, `audience_segment`, `session_id_hash`, `metadata_safe`, `created_at`.

`ModerationCase`: `id`, `entity_type`, `entity_id`, `reported_by`, `reason`, `status`, `resolution`, `resolved_by`, `created_at`, `resolved_at`.

No se almacenarán datos de dispositivo o IP sin una finalidad documentada, retención limitada y revisión de privacidad.

## Relaciones principales

```text
User ──< Review >── Tool ──> Category
User ──< Vote >──── Tool ──< SeasonEntry >── Season
User ──< SavedTool >── Tool
Tool ──< ToolPlan
Tool ──< ToolIntegration >── Integration
Specialist ──< Lead >── Tool
Tool ──< SponsorPlacement >── Season
Tool ──< AffiliateLink
```

## Contratos API iniciales

Las rutas son orientativas para App Router. Todas las entradas se validarán con esquemas compartidos y las respuestas usarán DTOs públicos.

### Público

- `GET /api/tools?query=&category=&audience=&price=&language=&difficulty=&integration=` — lista paginada y filtros aplicados.
- `GET /api/tools/:slug` — ficha pública, planes, integraciones, evidencia y acciones disponibles.
- `GET /api/categories` — categorías activas con conteo publicado.
- `GET /api/tools/compare?ids=` — comparación de 2 a 4 herramientas.
- `GET /api/seasons/current` — temporada activa y participantes.
- `POST /api/events` — eventos de analítica permitidos y anonimizados.

### Usuario autenticado

- `POST /api/auth/...` — gestionado por el proveedor elegido.
- `GET /api/me` — perfil mínimo y preferencias.
- `POST /api/tools/:id/save` y `DELETE /api/tools/:id/save` — guardar o quitar herramienta.
- `POST /api/seasons/:id/votes` — emitir voto con idempotencia.
- `POST /api/tools/:id/reviews` — crear reseña pendiente de moderación.
- `GET /api/me/saved` — herramientas guardadas.

### Marcas, especialistas y operación

- `POST /api/submissions/tools` — proponer o reclamar ficha.
- `POST /api/leads` — solicitar demo, implantación o ayuda.
- `POST /api/specialists/apply` — solicitar perfil de especialista.
- `GET /api/admin/tools?status=` — cola editorial.
- `PATCH /api/admin/tools/:id` — editar con registro de auditoría.
- `PATCH /api/admin/reviews/:id` — moderar reseña con motivo.
- `PATCH /api/admin/votes/:id` — invalidar voto con motivo.
- `POST /api/admin/seasons` — crear temporada.

Las rutas administrativas exigirán rol y registro de auditoría. No se permitirá confiar únicamente en ocultar botones en el frontend.

## Reglas críticas de negocio

1. Una herramienta tiene una categoría principal y puede tener etiquetas secundarias.
2. El ranking orgánico usa solo votos y señales válidas; nunca el importe pagado.
3. Todo patrocinio aparece etiquetado y separado del resultado orgánico.
4. Las reseñas no publicadas no cuentan para valoración.
5. Los votos invalidados permanecen registrados con motivo.
6. Una fecha de verificación caducada muestra el dato como pendiente de revisión.
7. Los campos desconocidos muestran “Sin información verificada”, nunca una suposición.
8. Las operaciones sensibles son idempotentes y registran actor, fecha y resultado.
9. Los leads solo son visibles para el usuario y el equipo autorizado.
10. La búsqueda no filtra datos privados ni información de moderación.

## Orden de implementación

1. Tipos y esquemas Zod compartidos.
2. Migraciones de `Category`, `Tool`, `Tag`, `ToolPlan` e `Integration`.
3. Lectura pública de catálogo y fichas.
4. Usuarios, guardados y preferencias.
5. Reseñas, votos y moderación.
6. Temporadas y ranking explicable.
7. Leads y especialistas.
8. Analítica y backoffice.

No se crearán migraciones ni endpoints reales hasta elegir proveedor de autenticación, PostgreSQL gestionado y ORM.
