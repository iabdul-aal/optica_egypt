import Image from "next/image"
import { Linkedin, Mail } from "lucide-react"
import { getLocalizedText, type Dictionary, type Locale } from "@/lib/locales"
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
    <article className="border-t border-white/15 pt-5">
      {/* Portrait — 4:6 (width:height = 2:3) */}
      <div className="relative aspect-[2/3] overflow-hidden bg-[var(--surface)]">
        {hasPhoto ? (
          <Image
            src={member.photo!}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-top"
          />
        ) : (
          /* Placeholder with initials */
          <div className="scientific-grid flex h-full w-full items-end justify-between p-5 text-[var(--gold)]" aria-label={dictionary.leadership.portraitPlaceholder.replace("{name}", name)}>
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

      {/* Biography */}
      {hasBio && (
        <details className="group mt-5">
          <summary className="text-link cursor-pointer list-none">{dictionary.leadership.readBio}</summary>
          <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-7 text-[var(--ink-soft)]">
            {getLocalizedText(member.bio, locale)}
          </p>
        </details>
      )}
    </article>
  )
}
