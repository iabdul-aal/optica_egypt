"use client"
import { useEffect, useState } from "react"

export function LoginForm() {
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState("")
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])
  return (
    <form
      className="mt-7 space-y-5"
      onSubmit={async (event) => {
        event.preventDefault()
        const form = new FormData(event.currentTarget)
        setBusy(true)
        setMessage("")
        try {
          const response = await fetch("/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: form.get("email"),
              password: form.get("password")
            })
          })
          const data = await response.json()
          if (!response.ok) throw new Error(data.error)
          window.location.assign(data.redirect)
        } catch (error) {
          setMessage(error instanceof Error ? error.message : "Unable to sign in. Please try again.")
        } finally {
          setBusy(false)
        }
      }}
    >
      <label className="grid gap-2 text-sm">
        Staff email
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          disabled={!ready || busy}
          className="min-h-12 rounded-sm border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-base"
        />
      </label>
      <label className="grid gap-2 text-sm">
        Password
        <input name="password" type="password" autoComplete="current-password"
          required maxLength={256} disabled={!ready || busy}
          className="min-h-12 rounded-sm border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-base" />
      </label>
      <button className="btn-primary min-h-12 w-full" disabled={!ready || busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
      {message && (
        <p role="alert" className="text-sm leading-6 text-[var(--danger)]">
          {message}
        </p>
      )}
      <p className="text-xs leading-5 text-[var(--ink-faint)]">
        First time here? Use the temporary password from your administrator.
        You must replace it before opening the dashboard. Contact your
        administrator if you need a password reset.
      </p>
    </form>
  )
}
