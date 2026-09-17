import { Calendar, Compass, MapPin, CheckCircle2, ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { getAllEvents } from "@/lib/events"
import { EventCard } from "@/components/sections/EventCard"
import { BeamSection } from "@/components/sections/BeamSection"
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
  const t = await getTranslations({ locale, namespace: "events" })
  return {
    title: `${t("heading")} | Optica Egypt Local Section`,
    description: t("subheading"),
  }
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "events" })
  const events = getAllEvents()

  const now = new Date()
  const upcoming = events.filter((e) => new Date(e.date) >= now)
  const past = events.filter((e) => new Date(e.date) < now)

  return (
    <div className="section container-page py-16 md:py-24">
      {/* Header Eyebrow */}
      <div className="max-w-4xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#fa8716]" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#fa8716]">
            {locale === "en" ? "TECHNICAL SESSIONS & WORKSHOPS" : "الجلسات التقنية والمؤتمرات"}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-white">
          {t("heading")}
        </h1>
        <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-3xl">
          {locale === "en"
            ? "Bridging Egyptian researchers, students, and engineers through technical workshops, symposiums, and international Optica colloquia."
            : "ربط الباحثين والطلاب والمهندسين في مصر عبر ورش العمل التقنية والمؤتمرات والندوات العلمية الدولية."}
        </p>
      </div>

      {/* 3D Scene C: Laser Beamsplitter & Prism Dispersion */}
      <BeamSection />

      {/* Flagship Spotlight Symposium Banner (Entor Tech & Akhetonics inspired) */}
      <div className="relative p-8 md:p-12 mb-16 rounded-none border border-[#fa8716]/30 bg-[#010E17] overflow-hidden shadow-2xl">
        <span className="absolute -top-1.5 -left-1.5 text-[10px] text-[#fa8716] font-mono">+</span>
        <span className="absolute -bottom-1.5 -right-1.5 text-[10px] text-[#fa8716] font-mono">+</span>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="px-3 py-1 text-[11px] font-mono font-bold bg-[#fa8716]/20 text-[#fa8716] border border-[#fa8716]/40">
                {locale === "en" ? "FLAGSHIP SYMPOSIUM 2026" : "المؤتمر العلمي السنوي 2026"}
              </span>
              <span className="px-3 py-1 text-[11px] font-mono bg-white/10 text-slate-300 border border-white/10">
                {locale === "en" ? "HYBRID · CAIRO & ONLINE" : "حضور شخصي وعبر الإنترنت"}
              </span>
              <span className="px-3 py-1 text-[11px] font-mono bg-[#00B4FF]/15 text-[#00B4FF] border border-[#00B4FF]/30">
                {locale === "en" ? "CALL FOR ABSTRACTS OPEN" : "باب تقديم الملخصات البحثية مفتوح"}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-snug">
              {locale === "en"
                ? "Inaugural Egyptian Photonics Workshop and Scientific Symposium 2026"
                : "المؤتمر العلمي وورشة العمل الافتتاحية لعلوم الضوئيات بمصر 2026"}
            </h2>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-light">
              {locale === "en"
                ? "A landmark national gathering uniting university students, optical engineering faculty, telecom operators, and laser industry experts. Featuring technical keynotes, lab demonstrations, and publication tracks."
                : "ملتقى علمي وطني يجمع طلاب الجامعات وأعضاء هيئة التدريس وشركات الاتصالات وخبراء صناعة الليزر، يتضمن محاضرات تقنية وتجارب معملية وعروضاً بحثية."}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 mb-8 font-mono">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#fa8716]" />
                <span>{locale === "en" ? "15 Nov 2026 · 09:30 - 17:00" : "15 نوفمبر 2026 · 09:30 - 17:00"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#00B4FF]" />
                <span>{locale === "en" ? "Cairo University Faculty of Engineering" : "كلية الهندسة جامعة القاهرة"}</span>
              </div>
            </div>

            <Link href={`/${locale}/join`} className="btn-primary text-xs py-3 px-8">
              <span>{locale === "en" ? "Register for Symposium" : "التسجيل لحضور المؤتمر"}</span>
              <ArrowRight size={14} className={locale === "ar" ? "rotate-180" : ""} />
            </Link>
          </div>

          <div className="lg:col-span-4 p-6 bg-black/60 border border-white/10 flex flex-col gap-3">
            <p className="text-xs uppercase font-mono font-bold text-[#fa8716] mb-1">
              {locale === "en" ? "SESSION TRACKS" : "محاور الجلسات"}
            </p>
            {[
              locale === "en" ? "Silicon Photonics & PIC Design" : "تصميم رقائق السيليكون الضوئية",
              locale === "en" ? "Laser Processing & Ultrafast Optics" : "معالجة المواد بالليزر والبصريات فائقة السرعة",
              locale === "en" ? "Quantum Optics & Cryptography" : "البصريات الكمية والتشفير الآمن",
              locale === "en" ? "Student Poster Session & Awards" : "جلسة ملصقات الطلاب وجوائز التميز",
            ].map((track, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 size={14} className="text-[#00B4FF] shrink-0" />
                <span>{track}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Technical Sessions Grid */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Calendar className="text-[#fa8716]" size={20} />
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {t("filter_upcoming")}
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {upcoming.length} {locale === "en" ? "EVENTS SCHEDULED" : "فعاليات مسجلة"}
          </span>
        </div>

        {upcoming.length === 0 ? (
          <div className="empty-state p-12 text-center rounded-none border border-white/10 bg-[#010E17]">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-[#fa8716]">
              <Compass size={22} />
            </div>
            <p className="text-slate-300 max-w-md mx-auto text-base leading-relaxed font-light">
              {t("empty_upcoming")}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        )}
      </section>

      {/* Past Events Section (if any) */}
      {past.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-white/10">
            <h2 className="text-xl font-bold text-slate-400 tracking-tight">
              {t("filter_past")}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {past.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
