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
    <div className="p-8 sm:p-10 bg-[#02060B] border border-white/10">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
        <div>
          <span className="editorial-label text-[#fa8716] block mb-1">INTAKE REGISTRY</span>
          <h3 className="text-xl font-bold text-white tracking-tight">{t("form_title")}</h3>
        </div>
        <span className="editorial-label text-[#00e660]">STATUS: TRANSMISSION READY</span>
      </div>

      <p className="text-slate-300 text-xs sm:text-sm mb-8 leading-relaxed font-light">
        {t("contact_body")}
      </p>

      {isSuccess ? (
        <div className="p-6 bg-white/[0.02] border border-[#00e660]/40 flex items-start gap-4 text-[#00e660]">
          <CheckCircle2 size={22} className="shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-base mb-1 text-white">Transmission Verified</h4>
            <p className="text-sm text-slate-300 font-light">{t("success_msg")}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {errorMessage && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block editorial-label text-slate-400 mb-2">
              {t("name_label")} *
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="e.g. Dr. Ahmed Hassan"
              className="w-full px-4 py-3 bg-[#000000] border border-white/15 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-[#fa8716] transition-colors"
            />
            {errors.name && <span className="text-xs text-red-400 mt-1 block font-mono">Name is required</span>}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block editorial-label text-slate-400 mb-2">
                {t("email_label")} *
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="name@university.edu.eg"
                className="w-full px-4 py-3 bg-[#000000] border border-white/15 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-[#fa8716] transition-colors"
              />
              {errors.email && <span className="text-xs text-red-400 mt-1 block font-mono">Valid email is required</span>}
            </div>

            <div>
              <label className="block editorial-label text-slate-400 mb-2">
                {t("affiliation_label")}
              </label>
              <input
                type="text"
                {...register("affiliation")}
                placeholder="e.g. Cairo University / Physics Dept"
                className="w-full px-4 py-3 bg-[#000000] border border-white/15 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-[#fa8716] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block editorial-label text-slate-400 mb-2">
              {t("message_label")} *
            </label>
            <textarea
              rows={4}
              {...register("message", { required: true })}
              placeholder="Inquiry, research collaboration, or membership request..."
              className="w-full px-4 py-3 bg-[#000000] border border-white/15 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-[#fa8716] transition-colors resize-y"
            />
            {errors.message && <span className="text-xs text-red-400 mt-1 block font-mono">Message is required</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#fa8716] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>{t("submitting")}</span>
              </>
            ) : (
              <>
                <span>{t("submit_btn")}</span>
                <Send size={13} />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}