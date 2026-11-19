import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { z } from "zod"
import { AdminUnavailable } from "@/components/admin/AdminUnavailable"
import { requireStaff } from "@/lib/staff"
import {
  canReview,
  stageLabels,
  type Application,
  type ReviewEvent
} from "@/lib/recruitment"
import { Workspace } from "@/components/admin/Workspace"
import { ReviewForm } from "@/components/admin/ReviewForm"
import { isSupabaseConfigured } from "@/lib/supabase/server"
export const metadata: Metadata = {
  title: "Application Review",
  robots: { index: false, follow: false }
}
export const dynamic = "force-dynamic"
export default async function ApplicationPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  if (!isSupabaseConfigured()) return <AdminUnavailable />
  const staff = await requireStaff()
  const { id } = await params
  if (!z.uuid().safeParse(id).success) notFound()
  const [application, reviews] = await Promise.all([
    staff.db
      .from("recruitment_applications")
      .select("*")
      .eq("id", id)
      .maybeSingle(),
    staff.db
      .from("recruitment_reviews")
      .select("*")
      .eq("application_id", id)
      .order("created_at", { ascending: false })
  ])
  if (application.error || reviews.error)
    throw new Error("Unable to load application")
  if (!application.data) notFound()
  const a = application.data as Application
  const history = (reviews.data || []) as ReviewEvent[]
  return (
    <Workspace role={staff.role} email={staff.user.email}>
      <Link
        href="/admin"
        className="inline-flex min-h-12 items-center text-sm text-[var(--ink-soft)]"
      >
        ← All applications
      </Link>
      <header className="mb-8 mt-4 border-b border-[var(--line)] pb-7">
        <p className="font-mono text-xs text-[var(--gold)]">
          {a.application_code}
        </p>
        <h1 className="mt-3 break-words text-3xl font-semibold">
          {a.applicant_name}
        </h1>
        <p className="mt-2 break-all text-sm text-[var(--ink-soft)]">
          {a.applicant_email}, {a.university}
        </p>
        <p className="mt-4 font-mono text-xs text-[var(--gold)]">
          {stageLabels[a.status]}
        </p>
      </header>
      <div className="grid items-start gap-7 xl:grid-cols-[1.3fr_1fr]">
        <div className="space-y-7">
          <section className="site-card p-6">
            <h2 className="text-lg font-semibold">Applicant profile</h2>
            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
              {[
                ["Committee", a.committee],
                ["Study level", a.study_level],
                ["Availability", a.availability],
                [
                  "Submitted",
                  new Date(a.created_at).toLocaleString("en-GB", {
                    timeZone: "Africa/Cairo"
                  })
                ]
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs text-[var(--ink-faint)]">{label}</dt>
                  <dd className="mt-2 whitespace-pre-wrap break-words text-sm">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="site-card space-y-6 p-6">
            {[
              ["Motivation", a.motivation],
              ["Skills and experience", a.skills || "No skills listed."]
            ].map(([label, value]) => (
              <div key={label}>
                <h2 className="font-semibold">{label}</h2>
                <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-[var(--ink-soft)]">
                  {value}
                </p>
              </div>
            ))}
          </section>
          <section className="site-card p-6">
            <h2 className="text-lg font-semibold">Review history</h2>
            {history.length ? (
              <ol className="mt-5 space-y-5">
                {history.map((h) => (
                  <li key={h.id} className="border-l border-[var(--gold)] pl-4">
                    <p className="text-sm">
                      {h.old_status ? `${stageLabels[h.old_status]} → ` : ""}
                      {stageLabels[h.new_status]}
                    </p>
                    <p className="mt-1 font-mono text-[10px] leading-5 text-[var(--ink-faint)]">
                      {new Date(h.created_at).toLocaleString("en-GB", {
                        timeZone: "Africa/Cairo"
                      })}{" "}
                      - Staff {h.actor_id.slice(0, 8)}
                    </p>
                    {h.note && (
                      <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-[var(--ink-soft)]">
                        {h.note}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-4 text-sm text-[var(--ink-faint)]">
                No reviews yet. This application is awaiting its first review.
              </p>
            )}
          </section>
        </div>
        {canReview(staff.role) ? (
          <ReviewForm
            application={{ id: a.id, status: a.status, version: a.version }}
          />
        ) : (
          <div className="site-card p-6">
            <h2 className="font-semibold">Read-only access</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">
              You can view the applicant profile and review history. A recruiter
              or administrator can update stages and add notes.
            </p>
          </div>
        )}
      </div>
    </Workspace>
  )
}
