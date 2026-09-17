"use client"

import React, { useState } from "react"
import Image from "next/image"
import type { Member } from "@/types/member"
import { Mail, Linkedin } from "lucide-react"

export function MemberCard({ member }: { member: Member }) {
  const [imageError, setImageError] = useState(true)

  const name = member.name.en
  const role = member.role.en
  const institution = member.institution.en

  const initials = member.name.en
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const photoSrc = `/people/leadership/${member.photo}`

  return (
    <div className="p-6 bg-[#000000] border border-white/10 hover:border-[#fa8716] flex flex-col justify-between h-full transition-all group">
      <div>
        {/* Officer Portrait / Monogram Frame */}
        <div className="relative aspect-[4/5] w-full mb-5 bg-[#000000] border border-white/10 flex items-center justify-center overflow-hidden">
          {!imageError && member.photo ? (
            <Image
              src={photoSrc}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#000000] to-[#000000]">
              {/* Subtle architectural hairline cross */}
              <div className="absolute inset-x-8 top-1/2 h-px bg-white/5" />
              <div className="absolute inset-y-8 left-1/2 w-px bg-white/5" />

              <div className="relative z-10 w-16 h-16 border border-[#fa8716]/40 group-hover:border-[#fa8716] bg-[#000000] flex items-center justify-center transition-colors">
                <span className="text-xl font-bold font-mono text-[#fa8716] tracking-wider">
                  {initials}
                </span>
              </div>

              <span className="relative z-10 editorial-label text-[9px] text-slate-500 mt-4">
                OFFICER_{member.order.toString().padStart(2, "0")}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex items-center justify-between mb-2">
          <span className="editorial-label text-[#fa8716] font-bold">
            {role}
          </span>
          <span className="editorial-label text-slate-500">{member.term}</span>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-[#fa8716] transition-colors">
          {name}
        </h3>

        {institution && (
          <p className="text-xs text-slate-400 font-mono mb-4">
            {institution}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
        <span className="editorial-label text-[9px] text-slate-500">
          ACTIVE TENURE
        </span>
        <div className="flex items-center gap-2">
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