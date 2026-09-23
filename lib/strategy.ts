import strategyData from "@/data/strategy.json"

export interface StrategicPillar {
  id: string
  number: string
  title: string
  tagline: string
  summary: string
  tactics: string[]
  costModel: string
}

export interface EconomicContext {
  challenge: string
  description: string
  response: string
}

export interface StrategyData {
  eyebrow: string
  title: string
  vision: string
  economicContext: EconomicContext
  pillars: StrategicPillar[]
}

export function getStrategyData(): StrategyData {
  return strategyData
}
