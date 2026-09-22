import type { Metadata } from "next"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { VolunteerForm } from "@/components/sections/VolunteerForm"
import { Award, BookOpen, Code2, Globe2, Sparkles, Users, Wrench } from "lucide-react"

export const metadata: Metadata = {
  title: "Volunteer",
  description: "Volunteer with the Optica Egypt Local Section. Lead workshops, mentor students, organize outreach, and contribute to open-source photonics.",
  alternates: {
    canonical: "/volunteer/",
  },
}

const tracks = [
  {
    icon: Wrench,
    number: "01",
    title: "Technical Program and Workshops",
    description: "Design hands-on experimental laboratories, lead software simulation masterclasses, and coordinate technical seminars with academic and industry experts.",
    commitment: "2 to 4 hours per month",
  },
  {
    icon: Code2,
    number: "02",
    title: "Open Source Photonics and PDA",
    description: "Maintain open-source photonics layout tutorials, contribute to open PDK models, and guide teams competing in the Egypt Photonic Chipathon.",
    commitment: "3 to 5 hours per month",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Outreach and STEM Education",
    description: "Bring optics demonstrations to schools, inspire pre-university students, and lead hands-on light science days across Egyptian governorates.",
    commitment: "Flexible event-based schedule",
  },
  {
    icon: BookOpen,
    number: "04",
    title: "Editorial and Science Communication",
    description: "Author technical articles for the Insights blog, interview leading Egyptian photonics researchers, and translate advanced research into accessible stories.",
    commitment: "1 to 2 articles per quarter",
  },
  {
    icon: Users,
    number: "05",
    title: "Campus and Student Chapter Mentorship",
    description: "Liaise with university student chapters, guide newly forming Optica student branches, and advise student leaders on grant applications.",
    commitment: "2 hours per month",
  },
]

const benefits = [
  {
    icon: Award,
    title: "Optica Global Recognition",
    body: "Receive official letters of commendation, certificates of service, and visibility across Optica global leadership directories.",
  },
  {
    icon: Globe2,
    title: "International Professional Network",
    body: "Build direct working relationships with international researchers, traveling lecturers, and regional optics industry executives.",
  },
  {
    icon: Users,
    title: "Leadership and Committee Experience",
    body: "Gain practical governance, program management, and event execution experience recognized by academic and corporate hiring committees.",
  },
  {
    icon: Sparkles,
    title: "Direct Impact on Egyptian Science",
    body: "Help build the technical foundation and talent pipeline that elevates Egypt's footprint in global optics and photonics.",
  },
]

export default function VolunteerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get Involved"
        title="Volunteer with Optica Egypt."
        intro="Shape technical workshops, mentor student chapters, contribute to open-source photonics, and build an inclusive scientific community."
      />

      {/* ── Volunteer Tracks ──────────────────────────────────────────────── */}
      <section className="section-space">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-8">
            <p className="eyebrow">Volunteer Tracks</p>
            <h2 className="section-title mt-3">Find where your talents make the greatest impact.</h2>
            <p className="lede max-w-2xl mt-4">
              Whether you are an experienced researcher, a software engineer, or a passionate student, our working groups offer dedicated pathways tailored to your schedule.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track, index) => {
              const Icon = track.icon
              return (
                <ScrollReveal key={track.number} animation="fade-up" delay={index * 30}>
                  <div className="site-card h-full p-6 sm:p-7 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-bold text-[var(--gold)]">{track.number}</span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-[var(--surface-raised)] border border-[var(--line)] text-[var(--gold)]">
                          <Icon size={18} aria-hidden="true" />
                        </div>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-[var(--ink)]">{track.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">{track.description}</p>
                    </div>
                    <div className="mt-6 border-t border-[var(--line-subtle)] pt-4">
                      <span className="text-xs font-mono text-[var(--ink-faint)]">
                        Commitment: <strong className="text-[var(--ink)]">{track.commitment}</strong>
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Why Volunteer / Benefits ──────────────────────────────────────── */}
      <section className="section-space bg-[var(--surface-raised)] border-y border-[var(--line)]">
        <div className="container-page">
          <div>
            <p className="eyebrow">Why Volunteer</p>
            <h2 className="section-title mt-3">Growth, recognition, and scientific camaraderie.</h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, index) => {
              const Icon = b.icon
              return (
                <ScrollReveal key={b.title} animation="fade-up" delay={index * 40}>
                  <div className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-6 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[var(--gold)]/10 border border-[var(--gold)]/20 text-[var(--gold)]">
                        <Icon size={20} aria-hidden="true" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-[var(--ink)]">{b.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">{b.body}</p>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Volunteer Intake Form ─────────────────────────────────────────── */}
      <section className="section-space scientific-grid">
        <div className="container-page grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="eyebrow">Intake Form</p>
            <h2 className="section-title mt-3">Ready to contribute? Send us your profile.</h2>
            <p className="lede max-w-md mt-4">
              All applications are saved directly to our section committee database. We will match you with a working group chair and reach out for an onboarding discussion.
            </p>
            <div className="mt-8 border-y border-[var(--line)] py-5 text-sm text-[var(--ink-soft)] space-y-2">
              <p>• No prior committee experience required.</p>
              <p>• Flexible commitments suited for university and work terms.</p>
              <p>• All volunteers are credited in section annual reports.</p>
            </div>
          </div>

          <div className="border-y border-[var(--line)] py-8 sm:px-2">
            <VolunteerForm />
          </div>
        </div>
      </section>
    </>
  )
}
