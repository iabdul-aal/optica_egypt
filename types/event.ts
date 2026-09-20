export interface Event {
  id: string
  title: { en: string }
  description: { en: string }
  date: string
  startTime?: string
  endTime?: string
  timezone: string
  location: { en: string }
  format: "in_person" | "online" | "hybrid"
  type: "seminar" | "workshop" | "social" | "competition" | "webinar"
  status: "draft" | "upcoming" | "registration_open" | "registration_closing" | "sold_out" | "completed" | "cancelled"
  speakers: EventSpeaker[]
  tags: string[]
  published: boolean
  registration?: EventRegistrationSettings
}

export interface EventSpeaker {
  name: string
  role?: string
  institution?: string
}

export interface RegistrationCriterion {
  id: string
  label: { en: string }
  description?: { en: string }
  required?: boolean
  type: "text" | "select"
  options?: { value: string; label: { en: string } }[]
}

export interface EventRegistrationSettings {
  opensAt?: string
  closesAt?: string
  capacity?: number
  waitlistEnabled: boolean
  reviewRequired: boolean
  criteria: RegistrationCriterion[]
  zoomMeetingId?: string
}
