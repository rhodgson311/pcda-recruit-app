create extension if not exists pgcrypto;

create table if not exists coaches (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  school_name text,
  division text check (division in ('D1','D2','D3','NAIA','JUCO')),
  sport text,
  access_level text default 'active',
  created_at timestamptz default now()
);

create table if not exists players (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  grad_year int,
  position text,
  gpa numeric(3,2),
  primary_highlight_url text,
  resume_url text,
  contact_email text,
  club_team text,
  coach_contact text,
  tags text,
  visibility text default 'registered',
  source text default 'PCDA',
  verified boolean default true
);

create table if not exists updates (
  id uuid primary key default gen_random_uuid(),
  month date not null,
  title text,
  summary_md text,
  status text default 'draft'
);

create table if not exists update_items (
  id uuid primary key default gen_random_uuid(),
  update_id uuid references updates(id) on delete cascade,
  player_id uuid references players(id) on delete cascade,
  blurb_md text,
  media_links text[],
  metrics_json jsonb
);

alter table players enable row level security;
alter table updates enable row level security;
alter table update_items enable row level security;

create policy if not exists read_registered_players
on players for select to authenticated using (visibility in ('public','registered'));

create policy if not exists read_published_updates
on updates for select to authenticated using (status = 'published');

create policy if not exists read_update_items
on update_items for select to authenticated using (true);
