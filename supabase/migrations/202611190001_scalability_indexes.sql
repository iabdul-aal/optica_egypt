begin;

-- Support fast periodic expiry sweeps in public.recruitment_take_rate().
create index if not exists idx_recruitment_rate_limits_window_start
  on public.recruitment_rate_limits (window_start);

-- Support unfiltered dashboard pagination ordered by created_at desc.
create index if not exists idx_recruitment_applications_created_at_desc
  on public.recruitment_applications (created_at desc);

create index if not exists idx_submissions_created_at_desc
  on public.submissions (created_at desc);

commit;
