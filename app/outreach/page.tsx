import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { HeartHandshake, ArrowRight } from "lucide-react"
import Link from "next/link"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("outreach")
  return {
    title: `${t("heading")} | Optica Egypt Local Section`,
    description: t("subheading"),
  }
}

export default async function OutreachPage() {
  const t = await getTranslations("outreach")

  const initiatives = [
    {
      id: "01",
      code: "OUTREACH_01",
      title: "Optics in Egyptian Schools",
      desc: "Hands-on optical science kits introducing refraction, total internal reflection, and laser physics to high school students.",
      phase: "Curriculum Deployment",
    },
    {
      id: "02",
      code: "OUTREACH_02",
      title: "University Campus Roadshows",
      desc: "Connecting engineering and physics departments across Egyptian governorates with Optica student chapters and research grants.",
      phase: "Governorate Tours",
    },
    {
      id: "03",
      code: "OUTREACH_03",
      title: "Public Photonics Demonstrations",
      desc: "Interactive laser diffraction and hologram displays at national science fairs and Cairo innovation exhibitions.",
      phase: "Exhibition Demos",
    },
    {
      id: "04",
      code: "OUTREACH_04",
      title: "STEM Mentorship Network",
      desc: "Matching promising Egyptian undergraduate researchers with global photonics PhD candidates and industry veterans.",
      phase: "One-on-One Mentoring",
    },
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
                COMMUNITY ENGAGEMENT AND STEM INITIATIVES
              </span>
            </div>

            <h1 className="editorial-headline text-white">
              {t("heading")}
            </h1>

            <p className="editorial-lead text-slate-300 max-w-3xl">
              Demystifying optical science, inspiring future engineering talent, and demonstrating how light technologies shape modern society.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Initiatives Ledger */}
      <section className="py-20 md:py-24 border-b border-white/10">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="editorial-label text-[#fa8716] block mb-2">
                FIELD PROGRAMS
              </span>
              <h2 className="editorial-headline text-white">
                Core Educational Initiatives
              </h2>
            </div>
            <span className="editorial-label text-slate-500">
              OPEN FIELD SCHEDULE
            </span>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {initiatives.map((item) => (
              <div
                key={item.id}
                className="py-10 group hover:bg-white/[0.015] transition-colors"
              >
                <div className="grid lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-2">
                    <span className="editorial-label text-[#fa8716] font-bold text-lg font-mono">
                      {"//"} {item.id}
                    </span>
                  </div>

                  <div className="lg:col-span-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#fa8716] transition-colors">
                      {item.title}
                    </h3>
                    <p className="editorial-label text-[10px] text-[#5CB1A2] mt-1 font-mono">
                      PHASE: {item.phase}
                    </p>
                  </div>

                  <div className="lg:col-span-6">
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* School and University Partnership Callout Spread */}
      <section className="py-20 md:py-24 bg-[#02060B]">
        <div className="container-page">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3 font-mono text-[10px] text-[#fa8716]">
              <HeartHandshake size={14} />
              <span className="editorial-label text-[#fa8716]">
                HOST A WORKSHOP ON YOUR CAMPUS
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Bring Optica Egypt to Your School or University
            </h2>

            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              We provide certified demonstration kits, safety-compliant optical experiments, and guest lectures led by photonics researchers. All educational roadshow sessions are free of charge for non-profit Egyptian schools and public universities.
            </p>

            <div className="pt-4">
              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#fa8716] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
              >
                <span>Request an Outreach Visit</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
