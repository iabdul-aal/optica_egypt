import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Search, Users } from "lucide-react"
import { AdminUnavailable } from "@/components/admin/AdminUnavailable"
import { Workspace } from "@/components/admin/Workspace"
import {
  committees,
  stages,
  stageLabels,
  type Application,
  type Stage,
} from "@/lib/recruitment"
import { requireStaff } from "@/lib/staff"
import {
  submissionIntentLabels,
  submissionIntents,
  submissionStageLabels,
  submissionStages,
  type SubmissionIntent,
  type SubmissionRecord,
  type SubmissionStage,
} from "@/lib/submissions"
import { isSupabaseConfigured } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Operations Dashboard",
  robots: { index: false, follow: false },
}

export const dynamic = "force-dynamic"

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  if (!isSupabaseConfigured()) return <AdminUnavailable />

  const staff = await requireStaff()
  const params = await searchParams
  const raw = (key: string) =>
    typeof params[key] === "string" ? (params[key] as string) : ""

  const queue = raw("queue") === "submissions" ? "submissions" : "recruitment"
  const q = raw("q")
    .replace(/[^\p{L}\p{N}@ .-]/gu, "")
    .slice(0, 80)
  const page = Math.max(1, Math.min(10000, Number.parseInt(raw("page")) || 1))
  const field =
    "min-h-12 rounded-sm border border-[var(--line)] bg-[var(--surface)] px-3 text-base text-[var(--ink)]"

  if (queue === "submissions") {
    const intent = submissionIntents.includes(raw("intent") as SubmissionIntent)
      ? (raw("intent") as SubmissionIntent)
      : ""
    const status = submissionStages.includes(raw("status") as SubmissionStage)
      ? (raw("status") as SubmissionStage)
      : ""

    let query = staff.db
      .from("submissions")
      .select(
        "id,reference_code,intent,applicant_name,applicant_email,affiliation,target_ref,status,created_at",
        { count: "exact" }
      )
      .order("created_at", { ascending: false })
      .range((page - 1) * 20, page * 20 - 1)

    if (q) {
      query = query.or(
        `applicant_name.ilike.%${q}%,applicant_email.ilike.%${q}%,affiliation.ilike.%${q}%`
      )
    }
    if (intent) query = query.eq("intent", intent)
    if (status) query = query.eq("status", status)

    const result = await query
    const items = (result.data || []) as SubmissionRecord[]
    const filtered = result.count || 0
    const pages = Math.max(1, Math.ceil(filtered / 20))
    const pageLink = (n: number) =>
      `/admin?${new URLSearchParams({ queue: "submissions", q, intent, status, page: String(n) })}`

    return (
      <Workspace role={staff.role} email={staff.user.email}>
        <header className="mb-8 flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="eyebrow">Operations / Section Desk</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
              Partner, Chapter, and Press Queue.
            </h1>
          </div>
          <Link href="/join?type=partner" className="btn-secondary min-h-12">
            Section Desk Form <ArrowUpRight size={16} />
          </Link>
        </header>

        {result.error ? (
          <p role="alert" className="site-card p-6 text-[var(--danger)]">
            Unable to load section submissions. Apply database migration 202611160001_submissions.sql if this is a fresh environment.
          </p>
        ) : (
          <div className="site-card overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] p-5 sm:p-6">
              <h2 className="flex items-center gap-3 text-lg font-semibold">
                <Users size={19} className="text-[var(--gold)]" />
                Submissions{" "}
                <span className="font-mono text-sm text-[var(--ink-faint)]">
                  {filtered}
                </span>
              </h2>
              <Link href="/admin" className="text-link text-xs">
                Switch to Committee Applications
              </Link>
            </div>

            <form className="grid gap-3 border-b border-[var(--line)] bg-[var(--surface-raised)] p-5 sm:grid-cols-2 xl:grid-cols-[1.3fr_1fr_1fr_auto]">
              <input type="hidden" name="queue" value="submissions" />
              <label className="grid gap-2 text-xs text-[var(--ink-soft)]">
                Search submissions
                <input
                  name="q"
                  defaultValue={q}
                  maxLength={80}
                  placeholder="Name, email, affiliation"
                  className={field}
                />
              </label>
              <label className="grid gap-2 text-xs text-[var(--ink-soft)]">
                Intent
                <select name="intent" defaultValue={intent} className={field}>
                  <option value="">All intents</option>
                  {submissionIntents.map((item) => (
                    <option key={item} value={item}>
                      {submissionIntentLabels[item]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-xs text-[var(--ink-soft)]">
                Stage
                <select name="status" defaultValue={status} className={field}>
                  <option value="">All stages</option>
                  {submissionStages.map((s) => (
                    <option key={s} value={s}>
                      {submissionStageLabels[s]}
                    </option>
                  ))}
                </select>
              </label>
              <button className="btn-secondary min-h-12 self-end">
                <Search size={16} />
                Filter
              </button>
            </form>

            {items.length ? (
              <div className="divide-y divide-[var(--line)]">
                {items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/admin/submissions/${item.id}`}
                    className="grid gap-3 p-5 transition-colors hover:bg-[var(--surface-raised)] sm:grid-cols-[1.3fr_1fr_auto] sm:items-center sm:gap-5 sm:px-6"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{item.applicant_name}</p>
                      <p className="mt-1 truncate text-xs text-[var(--ink-soft)]">
                        {item.affiliation}
                      </p>
                      <p className="mt-2 font-mono text-[10px] text-[var(--ink-faint)]">
                        {item.reference_code}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--ink-soft)]">
                        {submissionIntentLabels[item.intent]}
                      </p>
                      <p className="mt-1 text-xs text-[var(--ink-faint)]">
                        {new Date(item.created_at).toLocaleDateString("en-GB", {
                          timeZone: "Africa/Cairo",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-5">
                      <span className="rounded-full border border-[var(--gold)] px-3 py-1.5 text-xs text-[var(--gold)]">
                        {submissionStageLabels[item.status]}
                      </span>
                      <ArrowRight size={16} className="text-[var(--ink-faint)]" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="px-6 py-16 text-center">
                <p className="text-base font-semibold">No submissions recorded yet.</p>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-[var(--line)] px-5 py-3 text-xs text-[var(--ink-faint)]">
              <span>
                Page {page} of {pages}
              </span>
              <div className="flex items-center gap-5">
                {page > 1 && (
                  <Link href={pageLink(page - 1)} className="inline-flex min-h-12 items-center">
                    Previous
                  </Link>
                )}
                {page < pages && (
                  <Link href={pageLink(page + 1)} className="inline-flex min-h-12 items-center text-[var(--gold)]">
                    Next
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </Workspace>
    )
  }

  const status = stages.includes(raw("status") as Stage) ? raw("status") : ""
  const committee = committees.includes(
    raw("committee") as (typeof committees)[number]
  )
    ? raw("committee")
    : ""

  let query = staff.db
    .from("recruitment_applications")
    .select(
      "id,application_code,applicant_name,applicant_email,university,study_level,committee,status,created_at",
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range((page - 1) * 20, page * 20 - 1)
  if (q)
    query = query.or(
      `applicant_name.ilike.%${q}%,applicant_email.ilike.%${q}%,university.ilike.%${q}%`
    )
  if (status) query = query.eq("status", status)
  if (committee) query = query.eq("committee", committee)

  const [result, ...counts] = await Promise.all([
    query,
    ...stages.map((stage) =>
      staff.db
        .from("recruitment_applications")
        .select("id", { count: "exact", head: true })
        .eq("status", stage)
    ),
  ])
  const failed = result.error || counts.some((c) => c.error)
  const applications = (result.data || []) as Application[]
  const total = counts.reduce((sum, c) => sum + (c.count || 0), 0)
  const filtered = result.count || 0
  const pages = Math.max(1, Math.ceil(filtered / 20))
  const pageLink = (n: number) =>
    `/admin?${new URLSearchParams({ q, status, committee, page: String(n) })}`

  return (
    <Workspace role={staff.role} email={staff.user.email}>
      <header className="mb-8 flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="eyebrow">Chapter membership / Overview</p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
            A new cohort starts here.
          </h1>
          <p className="mt-3 text-sm text-[var(--ink-soft)]">
            Follow applications, coordinate reviews, and welcome your next
            chapter members.
          </p>
        </div>
        <Link href="/join?type=committee" className="btn-secondary min-h-12">
          Application form <ArrowUpRight size={16} />
        </Link>
      </header>
      {failed ? (
        <p role="alert" className="site-card p-6 text-[var(--danger)]">
          We could not load recruitment data. Refresh the page to try again.
        </p>
      ) : (
        <>
          <div className="mb-8 grid grid-cols-2 gap-3 xl:grid-cols-4">
            {[
              ["Applications", total, "Across all committees"],
              [
                "Awaiting review",
                counts[0].count || 0,
                "Ready for a first look",
              ],
              [
                "In progress",
                (counts[1].count || 0) + (counts[2].count || 0),
                "Review and interview",
              ],
              ["Accepted", counts[3].count || 0, "Your next chapter members"],
            ].map(([label, value, hint]) => (
              <div key={String(label)} className="site-card p-5 sm:p-6">
                <p className="text-xs text-[var(--ink-soft)]">{label}</p>
                <p className="mt-4 font-mono text-3xl text-[var(--gold)]">
                  {value}
                </p>
                <p className="mt-3 text-xs text-[var(--ink-faint)]">{hint}</p>
              </div>
            ))}
          </div>
          <div className="site-card overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] p-5 sm:p-6">
              <h2 className="flex items-center gap-3 text-lg font-semibold">
                <Users size={19} className="text-[var(--gold)]" />
                Applications{" "}
                <span className="font-mono text-sm text-[var(--ink-faint)]">
                  {filtered}
                </span>
              </h2>
              <span className="font-mono text-xs uppercase text-[var(--ink-faint)]">
                {staff.role === "viewer"
                  ? "Read-only access"
                  : "Recruitment pipeline"}
              </span>
            </div>
            <form className="grid gap-3 border-b border-[var(--line)] bg-[var(--surface-raised)] p-5 sm:grid-cols-2 xl:grid-cols-[1.3fr_1fr_1fr_auto]">
              <label className="grid gap-2 text-xs text-[var(--ink-soft)]">
                Search applicants
                <input
                  name="q"
                  defaultValue={q}
                  maxLength={80}
                  placeholder="Name, email, or university"
                  className={field}
                />
              </label>
              <label className="grid gap-2 text-xs text-[var(--ink-soft)]">
                Stage
                <select name="status" defaultValue={status} className={field}>
                  <option value="">All stages</option>
                  {stages.map((s) => (
                    <option key={s} value={s}>
                      {stageLabels[s]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-xs text-[var(--ink-soft)]">
                Committee
                <select
                  name="committee"
                  defaultValue={committee}
                  className={field}
                >
                  <option value="">All committees</option>
                  {committees.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <button className="btn-secondary min-h-12 self-end">
                <Search size={16} />
                Filter
              </button>
            </form>
            {applications.length ? (
              <div className="divide-y divide-[var(--line)]">
                {applications.map((a) => (
                  <Link
                    key={a.id}
                    href={`/admin/applications/${a.id}`}
                    className="grid gap-3 p-5 transition-colors hover:bg-[var(--surface-raised)] sm:grid-cols-[1.3fr_1fr_auto] sm:items-center sm:gap-5 sm:px-6"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold">
                        {a.applicant_name}
                      </p>
                      <p className="mt-1 truncate text-xs text-[var(--ink-soft)]">
                        {a.university}
                      </p>
                      <p className="mt-2 font-mono text-[10px] text-[var(--ink-faint)]">
                        {a.application_code}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--ink-soft)]">
                        {a.committee}
                      </p>
                      <p className="mt-1 text-xs text-[var(--ink-faint)]">
                        {new Date(a.created_at).toLocaleDateString("en-GB", {
                          timeZone: "Africa/Cairo",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-5">
                      <span
                        className={`rounded-full border px-3 py-1.5 text-xs ${
                          a.status === "accepted"
                            ? "border-[var(--success)] text-[var(--success)]"
                            : a.status === "declined"
                              ? "border-[var(--line)] text-[var(--ink-faint)]"
                              : "border-[var(--gold)] text-[var(--gold)]"
                        }`}
                      >
                        {stageLabels[a.status]}
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-[var(--ink-faint)]"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="px-6 py-16 text-center">
                <Users size={32} className="mx-auto text-[var(--gold)]" />
                <h3 className="mt-5 text-xl font-semibold">
                  {total
                    ? "No matching applications"
                    : "Ready for your first applicant."}
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--ink-soft)]">
                  {total
                    ? "Try another name, stage, or committee."
                    : "Share the application form with your community. New submissions will appear here for the team to review."}
                </p>
                <Link
                  href={total ? "/admin" : "/join?type=committee"}
                  className="btn-secondary mt-6 min-h-12"
                >
                  {total ? "Clear filters" : "Open application form"}
                </Link>
              </div>
            )}
            <div className="flex items-center justify-between border-t border-[var(--line)] px-5 py-3 text-xs text-[var(--ink-faint)]">
              <span>
                Page {page} of {pages}
              </span>
              <div className="flex items-center gap-5">
                {page > 1 && (
                  <Link
                    href={pageLink(page - 1)}
                    className="inline-flex min-h-12 items-center"
                  >
                    Previous
                  </Link>
                )}
                {page < pages && (
                  <Link
                    href={pageLink(page + 1)}
                    className="inline-flex min-h-12 items-center text-[var(--gold)]"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Workspace>
  )
}
