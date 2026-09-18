import rawEvents from "@/data/events.json"
import type { Event } from "@/types/event"

const events: Event[] = rawEvents as Event[]

export function getAllEvents(): Event[] {
  return [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getEventById(id: string): Event | undefined {
  return events.find((event) => event.id === id)
}

export function getUpcomingEvents(limit?: number): Event[] {
  const now = new Date()
  const upcoming = events
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  return limit ? upcoming.slice(0, limit) : upcoming
}

export function getPastEvents(): Event[] {
  const now = new Date()
  return events
    .filter((e) => new Date(e.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
