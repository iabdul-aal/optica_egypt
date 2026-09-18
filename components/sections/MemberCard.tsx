"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowUpRight, Linkedin, Mail, X } from "lucide-react"
import type { Member } from "@/types/member"

export function MemberCard({ member }: { member: Member }) {
  const [photoAvailable, setPhotoAvailable] = useState(false)
  const [bioOpen, setBioOpen] = useState(false)
  const initials = member.name.en.split(" ").map((word) => word[0]).join("").slice(0, 2)
  const hasBio = Boolean(member.bio?.en?.trim())

  useEffect(() => {
    let current = true
    const portrait = new window.Image()
    portrait.onload = () => {
      if (current) setPhotoAvailable(true)
    }
    portrait.src = `/people/leadership/${member.photo}`
    return () => {
      current = false
    }
  }, [member.photo])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setBioOpen(false)
    }
    if (bioOpen) window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [bioOpen])

  return (
    <>
      <article className="group border-t border-white/15 pt-5">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#171b1c]">
          {photoAvailable ? (
            <Image
              src={`/people/leadership/${member.photo}`}
              alt={`Portrait of ${member.name.en}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover grayscale transition duration-500 ease-out group-hover:scale-[1.025] group-hover:grayscale-0"
            />
          ) : (
            <div className="scientific-grid flex h-full items-end justify-between p-5 text-[var(--gold)]" aria-label={`Portrait placeholder for ${member.name.en}`}>
              <span className="text-5xl font-semibold tracking-[-0.1em]">{initials}</span>
              <span className="font-mono text-[0.62rem] tracking-[0.12em]">OPTICA EGYPT</span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#070808]/70 to-transparent" aria-hidden="true" />
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div><p className="eyebrow">{member.role.en}</p><h3 className="mt-2 text-lg font-semibold text-[var(--ink)]">{member.name.en}</h3><p className="mt-1 text-sm text-[var(--ink-soft)]">{member.institution.en}</p></div>
          <div className="flex shrink-0 gap-3 text-[var(--gold)]">{member.email && <a href={`mailto:${member.email}`} aria-label={`Email ${member.name.en}`} className="grid size-7 place-items-center transition-colors hover:text-[var(--ink)]"><Mail size={15} /></a>}{member.linkedin && member.linkedin !== "none" && <a href={`https://linkedin.com/in/${member.linkedin}`} target="_blank" rel="noreferrer" aria-label={`${member.name.en} LinkedIn`} className="grid size-7 place-items-center transition-colors hover:text-[var(--ink)]"><Linkedin size={15} /></a>}</div>
        </div>
        {hasBio && <button onClick={() => setBioOpen(true)} className="text-link mt-5">Read bio <ArrowUpRight size={14} /></button>}
      </article>

      {bioOpen && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/75 p-5" role="presentation" onMouseDown={() => setBioOpen(false)}>
          <section className="relative w-full max-w-lg border border-white/20 bg-[#101416] p-7 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby={`bio-title-${member.id}`} onMouseDown={(event) => event.stopPropagation()}>
            <button onClick={() => setBioOpen(false)} className="absolute right-4 top-4 grid size-8 place-items-center text-[var(--ink)] transition-colors hover:text-[var(--gold)]" aria-label={`Close ${member.name.en}'s biography`}><X size={18} /></button>
            <p className="eyebrow">{member.role.en}</p>
            <h3 id={`bio-title-${member.id}`} className="mt-3 pr-10 text-2xl font-semibold tracking-tight text-[var(--ink)]">{member.name.en}</h3>
            <p className="mt-1 text-sm text-[var(--ink-soft)]">{member.institution.en}</p>
            <p className="mt-7 border-t border-white/10 pt-6 text-sm leading-7 text-[var(--ink-soft)]">{member.bio.en}</p>
          </section>
        </div>
      )}
    </>
  )
}
