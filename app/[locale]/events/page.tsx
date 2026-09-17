import { Calendar, Compass, MapPin, ArrowRight } from "lucide-react"
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
    <div className="bg-[#000000] text-white">
      {/* Editorial Header */}
      <section className="border-b border-white/10 py-20 md:py-28">
        <div className="container-page">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#fa8716]" />
              <span className="editorial-label text-[#fa8716]">
                {locale === "en" ? "TECHNICAL SESSIONS AND SYMPOSIUMS // CALENDAR 2026" : "الجلسات التقنية والمؤتمرات // الأجندة 2026"}
              </span>
            </div>

            <h1 className="editorial-headline text-white">
              {t("heading")}
            </h1>

            <p className="editorial-lead text-slate-300 max-w-3xl">
              {locale === "en"
                ? "Bridging Egyptian researchers, students, and engineers through technical workshops, symposiums, and international Optica colloquia."
                : "ربط الباحثين والطلاب والمهندسين في مصر عبر ورش العمل التقنية والمؤتمرات والندوات العلمية الدولية."}
            </p>
          </div>
        </div>
      </section>

      {/* 3D Scene C: Laser Beamsplitter and Prism Dispersion */}
      <BeamSection />

      {/* Flagship Spotlight Symposium Banner */}
      <section className="py-20 md:py-24 border-b border-white/10">
        <div className="container-page">
          <div className="p-8 sm:p-12 md:p-14 bg-[#02060B] border border-white/10 relative">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-wrap items-center gap-3 font-mono text-[10px]">
                  <span className="px-2.5 py-1 font-bold bg-[#fa8716] text-black uppercase tracking-wider">
                    {locale === "en" ? "FLAGSHIP SYMPOSIUM 2026" : "المؤتمر العلمي السنوي 2026"}
                  </span>
                  <span className="px-2.5 py-1 text-slate-300 border border-white/10">
                    {locale === "en" ? "HYBRID · CAIRO AND ONLINE" : "حضور شخصي وعبر الإنترنت"}
                  </span>
                  <span className="px-2.5 py-1 text-[#5CB1A2] border border-[#5CB1A2]/30">
                    {locale === "en" ? "CALL FOR ABSTRACTS OPEN" : "باب تقديم الملخصات البحثية مفتوح"}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                  {locale === "en"
                    ? "Inaugural Egyptian Photonics Workshop and Scientific Symposium 2026"
                    : "المؤتمر العلمي وورشة العمل الافتتاحية لعلوم الضوئيات بمصر 2026"}
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light max-w-2xl">
                  {locale === "en"
                    ? "A landmark national gathering uniting university students, optical engineering faculty, telecom operators, and laser industry experts. Featuring technical keynotes, lab demonstrations, and publication tracks."
                    : "ملتقى علمي وطني يجمع طلاب الجامعات وأعضاء هيئة التدريس وشركات الاتصالات وخبراء صناعة الليزر، يتضمن محاضرات تقنية وتجارب معملية وعروضاً بحثية."}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-slate-300 pt-2">
                  <div className="flex items-center gap-2">
                    <Calendar size={15} className="text-[#fa8716]" />
                    <span>{locale === "en" ? "15 Nov 2026 · 09:30 - 17:00" : "15 نوفمبر 2026 · 09:30 - 17:00"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="text-[#5CB1A2]" />
                    <span>{locale === "en" ? "Cairo University Faculty of Engineering" : "كلية الهندسة جامعة القاهرة"}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href={`/${locale}/join`}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#fa8716] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                  >
                    <span>{locale === "en" ? "Register for Symposium" : "التسجيل لحضور المؤتمر"}</span>
                    <ArrowRight size={14} className={locale === "ar" ? "rotate-180" : ""} />
                  </Link>
                </div>
              </div>

              {/* Right Column: Session Tracks */}
              <div className="lg:col-span-4 p-6 bg-[#000000] border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-[10px]">
                  <span className="text-[#fa8716] font-bold tracking-wider uppercase">
                    {locale === "en" ? "SESSION TRACKS" : "محاور الجلسات"}
                  </span>
                  <span className="text-slate-500">4 TRACKS</span>
                </div>
                <div className="divide-y divide-white/5">
                  {[
                    locale === "en" ? "Silicon Photonics and PIC Design" : "تصميم رقائق السيليكون الضوئية",
                    locale === "en" ? "Laser Processing and Ultrafast Optics" : "معالجة المواد بالليزر والبصريات فائقة السرعة",
                    locale === "en" ? "Quantum Optics and Cryptography" : "البصريات الكمية والتشفير الآمن",
                    locale === "en" ? "Student Poster Session and Awards" : "جلسة ملصقات الطلاب وجوائز التميز",
                  ].map((track, i) => (
                    <div key={i} className="py-3 flex items-start gap-3 text-xs">
                      <span className="editorial-label text-[#5CB1A2] text-[10px] mt-0.5">
                        {"//"} 0{i + 1}
                      </span>
                      <span className="text-slate-200 font-sans">{track}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Technical Sessions Grid */}
      <section className="py-20 md:py-24 border-b border-white/10">
        <div className="container-page">
          <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/10">
            <div>
              <span className="editorial-label text-[#fa8716] block mb-2">
                {locale === "en" ? "ACTIVE SESSIONS" : "الجلسات النشطة"}
              </span>
              <h2 className="editorial-headline text-white">
                {t("filter_upcoming")}
              </h2>
            </div>
            <span className="editorial-label text-slate-400">
              {upcoming.length} {locale === "en" ? "EVENTS SCHEDULED" : "فعاليات مسجلة"}
            </span>
          </div>

          {upcoming.length === 0 ? (
            <div className="p-16 text-center border border-white/10 bg-[#02060B]">
              <div className="w-12 h-12 border border-white/10 flex items-center justify-center mx-auto mb-4 text-[#fa8716]">
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
        </div>
      </section>

      {/* Past Events Section (if any) */}
      {past.length > 0 && (
        <section className="py-20">
          <div className="container-page">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-slate-400 tracking-tight">
                {t("filter_past")}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {past.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

