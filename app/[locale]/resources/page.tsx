import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { getAllResources } from "@/lib/resources"
import { ArrowUpRight } from "lucide-react"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "resources" })
  return {
    title: `${t("heading")} | Optica Egypt Local Section`,
    description: t("subheading"),
  }
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "resources" })
  const resources = getAllResources()

  return (
    <div className="section container-page py-16 md:py-24">
      {/* Header Eyebrow */}
      <div className="max-w-4xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#fa8716]" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#fa8716]">
            {locale === "en" ? "TECHNICAL REPOSITORY and TOOLS" : "المستودع المعرفي والبرمجي"}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-white">
          {t("heading")}
        </h1>
        <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-3xl">
          {locale === "en"
            ? "Curated open-source photonic design kits, simulation software, Optica peer-reviewed journals, and international student fellowship programs."
            : "حزم تصميم الدوائر الضوئية مفتوحة المصدر وبرمجيات المحاكاة الكهرومغناطيسية ودوريات أوبتيكا المحكمة ومنح السفر والزمالات."}
        </p>
      </div>

      {/* Resource Cards Grid (Akhetonics Technical Panels) */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((r) => {
          const title = r.title[locale as "en" | "ar"] || r.title.en
          const description = r.description[locale as "en" | "ar"] || r.description.en

          return (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group p-7 rounded-none border border-white/10 hover:border-[#fa8716] bg-[#010E17] flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_25px_rgba(250,135,22,0.15)]"
            >
              {/* Corner crosshairs */}
              <span className="absolute -top-1.5 -left-1.5 text-[10px] text-[#fa8716] font-mono opacity-30 group-hover:opacity-100 transition-opacity">+</span>
              <span className="absolute -bottom-1.5 -right-1.5 text-[10px] text-[#fa8716] font-mono opacity-30 group-hover:opacity-100 transition-opacity">+</span>

              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                    {r.category}
                  </span>
                  {r.free && (
                    <span className="text-[10px] font-mono font-bold text-[#00B4FF] px-2 py-0.5 rounded-full bg-[#00B4FF]/10 border border-[#00B4FF]/25">
                      {t("free_badge")}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-lg mb-2.5 leading-snug text-white group-hover:text-[#fa8716] transition-colors">
                  {title}
                </h3>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-6 font-light">
                  {description}
                </p>

                {r.tags && r.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {r.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono text-slate-400 bg-black/40 px-2 py-0.5 border border-white/5">
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
  )
}
