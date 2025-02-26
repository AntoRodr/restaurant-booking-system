create table reservations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id) on delete cascade,
  table_id integer references tables(id) on delete set null,
  booking_time timestamptz not null,
  status text check (status in ('pending', 'confirmed', 'cancelled', 'completed')) not null default 'pending',
  created_at timestamptz default now()
);
