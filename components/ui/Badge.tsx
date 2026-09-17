import { cn } from "@/lib/utils"

export function Badge({ children, variant = "gold", className }: {
  children: React.ReactNode
  variant?: "gold" | "teal" | "muted"
  className?: string
}) {
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider",
      variant === "gold"  && "bg-[rgba(212,175,55,0.15)] text-[#D4AF37]",
      variant === "teal"  && "bg-[rgba(0,173,239,0.15)] text-[#00ADEF]",
      variant === "muted" && "bg-[rgba(148,163,184,0.1)] text-[#94A3B8]",
      className
    )}>
      {children}
    </span>
  )
}