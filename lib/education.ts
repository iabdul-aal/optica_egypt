import educationData from "@/data/education.json"

export interface SchoolModule {
  id: string
  number: string
  title: string
  description: string
  instructor: string
}

export interface SchoolHighlight {
  title: string
  description: string
}

export interface PhotonicsSchool {
  name: string
  edition: string
  eyebrow: string
  tagline: string
  description: string
  hostInstitution: string
  dates: string
  location: string
  format: string
  eligibility: string
  certificate: string
  tuition: string
  modules: SchoolModule[]
  highlights: SchoolHighlight[]
}

export interface WebinarItem {
  id: string
  title: string
  speaker: string
  role: string
  date: string
  time: string
  platform: string
  abstract: string
  status: string
  registrationUrl: string
}

export interface WebinarsSection {
  eyebrow: string
  title: string
  description: string
  features: string[]
  schedule: WebinarItem[]
}

export interface EducationContest {
  id: string
  title: string
  category: string
  description: string
  href: string
  badge: string
}

export interface ContestsSection {
  eyebrow: string
  title: string
  description: string
  items: EducationContest[]
}

export interface EducationData {
  school: PhotonicsSchool
  webinars: WebinarsSection
  contests: ContestsSection
}

export function getEducationData(): EducationData {
  return educationData
}

export function getPhotonicsSchool(): PhotonicsSchool {
  return educationData.school
}

export function getWebinars(): WebinarsSection {
  return educationData.webinars
}

export function getEducationContests(): ContestsSection {
  return educationData.contests
}
