"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"

export interface ConstellationNode {
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

export const CONSTELLATION_NODES: readonly ConstellationNode[] = [
  {
    id: "students",
    label: "STUDENTS",
    baseX: 118,
    baseY: 84,
    radius: 22,
    textOffsetX: 0,
    textOffsetY: -36,
    textAnchor: "middle",
    speedX: 0.0018,
    speedY: 0.0022,
    ampX: 9,
    ampY: 8,
    phase: 0,
  },
  {
    id: "researchers",
    label: "RESEARCHERS",
    baseX: 468,
    baseY: 82,
    radius: 22,
    textOffsetX: 0,
    textOffsetY: -36,
    textAnchor: "middle",
    speedX: 0.0021,
    speedY: 0.0017,
    ampX: 10,
    ampY: 7,
    phase: 1.8,
  },
  {
    id: "academia",
    label: "ACADEMIA",
    baseX: 492,
    baseY: 185,
    radius: 22,
    textOffsetX: 34,
    textOffsetY: 0,
    textAnchor: "start",
    speedX: 0.0019,
    speedY: 0.0024,
    ampX: 8,
    ampY: 10,
    phase: 3.2,
  },
  {
    id: "industry",
    label: "INDUSTRY",
    baseX: 438,
    baseY: 292,
    radius: 22,
    textOffsetX: 0,
    textOffsetY: 42,
    textAnchor: "middle",
    speedX: 0.0022,
    speedY: 0.002,
    ampX: 9,
    ampY: 9,
    phase: 4.5,
  },
  {
    id: "chapters",
    label: "CHAPTERS",
    baseX: 144,
    baseY: 292,
    radius: 22,
    textOffsetX: 0,
    textOffsetY: 42,
    textAnchor: "middle",
    speedX: 0.0017,
    speedY: 0.0023,
    ampX: 10,
    ampY: 8,
    phase: 5.7,
  },
]

const CENTER = {
  baseX: 310,
  baseY: 184,
  radius: 66,
  innerRadius: 46,
  speedX: 0.0012,
  speedY: 0.0015,
  ampX: 5,
  ampY: 5,
}

interface CommunityBubblesProps {
  activeNodeId?: string | null
  onNodeSelect?: (id: string | null) => void
  diagramLabel?: string
}

export function CommunityBubbles({
  activeNodeId,
  onNodeSelect,
  diagramLabel = "Interactive network linking five pillars of the Optica Egypt optics and photonics ecosystem.",
}: CommunityBubblesProps) {
  const [internalHovered, setInternalHovered] = useState<string | null>(null)
  const [isCenterHovered, setIsCenterHovered] = useState(false)
  const mousePosRef = useRef<{ x: number; y: number } | null>(null)

  const highlightedNode = activeNodeId ?? internalHovered

  const [nodePositions, setNodePositions] = useState(
    CONSTELLATION_NODES.map((n) => ({ x: n.baseX, y: n.baseY }))
  )
  const [centerPos, setCenterPos] = useState({ x: CENTER.baseX, y: CENTER.baseY })
  const [dashOffset, setDashOffset] = useState(0)

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }

    let animationFrameId: number
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const cX = CENTER.baseX + Math.sin(elapsed * CENTER.speedX) * CENTER.ampX
      const cY = CENTER.baseY + Math.cos(elapsed * CENTER.speedY) * CENTER.ampY
      setCenterPos({ x: cX, y: cY })

