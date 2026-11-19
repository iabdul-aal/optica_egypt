"use client"

import { useCallback, useState } from "react"

export interface ConstellationNode {
  id: string
  label: string
  baseX: number
  baseY: number
  radius: number
  textOffsetX: number
  textOffsetY: number
  textAnchor: "start" | "middle" | "end"
}

export const CONSTELLATION_NODES: readonly ConstellationNode[] = [
  {
    id: "students",
    label: "STUDENTS",
    baseX: 118,
    baseY: 84,
    radius: 21,
    textOffsetX: 0,
    textOffsetY: -34,
    textAnchor: "middle",
  },
  {
    id: "researchers",
    label: "RESEARCHERS",
    baseX: 468,
    baseY: 82,
    radius: 21,
    textOffsetX: 0,
    textOffsetY: -34,
    textAnchor: "middle",
  },
  {
    id: "academia",
    label: "ACADEMIA",
    baseX: 492,
    baseY: 185,
    radius: 21,
    textOffsetX: 34,
    textOffsetY: 0,
    textAnchor: "start",
  },
  {
    id: "industry",
    label: "INDUSTRY",
    baseX: 438,
    baseY: 292,
    radius: 21,
    textOffsetX: 0,
    textOffsetY: 40,
    textAnchor: "middle",
  },
  {
    id: "chapters",
    label: "CHAPTERS",
    baseX: 144,
    baseY: 292,
    radius: 21,
    textOffsetX: 0,
    textOffsetY: 40,
    textAnchor: "middle",
  },
]

const CENTER = {
  baseX: 310,
  baseY: 184,
  radius: 62,
  innerRadius: 44,
}

interface CommunityBubblesProps {
  activeNodeId?: string | null
  onNodeSelect?: (id: string | null) => void
  diagramLabel?: string
}

export function CommunityBubbles({
  activeNodeId,
  onNodeSelect,
  diagramLabel = "Interactive network linking five pillars of the Optica Egypt optics and photonics community.",
}: CommunityBubblesProps) {
  const [internalHovered, setInternalHovered] = useState<string | null>(null)
  const [isCenterHovered, setIsCenterHovered] = useState(false)

  const highlightedNode = activeNodeId ?? internalHovered

  const handleMouseLeave = useCallback(() => {
    setInternalHovered(null)
    setIsCenterHovered(false)
    onNodeSelect?.(null)
  }, [onNodeSelect])

  const outerPolygonPath =
    CONSTELLATION_NODES.reduce(
      (acc, n, i) => `${acc}${i === 0 ? "M" : "L"} ${n.baseX} ${n.baseY} `,
      ""
    ) + "Z"

  return (
    <div className="relative w-full py-3 sm:py-5 select-none">
      <svg
        viewBox="0 0 640 360"
        className="relative h-auto w-full"
        fill="none"
        role="img"
        aria-label={diagramLabel}
        onMouseLeave={handleMouseLeave}
      >
        <path d={outerPolygonPath} stroke="var(--line)" strokeWidth="1" />

        {CONSTELLATION_NODES.map((node) => {
          const isNodeActive = highlightedNode === node.id || isCenterHovered
          return (
            <line
              key={node.id}
              x1={CENTER.baseX}
              y1={CENTER.baseY}
              x2={node.baseX}
              y2={node.baseY}
              stroke={isNodeActive ? "var(--gold)" : "var(--line)"}
              strokeWidth={isNodeActive ? 2 : 1.2}
              strokeDasharray="5 6"
              style={{ transition: "stroke 180ms ease, stroke-width 180ms ease" }}
            />
          )
        })}

        <g
          className="cursor-pointer"
          onMouseEnter={() => setIsCenterHovered(true)}
          onMouseLeave={() => setIsCenterHovered(false)}
        >
          <circle
            cx={CENTER.baseX}
            cy={CENTER.baseY}
            r={CENTER.radius}
            fill="var(--canvas)"
            stroke="var(--gold)"
            strokeWidth={isCenterHovered ? 2.2 : 1.8}
          />
          <circle
            cx={CENTER.baseX}
            cy={CENTER.baseY}
            r={CENTER.innerRadius}
            stroke="var(--line)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <text
            x={CENTER.baseX}
            y={CENTER.baseY - 5}
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
            x={CENTER.baseX}
            y={CENTER.baseY + 15}
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

        {CONSTELLATION_NODES.map((node) => {
          const isHovered = highlightedNode === node.id
          const toggleNode = () => {
            const next = highlightedNode === node.id ? null : node.id
            setInternalHovered(next)
            onNodeSelect?.(next)
          }

          return (
            <g
              key={node.id}
              role="button"
              tabIndex={0}
              aria-label={`Highlight ${node.label.toLowerCase()} pathway`}
              aria-pressed={isHovered}
              className="cursor-pointer focus:outline-none"
              onMouseEnter={() => {
                setInternalHovered(node.id)
                onNodeSelect?.(node.id)
              }}
              onMouseLeave={() => {
                setInternalHovered(null)
                onNodeSelect?.(null)
              }}
              onFocus={() => {
                setInternalHovered(node.id)
                onNodeSelect?.(node.id)
              }}
              onBlur={() => {
                setInternalHovered(null)
                onNodeSelect?.(null)
              }}
              onClick={toggleNode}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  toggleNode()
                }
              }}
            >
              <circle
                cx={node.baseX}
                cy={node.baseY}
                r={isHovered ? node.radius + 2 : node.radius}
                fill="var(--canvas)"
                stroke={isHovered ? "var(--gold)" : "var(--line)"}
                strokeWidth={isHovered ? 2 : 1.4}
              />
              <circle
                cx={node.baseX}
                cy={node.baseY}
                r={2.5}
                fill={isHovered ? "var(--gold)" : "var(--ink-soft)"}
              />
              <text
                x={node.baseX + node.textOffsetX}
                y={node.baseY + node.textOffsetY}
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
