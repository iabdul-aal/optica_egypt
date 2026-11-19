# Operations Desk and Recruitment Architecture

Committee applications and institutional desk inquiries use Supabase Postgres and Auth with Next.js 15 server hosting on Vercel (`https://optica-egypt.com`).

## Public Intake Flows

- **Committee Applications (`/join?type=committee`, legacy `/recruitment` -> HTTP 308)**: Submits to `POST /api/recruitment`, persisted in `public.recruitment_applications`.
- **Section Desk Inquiries (`/join?type=chapter|partner|speaker|event|press|general`)**: Submits to `POST /api/submissions`, persisted in `public.submissions`.
- Both routes validate input with Zod, enforce request body size limits, check origin and `Sec-Fetch-Site` rules (allowing allowlisted cross-origin GitHub Pages mirror calls via `ALLOWED_PUBLIC_ORIGINS`), verify honeypot fields, and apply Postgres-backed rate limits using HMAC-SHA256 hashed IP and email keys.
- Confirmation codes (`OPT-EG-YYYY-...`) are returned only after database persistence succeeds. Stable client-generated `submissionId` UUIDs make retries idempotent without creating duplicate records.
- Zero form data is stored in browser `localStorage` or routed via `mailto:` fallbacks.

## Staff Operations Workspace

`/admin` provides two switchable queues (Committee Applications and Section Desk Inquiries) with search, stage/committee/intent filters, and pagination. Detail routes (`/admin/applications/[id]` and `/admin/submissions/[id]`) display applicant records and append-only review histories with Cairo timestamps and staff actor attribution. Optimistic version locking (`version`) rejects concurrent stale updates with HTTP `409` (`PT409`).

| Role | Permissions |
| --- | --- |
| `admin` | Review applications and submissions, manage existing staff accounts' roles via `/admin/staff` |
| `recruiter` | Read applications and submissions, update workflow stages, and record internal review notes |
| `viewer` | Read-only access to dashboards, records, and review histories |
| Public / non-staff | Submit public forms only; cannot read private records or alter roles |

Permissions are enforced at both the Next.js server layer and Postgres Row Level Security (RLS) policies and `SECURITY DEFINER` RPC functions (`set search_path = ''`). Roles are read from `public.recruitment_staff` and server-controlled `auth.users.raw_app_meta_data`, never user-editable profile metadata. An advisory transaction lock prevents removing the final administrator.

## Authentication and Provisioning

Staff sign in with email and password at `/admin/login`. Administrators provision accounts from a private roster file outside the repository via `scripts/provision-staff.mjs`, assigning temporary passwords flagged with `recruitment_password_change_required: true`.

First login redirects to `/admin/change-password`. Changing the password verifies the current credential, enforces a minimum 12-character alphanumeric policy, clears the forced-change flag, rotates `recruitment_credential_version`, revokes prior sessions globally, and establishes a fresh session. Both RLS and API checks reject pre-rotation tokens immediately.

## Migrations and Health Monitoring

Apply SQL migrations under `supabase/migrations/` in chronological order:

1. `202611050001_recruitment.sql` (staff, applications, reviews, rate limits, RLS, RPCs)
2. `202611050002_review_conflicts.sql` (optimistic conflict `PT409` SQLSTATE)
3. `202611050003_staff_passwords.sql` (server-controlled forced password change and credential versioning)
4. `202611160001_submissions.sql` (unified desk `submissions` and `submission_reviews` tables, RLS, RPCs)
5. `202611190001_scalability_indexes.sql` (indexes for rate-limit cleanup and descending timestamp pagination)

`GET /api/health` exposes non-sensitive liveness status (`Cache-Control: private, no-store`) for uptime checks, and server-side structured JSON logs capture backend exceptions without logging PII or credentials.
