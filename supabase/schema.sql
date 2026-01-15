-- Create the table for storing card readings
create table public.readings_history (
  id uuid not null default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  mode text,  -- 'Tarot' or 'Lenormand'
  user_query text,
  cards_drawn text[], -- Array of card IDs
  ai_analysis text,
  image_urls text[], -- Array of URLs
  timestamp timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table public.readings_history enable row level security;

-- Policy: Users can only see their own readings
create policy "Users can view their own readings"
on public.readings_history
for select
using (auth.uid() = user_id);

-- Policy: Users can only insert their own readings
create policy "Users can insert their own readings"
on public.readings_history
for insert
with check (auth.uid() = user_id);
