import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { getAllOutreach } from "@/lib/outreach"
import { Sparkles, School, Lightbulb, Compass, Award } from "lucide-react"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "outreach" })
  return {
    title: t("heading"),
    description: t("subheading"),
  }
}

export default async function OutreachPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "outreach" })
  const items = getAllOutreach()

  const initiatives = [
    {
      title: locale === "en" ? "Optics in Egyptian Schools" : "البصريات في المدارس المصرية",
      desc: locale === "en" ? "Hands-on optical science kits introducing refraction, reflection, and laser physics to young minds." : "حقائب علمية تطبيقية لتعريف الطلاب بفيزياء الانكسار والانعكاس والليزر بطريقة تفاعلية.",
      icon: School,
    },
    {
      title: locale === "en" ? "University Campus Roadshows" : "جولات الجامعات والمراكز البحثية",
      desc: locale === "en" ? "Connecting engineering and science faculties with international Optica student chapters and research grants." : "ربط كليات الهندسة والعلوم بفروع أوبتيكا الطلابية والمنح البحثية الدولية.",
      icon: Compass,
    },
    {
      title: locale === "en" ? "Public Photonics Demonstrations" : "تجارب وعروض الضوئيات العامة",
      desc: locale === "en" ? "Interactive laser and hologram displays at national science fairs and Cairo innovation weeks." : "عروض ليزر وهولوجرام تفاعلية في المعارض العلمية وأسابيع الابتكار الوطنية.",
      icon: Lightbulb,
    },
    {
      title: locale === "en" ? "STEM Mentorship Network" : "برنامج التوجيه العلمي (STEM)",
      desc: locale === "en" ? "One-on-one mentorship matching Egyptian undergraduate researchers with global photonics PhD candidates." : "إرشاد أكاديمي فردي يربط الباحثين المصريين بطلاب الدكتوراه حول العالم.",
      icon: Award,
    },
  ]

  return (
    <div className="section container-page py-16">
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] mb-4">
          <Sparkles size={14} className="text-[var(--accent)]" />
          <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider">
            {locale === "en" ? "Public Engagement & STEM" : "المشاركة العامة والتعليم العلمي"}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight">{t("heading")}</h1>
        <p className="text-[var(--foreground-muted)] text-lg leading-relaxed">{t("subheading")}</p>
      </div>

      <hr className="divider-gold mb-14" />

      {/* Season 1 Strategic Initiatives */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
        {initiatives.map((item, idx) => {
          const Icon = item.icon
          return (
            <div key={idx} className="card p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[var(--surface-raised)] text-[var(--accent-secondary)] flex items-center justify-center mb-5">
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-base mb-2">{item.title}</h3>
                <p className="text-[var(--foreground-muted)] text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Outreach Log & Empty State */}
      {items.length === 0 ? (
        <div className="empty-state p-12 text-center rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="w-12 h-12 rounded-full bg-[var(--surface-raised)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4 text-[var(--accent)]">
            <Sparkles size={22} />
          </div>
          <h3 className="text-lg font-bold mb-2">
            {locale === "en" ? "Season 1 Outreach Launching" : "إطلاق أنشطة الموسم الأول قريباً"}
          </h3>
          <p className="text-[var(--foreground-muted)] max-w-md mx-auto text-sm leading-relaxed">
            {t("empty")}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => {
            const title = item.title[locale as "en" | "ar"] || item.title.en
            const description = item.description[locale as "en" | "ar"] || item.description.en

            return (
              <div key={item.id} className="card p-6">
                <p className="text-xs text-[var(--foreground-muted)] mb-2">{item.date}</p>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-[var(--foreground-muted)] text-sm leading-relaxed mb-4">{description}</p>
                {item.reach > 0 && (
                  <p className="text-[var(--accent)] text-sm font-semibold">
                    {item.reach} {t("reach_label")}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}