import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Globe, Linkedin, Mail } from "lucide-react"
import { getLocalizedText, localizedHref, type Dictionary, type Locale } from "@/lib/locales"
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
    <article className="group/card border-t border-[var(--line)] pt-5 transition-transform duration-300 ease-out hover:-translate-y-1 flex flex-col h-full justify-between">
      <div className="flex flex-col flex-grow">
        {/* Portrait: 4:6 (width:height = 2:3) */}
        <div className="relative aspect-[2/3] overflow-hidden bg-[var(--surface)] transition-shadow duration-300 group-hover/card:shadow-[0_12px_32px_rgba(0,0,0,0.5)] shrink-0">
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
        <div className={`mt-5 flex items-start justify-between gap-3 flex-grow ${
          member.tier === "executive" ? "min-h-[7.25rem]" : ""
        }`}>
          <div className="min-w-0 flex-1">
            <p className="eyebrow truncate">{getLocalizedText(member.role, locale)}</p>
            <h3 className="mt-2 text-lg font-semibold text-[var(--ink)] leading-snug">{name}</h3>
            {member.institution.en && (
              <p className="mt-1 text-sm text-[var(--ink-soft)] leading-snug">
                {getLocalizedText(member.institution, locale)}
              </p>
            )}
            {member.tier === "advisory" && member.specializedSector && (
              <p className="mt-2 text-[0.68rem] font-mono font-medium text-[var(--gold)] leading-snug">
                {member.specializedSector}
              </p>
            )}
          </div>
          <div className="flex shrink-0 gap-1.5 pt-0.5">
            {member.email && member.email !== "" && (
              <a
                href={`mailto:${member.email}`}
                aria-label={`Email ${name}`}
                className="w-7 h-7 inline-flex items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-soft)] hover:text-[var(--gold)] hover:border-[var(--gold)] hover:bg-[rgba(215,174,91,0.08)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <Mail size={13} aria-hidden="true" />
              </a>
            )}
            {member.website && member.website !== "" && (
              <a
                href={member.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name}'s personal website`}
                className="w-7 h-7 inline-flex items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-soft)] hover:text-[var(--gold)] hover:border-[var(--gold)] hover:bg-[rgba(215,174,91,0.08)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <Globe size={13} aria-hidden="true" />
              </a>
            )}
            {member.linkedin && member.linkedin !== "none" && member.linkedin !== "" && (
              <a
                href={`https://linkedin.com/in/${member.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={dictionary.leadership.linkedin.replace("{name}", name)}
                className="w-7 h-7 inline-flex items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-soft)] hover:text-[var(--gold)] hover:border-[var(--gold)] hover:bg-[rgba(215,174,91,0.08)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <Linkedin size={13} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bio Link - Click to dedicated page, flush at baseline */}
      {(hasBio || member.academicBackground || member.professionalFocus || member.achievements || member.opticaId) ? (
        <div className="mt-auto pt-4 border-t border-[var(--line-subtle)]">
          <Link
            href={localizedHref(locale, `/leadership/${member.id}`)}
            className="text-link group-hover/card:text-[var(--gold)] inline-flex items-center gap-1.5"
          >
            <span>{dictionary.leadership.readBio}</span>
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      ) : null}
    </article>
  )
}
