import { Linkedin } from "lucide-react"
import { getLocalizedText, type Dictionary, type Locale } from "@/lib/locales"
import type { Member } from "@/types/member"

type MemberCardProps = {
  member: Member
  locale: Locale
  dictionary: Dictionary
}

export function MemberCard({ member, locale, dictionary }: MemberCardProps) {
  const initials = getLocalizedText(member.name, locale).split(" ").map((word) => word[0]).join("").slice(0, 2)
  const hasBio = Boolean(getLocalizedText(member.bio, locale).trim())

  return (
    <article className="border-t border-white/15 pt-5">
      <div className="scientific-grid flex aspect-[4/3] items-end justify-between bg-[var(--surface)] p-5 text-[var(--gold)]" aria-label={dictionary.leadership.portraitPlaceholder.replace("{name}", getLocalizedText(member.name, locale))}>
        <span className="text-5xl font-semibold tracking-[-0.1em]">{initials}</span>
        <span className="font-mono text-[0.62rem] tracking-[0.12em]">OPTICA EGYPT</span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div><p className="eyebrow">{getLocalizedText(member.role, locale)}</p><h3 className="mt-2 text-lg font-semibold text-[var(--ink)]">{getLocalizedText(member.name, locale)}</h3><p className="mt-1 text-sm text-[var(--ink-soft)]">{getLocalizedText(member.institution, locale)}</p></div>
        {member.linkedin && member.linkedin !== "none" && <a href={`https://linkedin.com/in/${member.linkedin}`} target="_blank" rel="noopener noreferrer" aria-label={dictionary.leadership.linkedin.replace("{name}", getLocalizedText(member.name, locale))} className="icon-link shrink-0"><Linkedin size={15} aria-hidden="true" /></a>}
      </div>
      {hasBio && <details className="group mt-5"><summary className="text-link cursor-pointer list-none">{dictionary.leadership.readBio}</summary><p className="mt-4 border-t border-white/10 pt-4 text-sm leading-7 text-[var(--ink-soft)]">{getLocalizedText(member.bio, locale)}</p></details>}
    </article>
  )
}
