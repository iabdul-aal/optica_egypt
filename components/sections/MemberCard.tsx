"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useLocale } from "next-intl"
import type { Member } from "@/types/member"
import { Badge } from "@/components/ui/Badge"
import { Mail, Linkedin } from "lucide-react"

export function MemberCard({ member }: { member: Member }) {
  const locale = useLocale()
  const [imageError, setImageError] = useState(false)

  const name = member.name[locale as "en" | "ar"] || member.name.en
  const role = member.role[locale as "en" | "ar"] || member.role.en
  const institution = member.institution[locale as "en" | "ar"] || member.institution.en

  // Initials for fallback avatar
  const initials = member.name.en
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const photoSrc = `/people/leadership/${member.photo}`

  return (
    <div className="card overflow-hidden group flex flex-col h-full transition-all duration-300 hover:translate-y-[-4px]">
      <div className="relative aspect-[4/5] bg-[#09131F] flex items-center justify-center overflow-hidden border-b border-[var(--border)]">
        {!imageError && member.photo ? (
          <Image
            src={photoSrc}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          /* High-end Branded Fallback Avatar */
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#111827] to-[#09131F]">
            {/* Concentric optic rings */}
            <div className="absolute w-40 h-40 rounded-full border border-[#D4AF37]/15 animate-pulse" />
            <div className="absolute w-28 h-28 rounded-full border border-[#00ADEF]/20" />
            <div className="relative z-10 w-20 h-20 rounded-full border-2 border-[var(--accent-secondary)] bg-[#09131F] shadow-xl flex items-center justify-center">
              <span className="text-xl font-bold tracking-wider text-[var(--accent-secondary)] font-heading">
                {initials}
              </span>
            </div>
            <span className="relative z-10 text-[10px] uppercase tracking-widest text-[#00ADEF] mt-4 font-semibold">
              Optica Egypt
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-bold text-base mb-1.5 leading-snug">{name}</h3>
          <Badge variant="gold" className="mb-2.5 inline-block text-xs py-0.5 px-2">
            {role}
          </Badge>
          {institution && (
            <p className="text-xs text-[var(--foreground-muted)] mb-4 leading-relaxed line-clamp-2">
              {institution}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-[var(--border)] opacity-80 group-hover:opacity-100 transition-opacity">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              aria-label={`Email ${name}`}
              className="p-1.5 rounded-md text-[var(--foreground-muted)] hover:text-[var(--accent)] hover:bg-[var(--surface)] transition-colors"
            >
              <Mail size={16} />
            </a>
          )}
          {member.linkedin && member.linkedin !== "none" && (
            <a
              href={`https://linkedin.com/in/${member.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn for ${name}`}
              className="p-1.5 rounded-md text-[var(--foreground-muted)] hover:text-[var(--accent)] hover:bg-[var(--surface)] transition-colors"
            >
              <Linkedin size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}