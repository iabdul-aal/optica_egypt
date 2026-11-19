import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Globe, Linkedin, Mail } from "lucide-react"
import { getAssetPath } from "@/lib/utils"
import type { Member } from "@/types/member"

export function MemberCard({
  member,
  priority = false,
}: {
  member: Member
  priority?: boolean
}) {
  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
  const hasPhoto = Boolean(member.photo)

  return (
    <article className="group/card border-t border-[var(--line)] hover:border-[var(--gold)] pt-5 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 flex flex-col h-full min-w-0 justify-between">
      <div className="flex flex-col flex-grow min-w-0">
        <div className="relative aspect-[2/3] overflow-hidden bg-[var(--surface)] transition-shadow duration-300 group-hover/card:shadow-[0_12px_32px_rgba(0,0,0,0.45)] shrink-0">
          {hasPhoto ? (
            <Image
              src={getAssetPath(member.photo)}
              alt={member.name}
              fill
              priority={priority}
              decoding="async"
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 24vw"
              className="figure-bw object-cover object-top transition-[filter,transform] duration-500 ease-out group-hover/card:scale-[1.03]"
            />
          ) : (
            <div className="scientific-grid flex h-full w-full items-end justify-between p-5 text-[var(--gold)]">
              <span className="text-5xl font-semibold tracking-[-0.1em]">{initials}</span>
              <span className="font-mono text-[0.62rem] tracking-[0.12em]">OPTICA EGYPT</span>
            </div>
          )}
        </div>

        <div className="mt-5 min-w-0">
          <p className="eyebrow break-words">{member.role}</p>
          <h3 className="mt-2 text-lg font-semibold text-[var(--ink)] leading-snug">
            {member.name}
          </h3>
          {member.institution && (
            <p className="mt-1 text-sm text-[var(--ink-soft)] leading-snug">
              {member.institution}
            </p>
          )}
          {member.tier === "advisory" && member.specializedSector && (
            <p className="mt-2 text-[0.68rem] font-mono font-medium text-[var(--gold)] leading-snug">
              {member.specializedSector}
            </p>
          )}
        </div>
      </div>

      <div className="mt-auto pt-3 flex items-center justify-between gap-2">
        <Link
          href={`/leadership/${member.id}`}
          className="text-link group-hover/card:text-[var(--gold)] inline-flex min-h-[48px] items-center gap-1.5"
        >
          <span>Profile</span>
          <ArrowUpRight size={13} aria-hidden="true" />
        </Link>

        <div className="flex items-center -mr-2">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              aria-label={`Email ${member.name}`}
              className="group/icon inline-flex min-h-[48px] min-w-[48px] items-center justify-center"
            >
              <span className="w-8 h-8 inline-flex items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-soft)] group-hover/icon:text-[var(--gold)] group-hover/icon:border-[var(--gold)] transition-colors">
                <Mail size={14} aria-hidden="true" />
              </span>
            </a>
          )}
          {member.website && (
            <a
              href={member.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} website`}
              className="group/icon inline-flex min-h-[48px] min-w-[48px] items-center justify-center"
            >
              <span className="w-8 h-8 inline-flex items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-soft)] group-hover/icon:text-[var(--gold)] group-hover/icon:border-[var(--gold)] transition-colors">
                <Globe size={14} aria-hidden="true" />
              </span>
            </a>
          )}
          {member.linkedin && member.linkedin !== "none" && (
            <a
              href={`https://linkedin.com/in/${member.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="group/icon inline-flex min-h-[48px] min-w-[48px] items-center justify-center"
            >
              <span className="w-8 h-8 inline-flex items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-soft)] group-hover/icon:text-[var(--gold)] group-hover/icon:border-[var(--gold)] transition-colors">
                <Linkedin size={14} aria-hidden="true" />
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
