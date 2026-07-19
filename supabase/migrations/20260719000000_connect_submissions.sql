-- Connect form submissions — idempotent create-or-upgrade.
--
-- Backs the /contact-us/ ("Connect") form on multiplyingdisciples.us.
-- Rows are written ONLY by the `submit-connect-form` Edge Function using
-- the service-role key (which bypasses RLS). The browser never talks to
-- this table directly. RLS is enabled with no policies (deny by default).
--
-- Safe to run whether the table is new, an older/partial version, or
-- already current. It never drops the table or existing data: it adds
-- any missing columns, backfills, then (re)creates constraints, indexes,
-- and RLS. Re-running it is a no-op.

-- 1. Ensure the table exists (minimal shell; columns added below).
create table if not exists public.connect_submissions (
  id uuid primary key default gen_random_uuid()
);

-- 2. Add every column if missing. Columns with a default are added
--    NOT NULL (the default fills existing rows). The four hard-required
--    columns are added nullable here and promoted to NOT NULL in step 4
--    once we've confirmed there are no null values.
alter table public.connect_submissions
  add column if not exists idempotency_key          text,
  add column if not exists first_name               text,
  add column if not exists email                    text,
  add column if not exists country                  text,
  add column if not exists postal_code              text,
  add column if not exists interests                text[] not null default '{}',
  add column if not exists other_interest           text,
  add column if not exists message                  text,
  add column if not exists status                   text not null default 'new',
  add column if not exists source_page              text,
  add column if not exists referrer                 text,
  add column if not exists utm_source               text,
  add column if not exists utm_medium               text,
  add column if not exists utm_campaign             text,
  add column if not exists ip_hash                  text,
  add column if not exists created_at               timestamptz not null default now(),
  add column if not exists email_delivery_status    text not null default 'pending',
  add column if not exists internal_notification_id text,
  add column if not exists follow_up_email_id       text;

-- 3. Backfill idempotency keys for any pre-existing rows so the column
--    can be made NOT NULL and uniquely constrained.
update public.connect_submissions
  set idempotency_key = gen_random_uuid()::text
  where idempotency_key is null;

-- 4. Constraints + NOT NULL promotions, each guarded so re-runs and
--    already-present constraints are no-ops (ADD CONSTRAINT has no
--    IF NOT EXISTS form).
do $$
begin
  -- Unique idempotency key: a replayed key returns the existing row.
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.connect_submissions'::regclass
      and conname = 'connect_submissions_idempotency_key_key'
  ) then
    alter table public.connect_submissions
      add constraint connect_submissions_idempotency_key_key unique (idempotency_key);
  end if;

  -- Allowed triage statuses.
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.connect_submissions'::regclass
      and conname = 'connect_submissions_status_check'
  ) then
    alter table public.connect_submissions
      add constraint connect_submissions_status_check
      check (status in ('new', 'in_progress', 'closed', 'spam'));
  end if;

  -- Allowed Resend acceptance states (see column comment below).
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.connect_submissions'::regclass
      and conname = 'connect_submissions_email_delivery_status_check'
  ) then
    alter table public.connect_submissions
      add constraint connect_submissions_email_delivery_status_check
      check (email_delivery_status in ('pending', 'sent', 'partial', 'failed'));
  end if;

  -- Promote required columns to NOT NULL only when no null values exist,
  -- so the migration never fails on a partial/legacy table. (No-op when
  -- the column is already NOT NULL.)
  if not exists (select 1 from public.connect_submissions where idempotency_key is null) then
    alter table public.connect_submissions alter column idempotency_key set not null;
  end if;
  if not exists (select 1 from public.connect_submissions where first_name is null) then
    alter table public.connect_submissions alter column first_name set not null;
  end if;
  if not exists (select 1 from public.connect_submissions where email is null) then
    alter table public.connect_submissions alter column email set not null;
  end if;
  if not exists (select 1 from public.connect_submissions where country is null) then
    alter table public.connect_submissions alter column country set not null;
  end if;
  if not exists (select 1 from public.connect_submissions where postal_code is null) then
    alter table public.connect_submissions alter column postal_code set not null;
  end if;
end $$;

-- 5. Column documentation (idempotent; overwrites).
comment on table public.connect_submissions is
  'Connect (contact) form submissions. Written only by the submit-connect-form Edge Function via the service role; RLS denies all other access.';
comment on column public.connect_submissions.email_delivery_status is
  'Resend ACCEPTANCE state (queued), not confirmed inbox delivery: pending | sent | partial | failed. No delivery webhooks are consumed.';
comment on column public.connect_submissions.ip_hash is
  'Salted SHA-256 of the client IP for rate limiting. Never store the raw IP.';

-- 6. Indexes (create only what's missing).
create index if not exists connect_submissions_created_at_idx
  on public.connect_submissions (created_at desc);
create index if not exists connect_submissions_ip_hash_created_at_idx
  on public.connect_submissions (ip_hash, created_at desc);

-- 7. Enable RLS with NO policies: service_role bypasses RLS, everyone
--    else is denied. Enabling when already enabled is a no-op. Do NOT
--    add an anon/authenticated policy — inserts must go through the
--    Edge Function so they are validated and spam-checked.
alter table public.connect_submissions enable row level security;
