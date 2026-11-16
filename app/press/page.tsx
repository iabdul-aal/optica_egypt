import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Download } from "lucide-react"
import { BoilerplateBox } from "@/components/sections/BoilerplateBox"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { getMediaKit, getPressBoilerplate } from "@/lib/press"
import { buildPageMetadata } from "@/lib/seo"
import { getAssetPath } from "@/lib/utils"

export const metadata: Metadata = buildPageMetadata({
  title: "Press",
  description:
    "Official press boilerplate, brand identity kit, vector crest assets, color tokens, and typography specifications for Optica Egypt.",
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
        intro="Verified institutional descriptions, downloadable brand emblems, color specifications, and media coordination for publications covering Optica Egypt."
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
            <div className="grid gap-12 lg:grid-cols-2 border-t border-[var(--line)] pt-12">
              <div className="space-y-5">
                <div>
                  <p className="eyebrow">Downloadable Assets</p>
                  <h2 className="mt-1 text-xl font-semibold text-[var(--ink)]">
                    Identity Marks and Press Fact Sheet
                  </h2>
                </div>
                <div className="border-y border-[var(--line)] divide-y divide-[var(--line-subtle)]">
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

              <div className="space-y-10">
                <div className="space-y-4">
                  <div>
                    <p className="eyebrow">Visual Identity</p>
                    <h2 className="mt-1 text-xl font-semibold text-[var(--ink)]">Official Brand Palette</h2>
                  </div>
                  <div className="border-y border-[var(--line)] divide-y divide-[var(--line-subtle)]">
                    {mediaKit.brandColors.map((color) => (
                      <div key={color.hex} className="flex items-center gap-4 py-3.5">
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

                <div className="space-y-3">
                  <div>
                    <p className="eyebrow">Typefaces</p>
                    <h2 className="mt-1 text-xl font-semibold text-[var(--ink)]">Typography Stack</h2>
                  </div>
                  <div className="border-y border-[var(--line)] divide-y divide-[var(--line-subtle)]">
                    {mediaKit.typography.map((font) => (
                      <div key={font.name} className="py-3.5">
                        <p className="font-mono text-sm font-semibold text-[var(--ink)]">{font.name}</p>
                        <p className="text-xs text-[var(--ink-soft)]">{font.usage}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="border-t border-[var(--line)] pt-10 flex flex-wrap items-end justify-between gap-6">
              <div className="space-y-1 max-w-2xl">
                <p className="eyebrow">Press Coordination</p>
                <h2 className="text-xl font-semibold text-[var(--ink)]">Media Inquiry Desk</h2>
                <p className="text-sm text-[var(--ink-soft)]">
                  Journalists, university communications teams, and event organizers can route interview and asset requests via the unified participation desk.
                </p>
              </div>
              <Link href="/join?type=press" className="btn-primary min-h-[48px] shrink-0">
                <span>Submit Media Inquiry</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
