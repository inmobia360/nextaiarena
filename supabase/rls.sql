-- Políticas iniciales del MVP. Ejecutar después de la migración en Supabase.
-- El acceso público solo expone contenido publicado y activo.

alter table public.categories enable row level security;
alter table public.tools enable row level security;
alter table public.tool_plans enable row level security;
alter table public.integrations enable row level security;
alter table public.tool_integrations enable row level security;
alter table public.seasons enable row level security;
alter table public.season_entries enable row level security;
alter table public.users enable row level security;
alter table public.reviews enable row level security;
alter table public.votes enable row level security;
alter table public.saved_tools enable row level security;

create policy "public read active categories" on public.categories for select using (active = true);
create policy "public read published tools" on public.tools for select using (status = 'published');
create policy "public read plans of published tools" on public.tool_plans for select using (exists (select 1 from public.tools where tools.id = tool_plans.tool_id and tools.status = 'published'));
create policy "public read integrations" on public.integrations for select using (true);
create policy "public read integrations of published tools" on public.tool_integrations for select using (exists (select 1 from public.tools where tools.id = tool_integrations.tool_id and tools.status = 'published'));
create policy "public read active seasons" on public.seasons for select using (status in ('scheduled', 'active', 'closed'));
create policy "public read entries of visible seasons" on public.season_entries for select using (exists (select 1 from public.seasons where seasons.id = season_entries.season_id and seasons.status in ('scheduled', 'active', 'closed')));
create policy "public read published reviews" on public.reviews for select using (status = 'published');

create policy "users read own profile" on public.users for select to authenticated using (id = auth.uid());
create policy "users update own profile" on public.users for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "users manage own saved tools" on public.saved_tools for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "users create own pending reviews" on public.reviews for insert to authenticated with check (user_id = auth.uid() and status = 'pending');
create policy "users create own votes" on public.votes for insert to authenticated with check (user_id = auth.uid() and status = 'valid');
