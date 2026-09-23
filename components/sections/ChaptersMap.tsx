"use client"

import { useState, useRef, useCallback } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  Crosshair,
  GraduationCap,
  Info,
  MapPin,
  Move,
  RotateCcw,
  Sparkles,
  UserCheck,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import type { Chapter } from "@/lib/chapters"

// Authentic geographic vector boundary of Egypt (Natural Earth)
// ViewBox coordinate frame: X: 0 to 2000, Y: -280 to 1960 (Total W: 2000, H: 2240)
// Generous Mediterranean Sea expanse allocated above Egypt's northern coastline (Y: -280 to Y: ~140)
const EGYPT_BOUNDARY_PATH =
  "M1970,1863.947L1917.769,1864.246L1865.538,1864.246L1813.308,1864.246L1761.077,1864.246L1708.846,1864.246L1656.615,1864.246L1603.811,1864.246L1551.58,1864.246L1499.349,1864.246L1447.118,1864.246L1394.888,1864.246L1342.657,1864.246L1290.426,1864.246L1237.621,1864.246L1185.391,1864.246L1133.16,1864.246L1103.314,1864.246L1108.479,1849.017L1111.923,1837.963L1107.905,1830.491L1098.148,1828.698L1091.26,1831.089L1075.763,1863.052L1067.728,1864.544L1048.787,1864.544L987.947,1864.544L927.107,1864.246L866.266,1864.246L805.426,1864.246L744.586,1864.246L683.746,1864.246L622.331,1864.246L561.491,1864.246L500.651,1864.246L439.811,1864.246L378.97,1864.246L318.13,1864.246L257.29,1864.246L196.45,1864.246L135.609,1864.246L74.195,1864.246L74.195,1825.708L74.195,1786.809L74.195,1748.148L74.195,1709.422L74.195,1670.332L74.195,1631.478L74.195,1592.256L74.195,1553.269L74.195,1514.215L74.195,1474.789L74.195,1435.598L74.195,1396.336L74.195,1356.699L74.195,1317.295L74.195,1277.818L74.195,1237.962L74.195,1198.338L74.195,1158.638L74.195,1118.554L74.195,1078.702L74.195,1038.462L74.195,998.452L74.195,958.363L74.195,917.882L74.195,877.631L74.195,837.297L74.195,796.566L74.195,756.064L74.195,715.476L74.195,674.487L74.195,633.725L74.195,592.876L73.047,584.949L64.438,557.337L56.402,521.73L47.219,477.763L46.071,463.722L31.722,418.655L30,405.53L34.018,396.561L58.124,358.392L65.012,339.76L71.325,317.247L73.621,299.216L66.16,271.49L58.124,246.306L55.254,220.762L54.107,195.181L66.16,177.999L81.083,161.773L86.822,152.031L95.432,140.658L101.746,135.456L113.799,158.202L138.479,162.098L219.982,141.958L310.095,162.098L359.456,169.888L435.793,187.403L482.284,218.173L495.485,222.056L528.775,221.409L550.586,239.519L637.828,248.244L684.32,268.263L710.722,284.391L726.793,289.227L740.568,288.582L759.509,282.456L783.615,271.167L809.444,255.673L863.396,215.26L882.337,208.138L894.964,210.081L910.462,209.433L916.775,198.745L924.811,191.292L929.402,182.539L938.012,172.484L965.562,169.563L1021.811,152.031L1015.497,160.15L964.414,179.945L986.225,182.539L1008.609,175.728L1034.438,171.51L1039.03,163.072L1042.473,147.157L1047.639,145.208L1064.858,148.132L1117.663,172.159L1130.864,172.808L1168.172,159.5L1175.633,156.578L1187.686,164.046L1215.237,194.209L1205.479,193.561L1176.207,167.616L1173.911,180.593L1157.266,203.281L1177.929,212.995L1195.148,216.555L1204.331,229.173L1210.071,240.489L1226.716,235.64L1238.769,220.438L1232.456,211.7L1227.864,202.957L1233.604,202.633L1245.083,210.081L1278.373,238.873L1289.852,245.013L1302.479,244.044L1330.03,235.64L1337.491,236.933L1373.651,226.262L1378.243,234.347L1383.982,242.105L1413.254,233.377L1459.172,233.377L1497.053,223.997L1540.675,201.013L1544.118,197.45L1546.414,203.281L1551.58,218.821L1564.781,258.579L1576.26,289.549L1590.609,332.687L1595.201,349.079L1596.923,360.319L1617.586,407.451L1629.639,446.156L1638.822,477.444L1650.876,522.684L1656.615,538.588L1648.006,546.852L1629.639,576.384L1610.698,670.067L1583.722,742.859L1580.852,788.096L1576.26,804.405L1563.059,827.279L1547.562,849.812L1519.438,838.236L1474.095,798.761L1447.692,761.092L1419.568,736.882L1392.592,704.449L1385.13,681.43L1385.704,666.279L1373.651,629.929L1365.041,612.52L1332.325,573.528L1323.142,552.889L1315.68,543.674L1308.793,530.638L1296.74,479.676L1283.538,447.434L1269.189,456.378L1271.485,470.105L1258.858,488.924L1250.822,510.589L1257.136,528.411L1283.538,555.431L1289.278,567.18L1295.592,592.558L1294.444,627.398L1298.462,639.102L1318.55,664.7L1326.012,679.852L1330.03,693.101L1336.917,705.08L1356.432,727.441L1385.13,769.574L1412.107,798.134L1432.195,811.928L1440.231,825.713L1441.953,861.069L1440.805,878.255L1458.024,909.776L1464.337,925.985L1480.982,939.067L1488.444,954.008L1495.331,978.262L1505.663,1049.923L1520.586,1067.257L1564.781,1160.794L1602.663,1219.848L1621.03,1264.03L1648.58,1317.295L1703.107,1434.077L1735.249,1469.932L1747.876,1489.961L1771.408,1505.426L1796.663,1527.846L1772.556,1525.726L1766.817,1527.241L1758.207,1530.874L1754.189,1544.495L1752.467,1555.689L1755.337,1614.289L1761.651,1643.834L1782.888,1700.407L1798.959,1717.233L1806.994,1728.042L1817.325,1736.147L1867.834,1755.045L1897.68,1795.792L1963.686,1846.627L1970,1860.663Z"

