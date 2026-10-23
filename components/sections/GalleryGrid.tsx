"use client"

import { useState } from "react"
import { Calendar, MapPin, Sparkles, Maximize2, X } from "lucide-react"
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

function OpticalSchematicArtwork({
  category,
  theme,
}: {
  category: GalleryItem["category"]
  theme: GalleryItem["theme"]
}) {
  const accentColor =
    theme === "teal" ? "#38BDF8" : theme === "indigo" ? "#818CF8" : "#D4AF37"

  if (category === "Workshops") {
    // Silicon Photonics Ring Resonator and Bus Waveguides Schematic
    return (
      <svg
        viewBox="0 0 320 160"
        className="w-full h-full opacity-90 transition-transform duration-500 group-hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`wg-${theme}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.15" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Top and Bottom Bus Waveguides */}
        <line x1="20" y1="36" x2="300" y2="36" stroke={`url(#wg-${theme})`} strokeWidth="2.5" />
        <line x1="20" y1="124" x2="300" y2="124" stroke={`url(#wg-${theme})`} strokeWidth="2.5" />
        {/* Coupled Dual Ring Resonators */}
        <circle
          cx="125"
          cy="80"
          r="34"
          fill="none"
          stroke={accentColor}
          strokeWidth="2"
          strokeDasharray="6 3"
        />
        <circle
          cx="195"
          cy="80"
          r="34"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2"
        />
        {/* Evanescent Coupling Nodes */}
        <circle cx="125" cy="42" r="3.5" fill={accentColor} />
        <circle cx="160" cy="80" r="3.5" fill="#D4AF37" />
        <circle cx="195" cy="118" r="3.5" fill={accentColor} />
        {/* Grating Coupler Triangles */}
        <polygon points="20,30 34,36 20,42" fill={accentColor} />
        <polygon points="300,118 286,124 300,130" fill="#D4AF37" />
      </svg>
    )
  }

  if (category === "Lab Visits") {
    // Wafer Die Grid and Interferometer Laser Path
    return (
      <svg
        viewBox="0 0 320 160"
        className="w-full h-full opacity-90 transition-transform duration-500 group-hover:scale-105"
        aria-hidden="true"
      >
        {/* Silicon Wafer Outline */}
        <circle
          cx="160"
          cy="80"
          r="56"
          fill="none"
          stroke={accentColor}
          strokeWidth="1.75"
          strokeOpacity="0.7"
        />
        {/* Reticle Die Matrix */}
        {[-30, -10, 10].map((dx) =>
          [-30, -10, 10].map((dy) => (
            <rect
              key={`${dx}-${dy}`}
              x={160 + dx}
              y={80 + dy}
              width="16"
              height="16"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1"
              strokeOpacity="0.55"
            />
          ))
        )}
        {/* Laser Alignment Crosshair */}
        <line x1="70" y1="80" x2="250" y2="80" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="4 4" />
        <line x1="160" y1="14" x2="160" y2="146" stroke={accentColor} strokeWidth="1.2" strokeDasharray="4 4" />
        <circle cx="160" cy="80" r="5" fill="#D4AF37" />
      </svg>
    )
  }

  if (category === "Community") {
    // Multi-Campus Optical Fiber Mesh and Diffraction Spectrum
    return (
      <svg
        viewBox="0 0 320 160"
        className="w-full h-full opacity-90 transition-transform duration-500 group-hover:scale-105"
        aria-hidden="true"
      >
        {/* Prism */}
        <polygon
          points="115,118 150,42 185,118"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2.2"
        />
        {/* Incident Beam */}
        <line x1="25" y1="98" x2="132" y2="80" stroke="#F8FAFC" strokeWidth="2.5" strokeOpacity="0.85" />
        {/* Dispersed Spectral Beams */}
        <line x1="168" y1="74" x2="292" y2="44" stroke="#D4AF37" strokeWidth="2" />
        <line x1="171" y1="82" x2="292" y2="78" stroke={accentColor} strokeWidth="2" />
        <line x1="175" y1="90" x2="292" y2="112" stroke="#818CF8" strokeWidth="2" />
        <circle cx="150" cy="42" r="3.5" fill="#D4AF37" />
      </svg>
    )
  }

  // Default: Events (Inauguration Charter Crest and Coherent Cavity Modes)
  return (
    <svg
      viewBox="0 0 320 160"
      className="w-full h-full opacity-90 transition-transform duration-500 group-hover:scale-105"
      aria-hidden="true"
    >
      <circle cx="160" cy="80" r="52" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="5 4" />
      <circle cx="160" cy="80" r="36" fill="none" stroke={accentColor} strokeWidth="1.75" />
      <path
        d="M 40 80 Q 100 25, 160 80 T 280 80"
        fill="none"
        stroke="#D4AF37"
        strokeWidth="2.2"
      />
      <path
        d="M 40 80 Q 100 135, 160 80 T 280 80"
        fill="none"
        stroke={accentColor}
        strokeWidth="1.8"
        strokeOpacity="0.8"
      />
      <circle cx="160" cy="80" r="6" fill="#D4AF37" />
    </svg>
  )
}

