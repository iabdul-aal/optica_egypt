"use client"

import { useState } from "react"
import { Copy, Check, FileText } from "lucide-react"
import { copyTextSafely } from "@/lib/clipboard"

type BoilerplateBoxProps = {
  title: string
  body: string
  short: string
}

export function BoilerplateBox({ title, body, short }: BoilerplateBoxProps) {
  const [copiedFull, setCopiedFull] = useState(false)
  const [copiedShort, setCopiedShort] = useState(false)

  async function handleCopy(text: string, isShort: boolean) {
    const ok = await copyTextSafely(text)
    if (!ok) return
    if (isShort) {
      setCopiedShort(true)
      setTimeout(() => setCopiedShort(false), 2000)
    } else {
      setCopiedFull(true)
      setTimeout(() => setCopiedFull(false), 2000)
    }
  }

  return (
    <div className="border-y border-[var(--line)] py-8 sm:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--line-subtle)]">
        <div className="flex items-center gap-2.5">
          <FileText size={16} className="text-[var(--gold)] shrink-0" aria-hidden="true" />
          <h3 className="text-base sm:text-lg font-bold text-[var(--ink)]">
            {title}
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => handleCopy(body, false)}
            className="btn-secondary min-h-[48px]"
          >
            {copiedFull ? <Check size={13} className="text-[var(--gold)]" /> : <Copy size={13} />}
            <span>{copiedFull ? "Copied" : "Copy Boilerplate"}</span>
          </button>
          <button
            type="button"
            onClick={() => handleCopy(short, true)}
            className="btn-secondary min-h-[48px]"
          >
            {copiedShort ? <Check size={13} className="text-[var(--gold)]" /> : <Copy size={13} />}
            <span>{copiedShort ? "Copied Short" : "Copy Short Version"}</span>
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
          {body}
        </p>
        <div className="pt-4 border-t border-[var(--line-subtle)]">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)] block mb-1.5">
            Short Paragraph Format:
          </span>
          <p className="text-xs italic leading-relaxed text-[var(--ink-soft)]">
            &ldquo;{short}&rdquo;
          </p>
        </div>
      </div>
    </div>
  )
}
