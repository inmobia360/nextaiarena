-- Publicación editorial controlada del primer lote del MVP.
--
-- Solo incluye herramientas cuya página oficial ha sido localizada y
-- comprobada durante la revisión inicial. Los datos de precio, prestaciones
-- y límites deben verificarse en una revisión posterior antes de mostrarlos.
update public.tools
set status = 'published',
    editorial_status = 'reviewed',
    last_verified_at = now(),
    updated_at = now()
where slug in ('notion-ai', 'claude', 'chatgpt', 'canva', 'midjourney',
               'runway', 'make', 'n8n', 'zapier', 'cursor')
  and status <> 'archived';
