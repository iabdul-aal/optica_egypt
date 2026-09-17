import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { getAllResources } from "@/lib/resources"
import { ArrowUpRight } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("resources")
  return {
    title: `${t("heading")} | Optica Egypt Local Section`,
    description: t("subheading"),
  }
}

export default async function ResourcesPage() {
  const t = await getTranslations("resources")
  const resources = getAllResources()

  return (
    <div className="bg-[#000000] text-white">
      {/* Editorial Header */}
      <section className="border-b border-white/10 py-20 md:py-28">
        <div className="container-page">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#fa8716]" />
              <span className="editorial-label text-[#fa8716]">
                TECHNICAL REPOSITORY AND SOFTWARE KITS
              </span>
            </div>

            <h1 className="editorial-headline text-white">
              {t("heading")}
            </h1>

            <p className="editorial-lead text-slate-300 max-w-3xl">
              Curated open-source photonic design kits, simulation software, Optica peer-reviewed journals, and international student fellowship programs.
            </p>
          </div>
        </div>
      </section>

      {/* Clearinghouse Directory Ledger */}
      <section className="py-20 md:py-24">
        <div className="container-page">
          <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/10">
            <div>
              <span className="editorial-label text-[#fa8716] block mb-2">
                INDEXED ENTRIES
              </span>
              <h2 className="editorial-headline text-white">
                Curated Scientific Archives
              </h2>
            </div>
            <span className="editorial-label text-slate-400">
              {resources.length} TOOLS AND REPOSITORIES
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => {
              const title = r.title.en
              const description = r.description.en

              return (
                <a
                  key={r.id}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-8 bg-[#000000] border border-white/10 hover:border-[#fa8716] flex flex-col justify-between group transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10 font-mono text-[10px]">
                      <span className="editorial-label text-[#fa8716] font-bold">
                        [{r.category.toUpperCase()}]
                      </span>
                      {r.free && (
                        <span className="text-[#00e660] border border-[#00e660]/30 px-2 py-0.5">
                          {t("free_badge")}
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-lg sm:text-xl mb-3 leading-snug text-white group-hover:text-[#fa8716] transition-colors">
                      {title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                      {description}
                    </p>

                    {r.tags && r.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {r.tags.map((tag) => (
                          <span key={tag} className="editorial-label text-[9px] text-slate-400 bg-white/[0.02] px-2 py-0.5 border border-white/10">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#fa8716] group-hover:text-white transition-colors">
                    <span>{t("visit")}</span>
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
