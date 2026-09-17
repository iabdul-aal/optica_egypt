import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { siteConfig } from "@/lib/site-config"
import { Target, Eye, Globe, Calendar, ShieldCheck, Building2, BookOpen, Layers, Award, Cpu } from "lucide-react"

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
      icon: BookOpen,
      accent: "#fa8716",
      title: locale === "en" ? "Knowledge Transmission" : "نقل وتوطين المعرفة البصرية",
      desc: locale === "en"
        ? "Delivering state-of-the-art technical workshops, peer-reviewed colloquia, and hands-on lab masterclasses in silicon photonics, ultrafast lasers, and optical telecommunications."
        : "تنظيم ورش عمل تقنية متقدمة وندوات علمية محكمة وبرامج تدريب معملي مكثف في مجالات الفوتونيات المتكاملة والليزر والاتصالات الضوئية.",
    },
    {
      id: "02",
      icon: Layers,
      accent: "#00B4FF",
      title: locale === "en" ? "National Research Synergy" : "تكامل المراكز البحثية المصرية",
      desc: locale === "en"
        ? "Connecting faculty, graduate investigators, and laboratory facilities across Egyptian universities to eliminate research silos and enable shared access to spectroscopy equipment."
        : "ربط أعضاء هيئة التدريس وباحثي الدراسات العليا والمختبرات المتخصصة عبر الجامعات المصرية لإتاحة التجهيزات المعملية المتقدمة لجميع الباحثين.",
    },
    {
      id: "03",
      icon: Cpu,
      accent: "#D4AF37",
      title: locale === "en" ? "Industrial Co-Design" : "الشراكة والتطوير الصناعي",
      desc: locale === "en"
        ? "Bridging telecom operators, fiber cable providers, and semiconductor startups with cutting-edge optical engineering talent and applied prototyping testbeds."
        : "بناء جسور تعاون مع مشغلي الاتصالات وشركات كوابل الألياف الضوئية والشركات الناشئة لتبني الكفاءات الهندسية وتطوير النماذج الأولية.",
    },
    {
      id: "04",
      icon: Award,
      accent: "#10B981",
      title: locale === "en" ? "Global Optica Gateway" : "بوابة أوبتيكا العالمية",
      desc: locale === "en"
        ? "Direct conduits for Egyptian students and investigators to Optica Global travel grants, technical division working groups, international student chapters, and publishing archives."
        : "توفير مسارات مباشرة للطلاب والباحثين المصريين للاستفادة من منح السفر الدولية ومجموعات العمل التقنية ودوريات النشر التابعة لجمعية أوبتيكا.",
    },
  ]

  const UNIVERSITIES = [
    { name: locale === "en" ? "Cairo University" : "جامعة القاهرة", lab: "Nanophotonics and Devices Group" },
    { name: locale === "en" ? "Ain Shams University" : "جامعة عين شمس", lab: "Optical Communications and Photonic Systems" },
    { name: locale === "en" ? "Zewail City of Science and Technology" : "مدينة زويل للعلوم والتكنولوجيا", lab: "Center for Photonics and Smart Materials" },
    { name: locale === "en" ? "American University in Cairo (AUC)" : "الجامعة الأمريكية بالقاهرة", lab: "Nanotechnology and Materials Research Center" },
    { name: locale === "en" ? "Egypt-Japan University (E-JUST)" : "الجامعة المصرية اليابانية", lab: "Optical Networks and Applied Physics" },
    { name: locale === "en" ? "Alexandria University" : "جامعة الإسكندرية", lab: "Microwave and Photonic Sensors Lab" },
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
    <div className="section container-page py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        {/* Header Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#fa8716]" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#fa8716]">
            {locale === "en" ? "CHARTER AND STRATEGIC MISSION · EST. 2026" : "الميثاق والرسالة الاستراتيجية · تأسس 2026"}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-white">
          {t("heading")}
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl">
          {locale === "en"
            ? "Empowering Egypt's photonics scientists, students, and engineers with direct access to the global photonics ecosystem, advanced research infrastructure, and industrial innovation."
            : "تمكين علماء ومهندسي وطلاب علوم الضوئيات بمصر من خلال الربط المباشر مع المنظومة العالمية والبنية التحتية البحثية المتقدمة."}
        </p>

        {/* Mission and Vision (Akhetonics Technical Panels) */}
        <div className="grid gap-6 md:grid-cols-2 mb-16">
          <div className="relative p-8 rounded-none border border-white/10 bg-[#010E17] group hover:border-[#fa8716] transition-all duration-300">
            <span className="absolute -top-1.5 -left-1.5 text-[10px] text-[#fa8716] font-mono">+</span>
            <span className="absolute -bottom-1.5 -right-1.5 text-[10px] text-[#fa8716] font-mono">+</span>
            <div className="w-12 h-12 flex items-center justify-center bg-[#fa8716]/10 border border-[#fa8716]/30 text-[#fa8716] mb-6">
              <Target size={22} />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              {t("mission_label")}
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
              {t("mission")}
            </p>
          </div>

          <div className="relative p-8 rounded-none border border-white/10 bg-[#010E17] group hover:border-[#00B4FF] transition-all duration-300">
            <span className="absolute -top-1.5 -left-1.5 text-[10px] text-[#00B4FF] font-mono">+</span>
            <span className="absolute -bottom-1.5 -right-1.5 text-[10px] text-[#00B4FF] font-mono">+</span>
            <div className="w-12 h-12 flex items-center justify-center bg-[#00B4FF]/10 border border-[#00B4FF]/30 text-[#00B4FF] mb-6">
              <Eye size={22} />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              {t("vision_label")}
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
              {t("vision")}
            </p>
          </div>
        </div>

        {/* Strategic Pillars */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono text-[#fa8716] uppercase tracking-widest">
              {locale === "en" ? "CORE PILLARS" : "الأركان الاستراتيجية"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8 tracking-tight">
            {locale === "en" ? "How We Drive the Photonics Ecosystem" : "كيف نبني منظومة الضوئيات الوطنية"}
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {PILLARS.map((p) => {
              const IconComp = p.icon
              return (
                <div
                  key={p.id}
                  className="p-6 rounded-none border border-white/10 bg-[#010E17] hover:border-white/25 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 flex items-center justify-center"
                      style={{ background: `${p.accent}15`, border: `1px solid ${p.accent}30`, color: p.accent }}
                    >
                      <IconComp size={20} />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-500">
                      SYS_PILLAR_{p.id}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-light">{p.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Egyptian University and Research Coalition */}
        <div className="mb-20 p-8 md:p-10 border border-white/10 bg-[#010E17]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00B4FF] mb-2 uppercase">
                <Building2 size={14} />
                <span>{locale === "en" ? "ACADEMIC NETWORK" : "الشبكة الأكاديمية"}</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                {locale === "en" ? "Egyptian Photonics Laboratory Coalition" : "المراكز والمعامل البحثية الشريكة في مصر"}
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              6 CORE INSTITUTIONS
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {UNIVERSITIES.map((u, i) => (
              <div key={i} className="p-4 bg-white/5 border border-white/10 hover:border-[#D4AF37] transition-all">
                <p className="font-bold text-sm text-white mb-1">{u.name}</p>
                <p className="text-xs text-slate-400 font-mono">{u.lab}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Roadmap 2026-2027 */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8">
            {locale === "en" ? "2026-2027 Strategic Roadmap" : "خارطة الطريق الاستراتيجية 2026-2027"}
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ROADMAP.map((r, i) => (
              <div key={i} className="p-6 border border-white/10 bg-[#010E17] flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2.5 py-1 mb-4 text-[10px] font-mono font-bold bg-[#fa8716]/10 text-[#fa8716] border border-[#fa8716]/30">
                    {r.period}
                  </span>
                  <h4 className="font-bold text-sm text-white mb-2">{r.phase}</h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">{r.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Profile and Global Affiliation Panel */}
        <div className="rounded-none border border-white/15 bg-black/60 p-8 md:p-10 grid sm:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-white/5 border border-white/10 text-[#fa8716]">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-xs uppercase font-mono text-slate-400 mb-1">
                {t("founded_label")}
              </p>
              <p className="text-lg font-bold text-white">{siteConfig.founded}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-white/5 border border-white/10 text-[#00B4FF]">
              <Globe size={20} />
            </div>
            <div>
              <p className="text-xs uppercase font-mono text-slate-400 mb-1">
                {t("affiliation_label")}
              </p>
              <p className="text-sm font-semibold text-white">{t("affiliation")}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-white/5 border border-white/10 text-emerald-400">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-xs uppercase font-mono text-slate-400 mb-1">
                {locale === "en" ? "STATUS" : "الحالة"}
              </p>
              <p className="text-sm font-semibold text-emerald-400">
                {locale === "en" ? "Officially Recognized Local Section" : "قسم محلي معتمد رسمياً"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