export function GalleryGrid({ items, categories }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  const filtered =
    activeCategory === "All"
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
                "min-h-[40px] rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all",
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
              onClick={() => setSelectedItem(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setSelectedItem(item)
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Inspect archive item: ${item.title}`}
              className="site-card overflow-hidden group flex flex-col justify-between cursor-pointer hover:border-[var(--gold)]/60 transition-all text-left"
            >
              {/* Media Graphic Frame */}
              <div className="relative h-48 w-full bg-[var(--surface-raised)] border-b border-[var(--line)] flex items-center justify-center p-4 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20 transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, var(--gold) 0%, transparent 70%)`,
                  }}
                />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <OpticalSchematicArtwork category={item.category} theme={item.theme} />
                </div>

                <div className="absolute top-2.5 left-2.5 rounded-sm border border-[var(--line)] bg-[var(--surface)]/90 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--gold)]">
                  {item.category}
                </div>

                <div className="absolute bottom-2 right-2 flex items-center gap-1.5 text-[10px] font-mono text-[var(--ink-faint)] bg-[var(--surface)]/90 px-2 py-0.5 rounded-sm border border-[var(--line)]">
                  <Sparkles size={10} className="text-[var(--gold)]" />
                  <span>Inspect Plate</span>
                  <Maximize2 size={10} className="text-[var(--gold)]" />
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
                  <span className="text-[var(--gold)] font-semibold">VIEW RECORD →</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Interactive Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-modal-title"
        >
          <div
            className="site-card max-w-2xl w-full overflow-hidden border border-[var(--gold)]/50 bg-[var(--surface)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 w-full bg-[var(--surface-raised)] border-b border-[var(--line)] p-6 flex items-center justify-center">
              <OpticalSchematicArtwork
                category={selectedItem.category}
                theme={selectedItem.theme}
              />
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="Close archive record"
                className="absolute top-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
              >
                <X size={18} />
              </button>
              <span className="absolute bottom-3 left-4 rounded-sm border border-[var(--gold)]/40 bg-[var(--surface)]/95 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--gold)]">
                {selectedItem.category} Archive Plate
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[var(--ink-faint)]">
                <span className="inline-flex items-center gap-1.5 text-[var(--gold)] font-bold">
                  <Calendar size={12} aria-hidden="true" />
                  {formatDate(selectedItem.date)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={12} aria-hidden="true" />
                  {selectedItem.location}
                </span>
              </div>

              <h3
                id="gallery-modal-title"
                className="text-xl sm:text-2xl font-bold text-[var(--ink)]"
              >
                {selectedItem.title}
              </h3>

              <p className="text-sm leading-7 text-[var(--ink-soft)]">
                {selectedItem.caption}
              </p>

              <div className="pt-4 border-t border-[var(--line-subtle)] flex items-center justify-between text-xs font-mono text-[var(--ink-faint)]">
                <span>ARCHIVE ID: {selectedItem.id.toUpperCase()}</span>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="text-[var(--gold)] font-bold hover:underline"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
