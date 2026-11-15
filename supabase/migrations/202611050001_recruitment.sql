begin;

create table public.recruitment_staff (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null check (role in ('admin','recruiter','viewer')),
  created_at timestamptz not null default now()
);
create table public.recruitment_applications (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null unique,
  application_code text not null unique default ('OPT-EG-' || extract(year from now())::text || '-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,12))),
  applicant_name text not null check (length(applicant_name) between 2 and 120),
  applicant_email text not null check (length(applicant_email) between 3 and 254),
  university text not null check (length(university) between 2 and 160),
  study_level text not null check (study_level in ('Undergraduate','Postgraduate','Researcher','Other')),
  committee text not null check (committee in ('Technical Program','Open Source Photonics','Outreach','Science Communication','Chapter Mentorship','Operations')),
  skills text not null default '' check (length(skills) <= 2000),
  motivation text not null check (length(motivation) between 30 and 3000),
  availability text not null check (length(availability) between 2 and 160),
  consent_at timestamptz not null default now(),
  status text not null default 'submitted' check (status in ('submitted','under_review','interview','accepted','declined')),
  version integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on public.recruitment_applications (status, created_at desc);
create index on public.recruitment_applications (committee, created_at desc);
create table public.recruitment_reviews (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.recruitment_applications(id) on delete cascade,
  actor_id uuid not null references auth.users(id),
  old_status text,
  new_status text not null,
  note text not null default '' check (length(note) <= 3000),
  created_at timestamptz not null default now()
);
create index on public.recruitment_reviews (application_id, created_at desc);
create table public.recruitment_rate_limits (
  key text primary key,
  window_start timestamptz not null default now(),
  attempts integer not null default 1
);

alter table public.recruitment_staff enable row level security;
alter table public.recruitment_applications enable row level security;
alter table public.recruitment_reviews enable row level security;
alter table public.recruitment_rate_limits enable row level security;

create function public.recruitment_role() returns text
language sql stable security definer set search_path = '' as $$
  select role from public.recruitment_staff where user_id = (select auth.uid())
$$;
revoke all on function public.recruitment_role() from public, anon;
grant execute on function public.recruitment_role() to authenticated;

revoke all on public.recruitment_staff, public.recruitment_applications, public.recruitment_reviews, public.recruitment_rate_limits from anon, authenticated;
grant select on public.recruitment_staff, public.recruitment_applications, public.recruitment_reviews to authenticated;
grant all on public.recruitment_staff, public.recruitment_applications, public.recruitment_reviews, public.recruitment_rate_limits to service_role;
create policy staff_read on public.recruitment_staff for select to authenticated
  using (user_id = (select auth.uid()) or (select public.recruitment_role()) = 'admin');
create policy applications_read on public.recruitment_applications for select to authenticated
  using ((select public.recruitment_role()) in ('admin','recruiter','viewer'));
create policy reviews_read on public.recruitment_reviews for select to authenticated
  using ((select public.recruitment_role()) in ('admin','recruiter','viewer'));

create function public.recruitment_take_rate(p_key text, p_limit integer, p_seconds integer)
returns boolean language plpgsql security definer set search_path = '' as $$
declare n integer;
begin
  insert into public.recruitment_rate_limits as r (key) values (p_key)
  on conflict (key) do update set
    attempts = case when r.window_start < now() - make_interval(secs => p_seconds) then 1 else r.attempts + 1 end,
    window_start = case when r.window_start < now() - make_interval(secs => p_seconds) then now() else r.window_start end
  returning attempts into n;
  delete from public.recruitment_rate_limits where window_start < now() - interval '2 days';
  return n <= p_limit;
end;
$$;
revoke all on function public.recruitment_take_rate(text,integer,integer) from public, anon, authenticated;
grant execute on function public.recruitment_take_rate(text,integer,integer) to service_role;

create function public.submit_recruitment(p_data jsonb)
returns text language plpgsql security definer set search_path = '' as $$
declare code text;
begin
  insert into public.recruitment_applications (submission_id,applicant_name,applicant_email,university,study_level,committee,skills,motivation,availability)
  values ((p_data->>'submissionId')::uuid,p_data->>'name',lower(p_data->>'email'),p_data->>'university',p_data->>'studyLevel',p_data->>'committee',p_data->>'skills',p_data->>'motivation',p_data->>'availability')
  on conflict (submission_id) do nothing returning application_code into code;
  if code is null then
    -- A retry can retrieve its receipt only when the original contact matches.
    select application_code into code from public.recruitment_applications
      where submission_id = (p_data->>'submissionId')::uuid and applicant_email = lower(p_data->>'email');
    if code is null then raise exception 'Submission conflict'; end if;
  end if;
  return code;
end;
$$;
revoke all on function public.submit_recruitment(jsonb) from public, anon, authenticated;
grant execute on function public.submit_recruitment(jsonb) to service_role;

create function public.review_recruitment(p_id uuid,p_status text,p_note text,p_version integer)
returns void language plpgsql security definer set search_path = '' as $$
declare previous public.recruitment_applications;
begin
  if public.recruitment_role() not in ('admin','recruiter') or public.recruitment_role() is null then raise exception 'Forbidden' using errcode = '42501'; end if;
  if p_status not in ('submitted','under_review','interview','accepted','declined') or length(p_note) > 3000 then raise exception 'Invalid review'; end if;
  select * into previous from public.recruitment_applications where id = p_id for update;
  if not found then raise exception 'Application not found'; end if;
  if previous.version <> p_version then raise exception 'Application changed. Refresh before saving.' using errcode = '40001'; end if;
  if previous.status = p_status and trim(p_note) = '' then return; end if;
  update public.recruitment_applications set status = p_status, version = version + 1, updated_at = now() where id = p_id;
  insert into public.recruitment_reviews(application_id,actor_id,old_status,new_status,note)
    values (p_id,auth.uid(),previous.status,p_status,trim(p_note));
end;
$$;
revoke all on function public.review_recruitment(uuid,text,text,integer) from public, anon;
grant execute on function public.review_recruitment(uuid,text,text,integer) to authenticated;

create function public.set_recruitment_staff(p_email text,p_role text)
returns void language plpgsql security definer set search_path = '' as $$
declare target uuid; previous_role text;
begin
  perform pg_advisory_xact_lock(88512001);
  if public.recruitment_role() is distinct from 'admin' then raise exception 'Forbidden' using errcode = '42501'; end if;
  if p_role is not null and p_role not in ('admin','recruiter','viewer') then raise exception 'Invalid role'; end if;
  select id into target from auth.users where lower(email) = lower(trim(p_email));
  if target is null then raise exception 'Create this staff user in Supabase Authentication first.'; end if;
  select role into previous_role from public.recruitment_staff where user_id = target;
  if previous_role = 'admin' and p_role is distinct from 'admin' and
    (select count(*) from public.recruitment_staff where role = 'admin') <= 1 then
    raise exception 'The last administrator cannot be removed.';
  end if;
  if p_role is null then delete from public.recruitment_staff where user_id = target;
  else insert into public.recruitment_staff(user_id,email,role) values(target,lower(trim(p_email)),p_role)
    on conflict(user_id) do update set role = excluded.role, email = excluded.email;
  end if;
end;
$$;
revoke all on function public.set_recruitment_staff(text,text) from public, anon;
grant execute on function public.set_recruitment_staff(text,text) to authenticated;

commit;
