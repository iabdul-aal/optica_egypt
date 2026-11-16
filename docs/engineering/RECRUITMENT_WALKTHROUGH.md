# Chapter recruitment implementation

Chapter membership recruitment now uses Supabase Postgres and Auth with Vercel
server hosting. The existing branding, dark and light themes, and mobile layouts
are retained.

## Applicant experience

- `/recruitment` and `/join` submit to the same shared recruitment database.
- The form collects contact and university details, study level, committee,
  skills, motivation, availability, and explicit consent.
- Validation runs on the server. Requests are size-limited, have a honeypot,
  and are rate-limited in Postgres using hashed IP and email identifiers.
- A receipt is displayed only after persistence. A stable submission UUID makes
  a retry return the original receipt without creating another application.
- Applicant details are not saved to local storage.
- Public navigation, the Join page, the Volunteer page, and the sitemap link
  to chapter recruitment.

## Staff workspace

`/admin` provides overall metrics, search, committee and stage filters, and
pagination. `/admin/applications/[id]` shows profiles and append-only review
history. Changes record the staff user and timestamp. Radio controls preserve
stage choices while notes are edited. Version checking rejects stale updates
with HTTP 409, preventing one reviewer from overwriting another.

| Role | Permissions |
| --- | --- |
| Admin | Review applications and manage existing staff accounts' roles |
| Recruiter | Read applications, change stages, and add internal notes |
| Viewer | Read dashboard, applications, and history |
| Applicant or non-staff user | Submit applications; cannot read applicant data or grant staff access |

Permissions are checked in server routes and Postgres functions and policies.
Roles come from the private staff table, never from editable profile metadata.
The dashboard cannot remove the last administrator. There is no default staff
role for a new Auth user. Auth users without a staff entry receive no access.

## Authentication and onboarding

Staff sign in with email and password at `/admin/login`. Administrators provision
accounts through `scripts/provision-staff.mjs`, using private input and output
files outside the source checkout. Each account receives a unique temporary
password, except when the owner explicitly supplies an initial password.
The script sends no emails and refuses to reset existing accounts by default.

First login redirects to `/admin/change-password`. The current password must be
verified, and the replacement must be different and contain at least 12 characters,
a letter, and a number. The server clears a protected app-metadata restriction,
rotates the credential version, revokes older refresh sessions, and establishes
a fresh session. Profile metadata cannot clear the restriction. RLS checks current
Auth metadata and the token's credential version, blocking direct database access
both before replacement and from old tokens after replacement. API routes enforce
the same gate. Sign-in and password changes have persistent email/user and IP
rate limits, body limits, and same-origin checks.

The roster supplied by the owner has 12 accounts: one administrator, nine
recruiters (officers), and two viewers (members). Addresses follow the uploaded
roster; Khaled's wrapped address was confirmed explicitly. The owner retains
role management through `/admin/staff`. Credentials are a private deliverable,
excluded from the source archive and deployments. Distribute each person's own
row privately. No application acceptance or review emails are sent.

Password sign-in and applicant submissions do not depend on SMTP. A lost
password is reset by the administrator through the provisioning script with
explicit reset authorization; the replacement again requires a first-login change.

## Infrastructure

- Vercel team: `azimuth7`; project: `optica-egypt`.
- Supabase organization: `Azimuth`; project: `optica-egypt-recruitment`.
- Supabase reference: `qgauexobxjxkajptzwrh`; region: `eu-west-1` (Ireland).
- The Marketplace install encountered a duplicate organization-name error.
  A separate free project was created in the existing organization instead.
- All three SQL migrations in `supabase/migrations/` were applied using the SQL
  Editor. Do not reapply the initial creation migration to this provisioned DB.
- Automatic RLS is enabled. Tables are not automatically exposed; the migration
  grants only the explicit read and RPC permissions needed by staff.
- Production and Development environment variables are configured in Vercel.
  The production server key is stored as a Secret. No production credentials
  are configured for Preview; configure a separate database for Git previews.
- `.env.local` and `.vercel/` are ignored. Keys do not appear in source files.
- Next.js and Vercel use Node.js 24. Static GitHub Pages deployment was removed
  because cookie sessions and recruitment APIs require a server.
- Canonical metadata uses the configured public site URL or Vercel's production
  URL at build time. Local builds use `http://localhost:3000`.
- The recruitment source is on the `recruitment-form` branch.

## Other issues fixed

- Legacy volunteer submissions now fail honestly on missing configuration,
  rejected writes, and network failures. They no longer store new local copies.
- Supabase legacy volunteer inserts use `return=minimal`, preventing the need
  to grant applicants read access just to return a receipt.
- Vercel settings files are ignored, documentation uses the correct local URL,
  and environment configuration now documents the actual recruitment backend.
