import type { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { LoginForm } from "@/components/admin/LoginForm"
export const metadata: Metadata = {
  title: "Staff Sign In",
  robots: { index: false, follow: false }
}
export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  return (
    <section className="section-space">
      <div className="container-page">
        <div className="site-card mx-auto max-w-md p-7 sm:p-10">
          <ShieldCheck size={32} className="mb-6 text-[var(--gold)]" />
          <p className="eyebrow">Recruitment workspace</p>
          <h1 className="mt-2 text-3xl font-semibold">Welcome back.</h1>
          <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">
            Sign in to review chapter applications and support your next cohort.
          </p>
          {error && (
            <p role="alert" className="mt-5 text-sm text-[var(--danger)]">
              Your session could not be verified. Please sign in again or
              contact your administrator.
            </p>
          )}
          <LoginForm />
          <Link
            href="/join?type=committee"
            className="mt-7 inline-flex min-h-12 items-center text-sm text-[var(--gold)]"
          >
            ← Back to committee application
          </Link>
        </div>
      </div>
    </section>
  )
}
