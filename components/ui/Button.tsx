import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  as?: "button" | "a"
  href?: string
}

export function Button({ variant = "primary", className, children, as: Tag = "button", href, ...props }: ButtonProps) {
  const cls = cn(variant === "primary" ? "btn-primary" : "btn-secondary", className)
  if (Tag === "a" && href) return <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{children}</a>
  return <button className={cls} {...props}>{children}</button>
}