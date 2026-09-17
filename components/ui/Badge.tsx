import { cn } from "@/lib/utils"

export function Badge({ children, variant = "gold", pill = false, className }: {
  children: React.ReactNode
  variant?: "gold" | "teal" | "muted" | "violet" | "science" | "signal" | "orange"
  pill?: boolean
  className?: string
}) {
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 text-xs font-mono font-semibold uppercase tracking-wider",
      pill ? "badge-pill px-2.5" : "border",
      variant === "gold"    && "bg-[rgba(212,175,55,0.12)] text-[#D4AF37] border-[rgba(212,175,55,0.3)]",
      variant === "teal"    && "bg-[rgba(92,177,162,0.12)] text-[#5CB1A2] border-[rgba(92,177,162,0.3)]",
      variant === "orange"  && "bg-[rgba(250,135,22,0.12)] text-[#fa8716] border-[rgba(250,135,22,0.3)]",
      variant === "violet"  && "bg-[rgba(126,88,245,0.12)] text-[#7e58f5] border-[rgba(126,88,245,0.3)]",
      variant === "science" && "bg-[rgba(76,175,80,0.12)] text-[#4caf50] border-[rgba(76,175,80,0.3)]",
      variant === "signal"  && "bg-[rgba(0,230,96,0.12)] text-[#00e660] border-[rgba(0,230,96,0.3)]",
      variant === "muted"   && "bg-[rgba(148,163,184,0.1)] text-[#94A3B8] border-[rgba(148,163,184,0.2)]",
      className
    )}>
      {children}
    </span>
  )
}