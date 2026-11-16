-- A stale review is an HTTP conflict, not a retryable transaction failure.
create or replace function public.review_recruitment(p_id uuid,p_status text,p_note text,p_version integer)
returns void language plpgsql security definer set search_path = '' as $$
declare previous public.recruitment_applications;
begin
  if public.recruitment_role() not in ('admin','recruiter') or public.recruitment_role() is null then raise exception 'Forbidden' using errcode = '42501'; end if;
  if p_status not in ('submitted','under_review','interview','accepted','declined') or length(p_note) > 3000 then raise exception 'Invalid review'; end if;
  select * into previous from public.recruitment_applications where id = p_id for update;
  if not found then raise exception 'Application not found'; end if;
  if previous.version <> p_version then raise sqlstate 'PT409' using message = 'Application changed. Refresh before saving.'; end if;
  if previous.status = p_status and trim(p_note) = '' then return; end if;
  update public.recruitment_applications set status = p_status, version = version + 1, updated_at = now() where id = p_id;
  insert into public.recruitment_reviews(application_id,actor_id,old_status,new_status,note)
    values (p_id,auth.uid(),previous.status,p_status,trim(p_note));
end;
$$;
