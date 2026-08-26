-- Publicación editorial controlada del primer lote del MVP.
--
-- Solo incluye herramientas cuya URL oficial ha respondido correctamente
-- durante la revisión inicial. Los datos de precio, prestaciones y límites
-- deben verificarse en una revisión posterior antes de mostrarlos.
update public.tools
set status = 'published',
    editorial_status = 'reviewed',
    last_verified_at = now(),
    updated_at = now()
where slug in ('notion-ai', 'n8n', 'zapier', 'cursor', 'runway')
  and status <> 'archived';

-- Las candidatas restantes siguen ocultas hasta completar su revisión.
update public.tools
set status = 'draft',
    editorial_status = 'pending_review',
    updated_at = now()
where slug in ('claude', 'chatgpt', 'canva', 'midjourney', 'make')
  and status <> 'archived';
