import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { siteConfig } from "@/lib/site-config"
import { ContactForm } from "@/components/sections/ContactForm"
import { Mail, ExternalLink } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("join")
  return {
    title: `${t("heading")} | Optica Egypt Local Section`,
    description: t("subheading"),
  }
}

export default async function JoinPage() {
  const t = await getTranslations("join")

  const TRACKS = [
    {
      id: "STUDENT",
      title: "Undergraduate Student",
      benefits: "Access free optics kits, technical lab seminars, and student travel grant briefings.",
      status: "100% Subsidized",
    },
    {
      id: "RESEARCHER",
      title: "Graduate Researcher / PhD",
      benefits: "Shared equipment access across Egyptian universities and publication collaboration.",
      status: "Lab Conduits",
    },
    {
      id: "FACULTY",
      title: "Faculty and Academic Investigator",
      benefits: "Represent your institution, lead technical working groups, and mentor rising scholars.",
      status: "Working Groups",
    },
    {
      id: "INDUSTRY",
      title: "Telecom and Industry Engineer",
      benefits: "Connect with engineering talent, test hardware prototypes, and sponsor events.",
      status: "Talent Bridge",
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
                NATIONAL OPTICS REGISTRY // INTAKE
              </span>
            </div>

            <h1 className="editorial-headline text-white">
              {t("heading")}
            </h1>

            <p className="editorial-lead text-slate-300 max-w-3xl">
              {t("subheading")}
            </p>
          </div>
        </div>
      </section>

      {/* Split Intake Screen: Left Prospectus + Right Intake Terminal */}
      <section className="py-20 md:py-24">
        <div className="container-page">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Membership Prospectus */}
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-4">
                <span className="editorial-label text-[#00e660] block font-bold">
                  OPEN REGISTRATION · ZERO FEES
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  Join the National Optics and Photonics Roster
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                  {t("body")}
                </p>
              </div>

              {/* Direct Application Conduits */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href={siteConfig.joinFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#fa8716] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                >
                  <span>{t("cta")}</span>
                  <ExternalLink size={14} />
                </a>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  <Mail size={14} />
                  <span>{siteConfig.email}</span>
                </a>
              </div>

              {/* Pathways Directory Ledger */}
              <div className="pt-6 border-t border-white/10 space-y-4">
                <span className="editorial-label text-slate-500 block">
                  ELIGIBILITY TIERS
                </span>

                <div className="divide-y divide-white/10 border-y border-white/10">
                  {TRACKS.map((track) => (
                    <div key={track.id} className="py-4 space-y-1 group">
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span className="text-[#fa8716] font-bold">{"//"} {track.id}</span>
                        <span className="text-[#5CB1A2]">{track.status}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#fa8716] transition-colors">
                        {track.title}
                      </h4>
                      <p className="text-xs text-slate-400 font-light leading-relaxed">
                        {track.benefits}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Encrypted Interactive Form Terminal */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
