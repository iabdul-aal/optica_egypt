"use client"

import Link from "next/link"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"

const routes = [
  ["About", "/about"],
  ["Community", "/community"],
  ["Events", "/events"],
  ["Leadership", "/leadership"],
  ["Resources", "/resources"],
] as const

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080a0b]">
      <div className="container-layout flex h-[4.9rem] items-center justify-between gap-5">
        <Link href="/" className="group flex items-center gap-3" aria-label="Optica Egypt home">
          <span className="grid size-8 place-items-center border border-[var(--gold)] text-[11px] font-black tracking-[-0.16em] text-[var(--gold)] transition-colors group-hover:bg-[var(--gold)] group-hover:text-[#080a0b]">OE</span>
          <span className="leading-none">
            <span className="block text-[0.88rem] font-black tracking-[0.14em] text-[var(--ink)]">OPTICA EGYPT</span>
            <span className="mt-1 block text-[0.55rem] font-bold tracking-[0.18em] text-[var(--ink-soft)]">LOCAL SECTION</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {routes.map(([label, href]) => (
            <Link key={href} href={href} className={cn("border-b border-transparent py-1 text-[0.7rem] font-bold tracking-[0.09em] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]", pathname === href && "border-[var(--gold)] text-[var(--ink)]")}>
              {label.toUpperCase()}
            </Link>
          ))}
        </nav>

        <Link href="/join" className="btn-primary hidden sm:inline-flex">Join <ArrowUpRight size={14} /></Link>
        <button onClick={() => setOpen((value) => !value)} className="grid size-10 place-items-center border border-white/20 text-[var(--ink)] lg:hidden" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"}>
          {open ? <X size={19} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div id="mobile-navigation" className="border-t border-white/10 bg-[#0c0f10] lg:hidden">
          <nav className="container-layout grid py-3 sm:grid-cols-2" aria-label="Mobile navigation">
            <Link href="/" onClick={() => setOpen(false)} className="border-b border-white/10 py-3 text-xs font-bold tracking-[0.1em] text-[var(--ink)]">HOME</Link>
            {routes.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="border-b border-white/10 py-3 text-xs font-bold tracking-[0.1em] text-[var(--ink)]">
                {label.toUpperCase()}
              </Link>
            ))}
            <Link href="/join" onClick={() => setOpen(false)} className="mt-4 btn-primary sm:hidden">Join Optica Egypt <ArrowUpRight size={14} /></Link>
          </nav>
        </div>
      )}
    </header>
  )
}
