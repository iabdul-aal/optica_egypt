import { ArrowUpRight, Globe, Mail } from "lucide-react"
import { SocialIcon } from "@/components/ui/SocialIcon"
import { siteConfig } from "@/lib/site-config"
import { getAllSocialChannels } from "@/lib/social"

export function SocialChannelsBand() {
  const channels = getAllSocialChannels()
  const activeChannels = channels.filter((channel) => channel.isActive)
  const plannedChannels = channels.filter((channel) => !channel.isActive)
  const officialUrl = `${siteConfig.officialUrl}/`

  return (
    <section
      id="social-channels"
      className="section-space scroll-mt-24 border-t border-[var(--line)] bg-[var(--surface)]"
    >
      <div className="container-page space-y-12">
        <div className="border-y border-[var(--line)] py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <p className="eyebrow">Direct Contact and Digital Channels</p>
            <h2 className="section-title mt-1">
              Official Contact Desk and Egypt Community Channels
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-[var(--ink-soft)]">
              General inquiries, university liaison requests, and community updates are coordinated through the official domain email and verified section channels.
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
              href={officialUrl}
              className="btn-secondary min-h-[48px] justify-center"
            >
              <Globe size={15} aria-hidden="true" />
              <span>{siteConfig.officialDomain}</span>
            </a>
          </div>
        </div>

        {activeChannels.length > 0 && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
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

            <div className="grid border-y border-[var(--line)] divide-y md:divide-y-0 md:grid-cols-2 md:divide-x divide-[var(--line-subtle)]">
              {activeChannels.map((channel) => (
                <article
                  key={channel.id}
                  className="py-7 md:px-7 first:md:pl-0 last:md:pr-0 flex flex-col justify-between gap-5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center text-[var(--gold)]">
                        <SocialIcon platform={channel.id} size={20} />
                      </div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-faint)]">
                        {channel.category}
                      </span>
                    </div>

                    <h4 className="mt-3 text-lg font-bold tracking-tight text-[var(--ink)]">
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
                    <a
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link inline-flex min-h-[48px] items-center gap-1.5 self-start"
                    >
                      <span>Follow on {channel.label}</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}

        {plannedChannels.length > 0 && (
          <div className="space-y-6">
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

            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {plannedChannels.map((channel) => (
                <article
                  key={channel.id}
                  className="border-t border-[var(--line-subtle)] pt-4 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2 text-[var(--gold)]">
                    <SocialIcon platform={channel.id} size={16} />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                      Preparing
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[var(--ink)]">
                    {channel.label}
                  </h4>
                  <p className="font-mono text-[11px] text-[var(--gold)] break-all">
                    {channel.suggestedHandle}
                  </p>
                  <p className="text-xs leading-relaxed text-[var(--ink-soft)]">
                    {channel.audienceNote}
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
