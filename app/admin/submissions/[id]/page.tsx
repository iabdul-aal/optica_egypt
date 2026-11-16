import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { z } from "zod"
import { AdminUnavailable } from "@/components/admin/AdminUnavailable"
import { SubmissionReviewForm } from "@/components/admin/SubmissionReviewForm"
import { Workspace } from "@/components/admin/Workspace"
import { canReview } from "@/lib/recruitment"
import { requireStaff } from "@/lib/staff"
import {
  submissionIntentLabels,
  submissionStageLabels,
  type SubmissionRecord,
  type SubmissionReviewEvent,
} from "@/lib/submissions"
import { isSupabaseConfigured } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Submission Review",
  robots: { index: false, follow: false },
}

export const dynamic = "force-dynamic"

export default async function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  if (!isSupabaseConfigured()) {
    return <AdminUnavailable />
  }

  const staff = await requireStaff()
  const { id } = await params
  if (!z.uuid().safeParse(id).success) notFound()

  const [submission, reviews] = await Promise.all([
    staff.db.from("submissions").select("*").eq("id", id).maybeSingle(),
    staff.db
      .from("submission_reviews")
      .select("*")
      .eq("submission_id", id)
      .order("created_at", { ascending: false }),
  ])

  if (submission.error || reviews.error) {
    throw new Error("Unable to load submission")
  }
  if (!submission.data) notFound()

  const record = submission.data as SubmissionRecord
  const history = (reviews.data || []) as SubmissionReviewEvent[]

  return (
    <Workspace role={staff.role} email={staff.user.email}>
      <Link
        href="/admin?queue=submissions"
        className="inline-flex min-h-12 items-center text-sm text-[var(--ink-soft)]"
      >
        All section submissions
      </Link>

      <header className="mb-8 mt-4 border-b border-[var(--line)] pb-7">
        <p className="font-mono text-xs text-[var(--gold)]">
          {record.reference_code}
        </p>
        <h1 className="mt-3 break-words text-3xl font-semibold">
          {record.applicant_name}
        </h1>
        <p className="mt-2 break-all text-sm text-[var(--ink-soft)]">
          {record.applicant_email} · {record.affiliation}
        </p>
        <p className="mt-4 font-mono text-xs text-[var(--gold)]">
          {submissionIntentLabels[record.intent]} · {submissionStageLabels[record.status]}
        </p>
      </header>

      <div className="grid items-start gap-7 xl:grid-cols-[1.3fr_1fr]">
        <div className="space-y-7">
          <section className="site-card p-6">
            <h2 className="text-lg font-semibold">Submission details</h2>
            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
              {record.target_ref && (
                <div>
                  <dt className="text-xs text-[var(--ink-faint)]">Target reference</dt>
                  <dd className="mt-2 font-mono text-sm">{record.target_ref}</dd>
                </div>
              )}
              {record.payload.topicOrTrack && (
                <div>
                  <dt className="text-xs text-[var(--ink-faint)]">Topic or track</dt>
                  <dd className="mt-2 text-sm">{record.payload.topicOrTrack}</dd>
                </div>
              )}
              {record.payload.deadlineOrDate && (
                <div>
                  <dt className="text-xs text-[var(--ink-faint)]">Timeline or deadline</dt>
                  <dd className="mt-2 text-sm">{record.payload.deadlineOrDate}</dd>
                </div>
              )}
              {record.payload.opticaId && (
                <div>
                  <dt className="text-xs text-[var(--ink-faint)]">Optica ID</dt>
                  <dd className="mt-2 font-mono text-sm">{record.payload.opticaId}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs text-[var(--ink-faint)]">Submitted</dt>
                <dd className="mt-2 text-sm">
                  {new Date(record.created_at).toLocaleString("en-GB", {
                    timeZone: "Africa/Cairo",
                  })}
                </dd>
              </div>
            </dl>
            <div className="mt-6 border-t border-[var(--line)] pt-5">
              <p className="text-xs text-[var(--ink-faint)]">Message</p>
              <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-[var(--ink-soft)]">
                {record.payload.details}
              </p>
            </div>
          </section>

          <section className="site-card p-6">
            <h2 className="text-lg font-semibold">Review history</h2>
            {history.length ? (
              <ul className="mt-4 divide-y divide-[var(--line)]">
                {history.map((item) => (
                  <li key={item.id} className="py-4 text-sm">
                    <p className="font-mono text-xs text-[var(--gold)]">
                      {submissionStageLabels[item.new_status]}
                    </p>
                    {item.note && (
                      <p className="mt-2 whitespace-pre-wrap text-[var(--ink-soft)]">
                        {item.note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-[var(--ink-faint)]">No review notes yet.</p>
            )}
          </section>
        </div>

        {canReview(staff.role) ? (
          <SubmissionReviewForm submission={record} />
        ) : (
          <div className="site-card p-6">
            <h2 className="text-lg font-semibold">Read-only access</h2>
            <p className="mt-2 text-sm text-[var(--ink-soft)]">
              Viewer accounts can inspect submissions without changing review stages.
            </p>
          </div>
        )}
      </div>
    </Workspace>
  )
}
