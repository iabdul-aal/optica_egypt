"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useLocale } from "next-intl"
import type { Member } from "@/types/member"
import { Mail, Linkedin } from "lucide-react"

export function MemberCard({ member }: { member: Member }) {
  const locale = useLocale()
  const [imageError, setImageError] = useState(true) // Default to true until photo assets are uploaded by user

  const name = member.name[locale as "en" | "ar"] || member.name.en
  const role = member.role[locale as "en" | "ar"] || member.role.en
  const institution = member.institution[locale as "en" | "ar"] || member.institution.en

  // Initials for holographic photonic avatar
  const initials = member.name.en
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const photoSrc = `/people/leadership/${member.photo}`

  return (
    <div className="reticle-box p-5 border border-white/10 hover:border-[#fa8716] bg-[#02060B] flex flex-col justify-between h-full transition-colors duration-150">
      <div>
        {/* Holographic Photonic Reticle Avatar */}
        <div className="relative aspect-square w-full mb-4 bg-[#000000] border border-white/10 flex items-center justify-center overflow-hidden">
          {!imageError && member.photo ? (
            <Image
              src={photoSrc}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
              {/* Precision Square Target Reticle */}
              <div className="absolute w-36 h-36 border border-white/5" />
              <div className="absolute w-28 h-28 border border-[#fa8716]/20" />
              <div className="absolute w-20 h-20 border border-[#5CB1A2]/25" />

              {/* Crosshair Alignment Lines */}
              <div className="absolute inset-x-2 top-1/2 h-px bg-white/10" />
              <div className="absolute inset-y-2 left-1/2 w-px bg-white/10" />

              {/* Monogram Center */}
              <div className="relative z-10 w-14 h-14 border border-[#fa8716] bg-[#000000] flex items-center justify-center">
                <span className="text-base font-bold font-mono text-[#fa8716] tracking-wider">
                  {initials}
                </span>
              </div>

              {/* Officer Tech Tag */}
              <span className="relative z-10 text-[9px] font-mono uppercase tracking-widest text-[#5CB1A2] mt-3 bg-black px-2 py-0.5 border border-white/10">
                OFFICER_{member.order.toString().padStart(2, "0")}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono px-2 py-0.5 bg-[#fa8716]/10 text-[#fa8716] border border-[#fa8716]/30 font-bold uppercase tracking-wider">
            {role}
          </span>
          <span className="text-[10px] font-mono text-slate-500">{member.term}</span>
        </div>

        <h3 className="text-base font-bold text-white mb-1.5 leading-snug">
          {name}
        </h3>

        {institution && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 font-mono">
            <span className="text-[#5CB1A2] font-mono text-xs">{"//"}</span>
            <span className="truncate">{institution}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-auto">
        <span className="text-[10px] font-mono text-slate-500 uppercase">
          {locale === "en" ? "ACTIVE OFFICER" : "عضو قيادي"}
        </span>
        <div className="flex items-center gap-1.5">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              aria-label={`Email ${name}`}
              className="w-7 h-7 flex items-center justify-center border border-white/10 text-slate-400 hover:text-[#fa8716] hover:border-[#fa8716] transition-colors"
            >
              <Mail size={13} />
            </a>
          )}
          {member.linkedin && member.linkedin !== "none" && (
            <a
              href={`https://linkedin.com/in/${member.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} LinkedIn`}
              className="w-7 h-7 flex items-center justify-center border border-white/10 text-slate-400 hover:text-[#fa8716] hover:border-[#fa8716] transition-colors"
            >
              <Linkedin size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}