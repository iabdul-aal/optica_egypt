"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"

interface NodeDef {
  id: string
  label: string
  baseX: number
  baseY: number
  radius: number
  textOffsetX: number
  textOffsetY: number
  textAnchor: "start" | "middle" | "end"
  speedX: number
  speedY: number
  ampX: number
  ampY: number
  phase: number
}

const NODES: NodeDef[] = [
  {
    id: "students",
    label: "STUDENTS",
    baseX: 118,
    baseY: 82,
    radius: 22,
    textOffsetX: 0,
    textOffsetY: -40,
    textAnchor: "middle",
    speedX: 0.0018,
    speedY: 0.0022,
    ampX: 10,
    ampY: 9,
    phase: 0,
  },
  {
    id: "researchers",
    label: "RESEARCHERS",
    baseX: 464,
    baseY: 80,
    radius: 22,
    textOffsetX: 0,
    textOffsetY: -40,
    textAnchor: "middle",
    speedX: 0.0021,
    speedY: 0.0017,
    ampX: 11,
    ampY: 8,
    phase: 1.8,
  },
  {
    id: "academia",
    label: "ACADEMIA",
    baseX: 495,
    baseY: 185,
    radius: 22,
    textOffsetX: 44,
    textOffsetY: 0,
    textAnchor: "start",
    speedX: 0.0019,
    speedY: 0.0025,
    ampX: 9,
    ampY: 12,
    phase: 3.2,
  },
  {
    id: "industry",
    label: "INDUSTRY",
    baseX: 435,
    baseY: 295,
    radius: 22,
    textOffsetX: 0,
    textOffsetY: 44,
    textAnchor: "middle",
    speedX: 0.0023,
    speedY: 0.002,
    ampX: 10,
    ampY: 10,
    phase: 4.5,
  },
  {
    id: "startups",
    label: "STARTUPS",
    baseX: 140,
    baseY: 295,
    radius: 22,
    textOffsetX: 0,
    textOffsetY: 44,
    textAnchor: "middle",
    speedX: 0.0017,
    speedY: 0.0024,
    ampX: 12,
    ampY: 9,
    phase: 5.7,
  },
]

const CENTER = {
  baseX: 310,
  baseY: 181,
  radius: 66,
  innerRadius: 46,
  speedX: 0.0012,
  speedY: 0.0015,
  ampX: 5,
  ampY: 6,
}

interface CommunityBubblesProps {
  diagramLabel: string
}

