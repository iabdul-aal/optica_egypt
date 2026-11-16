"use client"
import { useEffect, useState } from "react"
import { formatSubmitError, readJsonResponse } from "@/lib/utils"

export function ChangePasswordForm() {
  const [ready, setReady] = useState(false)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState("")
  useEffect(() => setReady(true), [])
  return (
    <form className="mt-7 space-y-5" onSubmit={async (event) => {
      event.preventDefault()
      const form = new FormData(event.currentTarget)
      if (form.get("password") !== form.get("confirmation")) {
        setMessage("Your new passwords do not match.")
        return
      }
      setBusy(true)
      setMessage("")
      try {
        const response = await fetch("/auth/change-password", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentPassword: form.get("currentPassword"), password: form.get("password") })
        })
        await readJsonResponse<{ error?: string }>(
          response,
          "Unable to change password. Please try again."
        )
        window.location.assign("/admin")
      } catch (error) {
        setMessage(
          formatSubmitError(error, {
            timeoutMessage: "Password update timed out. Please try again.",
            unavailableMessage: "Unable to change password. Please try again."
          })
        )
      } finally { setBusy(false) }
    }}>
      {[
        { name: "currentPassword", label: "Current or temporary password", autoComplete: "current-password", min: 1 },
        { name: "password", label: "New password", autoComplete: "new-password", min: 12 },
        { name: "confirmation", label: "Confirm new password", autoComplete: "new-password", min: 12 }
      ].map(({ name, label, autoComplete, min }) => (
        <label key={name} className="grid gap-2 text-sm">{label}
          <input name={name} type="password" autoComplete={autoComplete} required minLength={min}
            maxLength={256} disabled={!ready || busy}
            className="min-h-12 rounded-sm border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-base" />
        </label>
      ))}
      <p className="text-xs leading-5 text-[var(--ink-faint)]">Use at least 12 characters, with a letter and a number. Choose a password you do not use elsewhere.</p>
      <button className="btn-primary min-h-12 w-full" disabled={!ready || busy}>
        {busy ? "Updating…" : "Save password and continue"}
      </button>
      {message && <p role="alert" className="text-sm leading-6 text-[var(--danger)]">{message}</p>}
    </form>
  )
}
