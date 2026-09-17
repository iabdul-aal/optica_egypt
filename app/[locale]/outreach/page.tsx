import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { School, Lightbulb, Compass, Award, HeartHandshake, ArrowRight } from "lucide-react"
import Link from "next/link"

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
    title: `${t("heading")} | Optica Egypt Local Section`,
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

  const initiatives = [
    {
      id: "01",
      title: locale === "en" ? "Optics in Egyptian Schools" : "البصريات في المدارس المصرية",
      desc: locale === "en" ? "Hands-on optical science kits introducing refraction, total internal reflection, and laser physics to high school students." : "حقائب علمية تطبيقية لتعريف الطلاب بفيزياء الانكسار والانعكاس الكلي الداخلي والليزر بطريقة تفاعلية.",
      icon: School,
      accent: "#fa8716",
    },
    {
      id: "02",
      title: locale === "en" ? "University Campus Roadshows" : "جولات الجامعات والمعاهد التقنية",
      desc: locale === "en" ? "Connecting engineering and physics departments across Egyptian governorates with Optica student chapters and research grants." : "ربط كليات الهندسة والعلوم بالمحافظات المصرية بفروع أوبتيكا الطلابية والمنح البحثية الدولية.",
      icon: Compass,
      accent: "#00B4FF",
    },
    {
      id: "03",
      title: locale === "en" ? "Public Photonics Demonstrations" : "تجارب وعروض الضوئيات العامة",
      desc: locale === "en" ? "Interactive laser diffraction and hologram displays at national science fairs and Cairo innovation exhibitions." : "عروض حيود الليزر والهولوجرام التفاعلية في المعارض العلمية وأسابيع الابتكار الوطنية.",
      icon: Lightbulb,
      accent: "#D4AF37",
    },
    {
      id: "04",
      title: locale === "en" ? "STEM Mentorship Network" : "برنامج التوجيه العلمي (STEM)",
      desc: locale === "en" ? "Matching promising Egyptian undergraduate researchers with global photonics PhD candidates and industry veterans." : "إرشاد أكاديمي تخصصي يربط الباحثين الواعدين بطلاب الدكتوراه وخبراء الصناعة حول العالم.",
      icon: Award,
      accent: "#10B981",
    },
  ]

  return (
    <div className="section container-page py-16 md:py-24">
      {/* Header Eyebrow */}
      <div className="max-w-4xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 mb-4">
          <span className="w-1.5 h-1.5 bg-[#fa8716]" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#fa8716]">
            {locale === "en" ? "COMMUNITY ENGAGEMENT AND STEM ROADSHOW" : "المشاركة العامة والتعليم العلمي"}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-white">
          {t("heading")}
        </h1>
        <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-3xl">
          {locale === "en"
            ? "Demystifying optical science, inspiring future engineering talent, and demonstrating how light technologies shape modern society."
            : "تقريب علوم الضوئيات وتبسيط المفاهيم البصرية للطلاب وإلهام الجيل القادم من مهندسي تكنولوجيا الضوء."}
        </p>
      </div>

      {/* Season 1 Strategic Initiatives (Akhetonics & Entor Tech Standard) */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
        {initiatives.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.id}
              className="reticle-box p-7 bg-[#010E17] flex flex-col justify-between group hover:border-[#fa8716] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="tech-icon-box" style={{ color: item.accent }}>
                    <Icon size={22} />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 font-bold">
                    INITIATIVE_{item.id}
                  </span>
                </div>
                <h3 className="font-bold text-base md:text-lg mb-2 text-white group-hover:text-[#fa8716] transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-light mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 text-[10px] font-mono text-slate-400">
                STATUS: IN PLANNING
              </div>
            </div>
          )
        })}
      </div>

      {/* School and University Partnership Callout */}
      <div className="reticle-box p-8 md:p-12 bg-[#010E17]">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#fa8716]/15 text-[#fa8716] text-xs font-mono mb-4 border border-[#fa8716]/30">
            <HeartHandshake size={14} />
            <span>{locale === "en" ? "HOST A WORKSHOP ON YOUR CAMPUS" : "استضف ورشة عمل في جامعتك أو مدرستك"}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-white">
            {locale === "en" ? "Bring Optica Egypt to Your School or University" : "ادعُ فريق أوبتيكا مصر لزيارة مدرستك أو جامعتك"}
          </h2>
          <p className="text-slate-300 text-sm md:text-base mb-8 leading-relaxed font-light">
            {locale === "en"
              ? "We provide certified demonstration kits, safety-compliant optical experiments, and guest lectures led by photonics researchers. All educational roadshow sessions are free of charge for non-profit Egyptian schools and public universities."
              : "نقدم حقائب تجارب بصرية معتمدة ومحاضرات تفاعلية يقدمها باحثون متخصصون. جميع الفعاليات التعليمية مجانية تماماً للمدارس والجامعات الحكومية في مصر."}
          </p>

          <Link href={`/${locale}/join`} className="btn-primary py-3 px-8 text-xs inline-flex items-center gap-2">
            <span>{locale === "en" ? "Request an Outreach Visit" : "طلب زيارة توعوية"}</span>
            <ArrowRight size={14} className={locale === "ar" ? "rotate-180" : ""} />
          </Link>
        </div>
      </div>
    </div>
  )
}
