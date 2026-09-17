"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useLocale } from "next-intl"
import type { Member } from "@/types/member"
import { Mail, Linkedin, Building2 } from "lucide-react"

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
    <div className="relative group p-6 rounded-none border border-white/10 hover:border-[#fa8716] bg-[#010E17] flex flex-col justify-between h-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(250,135,22,0.15)]">
      {/* Corner crosshairs (Akhetonics style) */}
      <span className="absolute -top-1.5 -left-1.5 text-[10px] text-[#fa8716] font-mono opacity-30 group-hover:opacity-100 transition-opacity">+</span>
      <span className="absolute -bottom-1.5 -right-1.5 text-[10px] text-[#fa8716] font-mono opacity-30 group-hover:opacity-100 transition-opacity">+</span>

      <div>
        {/* Holographic Photonic Reticle Avatar */}
        <div className="relative aspect-square w-full mb-5 bg-[#00080E] border border-white/10 flex items-center justify-center overflow-hidden">
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
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
              {/* Concentric Optical Wavefront Rings */}
              <div className="absolute inset-0 bg-[radial-gradient(#00B4FF_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
              <div className="absolute w-32 h-32 rounded-full border border-[#D4AF37]/20 animate-pulse" />
              <div className="absolute w-24 h-24 rounded-full border border-[#00B4FF]/25" />
              <div className="absolute w-40 h-40 rounded-full border border-white/5" />

              {/* Crosshair Alignment Lines */}
              <div className="absolute inset-x-4 top-1/2 h-px bg-white/10" />
              <div className="absolute inset-y-4 left-1/2 w-px bg-white/10" />

              {/* Glowing Monogram Center */}
              <div className="relative z-10 w-16 h-16 rounded-full border border-[#fa8716] bg-[#010E17] flex items-center justify-center shadow-[0_0_20px_rgba(250,135,22,0.3)]">
                <span className="text-xl font-bold font-mono text-[#fa8716] tracking-wider">
                  {initials}
                </span>
              </div>

              {/* Officer Tech Tag */}
              <span className="relative z-10 text-[9px] font-mono uppercase tracking-widest text-[#00B4FF] mt-3 bg-black/60 px-2 py-0.5 border border-[#00B4FF]/30">
                OFFICER_{member.order.toString().padStart(2, "0")}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#fa8716]/15 text-[#fa8716] border border-[#fa8716]/30 font-bold">
            {role}
          </span>
          <span className="text-[10px] font-mono text-slate-500">{member.term}</span>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-[#fa8716] transition-colors">
          {name}
        </h3>

        {institution && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 font-mono">
            <Building2 size={13} className="text-[#00B4FF] shrink-0" />
            <span className="truncate">{institution}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
        <span className="text-[10px] font-mono text-slate-500 uppercase">
          {locale === "en" ? "CONNECTED" : "نشط"}
        </span>
        <div className="flex items-center gap-2">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              aria-label={`Email ${name}`}
              className="p-1.5 text-slate-400 hover:text-[#fa8716] hover:bg-white/5 transition-colors"
            >
              <Mail size={15} />
            </a>
          )}
          {member.linkedin && member.linkedin !== "none" && (
            <a
              href={`https://linkedin.com/in/${member.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn for ${name}`}
              className="p-1.5 text-slate-400 hover:text-[#00B4FF] hover:bg-white/5 transition-colors"
            >
              <Linkedin size={15} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}