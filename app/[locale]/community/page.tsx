import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import Link from "next/link"
import { ArrowRight, Terminal } from "lucide-react"

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

  const TRACKS = [
    {
      id: "01",
      code: "TRACK_01",
      title: locale === "en" ? "Undergraduates and Graduates" : "طلاب الجامعات والخريجون",
      desc: locale === "en"
        ? "Gain hands-on optical design training, lab mentorship, and international competition support."
        : "الحصول على تدريب عملي في التصميم البصري، وإشراف معملي، ودعم للمسابقات الدولية.",
      status: locale === "en" ? "Active Mentorship Cohort" : "برنامج الإرشاد الأكاديمي",
    },
    {
      id: "02",
      code: "TRACK_02",
      title: locale === "en" ? "Academic Researchers" : "الباحثون الأكاديميون",
      desc: locale === "en"
        ? "Facilitate inter-university research, share specialized laser and spectroscopy facilities, and publish jointly."
        : "تسهيل الأبحاث المشتركة بين الجامعات، ومشاركة التجهيزات المعملية المتقدمة لليزر والتحليل الطيفي.",
      status: locale === "en" ? "Shared Lab Network" : "شبكة المختبرات المشتركة",
    },
    {
      id: "03",
      code: "TRACK_03",
      title: locale === "en" ? "Industry and Telecom" : "قطاع الصناعة والاتصالات",
      desc: locale === "en"
        ? "Connect optical fiber, telecom, and sensor manufacturers with top engineering talent and applied research and development."
        : "ربط قطاعات الألياف الضوئية والاتصالات ومصنعي الحساسات بأفضل الكفاءات والبحوث التطبيقية.",
      status: locale === "en" ? "Applied Testbeds" : "منصات البحوث التطبيقية",
    },
    {
      id: "04",
      code: "TRACK_04",
      title: locale === "en" ? "DeepTech Startups" : "الشركات التكنولوجية الناشئة",
      desc: locale === "en"
        ? "Incubate photonics hardware concepts, access academic prototyping labs, and scale technical ventures."
        : "احتضان أفكار العتاد البصري، والوصول إلى معامل النمذجة الأولية وتوسيع الشركات التقنية.",
      status: locale === "en" ? "Hardware Prototyping" : "النماذج الأولية للأجهزة",
    },
  ]

  const LABS_DIRECTORY = [
    {
      node: "LAB_01",
      institution: locale === "en" ? "Cairo University" : "جامعة القاهرة",
      lab: locale === "en" ? "Nanophotonics and Metamaterials Lab" : "مختبر الفوتونيات النانوية والمواد الميتامية",
      focus: "Silicon Photonics, Plasmonics, PICs",
      contact: "cairo.photonics@eng.cu.edu.eg",
    },
    {
      node: "LAB_02",
      institution: locale === "en" ? "Ain Shams University" : "جامعة عين شمس",
      lab: locale === "en" ? "Optical Telecom and Wireless Lab" : "مختبر الاتصالات الضوئية والشبكات اللاسلكية",
      focus: "DWDM Systems, Free Space Optics (FSO)",
      contact: "optics@eng.asu.edu.eg",
    },
    {
      node: "LAB_03",
      institution: locale === "en" ? "Zewail City of Science and Tech" : "مدينة زويل للعلوم والتكنولوجيا",
      lab: locale === "en" ? "Center for Photonics and Smart Materials" : "مركز علوم الضوئيات والمواد الذكية",
      focus: "Ultrafast Spectroscopy, Quantum Optics",
      contact: "cpsm@zewailcity.edu.eg",
    },
    {
      node: "LAB_04",
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
    <div className="bg-[#000000] text-white">
      {/* Editorial Header */}
      <section className="border-b border-white/10 py-20 md:py-28">
        <div className="container-page">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#fa8716]" />
              <span className="editorial-label text-[#fa8716]">
                {locale === "en" ? "NATIONAL PHOTONICS ECOSYSTEM // EGYPT ROSTER" : "المنظومة الوطنية لعلوم الضوئيات // سجل مصر"}
              </span>
            </div>

            <h1 className="editorial-headline text-white">
              {t("heading")}
            </h1>

            <p className="editorial-lead text-slate-300 max-w-3xl">
              {locale === "en"
                ? "Connecting university researchers, telecom engineering professionals, students, and photonics hardware innovators across Egypt."
                : "ربط الباحثين الأكاديميين ومهندسي الاتصالات والطلاب ومبتكري عتاد الضوئيات في جميع أنحاء مصر."}
            </p>
          </div>
        </div>
      </section>

      {/* 4 Community Cohort Tracks Ledger */}
      <section className="py-20 md:py-24 border-b border-white/10">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="editorial-label text-[#fa8716] block mb-2">
                {locale === "en" ? "COHORT PATHWAYS" : "مسارات المنظومة"}
              </span>
              <h2 className="editorial-headline text-white">
                {locale === "en" ? "Four Pillars of Collaboration" : "محاور التعاون الأربعة"}
              </h2>
            </div>
            <span className="editorial-label text-slate-500">
              NATIONAL INTEGRATION
            </span>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {TRACKS.map((track) => (
              <div
                key={track.id}
                className="py-10 group hover:bg-white/[0.015] transition-colors"
              >
                <div className="grid lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-2">
                    <span className="editorial-label text-[#fa8716] font-bold text-lg font-mono">
                      {"//"} {track.id}
                    </span>
                  </div>

                  <div className="lg:col-span-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#fa8716] transition-colors">
                      {track.title}
                    </h3>
                    <p className="editorial-label text-[10px] text-[#5CB1A2] mt-1 font-mono">
                      STATUS: {track.status}
                    </p>
                  </div>

                  <div className="lg:col-span-6">
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                      {track.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Photonics Labs Directory Ledger */}
      <section className="py-20 md:py-24 border-b border-white/10">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#5CB1A2] mb-2 uppercase">
                <Terminal size={14} />
                <span>{locale === "en" ? "LABORATORY DIRECTORY" : "دليل المختبرات"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {locale === "en" ? "Specialized Photonics Labs in Egypt" : "المعامل والمراكز البحثية المتخصصة بمصر"}
              </h2>
            </div>
            <span className="editorial-label text-slate-400">
              ACADEMIC COLLABORATION NETWORK
            </span>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {LABS_DIRECTORY.map((item, idx) => (
              <div
                key={idx}
                className="py-6 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group hover:bg-white/[0.015] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="editorial-label text-[#fa8716] mt-0.5">{item.node}</span>
                  <div>
                    <span className="editorial-label text-xs text-[#fa8716] font-bold block mb-1">
                      {item.institution}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#fa8716] transition-colors">
                      {item.lab}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-1">FOCUS: {item.focus}</p>
                  </div>
                </div>

                <div className="font-mono text-xs text-slate-400 self-start sm:self-center">
                  <span className="text-slate-300 bg-white/[0.02] border border-white/10 px-3 py-1.5 block sm:inline">
                    {item.contact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Membership Callout Spread */}
      <section className="py-20 md:py-24 bg-[#02060B]">
        <div className="container-page">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3 font-mono text-[10px] text-[#fa8716]">
              <span className="w-2 h-2 bg-[#fa8716]" />
              <span className="editorial-label text-[#fa8716]">
                {locale === "en" ? "ZERO MEMBERSHIP FEES FOR STUDENTS" : "عضوية مجانية ومتاحة للجميع"}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t("join_cta")}
            </h2>

            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              {j("body")}
            </p>

            <div className="divide-y divide-white/10 border-y border-white/10 py-2">
              {benefits.map((benefit, i) => (
                <div key={i} className="py-3 flex items-start gap-3 text-sm">
                  <span className="editorial-label text-[#5CB1A2] text-xs mt-0.5">{"//"} 0{i + 1}</span>
                  <span className="text-slate-200 font-light">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href={`/${locale}/join`}
                className="px-8 py-3.5 bg-[#fa8716] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
              >
                <span>{t("join_cta")}</span>
              </Link>
              <Link
                href={`/${locale}/events`}
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <span>{locale === "en" ? "Explore Upcoming Events" : "استكشف الفعاليات القادمة"}</span>
                <ArrowRight size={14} className={locale === "ar" ? "rotate-180" : ""} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

