import membershipData from "@/data/membership_tiers.json"

export interface MembershipTier {
  id: string
  cohort: string
  name: string
  tag: string
  audience: string
  pricingNote: string
  valueProposition: string
  benefits: string[]
  opticaUrl: string
  ctaLabel: string
  localPath: string
}

export function getAllMembershipTiers(): MembershipTier[] {
  return membershipData as MembershipTier[]
}

export function getMembershipTierById(id: string): MembershipTier | undefined {
  return (membershipData as MembershipTier[]).find((tier) => tier.id === id)
}
