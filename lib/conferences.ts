import conferencesData from "@/data/conferences.json"

export interface ConferenceFlagship {
  name: string
  acronym: string
  edition: string
  eyebrow: string
  motto: string
  dates: string
  location: string
  venue: string
  description: string
  proceedings: string
  format: string
}

export interface ConferenceTrack {
  id: string
  number: string
  title: string
  scope: string
  topics: string[]
}

export interface ConferenceDeadline {
  milestone: string
  date: string
  status: string
}

export interface CommitteeMember {
  name: string
  role: string
  institution: string
}

export interface ConferenceCommittees {
  generalChairs: CommitteeMember[]
  tpcChairs: CommitteeMember[]
  publicationChairs: CommitteeMember[]
  steeringCommittee: CommitteeMember[]
}

export interface RegistrationTier {
  tier: string
  fee: string
  description: string
}

export interface AuthorGuidelines {
  pageLimit: string
  peerReview: string
  templates: string
}

export interface ConferencesData {
  flagship: ConferenceFlagship
  tracks: ConferenceTrack[]
  deadlines: ConferenceDeadline[]
  committees: ConferenceCommittees
  registration: RegistrationTier[]
  authorGuidelines: AuthorGuidelines
}

export function getConferencesData(): ConferencesData {
  return conferencesData
}

export function getFlagshipConference(): ConferenceFlagship {
  return conferencesData.flagship
}

export function getConferenceTracks(): ConferenceTrack[] {
  return conferencesData.tracks
}

export function getConferenceDeadlines(): ConferenceDeadline[] {
  return conferencesData.deadlines
}

export function getConferenceCommittees(): ConferenceCommittees {
  return conferencesData.committees
}

export function getConferenceRegistration(): RegistrationTier[] {
  return conferencesData.registration
}

export function getAuthorGuidelines(): AuthorGuidelines {
  return conferencesData.authorGuidelines
}
