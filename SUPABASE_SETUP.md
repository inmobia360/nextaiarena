# Configuración de Supabase para NextAI Arena

## 1. Crear el proyecto

Crear un proyecto PostgreSQL en Supabase con región europea cuando sea posible. No compartir aquí contraseñas, claves privadas ni tokens de servicio.

## 2. Variables locales

Copiar `.env.example` como `.env.local` y completar:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<publishable-key>
DATABASE_URL=<pooled-postgresql-connection-string>
```

La clave publishable puede utilizarse en el navegador con RLS correctamente configurado. La clave service-role nunca debe exponerse al cliente ni guardarse en Git.

## 3. Aplicar el esquema

Desde el equipo local, con `DATABASE_URL` configurada:

```bash
pnpm db:migrate
```

Después ejecutar `drizzle/seed.sql` desde el SQL Editor de Supabase o mediante una herramienta de migración controlada. El seed es idempotente para categorías e integraciones.

## 4. RLS y autenticación

Antes de habilitar usuarios reales:

- Activar RLS en tablas públicas.
- Permitir lectura anónima únicamente de categorías y herramientas publicadas.
- Permitir a cada usuario gestionar solo sus guardados.
- Permitir insertar reseñas propias, siempre como `pending`.
- Reservar moderación, temporadas y edición para roles autorizados del servidor.
- Configurar autenticación SSR con cookies y flujo PKCE.

El repositorio ya incluye el proxy de renovación de sesión en `proxy.ts`. Si faltan las variables de Supabase, se desactiva de forma segura y la aplicación continúa funcionando en modo local.

## 5. Comprobación

```bash
pnpm db:check
pnpm lint
pnpm build
```

Después verificar:

- `GET /api/categories` devuelve las cinco categorías.
- `GET /api/tools` devuelve una lista paginada.
- Un usuario anónimo no puede editar el catálogo.
- Un usuario autenticado solo puede modificar sus propios datos.

## Decisión de seguridad

No se ejecutará la migración desde el repositorio contra una base remota hasta confirmar el proyecto, región, entorno y copia de seguridad adecuados.
