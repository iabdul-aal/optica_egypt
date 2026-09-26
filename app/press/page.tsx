import type { Metadata } from "next"
import {
  Calendar,
  Download,
  ExternalLink,
  FileText,
  MapPin,
  Palette,
  Quote,
  Type,
} from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import { InsightsNav } from "@/components/sections/InsightsNav"
import { BoilerplateBox } from "@/components/sections/BoilerplateBox"
import { PressInquiryForm } from "@/components/sections/PressInquiryForm"
import { getPressData } from "@/lib/press"

export const metadata: Metadata = {
  title: "Press",
  description: "Official Optica Egypt Press Room. Access press releases, media kits, executive photography, boilerplate descriptions, and submit media inquiries.",
  alternates: {
    canonical: "/press/",
  },
}

export default function PressPage() {
  const data = getPressData()

  return (
    <>
      <PageHeader
        eyebrow={data.eyebrow}
        title={data.title}
        intro={data.intro}
      />

      <InsightsNav />

      {/* ── Press Releases List ────────────────────────────────────────────── */}
      <section className="section-space">
        <div className="container-page space-y-12">
          {/* Boilerplate Section */}
          <div className="space-y-4">
            <div className="border-b border-[var(--line)] pb-4">
              <p className="eyebrow">Standard Media Description</p>
              <h2 className="section-title mt-2">Section Boilerplate for Press and Journalists</h2>
              <p className="text-xs text-[var(--ink-soft)] mt-1">
                Authorized background description for news stories, media articles, and event programs.
              </p>
            </div>
            <BoilerplateBox
              title={data.boilerplate.title}
              body={data.boilerplate.body}
              short={data.boilerplate.short}
            />
          </div>

          {/* Official Releases */}
          <div className="space-y-6 pt-6">
            <div className="border-b border-[var(--line)] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <p className="eyebrow">Official Communications</p>
                <h2 className="section-title mt-2">Press Releases and Bulletins</h2>
              </div>
              <span className="font-mono text-xs text-[var(--gold)] font-bold">
                {data.pressReleases.length} Official Bulletins
              </span>
            </div>

            <div className="space-y-6">
              {data.pressReleases.map((release) => (
                <article
                  key={release.id}
                  className="site-card p-6 sm:p-8 border-l-4 border-l-[var(--gold)] flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--ink-faint)]">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 font-bold text-[var(--gold)]">
                          <Calendar size={13} aria-hidden="true" />
                          <time dateTime={release.dateISO}>{release.date}</time>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={13} aria-hidden="true" />
                          <span>{release.location}</span>
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {release.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-sm border border-[var(--line-subtle)] bg-[var(--surface-raised)] px-2 py-0.5 text-[10px] uppercase font-bold text-[var(--ink-soft)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
                      {release.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-semibold text-[var(--gold-pale)] leading-relaxed">
                      {release.summary}
                    </p>

                    <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed">
                      {release.lead}
                    </p>

                    {release.quote && (
                      <div className="rounded-sm border border-[var(--gold)]/20 bg-[var(--gold)]/5 p-4 sm:p-5 mt-4 space-y-2">
                        <div className="flex items-start gap-2">
                          <Quote size={16} className="text-[var(--gold)] shrink-0 mt-0.5" aria-hidden="true" />
                          <p className="text-xs sm:text-sm italic text-[var(--ink)] leading-relaxed">
                            &ldquo;{release.quote.text}&rdquo;
                          </p>
                        </div>
                        <div className="pt-2 border-t border-[var(--gold)]/10 text-right font-mono text-[11px]">
                          <strong className="text-[var(--gold)]">{release.quote.speaker}</strong>
                          <span className="text-[var(--ink-faint)]">, {release.quote.title}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Media Kit and Brand Assets ─────────────────────────────────────── */}
      <section className="section-space border-t border-[var(--line)] bg-[var(--surface-raised)]">
        <div className="container-page space-y-12">
          <div className="border-b border-[var(--line)] pb-4">
            <p className="eyebrow">Downloadable Media Kit</p>
            <h2 className="section-title mt-2">Brand Assets and Media Resources</h2>
            <p className="text-xs text-[var(--ink-soft)] mt-1">
              High-resolution vector marks, official executive portraits, and publication brand tokens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.mediaKit.assets.map((asset) => (
              <div
                key={asset.id}
                className="site-card p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--ink-faint)]">
                    <span className="rounded-sm border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5 text-[10px] font-bold uppercase text-[var(--gold)]">
                      {asset.format}
                    </span>
                    <FileText size={14} className="text-[var(--gold)]" aria-hidden="true" />
                  </div>

                  <h3 className="mt-3 text-base sm:text-lg font-bold text-[var(--ink)]">
                    {asset.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                    {asset.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--line-subtle)]">
                  <a
                    href={asset.downloadUrl}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--gold)] hover:text-[var(--gold-pale)] transition-colors min-h-[40px]"
                    download
                  >
                    <Download size={14} aria-hidden="true" />
                    <span>Download Official Asset</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Brand Style Guide Reference */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
            {/* Color Palette Card */}
            <div className="site-card p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Palette size={16} className="text-[var(--gold)]" aria-hidden="true" />
                <h4 className="text-sm font-bold text-[var(--ink)]">Official Brand Color Palette</h4>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {data.mediaKit.brandColors.map((color) => (
                  <div key={color.hex} className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-4 w-4 rounded-full border border-white/20 shrink-0"
                        style={{ backgroundColor: color.hex }}
                        aria-hidden="true"
                      />
                      <span className="font-mono text-xs font-bold text-[var(--ink)]">{color.hex}</span>
                    </div>
                    <p className="text-[11px] font-medium text-[var(--gold)] mt-1.5">{color.name}</p>
                    <p className="text-[10px] text-[var(--ink-soft)] mt-0.5">{color.usage}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography Tokens Card */}
            <div className="site-card p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Type size={16} className="text-[var(--gold)]" aria-hidden="true" />
                <h4 className="text-sm font-bold text-[var(--ink)]">Typography Guidelines</h4>
              </div>
              <div className="space-y-3 pt-2">
                {data.mediaKit.typography.map((type) => (
                  <div key={type.name} className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-3 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[var(--ink)]">{type.name}</span>
                      <p className="text-[10px] text-[var(--ink-soft)] mt-0.5">{type.usage}</p>
                    </div>
                    <span className="font-mono text-[10px] uppercase text-[var(--gold)] font-bold">Standard</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Media Coverage / Clippings ─────────────────────────────────────── */}
      <section className="section-space">
        <div className="container-page space-y-8">
          <div className="border-b border-[var(--line)] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="eyebrow">External Press</p>
              <h2 className="section-title mt-2">Selected Media Coverage and Mentions</h2>
            </div>
            <span className="font-mono text-xs text-[var(--ink-faint)]">Published Clippings</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.mediaCoverage.map((item) => (
              <div
                key={item.headline}
                className="site-card p-6 flex flex-col justify-between hover:border-[var(--gold)]/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--ink-faint)]">
                    <span className="text-[var(--gold)] font-semibold">{item.source}</span>
                    <span>{item.date}</span>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-[var(--ink)] leading-snug">
                    {item.headline}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[var(--line-subtle)]">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ink)] hover:text-[var(--gold)] transition-colors min-h-[40px]"
                  >
                    <span>Read Media Article</span>
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Media Desk and Interview Inquiries ─────────────────────────────── */}
      <section id="media-inquiry" className="section-space border-t border-[var(--line)] bg-[var(--surface-raised)]">
        <div className="container-page">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <p className="eyebrow">Press Inquiries</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] mt-2">
                Connect With the Press Desk
              </h2>
              <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-2 leading-relaxed">
                Journalists, correspondents, and science editors may request interviews with section leadership or verify facts regarding Egyptian photonics initiatives.
              </p>
            </div>

            <div className="site-card p-6 sm:p-10 border-t-4 border-t-[var(--gold)]">
              <PressInquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
