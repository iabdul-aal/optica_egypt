export type DomainId =
  | "photonic-ic"
  | "optical-comm"
  | "lasers-nonlinear"
  | "mems-sensing"
  | "quantum-nano"

export interface Domain {
  id: DomainId
  code: string
  label: string
  summary: string
  terms: string[]
}
