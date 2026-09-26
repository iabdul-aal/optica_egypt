"use client"

import { useState } from "react"
import { Copy, Check, FileText } from "lucide-react"

type BoilerplateBoxProps = {
  title: string
  body: string
  short: string
}

export function BoilerplateBox({ title, body, short }: BoilerplateBoxProps) {
  const [copiedFull, setCopiedFull] = useState(false)
  const [copiedShort, setCopiedShort] = useState(false)

  function handleCopy(text: string, isShort: boolean) {
    navigator.clipboard.writeText(text)
    if (isShort) {
      setCopiedShort(true)
      setTimeout(() => setCopiedShort(false), 2000)
    } else {
      setCopiedFull(true)
      setTimeout(() => setCopiedFull(false), 2000)
    }
  }

  return (
    <div className="site-card p-6 sm:p-8 border-l-4 border-l-[var(--gold)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line-subtle)]">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-[var(--gold)] shrink-0" aria-hidden="true" />
          <h3 className="text-base sm:text-lg font-bold text-[var(--ink)]">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleCopy(body, false)}
            className="inline-flex items-center gap-1.5 rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] px-3 py-1.5 text-xs font-semibold text-[var(--ink)] hover:border-[var(--gold)] transition-colors min-h-[40px]"
          >
            {copiedFull ? <Check size={13} className="text-[var(--gold)]" /> : <Copy size={13} />}
            <span>{copiedFull ? "Copied" : "Copy Boilerplate"}</span>
          </button>
          <button
            type="button"
            onClick={() => handleCopy(short, true)}
            className="inline-flex items-center gap-1.5 rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] px-3 py-1.5 text-xs font-semibold text-[var(--ink)] hover:border-[var(--gold)] transition-colors min-h-[40px]"
          >
            {copiedShort ? <Check size={13} className="text-[var(--gold)]" /> : <Copy size={13} />}
            <span>{copiedShort ? "Copied Short" : "Copy Short Version"}</span>
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <p className="text-xs sm:text-sm leading-relaxed text-[var(--ink-soft)]">
          {body}
        </p>
        <div className="pt-3 border-t border-[var(--line-subtle)]">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)] block mb-1">
            Short Paragraph Format:
          </span>
          <p className="text-xs italic text-[var(--ink-soft)]">
            &ldquo;{short}&rdquo;
          </p>
        </div>
      </div>
    </div>
  )
}
