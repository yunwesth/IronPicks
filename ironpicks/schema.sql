-- IronPicks Supabase Schema
-- Run this in your Supabase SQL editor to set up the database

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- USERS (extends Supabase auth.users)
-- ============================================================
create table public.profiles (
  id            uuid references auth.users(id) on delete cascade primary key,
  username      text unique not null,
  display_name  text,
  avatar_url    text,
  created_at    timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by all authenticated users"
  on public.profiles for select
  using (auth.role() = 'authenticated');

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- ============================================================
-- WALLETS (BB balance per user)
-- ============================================================
create table public.wallets (
  id          uuid default uuid_generate_v4() primary key,
  user_id     uuid references public.profiles(id) on delete cascade unique not null,
  balance     integer default 0 not null check (balance >= 0),
  updated_at  timestamptz default now() not null
);

alter table public.wallets enable row level security;

create policy "Users can view their own wallet"
  on public.wallets for select
  using (auth.uid() = user_id);

create policy "Edge functions can update wallets"
  on public.wallets for update
  using (auth.role() = 'service_role');

-- ============================================================
-- PICKS (user predictions per at-bat/moment)
-- ============================================================
create table public.picks (
  id            uuid default uuid_generate_v4() primary key,
  user_id       uuid references public.profiles(id) on delete cascade not null,
  question_id   text not null,             -- identifier for the pick question
  question_text text not null,
  selected      text not null,             -- e.g. 'scores' | 'holds'
  wager_bb      integer not null check (wager_bb >= 10),
  multiplier    numeric(4,2) default 1.0,
  result        text check (result in ('correct', 'incorrect', 'void')),
  payout_bb     integer,                   -- null until resolved
  game_id       text,                      -- MLB statsapi game pk
  created_at    timestamptz default now() not null,
  resolved_at   timestamptz
);

alter table public.picks enable row level security;

create policy "Users can view their own picks"
  on public.picks for select
  using (auth.uid() = user_id);

create policy "Users can create their own picks"
  on public.picks for insert
  with check (auth.uid() = user_id);

create index picks_user_id_idx on public.picks(user_id);
create index picks_question_id_idx on public.picks(question_id);
create index picks_game_id_idx on public.picks(game_id);

-- ============================================================
-- STREAKS (current correct-in-a-row per user)
-- ============================================================
create table public.streaks (
  id              uuid default uuid_generate_v4() primary key,
  user_id         uuid references public.profiles(id) on delete cascade unique not null,
  current_streak  integer default 0 not null,
  best_streak     integer default 0 not null,
  updated_at      timestamptz default now() not null
);

alter table public.streaks enable row level security;

create policy "Users can view their own streak"
  on public.streaks for select
  using (auth.uid() = user_id);

create policy "Edge functions can update streaks"
  on public.streaks for update
  using (auth.role() = 'service_role');

-- ============================================================
-- REDEMPTIONS (BB spent on rewards)
-- ============================================================
create table public.redemptions (
  id            uuid default uuid_generate_v4() primary key,
  user_id       uuid references public.profiles(id) on delete cascade not null,
  tier_id       text not null,             -- e.g. 't1', 't2', 't3'
  reward_label  text not null,             -- e.g. '$1 off any food item'
  cost_bb       integer not null,
  redeemed_at   timestamptz default now() not null,
  voided_at     timestamptz               -- set if staff voids the redemption
);

alter table public.redemptions enable row level security;

create policy "Users can view their own redemptions"
  on public.redemptions for select
  using (auth.uid() = user_id);

create policy "Users can create redemptions"
  on public.redemptions for insert
  with check (auth.uid() = user_id);

create index redemptions_user_id_idx on public.redemptions(user_id);

-- ============================================================
-- LEADERBOARD VIEW (season BB totals)
-- ============================================================
create view public.leaderboard as
  select
    p.id,
    p.username,
    p.display_name,
    coalesce(w.balance, 0) as bb_balance,
    coalesce(s.current_streak, 0) as current_streak,
    coalesce(s.best_streak, 0) as best_streak,
    rank() over (order by coalesce(w.balance, 0) desc) as rank
  from public.profiles p
  left join public.wallets w on w.user_id = p.id
  left join public.streaks s on s.user_id = p.id;

-- ============================================================
-- EDGE FUNCTION: resolve_pick (called by Supabase Edge Function)
-- Signature: resolve_pick(pick_id uuid, outcome text)
-- ============================================================
-- This logic is implemented in a Supabase Edge Function.
-- The function should:
-- 1. Look up the pick by ID
-- 2. Compare selected vs outcome
-- 3. If correct: credit wallet (wager * multiplier), increment streak
-- 4. If incorrect: debit wallet (wager), reset streak
-- 5. Update pick.result and pick.payout_bb
-- 6. Update streaks.current_streak and best_streak
-- 7. Update wallets.balance atomically

-- ============================================================
-- TRIGGER: auto-create wallet + streak on profile insert
-- ============================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.wallets(user_id, balance)
  values (new.id, 100); -- 100 BB welcome bonus

  insert into public.streaks(user_id)
  values (new.id);

  return new;
end;
$$;

create trigger on_profile_created
  after insert on public.profiles
  for each row execute procedure public.handle_new_user();
