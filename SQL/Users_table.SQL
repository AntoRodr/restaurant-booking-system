create table users (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  password_hash text not null,
  role text check (role in ('client', 'staff', 'manager')) not null
);
