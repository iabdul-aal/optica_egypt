"use client"

import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"
import { Maximize2, Pause, Play, RotateCcw } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import type { Dictionary, Locale } from "@/lib/locales"

const gold = "#d7ae5b"
const ivory = "#f7f2e8"

type LightPathProps = {
  points: [number, number, number][]
  offset: number
  speed?: number
  running: boolean
}

function LightPath({ points, offset, speed = 0.13, running }: LightPathProps) {
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z))),
    [points]
  )
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 80, 0.045, 8, false), [curve])
  const photon = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!photon.current) return
    const t = running ? (state.clock.getElapsedTime() * speed + offset) % 1 : offset
    photon.current.position.copy(curve.getPointAt(t))
  })

  return (
    <group>
      <mesh geometry={geometry}>
        <meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={0.12} metalness={0.25} roughness={0.42} />
      </mesh>
      <mesh ref={photon}>
        <sphereGeometry args={[0.1, 14, 14]} />
        <meshBasicMaterial color={ivory} />
      </mesh>
    </group>
  )
}

function GratingCoupler({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {Array.from({ length: 7 }, (_, index) => (
        <mesh key={index} position={[(index - 3) * 0.09, 0, 0]}>
          <boxGeometry args={[0.025, 0.055, 0.52]} />
          <meshStandardMaterial color="#e6cf98" metalness={0.6} roughness={0.36} />
        </mesh>
      ))}
    </group>
  )
}

function RingResonator({ position, mirrored = false }: { position: [number, number, number]; mirrored?: boolean }) {
  return (
    <group position={position} rotation={[Math.PI / 2, 0, mirrored ? Math.PI : 0]}>
      <mesh>
        <torusGeometry args={[0.53, 0.055, 12, 64]} />
        <meshStandardMaterial color="#c99d43" emissive="#8a6928" emissiveIntensity={0.16} metalness={0.28} roughness={0.42} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0.68, 0, 0]}>
        <boxGeometry args={[0.58, 0.055, 0.055]} />
        <meshStandardMaterial color={gold} metalness={0.32} roughness={0.4} />
      </mesh>
    </group>
  )
}

function PhotonicChip({ running }: { running: boolean }) {
  return (
    <group rotation={[-0.2, 0.18, 0]}>
      <mesh position={[0, -0.12, 0]}>
        <boxGeometry args={[7.1, 0.32, 4.15]} />
        <meshStandardMaterial color="#101417" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.07, 0]}>
        <boxGeometry args={[6.8, 0.08, 3.84]} />
        <meshStandardMaterial color="#252a2c" metalness={0.42} roughness={0.46} />
      </mesh>

      <GratingCoupler position={[-2.82, 0.18, -1.1]} />
      <GratingCoupler position={[2.82, 0.18, 1.1]} />
      <GratingCoupler position={[-2.82, 0.18, 1.1]} />

      <LightPath running={running} offset={0.02} points={[[-2.85, 0.2, -1.1], [-1.5, 0.2, -1.1], [-0.8, 0.2, -0.35], [0.1, 0.2, -0.35], [1.0, 0.2, 0.55], [2.84, 0.2, 1.1]]} />
      <LightPath running={running} offset={0.42} speed={0.105} points={[[-2.85, 0.2, 1.1], [-1.55, 0.2, 1.1], [-0.9, 0.2, 0.45], [0, 0.2, 0.45], [0.7, 0.2, -0.15], [1.65, 0.2, -0.15]]} />
      <LightPath running={running} offset={0.72} speed={0.095} points={[[-1.7, 0.2, -0.35], [-1.25, 0.2, -0.35], [-0.85, 0.2, -1.02], [0.7, 0.2, -1.02], [1.5, 0.2, -0.25]]} />

      <RingResonator position={[0.25, 0.23, -0.38]} />
      <RingResonator position={[1.62, 0.23, -0.17]} mirrored />

      {[-2.2, -1.75, 2.15].map((x) => (
        <mesh key={x} position={[x, 0.17, 1.45]}>
          <boxGeometry args={[0.52, 0.05, 0.22]} />
          <meshStandardMaterial color="#5e573f" metalness={0.55} roughness={0.4} />
        </mesh>
      ))}
    </group>
  )
}

