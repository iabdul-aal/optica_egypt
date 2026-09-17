import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { siteConfig } from "@/lib/site-config"
import { ShieldCheck, Calendar, Globe, Building2 } from "lucide-react"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "about" })
  return {
    title: `${t("heading")} | Optica Egypt Local Section`,
    description: t("mission"),
  }
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "about" })

  const PILLARS = [
    {
      id: "01",
      code: "PILLAR_01",
      title: locale === "en" ? "Knowledge Transmission" : "نقل وتوطين المعرفة البصرية",
      desc: locale === "en"
        ? "Delivering state-of-the-art technical workshops, peer-reviewed colloquia, and hands-on lab masterclasses in silicon photonics, ultrafast lasers, and optical telecommunications."
        : "تنظيم ورش عمل تقنية متقدمة وندوات علمية محكمة وبرامج تدريب معملي مكثف في مجالات الفوتونيات المتكاملة والليزر والاتصالات الضوئية.",
      focus: locale === "en" ? "Workshops, Masterclasses, and Technical Groups" : "ورش العمل والماستر كلاس والمجموعات التخصصية",
    },
    {
      id: "02",
      code: "PILLAR_02",
      title: locale === "en" ? "National Research Synergy" : "تكامل المراكز البحثية المصرية",
      desc: locale === "en"
        ? "Connecting faculty, graduate investigators, and laboratory facilities across Egyptian universities to eliminate research silos and enable shared access to spectroscopy equipment."
        : "ربط أعضاء هيئة التدريس وباحثي الدراسات العليا والمختبرات المتخصصة عبر الجامعات المصرية لإتاحة التجهيزات المعملية المتقدمة لجميع الباحثين.",
      focus: locale === "en" ? "Shared Spectroscopy and Lab Conduits" : "المعامل المشتركة والتجهيزات الطيفية المتقدمة",
    },
    {
      id: "03",
      code: "PILLAR_03",
      title: locale === "en" ? "Industrial Co-Design" : "الشراكة والتطوير الصناعي",
      desc: locale === "en"
        ? "Bridging telecom operators, fiber cable providers, and semiconductor startups with cutting-edge optical engineering talent and applied prototyping testbeds."
        : "بناء جسور تعاون مع مشغلي الاتصالات وشركات كوابل الألياف الضوئية والشركات الناشئة لتبني الكفاءات الهندسية وتطوير النماذج الأولية.",
      focus: locale === "en" ? "Subsea Telecommunications and Photonic Hardware" : "الاتصالات البحرية وعتاد الضوئيات المتطور",
    },
    {
      id: "04",
      code: "PILLAR_04",
      title: locale === "en" ? "Global Optica Gateway" : "بوابة أوبتيكا العالمية",
      desc: locale === "en"
        ? "Direct conduits for Egyptian students and investigators to Optica Global travel grants, technical division working groups, international student chapters, and publishing archives."
        : "توفير مسارات مباشرة للطلاب والباحثين المصريين للاستفادة من منح السفر الدولية ومجموعات العمل التقنية ودوريات النشر التابعة لجمعية أوبتيكا.",
      focus: locale === "en" ? "International Travel Grants and Publishing" : "منح السفر الدولية والنشر العلمي المحكم",
    },
  ]

  const UNIVERSITIES = [
    { node: "NODE_01", name: locale === "en" ? "Cairo University" : "جامعة القاهرة", lab: "Nanophotonics and Devices Group", focus: "Silicon Photonics and Plasmonics" },
    { node: "NODE_02", name: locale === "en" ? "Ain Shams University" : "جامعة عين شمس", lab: "Optical Communications and Photonic Systems", focus: "DWDM Systems and FSO" },
    { node: "NODE_03", name: locale === "en" ? "Zewail City of Science and Technology" : "مدينة زويل للعلوم والتكنولوجيا", lab: "Center for Photonics and Smart Materials", focus: "Ultrafast Laser Spectroscopy" },
    { node: "NODE_04", name: locale === "en" ? "American University in Cairo" : "الجامعة الأمريكية بالقاهرة", lab: "Nanotechnology and Materials Research Center", focus: "Biophotonics and Optical Sensors" },
    { node: "NODE_05", name: locale === "en" ? "Egypt-Japan University (E-JUST)" : "الجامعة المصرية اليابانية", lab: "Optical Networks and Applied Physics", focus: "Nonlinear Fiber Optics" },
    { node: "NODE_06", name: locale === "en" ? "Alexandria University" : "جامعة الإسكندرية", lab: "Microwave and Photonic Sensors Lab", focus: "Fiber Bragg Gratings" },
  ]

  const ROADMAP = [
    {
      period: "Q1 2026",
      phase: locale === "en" ? "Phase 01: Charter Ratification" : "المرحلة الأولى: الاعتماد التأسيسي",
      detail: locale === "en"
        ? "Official recognition by Optica Global headquarters, constitution approval, and founding board appointment."
        : "الاعتماد الرسمي من المقر الرئيسي لجمعية أوبتيكا العالمية وإقرار اللائحة التأسيسية وتعيين الهيئة الإدارية.",
    },
    {
      period: "Q3 2026",
      phase: locale === "en" ? "Phase 02: Flagship National Symposium" : "المرحلة الثانية: المؤتمر السنوي الافتتاحي",
      detail: locale === "en"
        ? "Inaugural Egyptian Photonics Workshop uniting researchers, students, and industry partners in Cairo."
        : "انعقاد المؤتمر الوطني الأول لعلوم الضوئيات بالقاهرة بمشاركة واسعة من الجامعات والجهات الصناعية.",
    },
    {
      period: "Q4 2026",
      phase: locale === "en" ? "Phase 03: Shared Lab Grants and Training" : "المرحلة الثالثة: مسارات التدريب ومنح المختبرات",
      detail: locale === "en"
        ? "Launch of Photonic Integrated Circuit (PIC) design masterclasses and national student travel sponsorship."
        : "إطلاق الدورات التخصصية لتصميم الرقائق الضوئية وتفعيل برامج دعم سفر الطلاب للمؤتمرات الدولية.",
    },
    {
      period: "2027+",
      phase: locale === "en" ? "Phase 04: Regional MENA Photonics Hub" : "المرحلة الرابعة: المركز الإقليمي للشرق الأوسط",
      detail: locale === "en"
        ? "Expanding cross-border research networks and co-hosting international Optica technical conferences in Egypt."
        : "توسيع شبكات التعاون البحثي عبر الحدود واستضافة مؤتمرات أوبتيكا التخصصية الدولية في مصر.",
    },
  ]

  return (
    <div className="bg-[#000000] text-white">
      {/* Editorial Title Section */}
      <section className="border-b border-white/10 py-20 md:py-28">
        <div className="container-page">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#fa8716]" />
              <span className="editorial-label text-[#fa8716]">
                {locale === "en" ? "CHARTER AND STRATEGIC FOUNDATION // EST. 2026" : "الميثاق والرسالة الاستراتيجية // تأسس 2026"}
              </span>
            </div>

            <h1 className="editorial-headline text-white">
              {t("heading")}
            </h1>

            <p className="editorial-lead text-slate-300 max-w-3xl">
              {locale === "en"
                ? "Empowering Egypt's photonics scientists, students, and engineers with direct access to the global photonics ecosystem, advanced research infrastructure, and industrial innovation."
                : "تمكين علماء ومهندسي وطلاب علوم الضوئيات بمصر من خلال الربط المباشر مع المنظومة العالمية والبنية التحتية البحثية المتقدمة."}
            </p>
          </div>
        </div>
      </section>

      {/* Asymmetric Mission and Vision Spread */}
      <section className="py-20 md:py-24 border-b border-white/10">
        <div className="container-page">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Core Mandate */}
            <div className="lg:col-span-6 space-y-4">
              <span className="editorial-label text-[#fa8716] font-bold">
                MANDATE // 01 · {t("mission_label").toUpperCase()}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                {t("mission")}
              </h2>
            </div>

            {/* Right Column: Strategic Vision */}
            <div className="lg:col-span-6 space-y-4 lg:pt-2">
              <span className="editorial-label text-[#5CB1A2] font-bold">
                PERSPECTIVE // 02 · {t("vision_label").toUpperCase()}
              </span>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                {t("vision")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars: Numbered Architectural Ledger */}
      <section className="py-20 md:py-24 border-b border-white/10">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="editorial-label text-[#fa8716] block mb-2">
                {locale === "en" ? "STRATEGIC PILLARS" : "الأركان الاستراتيجية"}
              </span>
              <h2 className="editorial-headline text-white">
                {locale === "en" ? "How We Advance the Ecosystem" : "كيف نبني منظومة الضوئيات الوطنية"}
              </h2>
            </div>
            <span className="editorial-label text-slate-500">
              FOUR CORE AXES
            </span>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {PILLARS.map((p) => (
              <div
                key={p.id}
                className="py-10 group hover:bg-white/[0.015] transition-colors"
              >
                <div className="grid lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-2">
                    <span className="editorial-label text-[#fa8716] font-bold text-lg font-mono">
                      {"//"} {p.id}
                    </span>
                  </div>

                  <div className="lg:col-span-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#fa8716] transition-colors">
                      {p.title}
                    </h3>
                    <p className="editorial-label text-[10px] text-slate-500 mt-1">
                      {p.focus}
                    </p>
                  </div>

                  <div className="lg:col-span-6">
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* National Research Gazetteer: Institutional Directory Ledger */}
      <section className="py-20 md:py-24 border-b border-white/10">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#5CB1A2] mb-2 uppercase">
                <Building2 size={14} />
                <span>{locale === "en" ? "INSTITUTIONAL DIRECTORY" : "دليل الجامعات الشريكة"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {locale === "en" ? "Egyptian Photonics Laboratory Coalition" : "المراكز والمعامل البحثية الشريكة في مصر"}
              </h2>
            </div>
            <span className="editorial-label text-slate-400">
              6 CORE NODES
            </span>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {UNIVERSITIES.map((u, i) => (
              <div
                key={i}
                className="py-6 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-white/[0.015] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="editorial-label text-[#fa8716]">{u.node}</span>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#fa8716] transition-colors">
                      {u.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{u.lab}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 font-mono text-xs text-slate-400">
                  <span className="text-slate-500">FOCUS:</span>
                  <span className="text-slate-200">{u.focus}</span>
                  <span className="w-1.5 h-1.5 bg-[#00e660] ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Continuous Roadmap Spine */}
      <section className="py-20 md:py-24 border-b border-white/10">
        <div className="container-page">
          <div className="mb-14 pb-6 border-b border-white/10">
            <span className="editorial-label text-[#fa8716] block mb-2">
              {locale === "en" ? "MILESTONE TRACKER" : "تتبع المراحل"}
            </span>
            <h2 className="editorial-headline text-white">
              {locale === "en" ? "2026-2027 Strategic Roadmap" : "خارطة الطريق الاستراتيجية 2026-2027"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border-y border-white/10">
            {ROADMAP.map((r, i) => (
              <div
                key={i}
                className="py-8 px-6 flex flex-col justify-between group hover:bg-white/[0.015] transition-colors"
              >
                <div>
                  <span className="editorial-label text-[#fa8716] block mb-3 font-bold">
                    {r.period}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#fa8716] transition-colors">
                    {r.phase}
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {r.detail}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-white/5 font-mono text-[10px] text-slate-500">
                  MILESTONE // 0{i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Registry and Global Charter */}
      <section className="py-16 bg-[#02060B]">
        <div className="container-page">
          <div className="grid sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            <div className="px-6 py-4 flex items-start gap-4">
              <Calendar size={20} className="text-[#fa8716] mt-1 shrink-0" />
              <div>
                <p className="editorial-label text-slate-500 mb-1">{t("founded_label")}</p>
                <p className="text-base font-bold text-white">{siteConfig.founded}</p>
              </div>
            </div>

            <div className="px-6 py-4 flex items-start gap-4">
              <Globe size={20} className="text-[#5CB1A2] mt-1 shrink-0" />
              <div>
                <p className="editorial-label text-slate-500 mb-1">{t("affiliation_label")}</p>
                <p className="text-sm font-semibold text-white">{t("affiliation")}</p>
              </div>
            </div>

            <div className="px-6 py-4 flex items-start gap-4">
              <ShieldCheck size={20} className="text-[#00e660] mt-1 shrink-0" />
              <div>
                <p className="editorial-label text-slate-500 mb-1">
                  {locale === "en" ? "STATUS" : "الحالة"}
                </p>
                <p className="text-sm font-semibold text-[#00e660]">
                  {locale === "en" ? "Officially Recognized Local Section" : "قسم محلي معتمد رسمياً"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