- Updated Next.js and its ESLint config to patched version 15.5.29. Updated
  PostCSS and source-map-js through narrowly scoped overrides. The audit has no
  high or critical findings; moderate legacy next-intl and tooling advisories
  remain. No major framework or internationalization migration was attempted.

## Verification

- ESLint and strict TypeScript checks.
- Production Next.js build.
- Five offline volunteer delivery regression tests.
- Six live Supabase browser and API tests: actual persistence, idempotent retries,
  anonymous data denial, reviewer notes and stage persistence, stale update
  rejection, viewer restrictions, non-staff isolation, administrator role
  changes, and invalid and cross-origin requests.
- Browser checks for 375px layout, 16px form inputs, and dark/light themes.
- Existing public-route and mobile navigation smoke tests.

Live verification uses temporary test identities and one application, and
removes those exact records afterward. Screenshots of the dashboard and review
flow contain clearly named test data. Passwordless email delivery is not tested
by sending mail; the user initiates the first sign-in request from the login UI.

## Remaining legacy scope

The partner and press inquiry adapters and separate event-registration adapter
still use their prior browser-storage behavior. They are not recruitment data
sources. The old volunteer export helpers read historical local records only.
Chapter applications from `/join` now use the real recruitment flow instead of
the prior member-portal storage adapter.

## Production deployment and domain

- Site: https://optica-egypt.com
- Application form: https://optica-egypt.com/recruitment
- Admin workspace: https://optica-egypt.com/admin
- Deployment: dpl_7yq1Q494AFwMowMBirUdKZpZW6rD (READY, production).
- Framework: Next.js 15.5.29; runtime: Node.js 24.
- Password release build duration: 50s.
- The release was built from base ee30b05 with the recruitment changes.
- This exact tested production-environment build was promoted without rebuilding.
  The release used the Vercel CLI.

Namecheap BasicDNS remains authoritative. The saved website records are:

| Type | Host | Target |
| --- | --- | --- |
| A | @ | 216.198.79.1 |
| A | @ | 64.29.17.1 |
| CNAME | www | 549a1310881d2a55.vercel-dns-017.com. |

The old apex parking redirect and www parking CNAME were replaced. All five
Namecheap mail-forwarding MX records and the original SPF TXT record were
verified unchanged. Nameservers were not changed.

Both domains pass Vercel verification. HTTPS validates successfully for the apex
on both Vercel addresses and for www. HTTP redirects to HTTPS, and www redirects
to https://optica-egypt.com with HTTP 308. Chrome opened the public recruitment
page directly at the custom domain without Vercel authentication or certificate
warnings. Some DNS resolvers can retain the previous parking address until the
old 30-minute TTL expires.

NEXT_PUBLIC_SITE_URL is https://optica-egypt.com in Vercel Production. Supabase's
Site URL is https://optica-egypt.com, and the exact production /auth/callback
redirect is saved. Existing local and original review callbacks remain allowed.
No wildcard authentication redirect was added. Deployment Protection remains
configured for the generated review URLs; staff permissions protect admin data
on the public production site.

## Release verification

Local verification passed: npm run check, npm run build, five unit tests,
18 public-site browser tests, and six live recruitment tests. The live suite was
run separately with the provisioned Supabase configuration. Tests verified
actual review stage persistence as well as notes and role restrictions.

Production verification confirmed:
- Public recruitment page: HTTPS 200 with the correct canonical domain.
- Staff sign-in page: HTTPS 200.
- Application submission with Origin https://optica-egypt.com: HTTP 201 and a
  matching persisted Supabase receipt.
- Unauthenticated staff mutation: HTTP 401.
- The exact production verification record was removed after checking it.
- Database cleanup: zero applications, zero reviews, 12 roster staff accounts,
  and zero temporary test users.
- The server credential is absent from all 70 browser JavaScript bundles.
- Runtime error scan during release verification: zero error or fatal records.

No external monitoring drain was provisioned. The later password-sign-in release
removes the email-delivery dependency. No test authentication emails were sent.

## Staff password verification

An additional live browser/API test passed for temporary-password sign-in,
forced-change redirects, API and direct SQL denial before replacement,
profile-metadata bypass denial, cross-origin rejection, weak/reused/incorrect
password rejection, successful replacement, dashboard access, old-password and
old-token rejection, logout, and subsequent login with the new password.
Temporary test users were removed. No real staff password was changed by a test.


Production password release: dpl_7yq1Q494AFwMowMBirUdKZpZW6rD, staged and
verified before promotion without rebuilding. The owner signed in successfully
at the custom domain using the supplied temporary password; the live browser
redirected to /admin/change-password. The owner must choose the replacement
personally. Provisioning verified 12 staff rows and zero temporary test users.
