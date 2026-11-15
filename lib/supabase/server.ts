import "server-only"
import { createServerClient } from "@supabase/ssr"
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

export function publicConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  if (!url || !key) throw new Error("Supabase is not configured")
  return { url, key }
}
export async function sessionClient() {
  const { url, key } = publicConfig()
  const store = await cookies()
  return createServerClient(url, key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll(values) {
        try {
          values.forEach(({ name, value, options }) =>
            store.set(name, value, options)
          )
        } catch {
          /* Middleware refreshes server-rendered sessions. */
        }
      }
    }
  })
}
export function serviceClient() {
  const { url } = publicConfig()
  const key = process.env.SUPABASE_SECRET_KEY
  if (!key) throw new Error("Supabase server credentials are missing")
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false }
  })
}