      const mouse = mousePosRef.current
      const newPos = CONSTELLATION_NODES.map((node) => {
        let x = node.baseX + Math.sin(elapsed * node.speedX + node.phase) * node.ampX
        let y = node.baseY + Math.cos(elapsed * node.speedY + node.phase) * node.ampY

        if (mouse) {
          const dx = mouse.x - x
          const dy = mouse.y - y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120 && dist > 0) {
            const force = (1 - dist / 120) * 10
            x -= (dx / dist) * force
            y -= (dy / dist) * force
          }
        }
        return { x, y }
      })

      setNodePositions(newPos)
      setDashOffset((prev) => (prev - 0.35) % 26)
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    mousePosRef.current = {
      x: ((e.clientX - rect.left) * 640) / rect.width,
      y: ((e.clientY - rect.top) * 360) / rect.height,
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    mousePosRef.current = null
    setInternalHovered(null)
    setIsCenterHovered(false)
    onNodeSelect?.(null)
  }, [onNodeSelect])

  const outerPolygonPath =
    nodePositions.reduce(
      (acc, pos, i) => `${acc}${i === 0 ? "M" : "L"} ${pos.x.toFixed(1)} ${pos.y.toFixed(1)} `,
      ""
    ) + "Z"

  return (
    <div className="relative w-full py-2 sm:py-4 select-none overflow-hidden">
      <svg
        viewBox="0 0 640 360"
        className="relative h-auto w-full"
        fill="none"
        role="img"
        aria-label={diagramLabel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <defs>
          <radialGradient id="constellationGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d7ae5b" stopOpacity="0.22" />
            <stop offset="70%" stopColor="#d7ae5b" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#d7ae5b" stopOpacity="0" />
          </radialGradient>
        </defs>

        <path
          d={outerPolygonPath}
          stroke="var(--line)"
          strokeWidth="1.2"
          opacity="0.7"
        />

        {nodePositions.map((pos, i) => {
          const node = CONSTELLATION_NODES[i]
          const isNodeActive = highlightedNode === node.id || isCenterHovered
          const packetT = (((dashOffset * -1 + i * 5) % 26) + 26) % 26 / 26

          return (
            <g key={node.id}>
              <line
                x1={centerPos.x}
                y1={centerPos.y}
                x2={pos.x}
                y2={pos.y}
                stroke={isNodeActive ? "var(--gold-pale)" : "var(--gold)"}
                strokeWidth={isNodeActive ? 2.4 : 1.5}
                strokeDasharray="6 8"
                strokeDashoffset={dashOffset}
                opacity={isNodeActive ? 1 : 0.65}
              />
              <circle
                cx={centerPos.x + (pos.x - centerPos.x) * packetT}
                cy={centerPos.y + (pos.y - centerPos.y) * packetT}
                r={isNodeActive ? 3 : 2}
                fill="var(--gold-pale)"
                opacity="0.9"
              />
            </g>
          )
        })}

        <g
          className="cursor-pointer"
          onMouseEnter={() => setIsCenterHovered(true)}
          onMouseLeave={() => setIsCenterHovered(false)}
        >
          <circle cx={centerPos.x} cy={centerPos.y} r={CENTER.radius + 26} fill="url(#constellationGlow)" />
          <circle
            cx={centerPos.x}
            cy={centerPos.y}
            r={CENTER.radius}
            fill="var(--canvas)"
            stroke={isCenterHovered ? "var(--gold-pale)" : "var(--gold)"}
            strokeWidth={isCenterHovered ? 2.5 : 2}
          />
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
            fill="var(--gold)"
            textAnchor="middle"
            fontSize="12"
            fontFamily="var(--font-display), Montserrat, sans-serif"
            fontWeight="800"
            letterSpacing="0.1em"
          >
            EGYPT
          </text>
        </g>

        {CONSTELLATION_NODES.map((node, i) => {
          const pos = nodePositions[i]
          const isHovered = highlightedNode === node.id

          return (
            <g
              key={node.id}
              className="cursor-pointer"
              onMouseEnter={() => {
                setInternalHovered(node.id)
                onNodeSelect?.(node.id)
              }}
              onMouseLeave={() => {
                setInternalHovered(null)
                onNodeSelect?.(null)
              }}
              onClick={() => {
                const next = highlightedNode === node.id ? null : node.id
                setInternalHovered(next)
                onNodeSelect?.(next)
              }}
            >
              {isHovered && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={node.radius + 7}
                  fill="none"
                  stroke="var(--gold)"
                  strokeWidth="1"
                  opacity="0.45"
                />
              )}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isHovered ? node.radius + 2 : node.radius}
                fill="var(--surface)"
                stroke={isHovered ? "var(--gold-pale)" : "var(--gold)"}
                strokeWidth={isHovered ? 2.2 : 1.6}
              />
              <circle
                cx={pos.x}
                cy={pos.y}
                r={node.radius * 0.48}
                stroke={isHovered ? "var(--gold-pale)" : "var(--gold)"}
                strokeWidth="1"
                strokeDasharray="2 3"
                opacity={isHovered ? 0.7 : 0.35}
              />
              <circle
                cx={pos.x}
                cy={pos.y}
                r={2}
                fill={isHovered ? "var(--gold-pale)" : "var(--gold)"}
                opacity={isHovered ? 1 : 0.55}
              />
              <text
                x={pos.x + node.textOffsetX}
                y={pos.y + node.textOffsetY}
                fill={isHovered ? "var(--gold)" : "var(--ink-soft)"}
                textAnchor={node.textAnchor}
                dominantBaseline={node.id === "academia" ? "central" : undefined}
                fontSize="11.5"
                fontFamily="var(--font-latin), Inter, sans-serif"
                fontWeight={isHovered ? "700" : "600"}
                letterSpacing="0.08em"
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
