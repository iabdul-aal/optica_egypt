"use client"

import React, { useState, useEffect, Suspense, ReactNode } from "react"
import Image from "next/image"
import { useLocale } from "next-intl"

interface SceneWrapperProps {
  fallbackSrc?: string
  fallbackAlt?: { en: string; ar: string }
  fallbackPlaceholder?: ReactNode
  children: ReactNode
  className?: string
  height?: string
}

export function SceneWrapper({
  fallbackSrc,
  fallbackAlt = { en: "Optics visualization", ar: "تصور بصري متقدم" },
  fallbackPlaceholder,
  children,
  className = "",
  height = "h-[400px] md:h-[500px]",
}: SceneWrapperProps) {
  const locale = useLocale()
  const [canRender3D, setCanRender3D] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if mobile (< 768px) or prefers-reduced-motion
    const isMobile = window.innerWidth < 768
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Check WebGL support
    let webglSupported = false
    try {
      const canvas = document.createElement("canvas")
      webglSupported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      )
    } catch {
      webglSupported = false
    }

    if (!isMobile && !prefersReducedMotion && webglSupported) {
      setCanRender3D(true)
    }
  }, [])

  const renderFallback = () => {
    if (fallbackPlaceholder) {
      return fallbackPlaceholder
    }
    if (fallbackSrc) {
      return (
        <div className="relative w-full h-full">
          <Image
            src={fallbackSrc}
            alt={fallbackAlt[locale as "en" | "ar"] || fallbackAlt.en}
            fill
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09131F] via-transparent to-transparent opacity-80" />
        </div>
      )
    }
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-[#09131F] overflow-hidden">
        {/* Optical grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#00ADEF_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border border-[var(--accent-secondary)] flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[var(--accent)] animate-pulse" />
          </div>
          <p className="text-xs uppercase tracking-widest text-[var(--accent-secondary)] font-mono">Optica Egypt Photonics</p>
        </div>
      </div>
    )
  }

  if (!mounted) {
    return (
      <div className={`relative w-full ${height} overflow-hidden ${className}`}>
        {renderFallback()}
      </div>
    )
  }

  return (
    <div className={`relative w-full ${height} overflow-hidden ${className}`}>
      {canRender3D && !hasError ? (
        <Suspense fallback={renderFallback()}>
          <ErrorBoundary onError={() => setHasError(true)} fallback={renderFallback()}>
            {children}
          </ErrorBoundary>
        </Suspense>
      ) : (
        renderFallback()
      )}
    </div>
  )
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback: ReactNode
  onError: () => void
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.warn("WebGL Error caught in SceneWrapper:", error)
    this.props.onError()
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}