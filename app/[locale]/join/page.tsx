import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { siteConfig } from "@/lib/site-config"
import { ContactForm } from "@/components/sections/ContactForm"
import { ArrowRight, Mail, CheckCircle2, ShieldCheck, GraduationCap, Microscope, Building2, Rocket } from "lucide-react"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "join" })
  return {
    title: `${t("heading")} | Optica Egypt Local Section`,
    description: t("subheading"),
  }
}

export default async function JoinPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "join" })

  const TRACKS = [
    {
      id: "student",
      icon: GraduationCap,
      title: locale === "en" ? "Undergraduate Student" : "طالب جامعي",
      benefits: locale === "en"
        ? "Access free optics kits, technical lab seminars, and student travel grant briefings."
        : "حضور ورش العمل التقنية المعملية وجلسات التقديم على منح السفر الدولية.",
      accent: "#00B4FF",
    },
    {
      id: "researcher",
      icon: Microscope,
      title: locale === "en" ? "Graduate Researcher / PhD" : "باحث دراسات عليا / دكتوراه",
      benefits: locale === "en"
        ? "Shared equipment access across Egyptian universities and publication collaboration."
        : "الاستفادة من التجهيزات المعملية المشتركة وشبكات النشر العلمي بالدوريات الدولية.",
      accent: "#fa8716",
    },
    {
      id: "faculty",
      icon: Building2,
      title: locale === "en" ? "Faculty & Academic Investigator" : "عضو هيئة تدريس وباحث رئيسي",
      benefits: locale === "en"
        ? "Represent your institution, lead technical working groups, and mentor rising scholars."
        : "تمثيل جامعتك وقيادة مجموعات العمل التقنية والإشراف على الكوادر الشابة.",
      accent: "#D4AF37",
    },
    {
      id: "industry",
      icon: Rocket,
      title: locale === "en" ? "Telecom & Industry Engineer" : "مهندس اتصالات وتصنيع بصري",
      benefits: locale === "en"
        ? "Connect with engineering talent, test hardware prototypes, and sponsor events."
        : "استقطاب الكفاءات الهندسية واختبار النماذج الأولية ورعاية الفعاليات الوطنية.",
      accent: "#10B981",
    },
  ]

  return (
    <div className="section container-page py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        {/* Header Eyebrow */}
        <div className="mb-14 text-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#fa8716]" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#fa8716]">
              {locale === "en" ? "MEMBERSHIP AND COHORT REGISTRATION" : "العضوية والتسجيل في المنظومة"}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-white">
            {t("heading")}
          </h1>
          <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-3xl">
            {t("subheading")}
          </p>
        </div>

        {/* Primary CTA Box (Akhetonics Technical Panel) */}
        <div className="relative p-8 md:p-12 mb-16 border border-[#fa8716]/30 bg-[#010E17] overflow-hidden shadow-2xl">
          <span className="absolute -top-1.5 -left-1.5 text-[10px] text-[#fa8716] font-mono">+</span>
          <span className="absolute -bottom-1.5 -right-1.5 text-[10px] text-[#fa8716] font-mono">+</span>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fa8716]/15 text-[#fa8716] text-xs font-mono mb-4 border border-[#fa8716]/30">
              <ShieldCheck size={14} />
              <span>{locale === "en" ? "OFFICIAL SECTION MEMBERSHIP · 100% FREE" : "عضوية مجانية ومفتوحة لجميع الباحثين والطلاب"}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-white">
              {locale === "en" ? "Join the National Optics and Photonics Roster" : "سجل عضويتك في قسم أوبتيكا مصر المحلي"}
            </h2>
            <p className="text-slate-300 text-sm md:text-base mb-8 leading-relaxed font-light">
              {t("body")}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={siteConfig.joinFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary py-3 px-8 text-xs font-bold inline-flex items-center gap-2"
              >
                <span>{t("cta")}</span>
                <ArrowRight size={14} className={locale === "ar" ? "rotate-180" : ""} />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="btn-secondary py-3 px-6 text-xs font-mono inline-flex items-center gap-2"
              >
                <Mail size={14} />
                <span>{siteConfig.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Membership Tracks Bento Grid */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono text-[#00B4FF] uppercase tracking-widest">
              {locale === "en" ? "CHOOSE YOUR PATHWAY" : "حدد مسارك في القسم"}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-8">
            {locale === "en" ? "Who Can Join Optica Egypt" : "الفئات المؤهلة للانضمام"}
          </h3>

          <div className="grid gap-6 sm:grid-cols-2">
            {TRACKS.map((track) => {
              const TrackIcon = track.icon
              return (
                <div
                  key={track.id}
                  className="p-6 border border-white/10 bg-[#010E17] hover:border-white/25 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-10 h-10 flex items-center justify-center"
                        style={{ background: `${track.accent}15`, border: `1px solid ${track.accent}30`, color: track.accent }}
                      >
                        <TrackIcon size={20} />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">
                        {track.id.toUpperCase()}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">{track.title}</h4>
                    <p className="text-xs text-slate-300 font-light leading-relaxed mb-4">{track.benefits}</p>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                    <CheckCircle2 size={13} />
                    <span>{locale === "en" ? "Open Registration" : "التسجيل متاح"}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Interactive Inquiry Form */}
        <ContactForm />
      </div>
    </div>
  )
}
