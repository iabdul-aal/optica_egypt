import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"
import { Users, GraduationCap, Microscope, Factory, Rocket, ArrowRight, CheckCircle2 } from "lucide-react"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "community" })
  return {
    title: t("heading"),
    description: t("subheading"),
  }
}

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "community" })
  const j = await getTranslations({ locale, namespace: "join" })

  const benefits = [
    locale === "en" ? "Exclusive access to technical workshops and webinars" : "وصول حصري إلى ورش العمل التقنية والندوات عبر الإنترنت",
    locale === "en" ? "Networking with international Optica scholars and engineers" : "التواصل المباشر مع باحثي ومهندسي منظمة أوبتيكا الدولية",
    locale === "en" ? "Student grants, travel awards, and publication mentorship" : "منح طلابية وجوائز سفر وإرشاد للنشر العلمي",
    locale === "en" ? "Collaborative research opportunities across Egyptian universities" : "فرص بحثية مشتركة بين الجامعات والمراكز البحثية المصرية",
  ]

  return (
    <div className="section container-page py-16">
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] mb-4">
          <Users size={14} className="text-[var(--accent)]" />
          <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider">
            {locale === "en" ? "Egyptian Photonics Ecosystem" : "المنظومة البصرية المصرية"}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight">{t("heading")}</h1>
        <p className="text-[var(--foreground-muted)] text-lg leading-relaxed">{t("subheading")}</p>
      </div>

      <hr className="divider-gold mb-16" />

      {/* Community Bento Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
        <div className="card p-8 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#00ADEF]/10 border border-[#00ADEF]/20 text-[#00ADEF] flex items-center justify-center mb-6">
              <GraduationCap size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">{locale === "en" ? "Undergraduates & Graduates" : "طلاب الجامعات والخريجون"}</h3>
            <p className="text-[var(--foreground-muted)] text-sm leading-relaxed">
              {locale === "en"
                ? "Gain hands-on optical design training, lab mentorship, and international competition support."
                : "الحصول على تدريب عملي في التصميم البصري، وإشراف معملي، ودعم للمسابقات الدولية."}
            </p>
          </div>
        </div>

        <div className="card p-8 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center mb-6">
              <Microscope size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">{locale === "en" ? "Academic Researchers" : "الباحثون الأكاديميون"}</h3>
            <p className="text-[var(--foreground-muted)] text-sm leading-relaxed">
              {locale === "en"
                ? "Facilitate inter-university research, share specialized laser and spectroscopy facilities, and publish jointly."
                : "تسهيل الأبحاث المشتركة بين الجامعات، ومشاركة التجهيزات المعملية المتقدمة لليزر والتحليل الطيفي."}
            </p>
          </div>
        </div>

        <div className="card p-8 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#00ADEF]/10 border border-[#00ADEF]/20 text-[#00ADEF] flex items-center justify-center mb-6">
              <Factory size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">{locale === "en" ? "Industry & Telecom" : "الصناعة والاتصالات"}</h3>
            <p className="text-[var(--foreground-muted)] text-sm leading-relaxed">
              {locale === "en"
                ? "Connect optical fiber, telecom, and sensor manufacturers with top engineering talent and applied R&D."
                : "ربط قطاعات الألياف الضوئية والاتصالات ومصنعي الحساسات بأفضل الكفاءات والبحوث التطبيقية."}
            </p>
          </div>
        </div>

        <div className="card p-8 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center mb-6">
              <Rocket size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">{locale === "en" ? "Deeptech Startups" : "الشركات الناشئة"}</h3>
            <p className="text-[var(--foreground-muted)] text-sm leading-relaxed">
              {locale === "en"
                ? "Incubate photonics hardware concepts, access academic prototyping labs, and scale technical ventures."
                : "احتضان أفكار العتاد البصري، والوصول إلى معامل النمذجة الأولية وتوسيع الشركات التقنية."}
            </p>
          </div>
        </div>
      </div>

      {/* Community Membership Callout */}
      <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] to-[#09131F] p-8 md:p-14 relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">{t("join_cta")}</h2>
          <p className="text-[var(--foreground-muted)] text-base mb-8 leading-relaxed">
            {j("body")}
          </p>

          <ul className="space-y-3 mb-10">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-[var(--foreground)]">
                <CheckCircle2 size={18} className="text-[var(--accent)] shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-4">
            <Link href={`/${locale}/join`} className="btn-primary py-3 px-8 text-base">
              {t("join_cta")}
            </Link>
            <a
              href={siteConfig.joinFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary py-3 px-8 text-base inline-flex items-center gap-2"
            >
              <span>{j("cta")}</span>
              <ArrowRight size={16} className={locale === "ar" ? "rotate-180" : ""} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}