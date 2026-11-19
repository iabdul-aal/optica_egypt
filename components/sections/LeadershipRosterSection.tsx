import { MemberCard } from "@/components/sections/MemberCard"
import { getAdvisoryMembers, getExecutiveMembers, getOperationalMembers } from "@/lib/members"

export function LeadershipRosterSection() {
  const executive = getExecutiveMembers()
  const operational = getOperationalMembers()
  const advisory = getAdvisoryMembers()
  const totalMembers = executive.length + operational.length + advisory.length

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line)] pb-6">
        <div>
          <p className="eyebrow">Charter Composition</p>
          <h2 className="section-title mt-2">
            {totalMembers} Active Officers and Faculty Advisors
          </h2>
        </div>
        <span className="font-mono text-xs text-[var(--gold)]">
          Term 2024–2026 / Inaugural Cycle
        </span>
      </div>

      <div className="space-y-14">
        <div>
          <h3 className="eyebrow mb-6">Executive Committee ({executive.length})</h3>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-stretch">
            {executive.map((m, idx) => (
              <MemberCard key={m.id} member={m} priority={idx < 5} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="eyebrow mb-6">Operational Committee ({operational.length})</h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
            {operational.map((m) => (
              <MemberCard key={m.id} member={m} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="eyebrow mb-6">Senior Faculty Advisory Board ({advisory.length})</h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {advisory.map((m) => (
              <MemberCard key={m.id} member={m} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