// The River Nile main spine flowing from Lake Nasser to the Delta Apex
const NILE_SPINE_PATH =
  "M 1110,1840 C 1110,1720 1180,1650 1175,1530 L 1180,1470 C 1190,1390 1260,1310 1270,1260 C 1275,1230 1240,1210 1220,1210 C 1200,1190 1170,1130 1145,1010 C 1120,890 1100,750 1095,590 L 1095,520"

// Lake Nasser reservoir swelling near southern border
const LAKE_NASSER_PATH =
  "M 1105,1830 C 1100,1720 1170,1660 1175,1540 C 1185,1545 1195,1660 1125,1830 Z"

// Western branch (Rosetta branch)
const ROSETTA_BRANCH_PATH = "M 1095,520 Q 1040,430 1010,340 T 965,170"

// Eastern branch (Damietta branch)
const DAMIETTA_BRANCH_PATH = "M 1095,520 Q 1130,420 1150,330 T 1176,168"

// Suez Canal waterway
const SUEZ_CANAL_PATH = "M 1215,194 L 1240,320 L 1260,390 L 1283,447"

// Base coordinate frame dimensions
const BASE_W = 2000
const BASE_H = 2240

interface ChaptersMapProps {
  chartered: Chapter[]
  pipeline?: Chapter[]
}

