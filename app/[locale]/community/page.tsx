import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import Link from "next/link"
import { GraduationCap, Microscope, Factory, Rocket, ArrowRight, Terminal } from "lucide-react"

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
    title: `${t("heading")} | Optica Egypt Local Section`,
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

  const LABS_DIRECTORY = [
    {
      institution: locale === "en" ? "Cairo University" : "جامعة القاهرة",
      lab: locale === "en" ? "Nanophotonics and Metamaterials Lab" : "مختبر الفوتونيات النانوية والمواد الميتامية",
      focus: "Silicon Photonics, Plasmonics, PICs",
      contact: "cairo.photonics@eng.cu.edu.eg",
    },
    {
      institution: locale === "en" ? "Ain Shams University" : "جامعة عين شمس",
      lab: locale === "en" ? "Optical Telecom and Wireless Lab" : "مختبر الاتصالات الضوئية والشبكات اللاسلكية",
      focus: "DWDM Systems, Free Space Optics (FSO)",
      contact: "optics@eng.asu.edu.eg",
    },
    {
      institution: locale === "en" ? "Zewail City of Science and Tech" : "مدينة زويل للعلوم والتكنولوجيا",
      lab: locale === "en" ? "Center for Photonics and Smart Materials" : "مركز علوم الضوئيات والمواد الذكية",
      focus: "Ultrafast Spectroscopy, Quantum Optics",
      contact: "cpsm@zewailcity.edu.eg",
    },
    {
      institution: locale === "en" ? "American University in Cairo" : "الجامعة الأمريكية بالقاهرة",
      lab: locale === "en" ? "Nanotechnology Research Center" : "مركز أبحاث تكنولوجيا النانو",
      focus: "Biophotonics, Optical Microcavities",
      contact: "nano@aucegypt.edu",
    },
  ]

  const benefits = [
    locale === "en" ? "Direct access to technical workshops and specialized seminars" : "وصول حصري ومباشر إلى ورش العمل التقنية والندوات التخصصية",
    locale === "en" ? "Network with international Optica fellows and senior engineers" : "بناء شبكة علاقات مع علماء وباحثي جمعية أوبتيكا العالمية",
    locale === "en" ? "Eligibility for international student travel grants and publication awards" : "الأهلية للتقديم على منح السفر وجوائز النشر العلمي للطلاب",
    locale === "en" ? "Joint research and equipment sharing across Egyptian university labs" : "التعاون البحثي ومشاركة التجهيزات المعملية عبر الجامعات المصرية",
  ]

  return (
    <div className="section container-page py-16 md:py-24">
      {/* Header Eyebrow */}
      <div className="max-w-4xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 mb-4">
          <span className="w-1.5 h-1.5 bg-[#fa8716]" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#fa8716]">
            {locale === "en" ? "NATIONAL PHOTONICS ECOSYSTEM" : "المنظومة الوطنية لعلوم الضوئيات"}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-white">
          {t("heading")}
        </h1>
        <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-3xl">
          {locale === "en"
            ? "Connecting university researchers, telecom engineering professionals, students, and photonics hardware innovators across Egypt."
            : "ربط الباحثين الأكاديميين ومهندسي الاتصالات والطلاب ومبتكري عتاد الضوئيات في جميع أنحاء مصر."}
        </p>
      </div>

      {/* Community 4-Pillar Grid (Akhetonics Technical Panels) */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-20">
        <div className="reticle-box p-8 bg-[#010E17] flex flex-col justify-between group hover:border-[#5CB1A2] transition-all">
          <div>
            <div className="tech-icon-box text-[#5CB1A2] mb-6">
              <GraduationCap size={22} />
            </div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              SYS_TRACK_01
            </span>
            <h3 className="text-xl font-bold mb-3 text-white">
              {locale === "en" ? "Undergraduates and Graduates" : "طلاب الجامعات والخريجون"}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed font-light mb-6">
              {locale === "en"
                ? "Gain hands-on optical design training, lab mentorship, and international competition support."
                : "الحصول على تدريب عملي في التصميم البصري، وإشراف معملي، ودعم للمسابقات الدولية."}
            </p>
          </div>
          <span className="text-xs font-mono text-[#5CB1A2] pt-4 border-t border-white/10">
            {locale === "en" ? "Active Mentorship Cohort" : "برنامج الإرشاد الأكاديمي"}
          </span>
        </div>

        <div className="reticle-box p-8 bg-[#010E17] flex flex-col justify-between group hover:border-[#fa8716] transition-all">
          <div>
            <div className="tech-icon-box text-[#fa8716] mb-6">
              <Microscope size={22} />
            </div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              SYS_TRACK_02
            </span>
            <h3 className="text-xl font-bold mb-3 text-white">
              {locale === "en" ? "Academic Researchers" : "الباحثون الأكاديميون"}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed font-light mb-6">
              {locale === "en"
                ? "Facilitate inter-university research, share specialized laser and spectroscopy facilities, and publish jointly."
                : "تسهيل الأبحاث المشتركة بين الجامعات، ومشاركة التجهيزات المعملية المتقدمة لليزر والتحليل الطيفي."}
            </p>
          </div>
          <span className="text-xs font-mono text-[#fa8716] pt-4 border-t border-white/10">
            {locale === "en" ? "Shared Lab Network" : "شبكة المختبرات المشتركة"}
          </span>
        </div>

        <div className="reticle-box p-8 bg-[#010E17] flex flex-col justify-between group hover:border-[#5CB1A2] transition-all">
          <div>
            <div className="tech-icon-box text-[#5CB1A2] mb-6">
              <Factory size={22} />
            </div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              SYS_TRACK_03
            </span>
            <h3 className="text-xl font-bold mb-3 text-white">
              {locale === "en" ? "Industry and Telecom" : "قطاع الصناعة والاتصالات"}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed font-light mb-6">
              {locale === "en"
                ? "Connect optical fiber, telecom, and sensor manufacturers with top engineering talent and applied R&D."
                : "ربط قطاعات الألياف الضوئية والاتصالات ومصنعي الحساسات بأفضل الكفاءات والبحوث التطبيقية."}
            </p>
          </div>
          <span className="text-xs font-mono text-[#5CB1A2] pt-4 border-t border-white/10">
            {locale === "en" ? "Applied R&D Testbeds" : "منصات البحوث التطبيقية"}
          </span>
        </div>

        <div className="reticle-box p-8 bg-[#010E17] flex flex-col justify-between group hover:border-[#00e660] transition-all">
          <div>
            <div className="tech-icon-box text-[#00e660] mb-6">
              <Rocket size={22} />
            </div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              SYS_TRACK_04
            </span>
            <h3 className="text-xl font-bold mb-3 text-white">
              {locale === "en" ? "Deeptech Startups" : "الشركات التكنولوجية الناشئة"}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed font-light mb-6">
              {locale === "en"
                ? "Incubate photonics hardware concepts, access academic prototyping labs, and scale technical ventures."
                : "احتضان أفكار العتاد البصري، والوصول إلى معامل النمذجة الأولية وتوسيع الشركات التقنية."}
            </p>
          </div>
          <span className="text-xs font-mono text-[#00e660] pt-4 border-t border-white/10">
            {locale === "en" ? "Hardware Prototyping" : "النماذج الأولية للأجهزة"}
          </span>
        </div>
      </div>

      {/* Egyptian Photonics Research Labs Directory */}
      <div className="mb-20 reticle-box p-8 md:p-10 bg-[#010E17]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#5CB1A2] mb-2 uppercase">
              <Terminal size={14} />
              <span>{locale === "en" ? "DIRECTORY" : "دليل المختبرات"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {locale === "en" ? "Specialized Photonics Labs in Egypt" : "المعامل والمراكز البحثية المتخصصة بمصر"}
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            ACADEMIC COLLABORATION NETWORK
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {LABS_DIRECTORY.map((item, idx) => (
            <div key={idx} className="p-6 bg-black/60 border border-white/10 hover:border-[#fa8716] transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-[#fa8716]">{item.institution}</span>
                <span className="text-[10px] font-mono text-slate-500">FACILITY_0{idx + 1}</span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">{item.lab}</h4>
              <p className="text-xs text-slate-300 font-mono mb-4">FOCUS: {item.focus}</p>
              <span className="text-[11px] font-mono text-slate-400 block pt-3 border-t border-white/5">
                {item.contact}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Community Membership Callout (Akhetonics & Entor Tech Standard) */}
      <div className="reticle-box p-8 md:p-14 bg-[#010E17]">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#fa8716]/15 text-[#fa8716] text-xs font-mono mb-4 border border-[#fa8716]/30">
            <span>{locale === "en" ? "ZERO MEMBERSHIP FEES FOR STUDENTS" : "عضوية مجانية ومتاحة للجميع"}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 text-white">
            {t("join_cta")}
          </h2>
          <p className="text-slate-300 text-base mb-8 leading-relaxed font-light">
            {j("body")}
          </p>

          <div className="space-y-0 mb-10 border-t border-white/10">
            {benefits.map((benefit, i) => (
              <div key={i} className="tech-list-row py-3 text-sm">
                <span className="font-mono text-[#5CB1A2] text-xs">{"//"} 0{i + 1}</span>
                <span className="text-slate-200 font-light">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href={`/${locale}/join`} className="btn-primary py-3 px-8 text-xs">
              <span>{t("join_cta")}</span>
            </Link>
            <Link
              href={`/${locale}/events`}
              className="btn-secondary py-3 px-8 text-xs inline-flex items-center gap-2"
            >
              <span>{locale === "en" ? "Explore Upcoming Events" : "استكشف الفعاليات القادمة"}</span>
              <ArrowRight size={14} className={locale === "ar" ? "rotate-180" : ""} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
