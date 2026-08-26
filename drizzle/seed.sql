-- Datos iniciales reproducibles del MVP.
-- Ejecutar después de aplicar la migración 0000 en el proyecto Supabase.

insert into public.categories (slug, name, description, display_order, active)
values
  ('productividad-conocimiento', 'Productividad y conocimiento', 'Documentos, investigación, reuniones, notas y escritura.', 1, true),
  ('contenido-marketing-creatividad', 'Contenido, marketing y creatividad', 'Texto, imagen, vídeo, audio y diseño.', 2, true),
  ('automatizacion-agentes-integraciones', 'Automatización, agentes e integraciones', 'Workflows, agentes y conexiones entre herramientas.', 3, true),
  ('ventas-atencion-operaciones', 'Ventas, atención al cliente y operaciones', 'Captación, soporte, seguimiento y procesos comerciales.', 4, true),
  ('desarrollo-datos-tecnologia', 'Desarrollo, datos y tecnología', 'Código, análisis, bases de datos y APIs.', 5, true)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  display_order = excluded.display_order,
  active = excluded.active;

insert into public.integrations (slug, name)
values
  ('make', 'Make'),
  ('n8n', 'n8n'),
  ('zapier', 'Zapier'),
  ('whatsapp', 'WhatsApp'),
  ('api', 'API')
on conflict (slug) do update set name = excluded.name;
