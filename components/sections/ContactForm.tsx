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
    <div className="relative p-8 md:p-10 border border-white/10 bg-[#010E17]">
      <span className="absolute -top-1.5 -left-1.5 text-[10px] text-[#fa8716] font-mono opacity-30">+</span>
      <span className="absolute -bottom-1.5 -right-1.5 text-[10px] text-[#fa8716] font-mono opacity-30">+</span>

      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{t("form_title")}</h2>
        <span className="text-[10px] font-mono text-slate-500">ENCRYPTED // FORMSPREE READY</span>
      </div>
      <p className="text-slate-300 text-sm mb-8 leading-relaxed font-light">
        {t("contact_body")}
      </p>

      {isSuccess ? (
        <div className="p-6 rounded-none bg-[#00B4FF]/10 border border-[#00B4FF]/30 flex items-start gap-3.5 text-[#00B4FF]">
          <CheckCircle2 size={22} className="shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-base mb-1 text-white">Message Transmitted</h4>
            <p className="text-sm text-slate-300 font-light">{t("success_msg")}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {errorMessage && (
            <div className="p-4 rounded-none bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
              <AlertCircle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
              {t("name_label")} *
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="e.g. Ahmed Hassan"
              className="w-full px-4 py-3 rounded-none bg-black/60 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-[#fa8716] transition-colors font-sans"
            />
            {errors.name && <span className="text-xs text-red-400 mt-1 block font-mono">Name is required</span>}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                {t("email_label")} *
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="name@university.edu.eg"
                className="w-full px-4 py-3 rounded-none bg-black/60 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-[#fa8716] transition-colors font-sans"
              />
              {errors.email && <span className="text-xs text-red-400 mt-1 block font-mono">Valid email is required</span>}
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                {t("affiliation_label")}
              </label>
              <input
                type="text"
                {...register("affiliation")}
                placeholder="e.g. Cairo University / Physics Lab"
                className="w-full px-4 py-3 rounded-none bg-black/60 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-[#fa8716] transition-colors font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
              {t("message_label")} *
            </label>
            <textarea
              rows={4}
              {...register("message", { required: true })}
              placeholder="How can we help or collaborate?"
              className="w-full px-4 py-3 rounded-none bg-black/60 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-[#fa8716] transition-colors resize-y font-sans"
            />
            {errors.message && <span className="text-xs text-red-400 mt-1 block font-mono">Message is required</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary py-3 px-8 text-xs font-mono font-bold flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                <span>{t("submitting")}</span>
              </>
            ) : (
              <>
                <span>{t("submit_btn")}</span>
                <Send size={14} />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}