"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  stageLabels,
  stages,
  type Application,
  type Stage
} from "@/lib/recruitment"
export function ReviewForm({
  application
}: {
  application: Pick<Application, "id" | "status" | "version">
}) {
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
        const selectedStatus = values.get("status") as Stage
        setBusy(true)
        setMessage("")
        setIsError(false)
        try {
          const response = await fetch(
            `/api/admin/applications/${application.id}`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                status: selectedStatus,
                note: values.get("note"),
                version: application.version
              })
            }
          )
          const data = await response.json()
          if (!response.ok) throw new Error(data.error)
          setMessage("Review saved.")
          form.reset()
          router.refresh()
        } catch (err) {
          setIsError(true)
          setMessage(err instanceof Error ? err.message : "Unable to save.")
        } finally {
          setBusy(false)
        }
      }}
    >
      <h2 className="text-lg font-semibold">Review application</h2>
      <fieldset key={application.version} disabled={!ready || busy}>
        <legend className="mb-3 text-sm">Stage</legend>
        <div className="grid gap-2">
          {stages.map((s) => (
            <label
              key={s}
              className="flex min-h-12 cursor-pointer items-center gap-3 rounded-sm border border-[var(--line)] bg-[var(--surface)] px-3 text-sm has-[:checked]:border-[var(--gold)] has-[:checked]:text-[var(--gold)]"
            >
              <input
                type="radio"
                name="status"
                value={s}
                defaultChecked={application.status === s}
                required
                className="h-4 w-4 accent-[var(--gold)]"
              />
              {stageLabels[s]}
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
          placeholder="Add review context for the team. Notes are visible to staff only."
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
      <button className="btn-primary min-h-12 w-full" disabled={!ready || busy}>
        {busy ? "Saving…" : "Save review"}
      </button>
      <p className="text-xs leading-5 text-[var(--ink-faint)]">
        Saving records your identity and time in the review history. Applicants
        are not automatically emailed.
      </p>
    </form>
  )
}
