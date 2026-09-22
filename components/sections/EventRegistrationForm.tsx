"use client"

import { useState } from "react"
import { ArrowUpRight, CheckCircle2 } from "lucide-react"

type EventRegistrationFormProps = {
  eventTitle: string
  eventDate: string
  email: string
}

export function EventRegistrationForm({ eventTitle, eventDate, email }: EventRegistrationFormProps) {
  const [prepared, setPrepared] = useState(false)
  const fieldClass = "border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-3 text-[var(--ink)] outline-none transition-colors focus:border-[var(--gold)]"

  function prepareRegistration(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const body = [
      "Event registration request",
      "",
      `Event: ${eventTitle}`,
      `Date: ${eventDate}`,
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Institution: ${formData.get("institution")}`,
      `Role or study level: ${formData.get("role")}`,
    ].join("\n")
    setPrepared(true)
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Event registration: ${eventTitle}`)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form className="grid gap-5" onSubmit={prepareRegistration}>
      <p className="border-l-2 border-[var(--gold)] pl-4 text-sm leading-6 text-[var(--ink-soft)]">Complete the details below. Your mail app will open a pre-filled registration request for the Optica Egypt team to review.</p>
      <label className="grid gap-2 text-sm font-semibold text-[var(--ink)]">Full name<input name="name" required autoComplete="name" className={fieldClass} /></label>
      <label className="grid gap-2 text-sm font-semibold text-[var(--ink)]">Email address<input name="email" type="email" required autoComplete="email" className={fieldClass} /></label>
      <label className="grid gap-2 text-sm font-semibold text-[var(--ink)]">Institution or organisation<input name="institution" required className={fieldClass} /></label>
      <label className="grid gap-2 text-sm font-semibold text-[var(--ink)]">Role or study level <span className="font-normal text-[var(--ink-soft)]">optional</span><input name="role" className={fieldClass} /></label>
      <button type="submit" className="btn-primary w-fit">Prepare registration email <ArrowUpRight size={14} /></button>
      {prepared && <p className="flex items-start gap-2 text-sm leading-6 text-[var(--ink-soft)]" role="status"><CheckCircle2 className="mt-0.5 shrink-0 text-[var(--gold)]" size={17} />Your registration email has been prepared. Review it and send it from your mail app.</p>}
    </form>
  )
}
