create table waitlist (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id) on delete cascade,
  booking_time timestamptz not null,
  status text check (status in ('waiting', 'notified', 'cancelled')) not null default 'waiting',
  created_at timestamptz default now()
);
