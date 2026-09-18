import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function NotFound() {
  return <section className="scientific-grid grid min-h-[70vh] place-items-center bg-[#080a0b] px-5 text-center"><div><p className="font-mono text-6xl font-bold text-[var(--gold)]">404</p><h1 className="mt-4 text-3xl font-semibold text-[var(--ink)]">This optical path does not exist.</h1><p className="mt-3 text-sm text-[var(--ink-soft)]">Return to the Optica Egypt Local Section homepage.</p><Link href="/" className="btn-primary mt-7">Go home <ArrowUpRight size={14} /></Link></div></section>
}
