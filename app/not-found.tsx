import Link from "next/link"

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", background: "var(--background)", color: "var(--foreground)" }}>
      <h1 style={{ fontSize: "4rem", fontWeight: 700, color: "var(--accent-secondary)" }}>404</h1>
      <p style={{ color: "var(--foreground-muted)" }}>Page not found.</p>
      <Link href="/en" className="btn-primary">Go home</Link>
    </div>
  )
}
