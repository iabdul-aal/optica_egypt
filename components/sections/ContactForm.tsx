"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslations } from "next-intl"
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"

interface FormData {
  name: string
  email: string
  affiliation: string
  message: string
}

export function ContactForm() {
  const t = useTranslations("join")
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setErrorMessage(null)
    try {
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xldgpzqe"
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSuccess(true)
        reset()
      } else {
        setErrorMessage(t("error_msg"))
      }
    } catch {
      setErrorMessage(t("error_msg"))
    }
  }

  return (
    <div className="card p-8 md:p-10 border border-[var(--border)] bg-[var(--surface)]">
      <h2 className="text-2xl font-bold mb-3">{t("form_title")}</h2>
      <p className="text-[var(--foreground-muted)] text-sm mb-8 leading-relaxed">
        {t("contact_body")}
      </p>

      {isSuccess ? (
        <div className="p-6 rounded-2xl bg-[#00ADEF]/10 border border-[#00ADEF]/30 flex items-start gap-3.5 text-[#00ADEF]">
          <CheckCircle2 size={24} className="shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-base mb-1">Message Received!</h4>
            <p className="text-sm text-[var(--foreground)]">{t("success_msg")}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
              <AlertCircle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground-muted)] mb-2">
              {t("name_label")} *
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="e.g. Ahmed Hassan"
              className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
            {errors.name && <span className="text-xs text-red-400 mt-1 block">Name is required</span>}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground-muted)] mb-2">
                {t("email_label")} *
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="name@university.edu.eg"
                className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
              {errors.email && <span className="text-xs text-red-400 mt-1 block">Valid email is required</span>}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground-muted)] mb-2">
                {t("affiliation_label")}
              </label>
              <input
                type="text"
                {...register("affiliation")}
                placeholder="e.g. Cairo University / Lab"
                className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground-muted)] mb-2">
              {t("message_label")} *
            </label>
            <textarea
              rows={4}
              {...register("message", { required: true })}
              placeholder="How can we help or collaborate?"
              className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors resize-y"
            />
            {errors.message && <span className="text-xs text-red-400 mt-1 block">Message is required</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary py-3 px-8 text-sm font-semibold flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>{t("submitting")}</span>
              </>
            ) : (
              <>
                <span>{t("submit_btn")}</span>
                <Send size={15} />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}