"use client"

import { useState } from "react"
import { ArrowUpRight, CheckCircle2 } from "lucide-react"

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const fieldClass = "border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-3 font-normal text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink-soft)] focus:border-[var(--gold)]"

  return (
    <div className="py-1">
      <p className="eyebrow">Send a message</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--ink)]">How can we help?</h2>
      {sent ? <div className="mt-7 flex gap-3 border-l-2 border-[var(--gold)] bg-[var(--surface-raised)] p-5 text-[var(--ink)]" role="status"><CheckCircle2 className="mt-0.5 shrink-0 text-[var(--gold)]" size={19} /><p className="text-sm leading-6">Thanks for reaching out. Please use the email link on this page to contact the team directly while the form service is being connected.</p></div> : <form className="mt-7 grid gap-5" onSubmit={(event) => { event.preventDefault(); setSent(true) }}><label className="grid gap-2 text-sm font-semibold text-[var(--ink)]">Full name<input required className={fieldClass} /></label><label className="grid gap-2 text-sm font-semibold text-[var(--ink)]">Email address<input type="email" required className={fieldClass} /></label><label className="grid gap-2 text-sm font-semibold text-[var(--ink)]">Message<textarea required rows={5} className={fieldClass} /></label><button type="submit" className="btn-primary w-fit">Send message <ArrowUpRight size={14} /></button></form>}
    </div>
  )
}