export function ChaptersMap({ chartered }: ChaptersMapProps) {
  const aucChapter = chartered[0]
  const [selectedChapter, setSelectedChapter] = useState<Chapter | undefined>(aucChapter)
  const [isChapterHovered, setIsChapterHovered] = useState(false)

  // Interactive Zoom & Pan State
  const [zoom, setZoom] = useState(1.0)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isFocusAUC, setIsFocusAUC] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const dragOriginRef = useRef({ clientX: 0, clientY: 0, panX: 0, panY: 0 })
  const svgRef = useRef<SVGSVGElement | null>(null)

  // AUC Campus coordinates in the Natural Earth 2000x2240 coordinate frame:
  // Longitude ~31.50° E -> X = 1135, Latitude ~30.02° N -> Y = 485
  const aucPinX = 1135
  const aucPinY = 485

  // Compute active viewBox based on zoom and pan
  const viewW = BASE_W / zoom
  const viewH = BASE_H / zoom

  // Center target: if focusAUC is active, center on AUC (1135, 485), otherwise full map center (1000, 840)
  const targetCenterX = isFocusAUC ? aucPinX : 1000
  const targetCenterY = isFocusAUC ? aucPinY : 840

  const rawViewX = targetCenterX - viewW / 2 + pan.x
  const rawViewY = targetCenterY - viewH / 2 + pan.y

  // Constrain viewBox to keep map territory within frame
  const clampedViewX = Math.max(-250, Math.min(2250 - viewW, rawViewX))
  const clampedViewY = Math.max(-380, Math.min(2050 - viewH, rawViewY))

  const activeViewBox = `${clampedViewX} ${clampedViewY} ${viewW} ${viewH}`

  // Zoom Handlers
  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(2.5, Number((prev + 0.35).toFixed(2))))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => {
      const next = Math.max(1.0, Number((prev - 0.35).toFixed(2)))
      if (next === 1.0) {
        setPan({ x: 0, y: 0 })
        setIsFocusAUC(false)
      }
      return next
    })
  }, [])

  const handleFocusAUC = useCallback(() => {
    setIsFocusAUC(true)
    setZoom(1.75)
    setPan({ x: 0, y: 0 })
    setSelectedChapter(aucChapter)
  }, [aucChapter])

  const handleReset = useCallback(() => {
    setZoom(1.0)
    setPan({ x: 0, y: 0 })
    setIsFocusAUC(false)
  }, [])

  // Drag and Pan Event Handlers
  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (zoom <= 1.0 || e.button !== 0) return
    setIsDragging(true)
    dragOriginRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      panX: pan.x,
      panY: pan.y,
    }
    if (svgRef.current && svgRef.current.setPointerCapture) {
      try {
        svgRef.current.setPointerCapture(e.pointerId)
      } catch {}
    }
  }

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging || !svgRef.current) return
    const dx = e.clientX - dragOriginRef.current.clientX
    const dy = e.clientY - dragOriginRef.current.clientY

    const rect = svgRef.current.getBoundingClientRect()
    const scaleFactorX = viewW / rect.width
    const scaleFactorY = viewH / rect.height

    setPan({
      x: dragOriginRef.current.panX - dx * scaleFactorX,
      y: dragOriginRef.current.panY - dy * scaleFactorY,
    })
  }

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (isDragging) {
      setIsDragging(false)
      if (svgRef.current && svgRef.current.releasePointerCapture) {
        try {
          svgRef.current.releasePointerCapture(e.pointerId)
        } catch {}
      }
    }
  }

  const handleDoubleClick = () => {
    if (zoom === 1.0) {
      handleFocusAUC()
    } else {
      handleReset()
    }
  }

  return (
    <div className="site-card overflow-hidden grid lg:grid-cols-[1.3fr_.7fr]">
      {/* ── Geographic Map Canvas ── */}
      <div className="relative p-4 sm:p-8 bg-[var(--surface)] border-b lg:border-b-0 lg:border-r border-[var(--line)] flex flex-col justify-between">
        {/* Header Toolbar & Interactive Zoom Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line-subtle)] pb-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--gold)]">
            <MapPin size={14} className="text-[var(--gold)]" />
            <span>National Cartographic Survey of Egypt</span>
          </div>

          {/* Interactive Zoom and Navigation Bar */}
          <div className="flex items-center gap-1.5 bg-[var(--surface-raised)] border border-[var(--line)] rounded-sm p-1">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoom <= 1.0}
              aria-label="Zoom out map"
              title="Zoom Out (-)"
              className="w-7 h-7 flex items-center justify-center rounded-sm text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--surface)] disabled:opacity-25 disabled:pointer-events-none transition-colors"
            >
              <ZoomOut size={14} />
            </button>

            <span className="font-mono text-[11px] font-bold px-2 min-w-[3.25rem] text-center text-[var(--ink)] select-none">
              {Math.round(zoom * 100)}%
            </span>

            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoom >= 2.5}
              aria-label="Zoom in map"
              title="Zoom In (+)"
              className="w-7 h-7 flex items-center justify-center rounded-sm text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--surface)] disabled:opacity-25 disabled:pointer-events-none transition-colors"
            >
              <ZoomIn size={14} />
            </button>

            <div className="h-3.5 w-px bg-[var(--line)] mx-0.5" />

            <button
              type="button"
              onClick={handleFocusAUC}
              aria-label="Focus on AUC Chapter in New Cairo"
              title="Focus directly on AUC Student Chapter"
              className={`px-2.5 h-7 flex items-center gap-1.5 rounded-sm text-xs font-mono transition-colors ${
                isFocusAUC && zoom > 1.0
                  ? "bg-[var(--gold)]/20 text-[var(--gold)] font-bold border border-[var(--gold)]/40"
                  : "text-[var(--ink-soft)] hover:text-[var(--gold)] hover:bg-[var(--surface)]"
              }`}
            >
              <Crosshair size={13} />
              <span className="hidden sm:inline">Focus AUC</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={zoom === 1.0 && pan.x === 0 && pan.y === 0}
              aria-label="Reset map to full country view"
              title="Reset View"
              className="w-7 h-7 flex items-center justify-center rounded-sm text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--surface)] disabled:opacity-25 disabled:pointer-events-none transition-colors"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* Scaled Authentic Map of Egypt with Allocated Mediterranean Sea Expanse */}
        <div className="relative my-4 w-full flex items-center justify-center overflow-hidden rounded-sm select-none">
          <svg
            ref={svgRef}
            viewBox={activeViewBox}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onDoubleClick={handleDoubleClick}
            className={`w-full h-auto max-h-[580px] transition-all duration-300 ${
              zoom > 1.0 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
            }`}
            style={{ touchAction: zoom > 1.0 ? "none" : "pan-y" }}
            fill="none"
            stroke="currentColor"
            aria-label="Geographic Map of Egypt showing student chapters and Mediterranean Sea"
          >
            <defs>
              {/* Cartographic graticule pattern */}
              <pattern id="egypt-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="var(--line-subtle)" strokeWidth="0.5" opacity="0.3" />
              </pattern>

              {/* Atmospheric Maritime Sea Gradient for Mediterranean Expanse */}
              <linearGradient id="med-sea-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--canvas)" stopOpacity="0.75" />
                <stop offset="55%" stopColor="var(--canvas)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--canvas)" stopOpacity="0" />
              </linearGradient>

              {/* Gold luminescence glow filter for chapter hover pop */}
              <filter id="gold-pop-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Graticule Grid spanning full expanse */}
            <rect x="0" y="-280" width="2000" height="2240" fill="url(#egypt-grid)" />

            {/* ── Allocated Mediterranean Sea Basin ── */}
            <rect x="0" y="-280" width="2000" height="720" fill="url(#med-sea-gradient)" />

            {/* Mediterranean Nautical Parallels and Cartographic Annotations */}
            <g className="select-none font-mono text-[15px] fill-[var(--ink-faint)] opacity-35">
              <line x1="0" y1="-170" x2="2000" y2="-170" stroke="var(--line-subtle)" strokeWidth="1.2" strokeDasharray="14 14" opacity="0.45" />
              <text x="50" y="-185">33°00&apos; N · Eastern Mediterranean Deepwater Basin</text>

              <line x1="0" y1="20" x2="2000" y2="20" stroke="var(--line-subtle)" strokeWidth="1" strokeDasharray="10 10" opacity="0.3" />
              <text x="50" y="5">32°00&apos; N · Egyptian Continental Shelf and Approaches</text>
            </g>

            {/* Grand Mediterranean Sea Geographic Label */}
            <g className="font-mono tracking-[0.35em] font-extrabold fill-[var(--ink-faint)] opacity-30 select-none">
              <text x="500" y="-80" fontSize="36">MEDITERRANEAN SEA</text>
              <text x="680" y="-40" fontSize="16" letterSpacing="0.22em" fill="var(--gold)" opacity="0.6">
                Levantine Basin · Southern Maritime Sector
              </text>
            </g>

            {/* Egypt National Boundary and Sovereign Territory */}
            <path
              d={EGYPT_BOUNDARY_PATH}
              fill="var(--surface-raised)"
              fillOpacity="0.88"
              stroke="var(--line)"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Terrestrial Regional Labels */}
            <g className="font-mono text-[22px] tracking-[0.25em] font-bold fill-[var(--ink-faint)] opacity-40 select-none">
              <text x="1680" y="1120">RED SEA</text>
              <text x="1440" y="470" fontSize="18">SINAI PENINSULA</text>
              <text x="380" y="1100" fontSize="20">WESTERN DESERT</text>
              <text x="1260" y="1020" fontSize="20">EASTERN DESERT</text>
            </g>

            {/* Gulf Waterway Annotations */}
            <g className="font-mono text-[14px] tracking-wider fill-[var(--ink-faint)] opacity-35 select-none">
              <text x="1220" y="630">Gulf of Suez</text>
              <text x="1620" y="650">Gulf of Aqaba</text>
            </g>

            {/* Lake Nasser Reservoir */}
            <path
              d={LAKE_NASSER_PATH}
              fill="var(--gold)"
              fillOpacity="0.22"
              stroke="var(--gold)"
              strokeWidth="1.5"
              opacity="0.8"
            />

            {/* River Nile Main Spine */}
            <path
              d={NILE_SPINE_PATH}
              fill="none"
              stroke="var(--gold)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />

            {/* Nile Delta Branches */}
            <path
              d={ROSETTA_BRANCH_PATH}
              fill="none"
              stroke="var(--gold)"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.75"
            />
            <path
              d={DAMIETTA_BRANCH_PATH}
              fill="none"
              stroke="var(--gold)"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.75"
            />

            {/* Suez Canal Waterway */}
            <path
              d={SUEZ_CANAL_PATH}
              fill="none"
              stroke="var(--gold)"
              strokeWidth="2.5"
              strokeDasharray="8 6"
              opacity="0.7"
            />

            {/* Cartographic Coastal Ports and Anchor Cities */}
            <g className="select-none font-mono text-[13px] fill-[var(--ink-faint)] opacity-60">
              {/* Alexandria Mediterranean Port */}
              <circle cx="759" cy="282" r="4.5" fill="var(--ink-faint)" />
              <text x="660" y="270" fontWeight="bold">Alexandria Port</text>

              {/* Port Said / Suez Canal Entrance */}
              <circle cx="1215" cy="194" r="4" fill="var(--ink-faint)" />
              <text x="1225" y="190">Port Said</text>

              {/* Marsa Matrouh */}
              <circle cx="435" cy="187" r="4" fill="var(--ink-faint)" />
              <text x="350" y="180">Marsa Matrouh</text>

              {/* Cairo Delta Apex */}
              <circle cx="1095" cy="505" r="4.5" fill="var(--ink-faint)" />
              <text x="1035" y="525" fontWeight="bold">Cairo</text>
            </g>

            {/* ── Chartered Chapter Pin: The American University in Cairo (AUC) ── */}
            <g
              role="button"
              tabIndex={0}
              onClick={() => {
                setSelectedChapter(aucChapter)
                setIsFocusAUC(true)
                setZoom(1.75)
              }}
              onMouseEnter={() => setIsChapterHovered(true)}
              onMouseLeave={() => setIsChapterHovered(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedChapter(aucChapter)
                  handleFocusAUC()
                }
              }}
              className="cursor-pointer focus:outline-none"
              style={{
                transform: isChapterHovered ? "scale(1.22)" : "scale(1)",
                transformOrigin: `${aucPinX}px ${aucPinY}px`,
                transition: "transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1), filter 320ms ease",
                filter: isChapterHovered ? "url(#gold-pop-glow)" : "none",
              }}
              aria-label="The American University in Cairo (AUC) Optica Student Chapter - Chartered and Currently Inactive"
            >
              {/* Outer Pulsing Ping Ring */}
              <circle
                cx={aucPinX}
                cy={aucPinY}
                r={isChapterHovered ? "46" : "36"}
                className="animate-ping"
                fill="var(--gold)"
                opacity={isChapterHovered ? "0.45" : "0.25"}
              />

              {/* Status Glow Aura */}
              <circle
                cx={aucPinX}
                cy={aucPinY}
                r={isChapterHovered ? "32" : "24"}
                fill="var(--gold)"
                fillOpacity={isChapterHovered ? "0.32" : "0.2"}
                stroke="var(--gold)"
                strokeWidth={isChapterHovered ? "3.5" : "2.5"}
                className="transition-all duration-300"
              />

              {/* Core Node Circle */}
              <circle
                cx={aucPinX}
                cy={aucPinY}
                r={isChapterHovered ? "14" : "12"}
                fill="#09131F"
                stroke="var(--gold)"
                strokeWidth={isChapterHovered ? "4" : "3.5"}
                className="transition-all duration-300"
              />
              <circle
                cx={aucPinX}
                cy={aucPinY}
                r={isChapterHovered ? "6.5" : "5"}
                fill="var(--gold)"
                className="transition-all duration-300"
              />

              {/* Connected Line and Label Tag */}
              <line
                x1={aucPinX}
                y1={aucPinY}
                x2={aucPinX + 50}
                y2={aucPinY - 40}
                stroke="var(--gold)"
                strokeWidth={isChapterHovered ? "3" : "2"}
                className="transition-all duration-300"
              />

              {/* Interactive Tag Box with Pop Hover Elevation */}
              <g
                style={{
                  transform: isChapterHovered ? "translateY(-6px)" : "translateY(0)",
                  transition: "transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                <rect
                  x={aucPinX + 50}
                  y={aucPinY - 72}
                  width="380"
                  height="60"
                  rx="6"
                  fill="var(--surface)"
                  stroke={isChapterHovered ? "var(--gold)" : "var(--line)"}
                  strokeWidth={isChapterHovered ? "2.5" : "1.5"}
                  className="transition-all duration-300"
                  style={{
                    filter: isChapterHovered
                      ? "drop-shadow(0 16px 32px rgba(0,0,0,0.65)) drop-shadow(0 0 16px rgba(212,175,55,0.45))"
                      : "drop-shadow(0 4px 10px rgba(0,0,0,0.3))",
                  }}
                />

                <text
                  x={aucPinX + 66}
                  y={aucPinY - 47}
                  fill="var(--ink)"
                  fontSize="16"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  AUC Student Chapter
                </text>

                <text
                  x={aucPinX + 66}
                  y={aucPinY - 26}
                  fill="#D97706"
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  Chartered · Currently Inactive
                </text>

                {/* Pop Action CTA Badge inside Tag */}
                <g
                  style={{
                    opacity: isChapterHovered ? 1 : 0.65,
                    transition: "opacity 200ms ease",
                  }}
                >
                  <rect
                    x={aucPinX + 315}
                    y={aucPinY - 60}
                    width="100"
                    height="36"
                    rx="4"
                    fill={isChapterHovered ? "var(--gold)" : "var(--surface-raised)"}
                    stroke="var(--gold)"
                    strokeWidth="1"
                  />
                  <text
                    x={aucPinX + 365}
                    y={aucPinY - 37}
                    textAnchor="middle"
                    fill={isChapterHovered ? "#09131F" : "var(--gold)"}
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    INSPECT ↗
                  </text>
                </g>
              </g>
            </g>
          </svg>
        </div>

        {/* Map Legend and Interactive Interaction Hint */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--line-subtle)] text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amber-500/20 border border-amber-500 inline-block" />
            <span className="text-[var(--ink)] font-medium">AUC Chapter (Chartered · Currently Inactive)</span>
          </div>

          <div className="flex items-center gap-2 text-[var(--ink-faint)]">
            {zoom > 1.0 ? (
              <span className="inline-flex items-center gap-1.5 text-[var(--gold)]">
                <Move size={12} />
                <span>Drag to pan territory · Double-click to toggle view</span>
              </span>
            ) : (
              <span>Hover chapter pin to pop inspection card · Use + to zoom into Delta</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Selected Chapter Detail Card ── */}
      <div
        className={`p-6 sm:p-8 bg-[var(--surface-raised)] flex flex-col justify-between transition-all duration-300 ${
          isChapterHovered ? "ring-1 ring-[var(--gold)]/50" : ""
        }`}
      >
        <div>
          {/* Status Badge */}
          <div className="flex items-center justify-between gap-2 border-b border-[var(--line-subtle)] pb-4">
            <span className="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 inline-flex items-center gap-1.5">
              <Sparkles size={11} aria-hidden="true" />
              <span>Chartered · Currently Inactive</span>
            </span>
            <span className="text-xs font-mono text-[var(--ink-faint)]">
              New Cairo, Egypt
            </span>
          </div>

          {/* Chapter Title */}
          <h3 className="mt-4 text-xl font-bold tracking-tight text-[var(--ink)]">
            {selectedChapter?.name || "The American University in Cairo (AUC) Optica Student Chapter"}
          </h3>

          <p className="mt-1.5 text-xs font-mono text-[var(--gold)]">
            {selectedChapter?.campus || "New Cairo Campus, School of Sciences and Engineering"}
          </p>

          {/* Inactive Status Context Notice */}
          <div className="mt-4 rounded-sm border border-amber-500/30 bg-amber-500/5 p-3.5 flex items-start gap-2.5">
            <Info size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <div className="text-xs text-[var(--ink-soft)] leading-relaxed">
              <strong className="text-[var(--ink)] block font-semibold mb-0.5">
                Chapter Reactivation in Progress
              </strong>
              AUC is the only established Optica student chapter in Egypt. While campus operations are currently inactive, the Optica Egypt Local Section is actively coordinating with university leadership and students to reconstitute executive officers.
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">
            {selectedChapter?.description}
          </p>

          {/* Faculty Advisor */}
          {selectedChapter?.facultyAdvisor && (
            <div className="mt-4 pt-3 border-t border-[var(--line-subtle)] flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[var(--gold)]/10 border border-[var(--gold)]/20 text-[var(--gold)] shrink-0">
                <UserCheck size={14} />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-[var(--ink-faint)] tracking-wider">
                  Faculty Advisor:
                </span>
                <p className="font-semibold text-xs text-[var(--ink)] mt-0.5">
                  {selectedChapter.facultyAdvisor}
                </p>
                {selectedChapter.advisorDepartment && (
                  <p className="text-[11px] text-[var(--ink-soft)] mt-0.5">
                    {selectedChapter.advisorDepartment}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Core Focus Areas */}
          {selectedChapter?.focusAreas && (
            <div className="mt-4 pt-3 border-t border-[var(--line-subtle)]">
              <span className="font-mono text-[10px] uppercase text-[var(--ink-faint)] tracking-wider">
                Technical Focus Areas:
              </span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {selectedChapter.focusAreas.slice(0, 3).map((f) => (
                  <span
                    key={f}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[var(--surface)] border border-[var(--line)] text-[var(--ink-soft)]"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions and Nationwide Invitation */}
        <div className="mt-6 pt-4 border-t border-[var(--line-subtle)] space-y-3">
          <Link
            href="/chapters/auc"
            className="btn-primary w-full justify-center"
          >
            <span>Explore AUC Chapter Profile</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>

          {/* Nationwide Charter Prompt */}
          <div className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-3 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[var(--ink)]">
              <GraduationCap size={14} className="text-[var(--gold)]" />
              <span>Charter a Chapter at Your University</span>
            </div>
            <p className="text-[11px] text-[var(--ink-soft)] mt-1">
              Interested in launching a chapter at Cairo University, Ain Shams, Alexandria, or your institution?
            </p>
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--gold)] hover:underline mt-2 font-bold"
            >
              <span>Connect with Student Affairs Committee</span>
              <ArrowUpRight size={11} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
