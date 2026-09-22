"use client"

import { useState } from "react"
import { Calendar, MapPin, Camera, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import type { GalleryItem } from "@/lib/gallery"

interface GalleryGridProps {
  items: GalleryItem[]
  categories: string[]
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  })
}

export function GalleryGrid({ items, categories }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = activeCategory === "All"
    ? items
    : items.filter((item) => item.category === activeCategory)

  return (
    <div className="space-y-10">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[var(--line)] pb-4">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all",
                isSelected
                  ? "bg-[var(--gold)] text-[#09131F]"
                  : "border border-[var(--line)] text-[var(--ink-soft)] hover:text-[var(--ink)] hover:border-[var(--gold)] bg-[var(--surface)]"
              )}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => {
          return (
            <div
              key={item.id}
              className="site-card overflow-hidden group flex flex-col justify-between"
            >
              {/* Media Graphic Frame */}
              <div className="relative h-48 w-full bg-[var(--surface-raised)] border-b border-[var(--line)] flex items-center justify-center p-6 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20 transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, var(--gold) 0%, transparent 70%)`,
                  }}
                />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--gold)]/40 bg-[var(--surface)] text-[var(--gold)] shadow-sm">
                    <Camera size={20} aria-hidden="true" />
                  </div>
                  <span className="mt-3 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--gold)]">
                    {item.category}
                  </span>
                </div>

                <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] font-mono text-[var(--ink-faint)] bg-[var(--surface)]/90 px-2 py-0.5 rounded-sm border border-[var(--line)]">
                  <Sparkles size={10} className="text-[var(--gold)]" />
                  <span>Optica Archive</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--ink-faint)] mb-2">
                    <span className="inline-flex items-center gap-1.5 text-[var(--gold)]">
                      <Calendar size={11} aria-hidden="true" />
                      {formatDate(item.date)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={11} aria-hidden="true" />
                      {item.location}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-[var(--ink)] leading-snug group-hover:text-[var(--gold)] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                    {item.caption}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--line-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--ink-faint)]">
                  <span>TAG: #{item.category.toLowerCase().replace(/\s+/g, "_")}</span>
                  <span>CONFIRMED EVENT</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
