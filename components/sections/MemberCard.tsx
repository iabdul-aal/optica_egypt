import Image from "next/image"
import { ArrowUpRight, Globe, Linkedin, Mail } from "lucide-react"
import { getLocalizedText, type Dictionary, type Locale } from "@/lib/locales"
import { getAssetPath } from "@/lib/utils"
import type { Member } from "@/types/member"

type MemberCardProps = {
  member: Member
  locale: Locale
  dictionary: Dictionary
}

export function MemberCard({ member, locale, dictionary }: MemberCardProps) {
  const name = getLocalizedText(member.name, locale)
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
  const hasBio = Boolean(getLocalizedText(member.bio, locale).trim())
  const hasPhoto = Boolean(member.photo)

  return (
    <article className="group/card border-t border-white/15 pt-5 transition-transform duration-300 ease-out hover:-translate-y-1">
      {/* Portrait: 4:6 (width:height = 2:3) */}
      <div className="relative aspect-[2/3] overflow-hidden bg-[var(--surface)] transition-shadow duration-300 group-hover/card:shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
        {hasPhoto ? (
          <>
            <Image
              src={getAssetPath(member.photo!)}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-top grayscale contrast-125 brightness-[0.82] transition-all duration-500 ease-out group-hover/card:scale-105 group-hover/card:grayscale-0 group-hover/card:contrast-100 group-hover/card:brightness-100"
            />
            <div className="pointer-events-none absolute inset-0 bg-[#09131F]/25 transition-opacity duration-500 group-hover/card:opacity-0" />
          </>
        ) : (
          /* Placeholder with initials */
          <div className="scientific-grid flex h-full w-full items-end justify-between p-5 text-[var(--gold)] transition-colors duration-500 group-hover/card:text-[var(--gold-pale)]" aria-label={dictionary.leadership.portraitPlaceholder.replace("{name}", name)}>
            <span className="text-5xl font-semibold tracking-[-0.1em]">{initials}</span>
            <span className="font-mono text-[0.62rem] tracking-[0.12em]">OPTICA EGYPT</span>
          </div>
        )}
      </div>

      {/* Info row */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">{getLocalizedText(member.role, locale)}</p>
          <h3 className="mt-2 text-lg font-semibold text-[var(--ink)]">{name}</h3>
          {member.institution.en && (
            <p className="mt-1 text-sm text-[var(--ink-soft)]">{getLocalizedText(member.institution, locale)}</p>
          )}
          {member.tier === "advisory" && member.specializedSector && (
            <p className="mt-2 text-[0.68rem] font-mono font-medium text-[var(--gold)]">
              {member.specializedSector}
            </p>
          )}
        </div>
        <div className="flex shrink-0 gap-2">
          {member.email && member.email !== "" && (
            <a
              href={`mailto:${member.email}`}
              aria-label={`Email ${name}`}
              className="icon-link"
            >
              <Mail size={14} aria-hidden="true" />
            </a>
          )}
          {member.website && member.website !== "" && (
            <a
              href={member.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name}'s personal website`}
              className="icon-link"
            >
              <Globe size={14} aria-hidden="true" />
            </a>
          )}
          {member.linkedin && member.linkedin !== "none" && member.linkedin !== "" && (
            <a
              href={`https://linkedin.com/in/${member.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={dictionary.leadership.linkedin.replace("{name}", name)}
              className="icon-link"
            >
              <Linkedin size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      {/* Detailed Profile */}
      {(hasBio || member.academicBackground || member.professionalFocus || member.achievements || member.opticaId || member.website) && (
        <details className="group mt-5">
          <summary className="text-link cursor-pointer list-none">{dictionary.leadership.readBio}</summary>
          <div className="mt-4 space-y-3 border-t border-white/10 pt-4 text-xs leading-relaxed text-[var(--ink-soft)]">
            {hasBio && (
              <p className="text-sm leading-6 text-[var(--ink)]">
                {getLocalizedText(member.bio, locale)}
              </p>
            )}
            {member.opticaId && (
              <div>
                <span className="font-mono text-[0.62rem] font-bold uppercase tracking-wider text-[var(--gold)]">Optica Member ID:</span>
                <p className="mt-0.5 font-mono text-[var(--ink)]">{member.opticaId}</p>
              </div>
            )}
            {member.website && (
              <div>
                <span className="font-mono text-[0.62rem] font-bold uppercase tracking-wider text-[var(--gold)]">Personal Website:</span>
                <p className="mt-0.5">
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--gold)] hover:underline inline-flex items-center gap-1 font-mono text-xs"
                  >
                    {member.website} <ArrowUpRight size={11} aria-hidden="true" />
                  </a>
                </p>
              </div>
            )}
            {member.academicBackground && (
              <div>
                <span className="font-mono text-[0.62rem] font-bold uppercase tracking-wider text-[var(--gold)]">Background:</span>
                <p className="mt-0.5 text-[var(--ink-soft)]">{member.academicBackground}</p>
              </div>
            )}
            {member.professionalFocus && (
              <div>
                <span className="font-mono text-[0.62rem] font-bold uppercase tracking-wider text-[var(--gold)]">Focus:</span>
                <p className="mt-0.5 text-[var(--ink-soft)]">{member.professionalFocus}</p>
              </div>
            )}
            {member.achievements && (
              <div>
                <span className="font-mono text-[0.62rem] font-bold uppercase tracking-wider text-[var(--gold)]">Achievements:</span>
                <p className="mt-0.5 text-[var(--ink-soft)]">{member.achievements}</p>
              </div>
            )}
          </div>
        </details>
      )}
    </article>
  )
}
