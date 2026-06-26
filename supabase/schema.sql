-- Syntagma Visual · esquema inicial de Supabase
-- Ejecutar en Supabase SQL Editor.

create table if not exists public.analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Análisis sin título',
  sentence text not null default '',
  level text not null default 'eso' check (level in ('primaria', 'eso', 'bachillerato')),
  mode text not null default 'arbol' check (mode in ('arbol', 'cajitas')),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.analyses enable row level security;

create policy "Cada usuario puede leer sus análisis"
on public.analyses
for select
to authenticated
using (auth.uid() = user_id);

create policy "Cada usuario puede crear sus análisis"
on public.analyses
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Cada usuario puede actualizar sus análisis"
on public.analyses
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Cada usuario puede borrar sus análisis"
on public.analyses
for delete
to authenticated
using (auth.uid() = user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_analyses_updated_at on public.analyses;

create trigger set_analyses_updated_at
before update on public.analyses
for each row
execute function public.set_updated_at();
