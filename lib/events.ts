import rawEvents from "@/data/events.json"
import type { Event } from "@/types/event"

const events: Event[] = rawEvents as Event[]

export function getAllEvents(): Event[] {
  return [...events]
    .filter((event) => event.published)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function getEventById(id: string): Event | undefined {
  return getAllEvents().find((event) => event.id === id)
}

export function getUpcomingEvents(limit?: number): Event[] {
  const today = new Date().toISOString().slice(0, 10)
  const upcoming = getAllEvents()
    .filter((event) => event.date >= today && !["draft", "completed", "cancelled"].includes(event.status))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  return limit ? upcoming.slice(0, limit) : upcoming
}

export function getPastEvents(): Event[] {
  const today = new Date().toISOString().slice(0, 10)
  return getAllEvents()
    .filter((event) => event.date < today || event.status === "completed")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
