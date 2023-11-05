-- *** Table definitions ***

create table if not exists public.event_surveys (
    id uuid not null primary key default uuid_generate_v4(),
    receipt_id varchar(40) not null unique,
    role varchar(20) not null,
    full_name varchar(100) not null,
    email varchar(100) not null,
    survey1 varchar(200) not null,
    survey2 varchar(200) not null,
    survey3 varchar(200) not null,
    survey4 varchar(200) not null,
    survey5 varchar(200) not null,
    survey6 varchar(200) not null,
    visited_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
    updated_at timestamp with time zone default timezone('utc' :: text, now()) not null
);
comment on table public.event_surveys is 'Holds all of event surveys information';
