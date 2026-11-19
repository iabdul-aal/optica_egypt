"use client"

import { useCallback, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  Crosshair,
  MapPin,
  RotateCcw,
  UserCheck,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import type { Chapter } from "@/lib/chapters"

const EGYPT_BOUNDARY_PATH =
  "M1970,1863.947L1917.769,1864.246L1865.538,1864.246L1813.308,1864.246L1761.077,1864.246L1708.846,1864.246L1656.615,1864.246L1603.811,1864.246L1551.58,1864.246L1499.349,1864.246L1447.118,1864.246L1394.888,1864.246L1342.657,1864.246L1290.426,1864.246L1237.621,1864.246L1185.391,1864.246L1133.16,1864.246L1103.314,1864.246L1108.479,1849.017L1111.923,1837.963L1107.905,1830.491L1098.148,1828.698L1091.26,1831.089L1075.763,1863.052L1067.728,1864.544L1048.787,1864.544L987.947,1864.544L927.107,1864.246L866.266,1864.246L805.426,1864.246L744.586,1864.246L683.746,1864.246L622.331,1864.246L561.491,1864.246L500.651,1864.246L439.811,1864.246L378.97,1864.246L318.13,1864.246L257.29,1864.246L196.45,1864.246L135.609,1864.246L74.195,1864.246L74.195,1825.708L74.195,1786.809L74.195,1748.148L74.195,1709.422L74.195,1670.332L74.195,1631.478L74.195,1592.256L74.195,1553.269L74.195,1514.215L74.195,1474.789L74.195,1435.598L74.195,1396.336L74.195,1356.699L74.195,1317.295L74.195,1277.818L74.195,1237.962L74.195,1198.338L74.195,1158.638L74.195,1118.554L74.195,1078.702L74.195,1038.462L74.195,998.452L74.195,958.363L74.195,917.882L74.195,877.631L74.195,837.297L74.195,796.566L74.195,756.064L74.195,715.476L74.195,674.487L74.195,633.725L74.195,592.876L73.047,584.949L64.438,557.337L56.402,521.73L47.219,477.763L46.071,463.722L31.722,418.655L30,405.53L34.018,396.561L58.124,358.392L65.012,339.76L71.325,317.247L73.621,299.216L66.16,271.49L58.124,246.306L55.254,220.762L54.107,195.181L66.16,177.999L81.083,161.773L86.822,152.031L95.432,140.658L101.746,135.456L113.799,158.202L138.479,162.098L219.982,141.958L310.095,162.098L359.456,169.888L435.793,187.403L482.284,218.173L495.485,222.056L528.775,221.409L550.586,239.519L637.828,248.244L684.32,268.263L710.722,284.391L726.793,289.227L740.568,288.582L759.509,282.456L783.615,271.167L809.444,255.673L863.396,215.26L882.337,208.138L894.964,210.081L910.462,209.433L916.775,198.745L924.811,191.292L929.402,182.539L938.012,172.484L965.562,169.563L1021.811,152.031L1015.497,160.15L964.414,179.945L986.225,182.539L1008.609,175.728L1034.438,171.51L1039.03,163.072L1042.473,147.157L1047.639,145.208L1064.858,148.132L1117.663,172.159L1130.864,172.808L1168.172,159.5L1175.633,156.578L1187.686,164.046L1215.237,194.209L1205.479,193.561L1176.207,167.616L1173.911,180.593L1157.266,203.281L1177.929,212.995L1195.148,216.555L1204.331,229.173L1210.071,240.489L1226.716,235.64L1238.769,220.438L1232.456,211.7L1227.864,202.957L1233.604,202.633L1245.083,210.081L1278.373,238.873L1289.852,245.013L1302.479,244.044L1330.03,235.64L1337.491,236.933L1373.651,226.262L1378.243,234.347L1383.982,242.105L1413.254,233.377L1459.172,233.377L1497.053,223.997L1540.675,201.013L1544.118,197.45L1546.414,203.281L1551.58,218.821L1564.781,258.579L1576.26,289.549L1590.609,332.687L1595.201,349.079L1596.923,360.319L1617.586,407.451L1629.639,446.156L1638.822,477.444L1650.876,522.684L1656.615,538.588L1648.006,546.852L1629.639,576.384L1610.698,670.067L1583.722,742.859L1580.852,788.096L1576.26,804.405L1563.059,827.279L1547.562,849.812L1519.438,838.236L1474.095,798.761L1447.692,761.092L1419.568,736.882L1392.592,704.449L1385.13,681.43L1385.704,666.279L1373.651,629.929L1365.041,612.52L1332.325,573.528L1323.142,552.889L1315.68,543.674L1308.793,530.638L1296.74,479.676L1283.538,447.434L1269.189,456.378L1271.485,470.105L1258.858,488.924L1250.822,510.589L1257.136,528.411L1283.538,555.431L1289.278,567.18L1295.592,592.558L1294.444,627.398L1298.462,639.102L1318.55,664.7L1326.012,679.852L1330.03,693.101L1336.917,705.08L1356.432,727.441L1385.13,769.574L1412.107,798.134L1432.195,811.928L1440.231,825.713L1441.953,861.069L1440.805,878.255L1458.024,909.776L1464.337,925.985L1480.982,939.067L1488.444,954.008L1495.331,978.262L1505.663,1049.923L1520.586,1067.257L1564.781,1160.794L1602.663,1219.848L1621.03,1264.03L1648.58,1317.295L1703.107,1434.077L1735.249,1469.932L1747.876,1489.961L1771.408,1505.426L1796.663,1527.846L1772.556,1525.726L1766.817,1527.241L1758.207,1530.874L1754.189,1544.495L1752.467,1555.689L1755.337,1614.289L1761.651,1643.834L1782.888,1700.407L1798.959,1717.233L1806.994,1728.042L1817.325,1736.147L1867.834,1755.045L1897.68,1795.792L1963.686,1846.627L1970,1860.663Z"

const NILE_SPINE_PATH =
  "M 1110,1840 C 1110,1720 1180,1650 1175,1530 L 1180,1470 C 1190,1390 1260,1310 1270,1260 C 1275,1230 1240,1210 1220,1210 C 1200,1190 1170,1130 1145,1010 C 1120,890 1100,750 1095,590 L 1095,520"

const LAKE_NASSER_PATH =
  "M 1105,1830 C 1100,1720 1170,1660 1175,1540 C 1185,1545 1195,1660 1125,1830 Z"

const ROSETTA_BRANCH_PATH = "M 1095,520 Q 1040,430 1010,340 T 965,170"
const DAMIETTA_BRANCH_PATH = "M 1095,520 Q 1130,420 1150,330 T 1176,168"
const SUEZ_CANAL_PATH = "M 1215,194 L 1240,320 L 1260,390 L 1283,447"

/** Classic Google Maps teardrop pin whose sharp downward apex rests at (0, 0). */
const LOCATION_PIN_PATH =
  "M 0 0 C -4.5 -11, -16.25 -28.14, -24.25 -42 A 28 28 0 1 1 24.25 -42 C 16.25 -28.14, 4.5 -11, 0 0 Z"

const ORIGIN_X = -60
const ORIGIN_Y = -90
const FRAME_W = 2120
const FRAME_H = 2040
const BASE_ZOOM_SCALE = 1.2

interface ChapterMarkerSpec {
  x: number
  y: number
  coordsLabel: string
  tagTitle: string
  tagSubtitle: string
  side: 1 | -1
  focusCenterOffset: { x: number; y: number }
}

const CHAPTER_MARKERS: Record<string, ChapterMarkerSpec> = {
  auc: {
    x: 1135,
    y: 485,
    coordsLabel: "30°01' N, 31°30' E - New Cairo Sector",
    tagTitle: "AUC NEW CAIRO",
    tagSubtitle: "CHARTERED",
    side: 1,
    focusCenterOffset: { x: 95, y: 15 },
  },
  "zewail-city": {
    x: 1035,
    y: 528,
    coordsLabel: "29°56' N, 31°04' E - 6th of October Sector",
    tagTitle: "ZEWAIL CITY",
    tagSubtitle: "IN FORMATION",
    side: -1,
    focusCenterOffset: { x: 85, y: 10 },
  },
}

function resolveChapterMarker(chapter: Chapter, index: number): ChapterMarkerSpec {
  const preset = CHAPTER_MARKERS[chapter.id]
  if (preset) return preset
  const x = Math.round((chapter.coordinates.x / 100) * 1800 + 100)
  const y = Math.round((chapter.coordinates.y / 100) * 1650 + 140)
  const side: 1 | -1 = index % 2 === 0 ? 1 : -1
  return {
    x,
    y,
    coordsLabel: `${chapter.city}, ${chapter.governorate || "Egypt"}`,
    tagTitle: chapter.shortName.replace(/ Student Chapter$/i, "").toUpperCase(),
    tagSubtitle: chapter.charteredYear ? "CHARTERED" : "IN FORMATION",
    side,
    focusCenterOffset: { x: side > 0 ? 95 : 85, y: 10 },
  }
}

const REFERENCE_CITIES = [
  { name: "Alexandria", x: 759, y: 282, align: "end" as const, dx: -18, dy: -14 },
  { name: "Port Said", x: 1215, y: 194, align: "start" as const, dx: 18, dy: -8 },
  { name: "Cairo", x: 1095, y: 505, align: "middle" as const, dx: 6, dy: 58 },
  { name: "Asyut", x: 1125, y: 900, align: "end" as const, dx: -20, dy: 6 },
  { name: "Aswan", x: 1178, y: 1510, align: "start" as const, dx: 20, dy: 8 },
] as const

interface ChaptersMapProps {
  chapters: Chapter[]
}

export function ChaptersMap({ chapters }: ChaptersMapProps) {
  const [selectedId, setSelectedId] = useState<string>(chapters[0]?.id || "auc")
  const [openCardId, setOpenCardId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const [zoom, setZoom] = useState(1.0)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [focusedChapterId, setFocusedChapterId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragOriginRef = useRef({ clientX: 0, clientY: 0, panX: 0, panY: 0 })
  const dragMovedRef = useRef(false)
  const svgRef = useRef<SVGSVGElement | null>(null)

  const markerMap = Object.fromEntries(
    chapters.map((ch, idx) => [ch.id, resolveChapterMarker(ch, idx)])
  ) as Record<string, ChapterMarkerSpec>

  const selectedChapter = chapters.find((c) => c.id === selectedId) || chapters[0]
  const activeCardChapter = openCardId
    ? chapters.find((c) => c.id === openCardId) || null
    : null
  const telemetryChapterId = hoveredId || openCardId || focusedChapterId
  const activeMarker = markerMap[telemetryChapterId || selectedId] || CHAPTER_MARKERS.auc

  const effectiveZoom = zoom * BASE_ZOOM_SCALE
  const viewW = FRAME_W / effectiveZoom
  const viewH = FRAME_H / effectiveZoom

  const baseCenterX = ORIGIN_X + FRAME_W / 2
  const baseCenterY = ORIGIN_Y + FRAME_H / 2 - 40
  const focusMarker = focusedChapterId ? markerMap[focusedChapterId] : null
  const targetCenterX = focusMarker
    ? focusMarker.x + focusMarker.focusCenterOffset.x
    : baseCenterX
  const targetCenterY = focusMarker
    ? focusMarker.y + focusMarker.focusCenterOffset.y
    : baseCenterY

  const rawViewX = targetCenterX - viewW / 2 + pan.x
  const rawViewY = targetCenterY - viewH / 2 + pan.y

  const clampedViewX = Math.max(
    ORIGIN_X - 180,
    Math.min(ORIGIN_X + FRAME_W + 180 - viewW, rawViewX)
  )
  const clampedViewY = Math.max(
    ORIGIN_Y - 120,
    Math.min(ORIGIN_Y + FRAME_H + 120 - viewH, rawViewY)
  )
  const activeViewBox = `${clampedViewX} ${clampedViewY} ${viewW} ${viewH}`

  const pinScale = 1.24 / Math.pow(zoom, 0.72)

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(2.6, Number((prev + 0.4).toFixed(2))))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => {
      const next = Math.max(1.0, Number((prev - 0.4).toFixed(2)))
      if (next === 1.0) {
        setPan({ x: 0, y: 0 })
        setFocusedChapterId(null)
      }
      return next
    })
  }, [])

  const handleFocusChapter = useCallback((chapterId: string) => {
    setSelectedId(chapterId)
    setOpenCardId(chapterId)
    setFocusedChapterId(chapterId)
    setZoom(2.2)
    setPan({ x: 0, y: 0 })
  }, [])

  const handleResetViewKeepCard = useCallback(() => {
    setZoom(1.0)
    setPan({ x: 0, y: 0 })
    setFocusedChapterId(null)
  }, [])

  const handleReset = useCallback(() => {
    setZoom(1.0)
    setPan({ x: 0, y: 0 })
    setFocusedChapterId(null)
    setOpenCardId(null)
  }, [])

  const handlePinClick = useCallback(
    (chapterId: string) => {
      setSelectedId(chapterId)
      if (openCardId !== chapterId) {
        setOpenCardId(chapterId)
        if (zoom > 1.0) {
          setFocusedChapterId(chapterId)
          setPan({ x: 0, y: 0 })
        }
        return
      }
      if (zoom <= 1.2) {
        handleFocusChapter(chapterId)
      } else {
        handleResetViewKeepCard()
      }
    },
    [openCardId, zoom, handleFocusChapter, handleResetViewKeepCard]
  )

  const handleSelectTab = useCallback(
    (chapterId: string) => {
      setSelectedId(chapterId)
      setOpenCardId(chapterId)
      if (zoom > 1.0) {
        setFocusedChapterId(chapterId)
        setPan({ x: 0, y: 0 })
      }
    },
    [zoom]
  )

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    dragMovedRef.current = false
    if (zoom <= 1.0 || e.button !== 0) return
    setIsDragging(true)
    dragOriginRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      panX: pan.x,
      panY: pan.y,
    }
    if (svgRef.current?.setPointerCapture) {
      try {
        svgRef.current.setPointerCapture(e.pointerId)
      } catch {}
    }
  }

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging || !svgRef.current) return
    const dx = e.clientX - dragOriginRef.current.clientX
    const dy = e.clientY - dragOriginRef.current.clientY
    if (Math.hypot(dx, dy) > 4) {
      dragMovedRef.current = true
    }
    const rect = svgRef.current.getBoundingClientRect()
    const scaleX = viewW / rect.width
    const scaleY = viewH / rect.height

    setPan({
      x: dragOriginRef.current.panX - dx * scaleX,
      y: dragOriginRef.current.panY - dy * scaleY,
    })
  }

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging) return
    setIsDragging(false)
    if (svgRef.current?.releasePointerCapture) {
      try {
        svgRef.current.releasePointerCapture(e.pointerId)
      } catch {}
    }
  }

  const focusShortLabel =
    selectedId === "zewail-city"
      ? "Focus Zewail"
      : selectedId === "auc"
        ? "Focus AUC"
        : `Focus ${selectedChapter?.shortName.replace(/ Student Chapter$/i, "") || "Chapter"}`

  // Paint inactive pins first and hovered/selected pin last so active callouts stay unobstructed
  const orderedChapters = [...chapters].sort((a, b) => {
    const score = (id: string) =>
      id === openCardId ? 3 : id === hoveredId ? 2 : id === selectedId ? 1 : 0
    return score(a.id) - score(b.id)
  })

  const activeCardMarker = activeCardChapter ? markerMap[activeCardChapter.id] : null
  const isCardFocused =
    Boolean(activeCardChapter) && focusedChapterId === activeCardChapter?.id && zoom > 1.0

  return (
    <div
      className="border border-[var(--line)] bg-[var(--canvas)]"
      onKeyDown={(e) => {
        if (e.key === "Escape" && openCardId) {
          setOpenCardId(null)
        }
      }}
    >
      {/* Top Telemetry and Map Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line-subtle)] bg-[var(--surface)] px-5 py-4 sm:px-8">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--gold)]">
            Egypt Campus Map
          </p>
          <p className="mt-1 font-mono text-xs text-[var(--ink-faint)]">
            {telemetryChapterId
              ? activeMarker.coordsLabel
              : "22° to 32° N, 25° to 36° E - Click any pin for details"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {chapters.length > 0 && (
            <div
              className="flex flex-wrap items-center border border-[var(--line)] bg-[var(--canvas)] p-0.5 max-w-full"
              role="tablist"
              aria-label="Select student chapter on map"
            >
              {chapters.map((chapter) => {
                const active = chapter.id === openCardId
                const tabLabel =
                  chapter.id === "zewail-city"
                    ? "Zewail City"
                    : chapter.id === "auc"
                      ? "AUC New Cairo"
                      : chapter.shortName.replace(/ Student Chapter$/i, "")
                return (
                  <button
                    key={chapter.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => handleSelectTab(chapter.id)}
                    className={`min-h-[48px] px-3.5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                      active
                        ? "bg-[var(--surface-raised)] text-[var(--ink)] font-bold border border-[var(--gold)]"
                        : "border border-transparent text-[var(--ink-faint)] hover:text-[var(--ink)]"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        chapter.charteredYear
                          ? "bg-[var(--gold)]"
                          : "border border-[var(--ink-soft)]"
                      }`}
                      aria-hidden="true"
                    />
                    <span>{tabLabel}</span>
                  </button>
                )
              })}
            </div>
          )}

          <div
            className="inline-flex items-center border border-[var(--line)] bg-[var(--canvas)] divide-x divide-[var(--line)]"
            role="group"
            aria-label="Map zoom and focus controls"
          >
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoom <= 1.0}
              aria-label="Zoom out map"
              className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--surface)] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <ZoomOut size={15} aria-hidden="true" />
            </button>

            <span className="px-2.5 font-mono text-xs font-semibold text-[var(--ink)] select-none min-w-[3.25rem] text-center">
              {Math.round(zoom * 100)}%
            </span>

            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoom >= 2.6}
              aria-label="Zoom in map"
              className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--surface)] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <ZoomIn size={15} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => handleFocusChapter(selectedId)}
              aria-label={`Focus on ${selectedChapter?.shortName || "AUC Chapter"}`}
              aria-pressed={focusedChapterId === selectedId && zoom > 1.0}
              className={`min-h-[48px] px-3 whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 font-mono text-xs transition-colors cursor-pointer ${
                focusedChapterId === selectedId && zoom > 1.0
                  ? "bg-[var(--gold)]/15 text-[var(--gold)] font-bold"
                  : "text-[var(--ink-soft)] hover:text-[var(--gold)] hover:bg-[var(--surface)]"
              }`}
            >
              <Crosshair size={14} aria-hidden="true" />
              <span>{focusShortLabel}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={zoom === 1.0 && pan.x === 0 && pan.y === 0 && openCardId === null}
              aria-label="Reset map to full country view"
              className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--surface)] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <RotateCcw size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Cartographic Stage + On-Click Location Card */}
      <div className="relative bg-[var(--canvas)] overflow-hidden">
        <div className="w-full flex items-center justify-center select-none">
          <svg
            ref={svgRef}
            viewBox={activeViewBox}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`w-full h-[380px] sm:h-[490px] lg:h-[600px] ${
              zoom > 1.0 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
            }`}
            style={{ touchAction: zoom > 1.0 ? "none" : "pan-y" }}
            fill="none"
            role="img"
            aria-label="Geographic Map of Egypt locating AUC and Zewail City student chapter campuses"
          >
            <defs>
              <pattern id="egypt-survey-grid" width="160" height="160" patternUnits="userSpaceOnUse">
                <path
                  d="M 160 0 L 0 0 0 160"
                  fill="none"
                  stroke="var(--line-subtle)"
                  strokeWidth="1.2"
                  opacity="0.6"
                />
              </pattern>
            </defs>

            <rect
              x={-2400}
              y={-1200}
              width={7200}
              height={5000}
              fill="url(#egypt-survey-grid)"
            />

            <line
              x1={-2400}
              y1="72"
              x2={4800}
              y2="72"
              stroke="var(--line-subtle)"
              strokeWidth="1.5"
              strokeDasharray="16 14"
            />
            <text
              x="40"
              y="102"
              fontFamily="monospace"
              fontSize="22"
              fill="var(--ink-faint)"
              opacity="0.7"
            >
              31° N - MEDITERRANEAN BASIN
            </text>

            <text
              x="660"
              y="112"
              fontFamily="monospace"
              fontSize="44"
              fontWeight="700"
              letterSpacing="0.28em"
              fill="var(--ink-faint)"
              opacity="0.35"
            >
              MEDITERRANEAN SEA
            </text>

            <path
              d={EGYPT_BOUNDARY_PATH}
              fill="var(--surface)"
              stroke="var(--line)"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />

            <g fontFamily="monospace" fontWeight="700" fill="var(--ink-faint)" opacity="0.45">
              <text x="1690" y="1140" fontSize="36" letterSpacing="0.18em">
                RED SEA
              </text>
              <text x="1395" y="590" fontSize="26" letterSpacing="0.15em">
                SINAI
              </text>
              <text x="330" y="1080" fontSize="30" letterSpacing="0.18em">
                WESTERN DESERT
              </text>
              <text x="1235" y="1020" fontSize="28" letterSpacing="0.16em">
                EASTERN DESERT
              </text>
            </g>

            <path
              d={LAKE_NASSER_PATH}
              fill="var(--gold)"
              fillOpacity="0.22"
              stroke="var(--gold)"
              strokeWidth="2.5"
            />
            <path
              d={NILE_SPINE_PATH}
              fill="none"
              stroke="var(--gold)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.72"
            />
            <path
              d={ROSETTA_BRANCH_PATH}
              fill="none"
              stroke="var(--gold)"
              strokeWidth="4.5"
              strokeLinecap="round"
              opacity="0.65"
            />
            <path
              d={DAMIETTA_BRANCH_PATH}
              fill="none"
              stroke="var(--gold)"
              strokeWidth="4.5"
              strokeLinecap="round"
              opacity="0.65"
            />
            <path
              d={SUEZ_CANAL_PATH}
              fill="none"
              stroke="var(--gold)"
              strokeWidth="3.5"
              strokeDasharray="10 8"
              opacity="0.6"
            />

            {REFERENCE_CITIES.map((city) => (
              <g key={city.name} fontFamily="monospace" fontSize="25" fill="var(--ink-soft)">
                <circle cx={city.x} cy={city.y} r="7" fill="var(--ink-faint)" />
                <text
                  x={city.x + city.dx}
                  y={city.y + city.dy}
                  textAnchor={city.align}
                  fontWeight="600"
                >
                  {city.name}
                </text>
              </g>
            ))}

            {/* Decorative Ground Pulse Beacons (kept outside interactive pin group for pointer stability) */}
            <g aria-hidden="true">
              {orderedChapters.map((chapter) => {
                const marker = markerMap[chapter.id]
                if (!marker) return null
                const isOpen = openCardId === chapter.id
                const isChartered = Boolean(chapter.charteredYear)
                if (!(isOpen || (!openCardId && isChartered))) return null
                return (
                  <g
                    key={`beacon-${chapter.id}`}
                    transform={`translate(${marker.x}, ${marker.y}) scale(${pinScale})`}
                  >
                    <circle
                      cx="0"
                      cy="0"
                      r={isOpen ? "30" : "22"}
                      stroke="var(--gold)"
                      strokeWidth={isOpen ? "2.4" : "1.8"}
                      fill="var(--gold)"
                      fillOpacity={isOpen ? "0.18" : "0.1"}
                      className="chapter-pulse"
                    />
                  </g>
                )
              })}
            </g>

            {/* Google-Maps-Style Downward Location Pins */}
            {orderedChapters.map((chapter) => {
              const marker = markerMap[chapter.id]
              if (!marker) return null
              const isOpen = openCardId === chapter.id
              const isHovered = hoveredId === chapter.id
              const isHighlighted = isOpen || isHovered
              const isChartered = Boolean(chapter.charteredYear)
              const side = marker.side
              const tagWidth = Math.max(
                marker.tagTitle.length * 10.2,
                marker.tagSubtitle.length * 8.2
              ) + 28
              const boxX = side > 0 ? 42 : -42 - tagWidth
              const textX = side > 0 ? 55 : -55

              return (
                <g
                  key={chapter.id}
                  transform={`translate(${marker.x}, ${marker.y}) scale(${pinScale})`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isOpen}
                  onMouseEnter={() => setHoveredId(chapter.id)}
                  onMouseLeave={() => setHoveredId((prev) => (prev === chapter.id ? null : prev))}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (dragMovedRef.current) return
                    handlePinClick(chapter.id)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handlePinClick(chapter.id)
                    }
                  }}
                  className="cursor-pointer focus:outline-none"
                  aria-label={`${chapter.name}. Status: ${chapter.status}. Click location pin for details.`}
                >
                  {/* Ground anchor and shadow right beneath pin tip (0,0) */}
                  <ellipse cx="0" cy="2" rx="13" ry="4.5" fill="var(--ink)" fillOpacity="0.24" />
                  <circle
                    cx="0"
                    cy="0"
                    r={isHighlighted ? "4.5" : "3.5"}
                    fill={isChartered || isHighlighted ? "var(--gold)" : "var(--ink-soft)"}
                  />

                  {/* Elevated Downward Teardrop Pin + Architectural Label Pill */}
                  <g
                    style={{
                      transform: isHighlighted ? "translateY(-7px)" : "translateY(0px)",
                      transition: "transform 180ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    {/* Generous tap hit area */}
                    <rect
                      x="-44"
                      y="-98"
                      width="88"
                      height="106"
                      rx="14"
                      fill="transparent"
                      pointerEvents="all"
                    />

                    {/* Outer halo on hover or selection */}
                    {isHighlighted && (
                      <path
                        d={LOCATION_PIN_PATH}
                        fill="none"
                        stroke="var(--gold)"
                        strokeWidth="8"
                        strokeOpacity="0.28"
                      />
                    )}

                    {/* Downward Location Pin Teardrop */}
                    <path
                      d={LOCATION_PIN_PATH}
                      fill={
                        isChartered
                          ? "var(--gold)"
                          : isHighlighted
                            ? "var(--gold)"
                            : "var(--surface-raised)"
                      }
                      stroke={
                        isChartered || isHighlighted ? "var(--canvas)" : "var(--ink-soft)"
                      }
                      strokeWidth={isHighlighted ? "3.2" : "2.6"}
                      strokeLinejoin="round"
                    />

                    {/* Pin Head Precision Aperture */}
                    <circle
                      cx="0"
                      cy="-56"
                      r="11.5"
                      fill="var(--canvas)"
                      stroke={isChartered || isHighlighted ? "none" : "var(--gold)"}
                      strokeWidth="1.8"
                    />
                    <circle
                      cx="0"
                      cy="-56"
                      r="4.5"
                      fill={isChartered || isHighlighted ? "var(--gold)" : "var(--ink-soft)"}
                    />

                    {/* Compact Attached Pin Badge */}
                    <line
                      x1={side * 28}
                      y1="-56"
                      x2={side * 42}
                      y2="-56"
                      stroke={isHighlighted ? "var(--gold)" : "var(--line)"}
                      strokeWidth="2.2"
                    />
                    <rect
                      x={boxX}
                      y="-80"
                      width={tagWidth}
                      height="48"
                      rx="3"
                      fill="var(--surface-raised)"
                      fillOpacity="0.95"
                      stroke={isHighlighted ? "var(--gold)" : "var(--line)"}
                      strokeWidth={isHighlighted ? "2" : "1.4"}
                    />
                    <text
                      x={textX}
                      y="-60"
                      textAnchor={side > 0 ? "start" : "end"}
                      fontFamily="monospace"
                      fontSize="16"
                      fontWeight="700"
                      fill="var(--ink)"
                    >
                      {marker.tagTitle}
                    </text>
                    <text
                      x={textX}
                      y="-41"
                      textAnchor={side > 0 ? "start" : "end"}
                      fontFamily="monospace"
                      fontSize="12"
                      fontWeight="600"
                      fill={isChartered || isHighlighted ? "var(--gold)" : "var(--ink-faint)"}
                    >
                      {marker.tagSubtitle}
                    </text>
                  </g>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Floating Interactive Pin Location Card (Desktop overlay / Mobile docked panel) */}
        {activeCardChapter && activeCardMarker && (
          <div
            key={activeCardChapter.id}
            id="chapter-map-card"
            role="region"
            aria-label={`${activeCardChapter.name} details`}
            className="topic-transition border-t border-[var(--line)] bg-[var(--surface-raised)] p-5 lg:absolute lg:top-5 lg:right-5 lg:w-[376px] lg:max-h-[calc(100%-2.5rem)] lg:overflow-y-auto lg:border lg:border-[var(--gold)]/60 lg:shadow-[0_22px_54px_-12px_rgba(0,0,0,0.45)] z-10"
          >
            <div className="flex items-start justify-between gap-3 border-b border-[var(--line-subtle)] pb-3">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--gold)]">
                  <MapPin size={12} aria-hidden="true" />
                  <span>{activeCardChapter.status}</span>
                </span>
                <p className="font-mono text-[11px] text-[var(--ink-faint)]">
                  {activeCardMarker.coordsLabel}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpenCardId(null)}
                aria-label="Close pin details"
                className="-mr-2 -mt-2 min-h-[48px] min-w-[48px] inline-flex items-center justify-center text-[var(--ink-faint)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <h3 className="mt-3 text-lg sm:text-xl font-semibold tracking-tight text-[var(--ink)] leading-snug">
              {activeCardChapter.name}
            </h3>

            <p className="mt-1 font-mono text-xs text-[var(--ink-soft)]">
              {activeCardChapter.campus}, {activeCardChapter.city}
            </p>

            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[var(--ink-soft)] line-clamp-3">
              {activeCardChapter.description}
            </p>

            <div className="mt-3 space-y-2 border-y border-[var(--line-subtle)] py-3 text-xs">
              {activeCardChapter.facultyAdvisor && (
                <div className="flex items-start gap-2 text-[var(--ink-soft)]">
                  <UserCheck size={14} className="mt-0.5 text-[var(--gold)] shrink-0" aria-hidden="true" />
                  <div>
                    <span className="font-semibold text-[var(--ink)]">
                      {activeCardChapter.facultyAdvisor}
                    </span>
                    {activeCardChapter.advisorDepartment && (
                      <span className="block text-[11px] text-[var(--ink-faint)]">
                        {activeCardChapter.advisorDepartment}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {activeCardChapter.focusAreas && activeCardChapter.focusAreas.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {activeCardChapter.focusAreas.slice(0, 2).map((area) => (
                    <span
                      key={area}
                      className="border border-[var(--line-subtle)] bg-[var(--canvas)] px-2 py-1 font-mono text-[10px] text-[var(--ink-soft)]"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-3.5 grid gap-2.5 sm:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  isCardFocused
                    ? handleResetViewKeepCard()
                    : handleFocusChapter(activeCardChapter.id)
                }
                className="btn-secondary w-full justify-center min-h-[48px] px-3 text-xs"
              >
                <Crosshair size={13} aria-hidden="true" />
                <span>{isCardFocused ? "Overview (100%)" : "Zoom to Campus"}</span>
              </button>

              <Link
                href={`/chapters/${activeCardChapter.id}`}
                className="btn-primary w-full justify-center min-h-[48px] px-3 text-xs"
              >
                <span>Open Profile</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Legend Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line-subtle)] bg-[var(--surface)] px-5 py-3.5 sm:px-8 font-mono text-xs">
        <div className="flex flex-wrap items-center gap-5 text-[var(--ink)]">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--gold)] inline-block" aria-hidden="true" />
            <span>AUC (Chartered - Reactivating)</span>
          </span>
          <span className="inline-flex items-center gap-2 text-[var(--ink-soft)]">
            <span
              className="h-2.5 w-2.5 rounded-full border border-[var(--ink-soft)] bg-[var(--surface-raised)] inline-block"
              aria-hidden="true"
            />
            <span>Zewail City (Chartering in Progress)</span>
          </span>
        </div>
        <span className="text-[var(--ink-faint)]">
          {openCardId
            ? zoom > 1.0
              ? "Drag map to pan, or press Escape or X to close card"
              : "Click zoom or pin again to inspect campus detail"
            : "Click any downward location pin to view chapter details"}
        </span>
      </div>
    </div>
  )
}
