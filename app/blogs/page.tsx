import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, BookOpen, Calendar, Clock, Tag } from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import { InsightsNav } from "@/components/sections/InsightsNav"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { getAllBlogs } from "@/lib/blogs"

export const metadata: Metadata = {
  title: "Blogs and Perspectives",
  description: "Technical articles, research spotlights, and community insights from Egypt's optics and photonics community.",
  alternates: {
    canonical: "/blogs/",
  },
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function BlogsPage() {
  const blogs = getAllBlogs()

  return (
    <>
      <InsightsNav />
      <PageHeader
        eyebrow="Insights and Perspectives"
        title="Photonics Articles and Dispatches."
        intro="Technical deep-dives, research spotlights, open-source tutorials, and community perspectives from optics researchers and engineers across Egypt."
      />

      <section className="section-space">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
            {/* ── Main Articles List ── */}
            <div className="space-y-6">
              {blogs.map((post, index) => (
                <ScrollReveal key={post.id} animation="fade-up" delay={index * 40}>
                  <article className="site-card p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--ink-faint)]">
                      <span className="inline-flex items-center gap-1.5 text-[var(--gold)] font-bold uppercase">
                        <Calendar size={12} aria-hidden="true" />
                        {formatDate(post.date)}
                      </span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={12} aria-hidden="true" />
                        {post.readTime}
                      </span>
                      <span>·</span>
                      <span className="rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] px-2 py-0.5 text-[10px] text-[var(--gold)]">
                        {post.category}
                      </span>
                    </div>

                    <h2 className="mt-4 text-xl font-bold tracking-tight text-[var(--ink)] sm:text-2xl">
                      {post.title}
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                      {post.excerpt}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line-subtle)] pt-4">
                      <div className="flex flex-wrap items-center gap-2">
                        {post.tags.map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--ink-faint)]">
                            <Tag size={10} className="text-[var(--gold)]" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-mono text-[var(--ink-soft)]">
                        By {post.author}
                      </span>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>

            {/* ── Sidebar ── */}
            <aside className="space-y-6">
              <div className="site-card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[var(--gold)]/10 border border-[var(--gold)]/20 text-[var(--gold)]">
                  <BookOpen size={20} aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[var(--ink)]">Contribute an Article</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                  Are you working on an optical experiment, a photonic layout, or a student chapter initiative? We welcome technical articles and tutorial submissions from section members.
                </p>
                <div className="mt-5">
                  <Link href="/volunteer" className="btn-primary w-full justify-center">
                    Join Editorial Track <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="site-card p-6">
                <p className="eyebrow">Explore Insights Hub</p>
                <div className="mt-4 space-y-3 text-sm">
                  <Link href="/news" className="flex items-center justify-between text-[var(--ink)] hover:text-[var(--gold)] transition-colors py-1.5 border-b border-[var(--line-subtle)]">
                    <span>News and Announcements</span>
                    <ArrowUpRight size={13} />
                  </Link>
                  <Link href="/gallery" className="flex items-center justify-between text-[var(--ink)] hover:text-[var(--gold)] transition-colors py-1.5 border-b border-[var(--line-subtle)]">
                    <span>Photo and Activity Gallery</span>
                    <ArrowUpRight size={13} />
                  </Link>
                  <Link href="/open-source" className="flex items-center justify-between text-[var(--ink)] hover:text-[var(--gold)] transition-colors py-1.5">
                    <span>Open Source Photonics</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
