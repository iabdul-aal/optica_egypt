"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  stageLabels,
  stages,
  type Application,
  type Stage,
} from "@/lib/recruitment"
import { formatSubmitError, readJsonResponse } from "@/lib/utils"

interface StageReviewFormProps<TStage extends string> {
  heading: string
  endpoint: string
  currentStatus: TStage
  version: number
  stageOptions: readonly TStage[]
  labels: Record<TStage, string>
  notePlaceholder: string
  footerHint?: string
}

export function StageReviewForm<TStage extends string>({
  heading,
  endpoint,
  currentStatus,
  version,
  stageOptions,
  labels,
  notePlaceholder,
  footerHint,
}: StageReviewFormProps<TStage>) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => setReady(true), [])

  return (
    <form
      className="site-card space-y-5 p-6"
      onSubmit={async (event) => {
        event.preventDefault()
        const form = event.currentTarget
        const values = new FormData(form)
        const selectedStatus = values.get("status") as TStage
        setBusy(true)
        setMessage("")
        setIsError(false)
        try {
          const response = await fetch(endpoint, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              status: selectedStatus,
              note: values.get("note"),
              version,
            }),
          })
          await readJsonResponse<{ error?: string }>(response, "Unable to save.")
          setMessage("Review saved.")
          form.reset()
          router.refresh()
        } catch (err) {
          setIsError(true)
          setMessage(
            formatSubmitError(err, {
              timeoutMessage: "Save timed out. Please try again.",
              unavailableMessage: "Unable to save.",
            })
          )
        } finally {
          setBusy(false)
        }
      }}
    >
      <h2 className="text-lg font-semibold">{heading}</h2>
      <fieldset key={version} disabled={!ready || busy}>
        <legend className="mb-3 text-sm">Stage</legend>
        <div className="grid gap-2">
          {stageOptions.map((s) => (
            <label
              key={s}
              className="flex min-h-12 cursor-pointer items-center gap-3 rounded-sm border border-[var(--line)] bg-[var(--surface)] px-3 text-sm has-[:checked]:border-[var(--gold)] has-[:checked]:text-[var(--gold)]"
            >
              <input
                type="radio"
                name="status"
                value={s}
                defaultChecked={currentStatus === s}
                required
                className="h-4 w-4 accent-[var(--gold)]"
              />
              {labels[s]}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="grid gap-2 text-sm">
        Internal note
        <textarea
          name="note"
          rows={4}
          maxLength={3000}
          disabled={!ready || busy}
          className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-3 text-base"
          placeholder={notePlaceholder}
        />
      </label>
      {message && (
        <p
          role={isError ? "alert" : "status"}
          className={`text-sm ${isError ? "text-[var(--danger)]" : "text-[var(--gold)]"}`}
        >
          {message}
        </p>
      )}
      <button type="submit" className="btn-primary min-h-12 w-full" disabled={!ready || busy}>
        {busy ? "Saving…" : "Save review"}
      </button>
      {footerHint && (
        <p className="text-xs leading-5 text-[var(--ink-faint)]">{footerHint}</p>
      )}
    </form>
  )
}

export function ReviewForm({
  application,
}: {
  application: Pick<Application, "id" | "status" | "version">
}) {
  return (
    <StageReviewForm<Stage>
      heading="Review application"
      endpoint={`/api/admin/applications/${application.id}`}
      currentStatus={application.status}
      version={application.version}
      stageOptions={stages}
      labels={stageLabels}
      notePlaceholder="Add review context for the team. Notes are visible to staff only."
      footerHint="Saving records your identity and time in the review history. Applicants are not automatically emailed."
    />
  )
}
