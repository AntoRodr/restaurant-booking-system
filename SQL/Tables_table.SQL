create table tables (
  id serial primary key,
  floor integer not null,
  capacity integer not null,
  status text check (status in ('available', 'occupied', 'reserved')) not null default 'available'
);
