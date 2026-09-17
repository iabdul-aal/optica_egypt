import Image from "next/image"
import type { Member } from "@/types/member"
import { Badge } from "@/components/ui/Badge"
import { Mail, Linkedin } from "lucide-react"

export function MemberCard({ member }: { member: Member }) {
  const photoSrc = `/people/leadership/${member.photo}`
  return (
    <div className="card overflow-hidden group">
      <div className="relative aspect-[4/5] bg-[#09131F]">
        <Image
          src={photoSrc}
          alt={member.name.en}
          fill
          className="object-cover"
          onError={() => {}}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1">{member.name.en}</h3>
        <Badge variant="gold" className="mb-3">{member.role.en}</Badge>
        {member.institution.en && (
          <p className="text-xs text-muted mb-3">{member.institution.en}</p>
        )}
        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
          {member.email && (
            <a href={`mailto:${member.email}`} aria-label="Email" className="text-muted hover:text-teal transition-colors">
              <Mail size={15} />
            </a>
          )}
          {member.linkedin && member.linkedin !== "none" && (
            <a href={`https://linkedin.com/in/${member.linkedin}`} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted hover:text-teal transition-colors">
              <Linkedin size={15} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}