function ChipCanvas({ running, resetVersion, onContextLost }: { running: boolean; resetVersion: number; onContextLost: () => void }) {
  const controls = useRef<OrbitControlsImpl>(null)

  useEffect(() => {
    controls.current?.reset()
  }, [resetVersion])

  return (
    <Canvas
      className="viewer-canvas"
      camera={{ position: [0, 3.25, 9.2], fov: 38 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", onContextLost, { once: true })
      }}
    >
      <color attach="background" args={["#090c0d"]} />
      <ambientLight intensity={0.7} />
      <hemisphereLight args={["#f5ead0", "#090b0c", 0.68]} />
      <directionalLight position={[4, 5, 5]} intensity={1.42} color="#f1dfbb" />
      <pointLight position={[-4, 1, 3]} intensity={1.25} color="#c89739" distance={8} />
      <pointLight position={[3, 1, -4]} intensity={0.45} color="#f4f0e6" distance={7} />
      <PhotonicChip running={running} />
      <OrbitControls
        ref={controls}
        enablePan={false}
        enableDamping
        dampingFactor={0.07}
        minDistance={5.8}
        maxDistance={13}
        minPolarAngle={0.45}
        maxPolarAngle={2.35}
        target={[0, 0, 0]}
      />
    </Canvas>
  )
}

function TextualFallback({ dictionary }: { dictionary: Dictionary }) {
  return (
    <div className="viewer-fallback" role="img" aria-label={dictionary.viewer.summary}>
      <span className="viewer-fallback-index">PIC / CONCEPTUAL</span>
      <strong>Guided paths<br />Resonant rings<br />Coupling interfaces</strong>
      <span>{dictionary.viewer.fallback}</span>
    </div>
  )
}

type PhotonicsChipSceneProps = {
  locale: Locale
  dictionary: Dictionary
  className?: string
}

export function PhotonicsChipScene({ locale, dictionary, className = "" }: PhotonicsChipSceneProps) {
  const [interactive, setInteractive] = useState(false)
  const [running, setRunning] = useState(true)
  const [resetVersion, setResetVersion] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const detect = () => {
      try {
        const canvas = document.createElement("canvas")
        const supportsWebGl = Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
        setInteractive(supportsWebGl)
        setRunning(!media.matches)
      } catch {
        setInteractive(false)
      }
    }

    detect()
    media.addEventListener("change", detect)
    return () => media.removeEventListener("change", detect)
  }, [])

  useEffect(() => {
    const updateFullscreen = () => setFullscreen(document.fullscreenElement === sceneRef.current)
    document.addEventListener("fullscreenchange", updateFullscreen)
    return () => document.removeEventListener("fullscreenchange", updateFullscreen)
  }, [])

  async function toggleFullscreen() {
    if (!sceneRef.current) return
    if (document.fullscreenElement) {
      await document.exitFullscreen()
      return
    }
    await sceneRef.current.requestFullscreen?.()
  }

  const summaryId = `viewer-summary-${locale}`

  return (
    <div ref={sceneRef} className={`photonics-viewer ${className}`} aria-label={dictionary.viewer.label}>
      <div className="viewer-stage" aria-describedby={summaryId}>
        {interactive ? <ChipCanvas running={running} resetVersion={resetVersion} onContextLost={() => setInteractive(false)} /> : <TextualFallback dictionary={dictionary} />}
      </div>
      <div className="viewer-tools" aria-label={dictionary.viewer.label}>
        <p className="viewer-hint">{interactive ? dictionary.viewer.hint : dictionary.viewer.fallback}</p>
        {interactive && (
          <div className="viewer-actions">
            <button type="button" className="viewer-control" onClick={() => setResetVersion((value) => value + 1)} aria-label={dictionary.viewer.reset} title={dictionary.viewer.reset}>
              <RotateCcw size={16} aria-hidden="true" />
            </button>
            <button type="button" className="viewer-control" onClick={() => setRunning((value) => !value)} aria-label={running ? dictionary.viewer.pause : dictionary.viewer.resume} title={running ? dictionary.viewer.pause : dictionary.viewer.resume}>
              {running ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
            </button>
            <button type="button" className="viewer-control" onClick={toggleFullscreen} aria-label={fullscreen ? dictionary.viewer.exitFullscreen : dictionary.viewer.fullscreen} title={fullscreen ? dictionary.viewer.exitFullscreen : dictionary.viewer.fullscreen}>
              <Maximize2 size={16} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      <p id={summaryId} className="sr-only">{dictionary.viewer.summary}</p>
    </div>
  )
}
