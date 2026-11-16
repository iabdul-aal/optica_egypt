begin;

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null unique,
  reference_code text not null unique default ('OPT-EG-' || extract(year from now())::text || '-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,12))),
  intent text not null check (intent in ('chapter_charter','partner_proposal','speaker_proposal','event_rsvp','press_inquiry','general_inquiry')),
  applicant_name text not null check (length(applicant_name) between 2 and 120),
  applicant_email text not null check (length(applicant_email) between 3 and 254),
  affiliation text not null check (length(affiliation) between 2 and 160),
  target_ref text not null default '' check (length(target_ref) <= 120),
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'submitted' check (status in ('submitted','under_review','scheduled','accepted','declined')),
  version integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on public.submissions (intent, created_at desc);
create index on public.submissions (status, created_at desc);

create table public.submission_reviews (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  actor_id uuid not null references auth.users(id),
  old_status text,
  new_status text not null,
  note text not null default '' check (length(note) <= 3000),
  created_at timestamptz not null default now()
);

create index on public.submission_reviews (submission_id, created_at desc);

alter table public.submissions enable row level security;
alter table public.submission_reviews enable row level security;

revoke all on public.submissions, public.submission_reviews from anon, authenticated;
grant select on public.submissions, public.submission_reviews to authenticated;
grant all on public.submissions, public.submission_reviews to service_role;

create policy submissions_read on public.submissions for select to authenticated
  using ((select public.recruitment_role()) in ('admin','recruiter','viewer'));

create policy submission_reviews_read on public.submission_reviews for select to authenticated
  using ((select public.recruitment_role()) in ('admin','recruiter','viewer'));

create function public.submit_intake(p_data jsonb)
returns text language plpgsql security definer set search_path = '' as $$
declare code text;
begin
  insert into public.submissions (
    submission_id,
    intent,
    applicant_name,
    applicant_email,
    affiliation,
    target_ref,
    payload
  )
  values (
    (p_data->>'submissionId')::uuid,
    p_data->>'intent',
    p_data->>'name',
    lower(p_data->>'email'),
    p_data->>'affiliation',
    coalesce(p_data->>'targetRef', ''),
    coalesce(p_data->'payload', '{}'::jsonb)
  )
  on conflict (submission_id) do nothing returning reference_code into code;

  if code is null then
    select reference_code into code from public.submissions
      where submission_id = (p_data->>'submissionId')::uuid
        and applicant_email = lower(p_data->>'email');
    if code is null then raise exception 'Submission conflict'; end if;
  end if;
  return code;
end;
$$;

revoke all on function public.submit_intake(jsonb) from public, anon, authenticated;
grant execute on function public.submit_intake(jsonb) to service_role;

create function public.review_submission(p_id uuid, p_status text, p_note text, p_version integer)
returns void language plpgsql security definer set search_path = '' as $$
declare previous public.submissions;
begin
  if public.recruitment_role() not in ('admin','recruiter') or public.recruitment_role() is null then
    raise exception 'Forbidden' using errcode = '42501';
  end if;
  if p_status not in ('submitted','under_review','scheduled','accepted','declined') or length(p_note) > 3000 then
    raise exception 'Invalid review';
  end if;
  select * into previous from public.submissions where id = p_id for update;
  if not found then raise exception 'Submission not found'; end if;
  if previous.version <> p_version then
    raise sqlstate 'PT409' using message = 'Submission changed. Refresh before saving.';
  end if;
  if previous.status = p_status and trim(p_note) = '' then return; end if;
  update public.submissions set status = p_status, version = version + 1, updated_at = now() where id = p_id;
  insert into public.submission_reviews (submission_id, actor_id, old_status, new_status, note)
    values (p_id, auth.uid(), previous.status, p_status, trim(p_note));
end;
$$;

revoke all on function public.review_submission(uuid, text, text, integer) from public, anon;
grant execute on function public.review_submission(uuid, text, text, integer) to authenticated;

commit;