export function CommunityBubbles({ diagramLabel }: CommunityBubblesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [isCenterHovered, setIsCenterHovered] = useState(false)
  const mousePosRef = useRef<{ x: number; y: number } | null>(null)

  // Animated node coordinates
  const [nodePositions, setNodePositions] = useState(
    NODES.map((n) => ({ x: n.baseX, y: n.baseY }))
  )
  const [centerPos, setCenterPos] = useState({ x: CENTER.baseX, y: CENTER.baseY })
  const [dashOffset, setDashOffset] = useState(0)

  // Floating animation loop
  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    let animationFrameId: number
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime

      // Center bubble gentle floating
      const cX = CENTER.baseX + Math.sin(elapsed * CENTER.speedX) * CENTER.ampX
      const cY = CENTER.baseY + Math.cos(elapsed * CENTER.speedY) * CENTER.ampY
      setCenterPos({ x: cX, y: cY })

      // Outer bubbles organic floating + subtle mouse influence
      const mouse = mousePosRef.current
      const newPos = NODES.map((node) => {
        let x = node.baseX + Math.sin(elapsed * node.speedX + node.phase) * node.ampX
        let y = node.baseY + Math.cos(elapsed * node.speedY + node.phase) * node.ampY

        if (mouse) {
          const dx = mouse.x - x
          const dy = mouse.y - y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120 && dist > 0) {
            const force = (1 - dist / 120) * 12
            x -= (dx / dist) * force
            y -= (dy / dist) * force
          }
        }

        return { x, y }
      })

      setNodePositions(newPos)
      setDashOffset((prev) => (prev - 0.4) % 26)

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  // Mouse move handler for interactive parallax
  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    const scaleX = 620 / rect.width
    const scaleY = 360 / rect.height
    mousePosRef.current = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    mousePosRef.current = null
    setHoveredNode(null)
    setIsCenterHovered(false)
  }, [])

  // Build outer polygon path dynamically from current bubble positions
  const outerPolygonPath = nodePositions.reduce((acc, pos, i) => {
    return `${acc}${i === 0 ? "M" : "L"} ${pos.x.toFixed(1)} ${pos.y.toFixed(1)} `
  }, "") + "Z"

  return (
    <div
      ref={containerRef}
      className="relative w-full py-2 sm:py-4 select-none"
    >
      <svg
        viewBox="0 0 620 360"
        className="relative h-auto w-full overflow-visible"
        fill="none"
        aria-label={diagramLabel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <defs>
          {/* Central gold radial glow */}
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d7ae5b" stopOpacity="0.2" />
            <stop offset="70%" stopColor="#d7ae5b" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#d7ae5b" stopOpacity="0" />
          </radialGradient>

          {/* Drop shadow filters for bubbles */}
          <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Outer polygon boundary linking all 5 outer bubbles ── */}
        <path
          d={outerPolygonPath}
          stroke="#4b5550"
          strokeWidth="1.2"
          opacity="0.5"
          className="transition-all duration-300"
        />

        {/* ── Connecting radial laser rays from Center to each bubble ── */}
        {nodePositions.map((pos, i) => {
          const isNodeActive = hoveredNode === NODES[i].id || isCenterHovered
          return (
            <g key={NODES[i].id}>
              {/* Active glow backing line when hovered */}
              {isNodeActive && (
                <line
                  x1={centerPos.x}
                  y1={centerPos.y}
                  x2={pos.x}
                  y2={pos.y}
                  stroke="#d7ae5b"
                  strokeWidth="3"
                  opacity="0.35"
                  filter="url(#goldGlow)"
                />
              )}
              {/* Dashed laser connecting line */}
              <line
                x1={centerPos.x}
                y1={centerPos.y}
                x2={pos.x}
                y2={pos.y}
                stroke={isNodeActive ? "#f0d79c" : "#d1a247"}
                strokeWidth={isNodeActive ? 2.5 : 1.8}
                strokeDasharray="6 8"
                strokeDashoffset={dashOffset}
                opacity={isNodeActive ? 1 : 0.75}
              />
              {/* Moving photon packet traveling along ray */}
              <circle
                cx={centerPos.x + (pos.x - centerPos.x) * (((dashOffset * -1 + i * 5) % 26) / 26)}
                cy={centerPos.y + (pos.y - centerPos.y) * (((dashOffset * -1 + i * 5) % 26) / 26)}
                r="2"
                fill="#ffffff"
                opacity="0.85"
                filter="url(#goldGlow)"
              />
            </g>
          )
        })}

        {/* ── Center Hub: OPTICA EGYPT Floating Node ── */}
        <g
          className="cursor-pointer transition-transform duration-200"
          onMouseEnter={() => setIsCenterHovered(true)}
          onMouseLeave={() => setIsCenterHovered(false)}
        >
          {/* Ambient radial halo */}
          <circle
            cx={centerPos.x}
            cy={centerPos.y}
            r={CENTER.radius + 28}
            fill="url(#centerGlow)"
            className="animate-pulse"
          />

          {/* Outer gold ring & flat obsidian fill */}
          <circle
            cx={centerPos.x}
            cy={centerPos.y}
            r={CENTER.radius}
            fill="var(--canvas)"
            stroke={isCenterHovered ? "#f0d79c" : "#d7ae5b"}
            strokeWidth={isCenterHovered ? 2.5 : 2}
            filter={isCenterHovered ? "url(#goldGlow)" : undefined}
            className="transition-all duration-200 ease-out"
          />

          {/* Concentric rotating reticle ring */}
          <circle
            cx={centerPos.x}
            cy={centerPos.y}
            r={CENTER.innerRadius}
            stroke="var(--ink)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            strokeDashoffset={dashOffset * -1}
            opacity={isCenterHovered ? 0.7 : 0.35}
          />

          {/* Center Brand Typography */}
          <text
            x={centerPos.x}
            y={centerPos.y - 5}
            fill="var(--ink)"
            textAnchor="middle"
            fontSize="14"
            fontFamily="var(--font-display), Montserrat, sans-serif"
            fontWeight="800"
            letterSpacing="0.06em"
          >
            OPTICA
          </text>
          <text
            x={centerPos.x}
            y={centerPos.y + 15}
            fill="#d7ae5b"
            textAnchor="middle"
            fontSize="12"
            fontFamily="var(--font-display), Montserrat, sans-serif"
            fontWeight="800"
            letterSpacing="0.1em"
          >
            EGYPT
          </text>
        </g>

        {/* ── Five Outer Floating Nodes ── */}
        {NODES.map((node, i) => {
          const pos = nodePositions[i]
          const isHovered = hoveredNode === node.id

          return (
            <g
              key={node.id}
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Outer node pulse halo on hover */}
              {isHovered && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={node.radius + 8}
                  fill="none"
                  stroke="#d7ae5b"
                  strokeWidth="1"
                  opacity="0.4"
                  className="animate-ping"
                />
              )}

              {/* Main Abstract Node */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isHovered ? node.radius + 2 : node.radius}
                fill="var(--surface)"
                stroke={isHovered ? "#f0d79c" : "#d7ae5b"}
                strokeWidth={isHovered ? 2.2 : 1.6}
                filter={isHovered ? "url(#goldGlow)" : undefined}
                className="transition-all duration-200 ease-out"
              />

              {/* Inner concentric reticle ring */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={node.radius * 0.48}
                stroke={isHovered ? "#f0d79c" : "#d7ae5b"}
                strokeWidth="1"
                strokeDasharray="2 3"
                opacity={isHovered ? 0.6 : 0.3}
              />

              {/* Center optical core pip */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={2}
                fill={isHovered ? "#f0d79c" : "#d7ae5b"}
                opacity={isHovered ? 1 : 0.5}
              />

              {/* Node Label Floating With Node */}
              <text
                x={pos.x + node.textOffsetX}
                y={pos.y + node.textOffsetY}
                fill={isHovered ? "#f0d79c" : "var(--ink-soft)"}
                textAnchor={node.textAnchor}
                dominantBaseline={node.id === "academia" ? "central" : undefined}
                fontSize="12"
                fontFamily="var(--font-latin), Inter, sans-serif"
                fontWeight={isHovered ? "700" : "600"}
                letterSpacing="0.08em"
                className="transition-colors duration-200"
              >
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
