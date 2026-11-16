import type { Metadata } from "next"
import { Download } from "lucide-react"
import { BoilerplateBox } from "@/components/sections/BoilerplateBox"
import { PageHeader } from "@/components/sections/PageHeader"
import { UnifiedIntakeForm } from "@/components/sections/UnifiedIntakeForm"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { getMediaKit, getPressBoilerplate } from "@/lib/press"
import { buildPageMetadata } from "@/lib/seo"
import { getAssetPath } from "@/lib/utils"

export const metadata: Metadata = buildPageMetadata({
  title: "Press",
  description:
    "Official press boilerplate, brand identity kit, vector crest assets, and media inquiry desk for Optica Egypt.",
  path: "/press",
})

export default function PressPage() {
  const boilerplate = getPressBoilerplate()
  const mediaKit = getMediaKit()

  return (
    <>
      <PageHeader
        eyebrow="Media and Communications"
        title="Press Kit and Brand Assets."
        intro="Verified institutional descriptions, downloadable official brand emblems, color specifications, and media coordination for publications covering Optica Egypt."
      />

      <section className="section-space">
        <div className="container-page space-y-14">
          <ScrollReveal>
            <BoilerplateBox
              title={boilerplate.title}
              body={boilerplate.body}
              short={boilerplate.short}
            />
          </ScrollReveal>

          <ScrollReveal delay={60}>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="site-card p-6 sm:p-8 space-y-5">
                <div>
                  <p className="eyebrow">Downloadable Assets</p>
                  <h2 className="mt-1 text-lg font-semibold text-[var(--ink)]">
                    Identity Marks and Press Fact Sheet
                  </h2>
                </div>
                <div className="divide-y divide-[var(--line-subtle)]">
                  {mediaKit.assets.map((asset) => (
                    <div key={asset.id} className="flex items-center justify-between gap-4 py-4">
                      <div>
                        <p className="text-sm font-semibold text-[var(--ink)]">{asset.title}</p>
                        <p className="mt-1 text-xs text-[var(--ink-soft)]">{asset.description}</p>
                        <span className="mt-1 inline-block font-mono text-[10px] uppercase text-[var(--gold)]">
                          {asset.format}
                        </span>
                      </div>
                      <a
                        href={getAssetPath(asset.downloadUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary shrink-0 min-h-[48px]"
                      >
                        <Download size={14} aria-hidden="true" />
                        <span>Open</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="site-card p-6 sm:p-8 space-y-4">
                  <p className="eyebrow">Visual Identity</p>
                  <h2 className="text-lg font-semibold text-[var(--ink)]">Official Brand Palette</h2>
                  <div className="space-y-3">
                    {mediaKit.brandColors.map((color) => (
                      <div key={color.hex} className="flex items-center gap-4">
                        <span
                          className="h-9 w-9 shrink-0 rounded-sm border border-[var(--line)]"
                          style={{ backgroundColor: color.hex }}
                          aria-hidden="true"
                        />
                        <div>
                          <p className="text-sm font-semibold text-[var(--ink)]">
                            {color.name}{" "}
                            <span className="font-mono text-xs text-[var(--gold)]">{color.hex}</span>
                          </p>
                          <p className="text-xs text-[var(--ink-soft)]">{color.usage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="site-card p-6 sm:p-8 space-y-3">
                  <p className="eyebrow">Typefaces</p>
                  <h2 className="text-lg font-semibold text-[var(--ink)]">Typography Stack</h2>
                  <div className="divide-y divide-[var(--line-subtle)]">
                    {mediaKit.typography.map((font) => (
                      <div key={font.name} className="py-2.5">
                        <p className="font-mono text-sm font-semibold text-[var(--ink)]">{font.name}</p>
                        <p className="text-xs text-[var(--ink-soft)]">{font.usage}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div id="media-desk" className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start border-t border-[var(--line)] pt-12">
              <div className="space-y-3">
                <p className="eyebrow">Press Coordination</p>
                <h2 className="section-title">Media Inquiry Desk</h2>
                <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                  Journalists, university communications offices, and conference organizers may request interviews, leadership quotes, or verified charter documentation through this form.
                </p>
              </div>
              <UnifiedIntakeForm defaultIntent="press_inquiry" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
