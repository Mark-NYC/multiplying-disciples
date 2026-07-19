-- Connect form submissions.
--
-- Backs the /contact-us/ ("Connect") form on multiplyingdisciples.us.
-- Rows are written ONLY by the `submit-connect-form` Edge Function using
-- the service-role key (which bypasses RLS). The browser never talks to
-- this table directly — it POSTs to the Edge Function, which validates
-- server-side before inserting. RLS is enabled with no policies, so the
-- anon and authenticated roles have no access at all (deny by default).

create table if not exists public.connect_submissions (
  id                       uuid primary key default gen_random_uuid(),

  -- Submitted, validated, and normalized by the Edge Function.
  first_name               text not null,
  email                    text not null,
  country                  text not null,
  postal_code              text not null,
  -- Canonical interest keys: connecting | training | learning | other.
  interests                text[] not null default '{}',
  other_interest           text,
  message                  text,

  -- Triage status for the site owner. Defaults to 'new'.
  status                   text not null default 'new'
                             check (status in ('new', 'in_progress', 'closed', 'spam')),

  -- Attribution captured from the browser at submit time.
  source_page              text,
  referrer                 text,
  utm_source               text,
  utm_medium               text,
  utm_campaign             text,

  created_at               timestamptz not null default now(),

  -- Resend delivery bookkeeping, written back by the Edge Function after
  -- the emails are attempted. `email_delivery_status` is one of:
  -- pending | sent | partial | failed.
  email_delivery_status    text not null default 'pending'
                             check (email_delivery_status in ('pending', 'sent', 'partial', 'failed')),
  internal_notification_id text,
  follow_up_email_id       text
);

comment on table public.connect_submissions is
  'Connect (contact) form submissions. Written only by the submit-connect-form Edge Function via the service role; RLS denies all other access.';

-- Newest-first triage is the common read pattern for the site owner.
create index if not exists connect_submissions_created_at_idx
  on public.connect_submissions (created_at desc);

-- Enable RLS with NO policies: service_role bypasses RLS, everyone else
-- is denied. Do not add an anon/authenticated policy — inserts must go
-- through the Edge Function so they are validated and spam-checked.
alter table public.connect_submissions enable row level security;
