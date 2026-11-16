import { ArrowUpRight, Globe, Mail } from "lucide-react"
import { SocialIcon } from "@/components/ui/SocialIcon"
import { siteConfig } from "@/lib/site-config"
import { getAllSocialChannels } from "@/lib/social"

export function SocialChannelsBand() {
  const channels = getAllSocialChannels()
  const activeChannels = channels.filter((channel) => channel.isActive)
  const plannedChannels = channels.filter((channel) => !channel.isActive)
  const canonicalUrl = `${siteConfig.seo.siteUrl.replace(/\/$/, "")}/`
  const activeGridClass =
    activeChannels.length <= 2
      ? "grid gap-6 md:grid-cols-2 items-stretch"
      : activeChannels.length === 4
        ? "grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch"
        : "grid gap-6 md:grid-cols-3 items-stretch"
  const plannedGridClass =
    plannedChannels.length % 3 === 0
      ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch"
      : plannedChannels.length === 4
        ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch"
        : "grid gap-4 sm:grid-cols-2 lg:grid-cols-5 items-stretch"

  return (
    <section
      id="social-channels"
      className="section-space scroll-mt-24 border-t border-[var(--line)] bg-[var(--surface)]"
    >
      <div className="container-page space-y-10">
        {/* Top Contact and Official Domain Strip */}
        <div className="site-card p-6 sm:p-8 border-l-4 border-l-[var(--gold)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="eyebrow">Direct Contact and Digital Channels</p>
            <h2 className="section-title mt-1">
              Official Contact Desk and Egypt Community Channels
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-[var(--ink-soft)]">
              General inquiries, university liaison requests, and community updates are coordinated
              through the official domain email and verified section channels.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 shrink-0">
            <a
              href={`mailto:${siteConfig.email}`}
              className="btn-primary min-h-[48px] justify-center break-all"
            >
              <Mail size={15} aria-hidden="true" />
              <span>{siteConfig.email}</span>
            </a>
            <a
              href={canonicalUrl}
              className="btn-secondary min-h-[48px] justify-center"
            >
              <Globe size={15} aria-hidden="true" />
              <span>{canonicalUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
            </a>
          </div>
        </div>

        {/* Active Social Platforms */}
        {activeChannels.length > 0 && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-4">
              <div>
                <p className="eyebrow">Active Platforms</p>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--ink)] mt-1">
                  Verified Section Profiles
                </h3>
              </div>
              <span className="font-mono text-xs font-bold text-[var(--gold)]">
                {activeChannels.length} Active Channel{activeChannels.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className={activeGridClass}>
            {activeChannels.map((channel) => (
              <article
                key={channel.id}
                className="site-card p-6 flex flex-col justify-between h-full hover:border-[var(--gold)]/60 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold)]">
                      <SocialIcon platform={channel.id} size={18} />
                    </div>
                    <span className="rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-faint)]">
                      {channel.category}
                    </span>
                  </div>

                  <h4 className="mt-4 text-lg font-bold tracking-tight text-[var(--ink)]">
                    {channel.label}
                  </h4>
                  <p className="mt-1 font-mono text-xs text-[var(--gold)]">
                    {channel.handleLabel}
                  </p>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[var(--ink-soft)]">
                    {channel.audienceNote}
                  </p>
                </div>

                {channel.url && (
                  <div className="mt-6 pt-4 border-t border-[var(--line-subtle)]">
                    <a
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary min-h-[48px] w-full justify-between"
                    >
                      <span>Follow on {channel.label}</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                )}
              </article>
            ))}
            </div>
          </div>
        )}

        {/* Rollout Channels Prepared for Egypt Outreach */}
        {plannedChannels.length > 0 && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-4">
              <div>
                <p className="eyebrow">Egypt Audience Rollout</p>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--ink)] mt-1">
                  Additional Regional Channels Being Established
                </h3>
              </div>
              <span className="font-mono text-xs text-[var(--ink-faint)]">
                Direct links published once active
              </span>
            </div>

            <div className={plannedGridClass}>
              {plannedChannels.map((channel) => (
                <article
                  key={channel.id}
                  className="rounded-sm border border-dashed border-[var(--line)] bg-[var(--surface-raised)] p-5 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--line)] bg-[var(--surface)] text-[var(--gold)]">
                        <SocialIcon platform={channel.id} size={16} />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                        Preparing
                      </span>
                    </div>
                    <h4 className="mt-3 text-sm font-bold text-[var(--ink)]">
                      {channel.label}
                    </h4>
                    <p className="mt-1 font-mono text-[11px] text-[var(--gold)] break-all">
                      {channel.suggestedHandle}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                      {channel.audienceNote}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
