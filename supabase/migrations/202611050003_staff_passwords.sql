begin;

-- Check server-controlled metadata in auth.users, including the current version.
-- Temporary passwords and tokens issued before a password change cannot read data.
create or replace function public.recruitment_role() returns text
language sql stable security definer set search_path = '' as $$
  select s.role
  from public.recruitment_staff s
  join auth.users u on u.id = s.user_id
  where s.user_id = (select auth.uid())
    and coalesce(u.raw_app_meta_data->>'recruitment_password_change_required', 'false') <> 'true'
    and (
      u.raw_app_meta_data->>'recruitment_credential_version' is null
      or u.raw_app_meta_data->>'recruitment_credential_version' =
        (select auth.jwt())->'app_metadata'->>'recruitment_credential_version'
    )
$$;
revoke all on function public.recruitment_role() from public, anon;
grant execute on function public.recruitment_role() to authenticated;

commit;
