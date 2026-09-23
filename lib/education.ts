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

export interface BootcampTool {
  name: string
  purpose: string
}

export interface CadBootcampSection {
  eyebrow: string
  title: string
  description: string
  tools: BootcampTool[]
}

export interface EducationalPathway {
  stage: string
  level: string
  focus: string
  description: string
}

export interface UniversityHostingSection {
  eyebrow: string
  title: string
  description: string
}

export interface EducationData {
  school: PhotonicsSchool
  cadBootcamp: CadBootcampSection
  educationalPathways: EducationalPathway[]
  universityHosting: UniversityHostingSection
}

export function getEducationData(): EducationData {
  return educationData
}

export function getPhotonicsSchool(): PhotonicsSchool {
  return educationData.school
}

export function getCadBootcamp(): CadBootcampSection {
  return educationData.cadBootcamp
}

export function getEducationalPathways(): EducationalPathway[] {
  return educationData.educationalPathways
}

export function getUniversityHosting(): UniversityHostingSection {
  return educationData.universityHosting
}
