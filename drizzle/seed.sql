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

-- Candidatas iniciales. Permanecen en draft hasta completar revisión editorial.
insert into public.tools (slug, name, vendor_name, description, official_url, primary_category_id, audiences, difficulty, languages, status, editorial_status)
select seed.slug, seed.name, seed.vendor_name, seed.description, seed.official_url,
  (select id from public.categories where slug = seed.category_slug), seed.audiences::audience_segment[], seed.difficulty, seed.languages, 'draft', 'pending_review'
from (values
  ('notion-ai', 'Notion AI', 'Notion', 'Asistente para trabajar con documentos, notas y conocimiento de equipo.', 'https://www.notion.so/product/ai', 'productividad-conocimiento', '{b2b,b2c}', 'media', '{es,en}'),
  ('claude', 'Claude', 'Anthropic', 'Asistente conversacional para redactar, analizar e investigar.', 'https://claude.ai/', 'productividad-conocimiento', '{b2b,b2c}', 'baja', '{es,en}'),
  ('chatgpt', 'ChatGPT', 'OpenAI', 'Asistente conversacional para tareas de escritura, análisis y aprendizaje.', 'https://chatgpt.com/', 'productividad-conocimiento', '{b2b,b2c}', 'baja', '{es,en}'),
  ('canva', 'Canva', 'Canva', 'Herramienta visual para crear piezas de contenido y presentaciones.', 'https://www.canva.com/', 'contenido-marketing-creatividad', '{b2b,b2c}', 'baja', '{es,en}'),
  ('midjourney', 'Midjourney', 'Midjourney', 'Herramienta de generación de imágenes a partir de instrucciones.', 'https://www.midjourney.com/', 'contenido-marketing-creatividad', '{b2b,b2c}', 'media', '{en}'),
  ('runway', 'Runway', 'Runway', 'Herramienta creativa para generación y edición de vídeo.', 'https://runwayml.com/', 'contenido-marketing-creatividad', '{b2b,b2c}', 'media', '{en}'),
  ('make', 'Make', 'Make', 'Plataforma visual para conectar aplicaciones y automatizar procesos.', 'https://www.make.com/', 'automatizacion-agentes-integraciones', '{b2b}', 'media', '{es,en}'),
  ('n8n', 'n8n', 'n8n', 'Automatización de workflows con integraciones y control técnico.', 'https://n8n.io/', 'automatizacion-agentes-integraciones', '{b2b}', 'alta', '{en}'),
  ('zapier', 'Zapier', 'Zapier', 'Automatización de tareas entre aplicaciones y servicios online.', 'https://zapier.com/', 'automatizacion-agentes-integraciones', '{b2b,b2c}', 'baja', '{es,en}'),
  ('cursor', 'Cursor', 'Anysphere', 'Editor de código con funciones de asistencia para desarrollar software.', 'https://www.cursor.com/', 'desarrollo-datos-tecnologia', '{b2b,b2c}', 'media', '{en}')
) as seed(slug, name, vendor_name, description, official_url, category_slug, audiences, difficulty, languages)
on conflict (slug) do update set
  name = excluded.name,
  vendor_name = excluded.vendor_name,
  description = excluded.description,
  official_url = excluded.official_url,
  primary_category_id = excluded.primary_category_id,
  audiences = excluded.audiences,
  difficulty = excluded.difficulty,
  languages = excluded.languages,
  status = 'draft',
  editorial_status = 'pending_review';
