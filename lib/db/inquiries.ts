"use client"

export interface PartnerInquiryRecord {
  id: string
  organization: string
  contactName: string
  email: string
  organizationType: string
  partnershipTrack: string
  message: string
  createdAt: string
  status: "submitted" | "under_review" | "connected"
}

export type PartnerInquiryInput = {
  organization: string
  contactName: string
  email: string
  organizationType: string
  partnershipTrack: string
  message: string
}

export interface PressInquiryRecord {
  id: string
  outlet: string
  journalistName: string
  email: string
  deadline?: string
  topic: string
  message: string
  createdAt: string
  status: "submitted" | "under_review" | "responded"
}

export type PressInquiryInput = {
  outlet: string
  journalistName: string
  email: string
  deadline?: string
  topic: string
  message: string
}

const PARTNER_STORAGE_KEY = "optica_egypt_partner_inquiries_v1"
const PRESS_STORAGE_KEY = "optica_egypt_press_inquiries_v1"

function generatePartnerCode(): string {
  const year = new Date().getFullYear()
  const randomSegment = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `OPT-EG-PARTNER-${year}-${randomSegment}`
}

function generatePressCode(): string {
  const year = new Date().getFullYear()
  const randomSegment = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `OPT-EG-PRESS-${year}-${randomSegment}`
}

function getLocalRecords<T>(key: string): T[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return []
    return JSON.parse(raw) as T[]
  } catch {
    return []
  }
}

function saveLocalRecord<T extends { id: string }>(key: string, record: T): void {
  if (typeof window === "undefined") return
  try {
    const existing = getLocalRecords<T>(key)
    const updated = [record, ...existing.filter((item) => item.id !== record.id)]
    localStorage.setItem(key, JSON.stringify(updated))
  } catch (error) {
    console.warn("Unable to save inquiry record to local storage:", error)
  }
}

export async function savePartnerInquiry(input: PartnerInquiryInput): Promise<PartnerInquiryRecord> {
  const record: PartnerInquiryRecord = {
    id: generatePartnerCode(),
    ...input,
    createdAt: new Date().toISOString(),
    status: "submitted",
  }

  saveLocalRecord(PARTNER_STORAGE_KEY, record)
  return record
}

export async function savePressInquiry(input: PressInquiryInput): Promise<PressInquiryRecord> {
  const record: PressInquiryRecord = {
    id: generatePressCode(),
    ...input,
    createdAt: new Date().toISOString(),
    status: "submitted",
  }

  saveLocalRecord(PRESS_STORAGE_KEY, record)
  return record
}
