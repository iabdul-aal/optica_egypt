"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { roles } from "@/lib/recruitment"
export function StaffForm() {
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
        setBusy(true)
        setMessage("")
        setIsError(false)
        const values = new FormData(event.currentTarget)
        try {
          const response = await fetch("/api/admin/staff", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: values.get("email"),
              role: values.get("role") || null
            })
          })
          const data = await response.json()
          if (!response.ok) throw new Error(data.error)
          setMessage("Staff access updated.")
          router.refresh()
        } catch (err) {
          setIsError(true)
          setMessage(
            err instanceof Error ? err.message : "Unable to update access."
          )
        } finally {
          setBusy(false)
        }
      }}
    >
      <h2 className="text-xl font-semibold">Set staff access</h2>
      <p className="text-sm leading-6 text-[var(--ink-soft)]">
        Use the email of an existing account in Supabase Authentication. This
        changes dashboard permissions immediately.
      </p>
      <label className="grid gap-2 text-sm">
        Staff email
        <input
          type="email"
          name="email"
          required
          maxLength={254}
          disabled={!ready || busy}
          className="min-h-12 rounded-sm border border-[var(--line)] bg-[var(--surface)] p-3 text-base"
        />
      </label>
      <label className="grid gap-2 text-sm">
        Role
        <select
          name="role"
          defaultValue="viewer"
          disabled={!ready || busy}
          className="min-h-12 rounded-sm border border-[var(--line)] bg-[var(--surface)] p-3 text-base"
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
          <option value="">Remove staff access</option>
        </select>
      </label>
      {message && (
        <p
          role={isError ? "alert" : "status"}
          className={`text-sm ${isError ? "text-[var(--danger)]" : "text-[var(--gold)]"}`}
        >
          {message}
        </p>
      )}
      <button disabled={!ready || busy} className="btn-primary min-h-12">
        {busy ? "Saving…" : "Update access"}
      </button>
    </form>
  )
}
