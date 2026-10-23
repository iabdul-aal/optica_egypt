"use client"

import { useState } from "react"
import {
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Code2,
  Copy,
  Sparkles,
  Tag,
} from "lucide-react"
import type { BlogPost } from "@/lib/blogs"

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function BlogArticleList({ blogs }: { blogs: BlogPost[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [expandedId, setExpandedId] = useState<string | null>(blogs[0]?.id ?? null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category)))]

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category === selectedCategory)

  const handleCopyCode = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // Ignore clipboard failure
    }
  }

  return (
    <div className="space-y-6">
      {/* Category Filter Bar */}
      <div
        className="flex flex-wrap items-center gap-2 border-b border-[var(--line)] pb-4"
        role="tablist"
        aria-label="Filter articles by category"
      >
        {categories.map((cat) => {
          const active = selectedCategory === cat
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedCategory(cat)}
              className={`min-h-[40px] rounded-sm border px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-all ${
                active
                  ? "border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--gold)] font-bold"
                  : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink-soft)] hover:border-[var(--gold)]/40 hover:text-[var(--ink)]"
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Articles */}
      <div className="space-y-6">
        {filteredBlogs.map((post) => {
          const isExpanded = expandedId === post.id

          return (
            <article
              key={post.id}
              id={post.slug}
              className={`site-card p-6 sm:p-8 transition-all ${
                isExpanded ? "border-[var(--gold)]/50" : ""
              }`}
            >
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-[var(--ink-faint)]">
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
                <span className="rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] px-2 py-0.5 text-[10px] text-[var(--gold)] font-semibold">
                  {post.category}
                </span>
              </div>

              <h2 className="mt-4 text-xl font-bold tracking-tight text-[var(--ink)] sm:text-2xl">
                {post.title}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                {post.excerpt}
              </p>

              {/* Expandable Full Technical Article Body */}
              {isExpanded && post.sections && post.sections.length > 0 && (
                <div className="mt-6 space-y-6 border-t border-[var(--line)] pt-6">
                  {post.sections.map((sec, idx) => (
                    <div key={idx} className="space-y-2">
                      <h3 className="text-base sm:text-lg font-bold text-[var(--ink)]">
                        {sec.heading}
                      </h3>
                      <p className="text-sm leading-7 text-[var(--ink-soft)]">
                        {sec.body}
                      </p>
                    </div>
                  ))}

                  {post.codeSnippet && (
                    <div className="rounded-sm border border-[var(--line)] bg-[var(--surface-strong)] overflow-hidden">
                      <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-2.5 bg-[var(--surface-raised)]">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[var(--gold)]">
                          <Code2 size={13} aria-hidden="true" />
                          Python / gdsfactory Layout Script
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(post.id, post.codeSnippet!)}
                          className="inline-flex items-center gap-1 rounded-sm border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-[11px] font-mono text-[var(--ink-soft)] hover:text-[var(--gold)] transition-colors"
                        >
                          {copiedId === post.id ? (
                            <>
                              <Check size={12} className="text-emerald-400" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 text-xs font-mono leading-relaxed text-[var(--ink)] overflow-x-auto">
                        <code>{post.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                    <div className="rounded-sm border border-[var(--gold)]/25 bg-[var(--gold)]/5 p-4 sm:p-5 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-[var(--gold)]">
                        <Sparkles size={14} aria-hidden="true" />
                        <span>Key Technical Takeaways</span>
                      </div>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--ink)]">
                        {post.keyTakeaways.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[var(--gold)] font-bold">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line-subtle)] pt-4">
                <div className="flex flex-wrap items-center gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--ink-faint)]"
                    >
                      <Tag size={10} className="text-[var(--gold)]" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-[var(--ink-soft)]">
                    By {post.author}
                  </span>
                  {post.sections && post.sections.length > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId(isExpanded ? null : post.id)
                      }
                      aria-expanded={isExpanded}
                      className="inline-flex items-center gap-1.5 min-h-[40px] rounded-sm border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-3 py-1.5 text-xs font-semibold text-[var(--gold)] hover:bg-[var(--gold)]/20 transition-colors"
                    >
                      <span>{isExpanded ? "Collapse Article" : "Read Full Article"}</span>
                      {isExpanded ? (
                        <ChevronUp size={14} aria-hidden="true" />
                      ) : (
                        <ChevronDown size={14} aria-hidden="true" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
