"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { type MutableRefObject, useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"

const gold = "#d1a247"
const ivory = "#f3efe7"

type LightPathProps = {
  points: [number, number, number][]
  offset: number
  speed?: number
}

function LightPath({ points, offset, speed = 0.13 }: LightPathProps) {
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z))),
    [points]
  )
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 80, 0.055, 8, false), [curve])
  const photon = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (photon.current) {
      const t = (state.clock.getElapsedTime() * speed + offset) % 1
      photon.current.position.copy(curve.getPointAt(t))
    }
  })

  return (
    <group>
      <mesh geometry={geometry}>
        <meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={0.18} metalness={0.25} roughness={0.42} />
      </mesh>
      <mesh ref={photon}>
        <sphereGeometry args={[0.115, 16, 16]} />
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
          <meshStandardMaterial color="#d8c694" metalness={0.72} roughness={0.34} />
        </mesh>
      ))}
    </group>
  )
}

function RingResonator({ position, mirrored = false }: { position: [number, number, number]; mirrored?: boolean }) {
  return (
    <group position={position} rotation={[Math.PI / 2, 0, mirrored ? Math.PI : 0]}>
      <mesh>
        <torusGeometry args={[0.53, 0.06, 12, 64]} />
        <meshStandardMaterial color="#c99d43" emissive="#8a6928" emissiveIntensity={0.17} metalness={0.33} roughness={0.4} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0.68, 0, 0]}>
        <boxGeometry args={[0.58, 0.06, 0.06]} />
        <meshStandardMaterial color="#d1a247" metalness={0.32} roughness={0.4} />
      </mesh>
    </group>
  )
}

function PhotonicChip({ orbit, isInspecting }: { orbit: MutableRefObject<number>; isInspecting: boolean }) {
  const rig = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!rig.current) return
    const targetY = orbit.current + (isInspecting ? state.pointer.x * 0.05 : 0)
    const targetX = (isInspecting ? -state.pointer.y * 0.11 : 0) - 0.2
    rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, targetY, 0.035)
    rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, targetX, 0.035)
  })

  return (
    <group ref={rig} rotation={[-0.2, 0.18, 0]}>
      <mesh position={[0, -0.12, 0]}>
        <boxGeometry args={[7.1, 0.32, 4.15]} />
        <meshStandardMaterial color="#111519" metalness={0.72} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.07, 0]}>
        <boxGeometry args={[6.8, 0.08, 3.84]} />
        <meshStandardMaterial color="#252a2c" metalness={0.46} roughness={0.45} />
      </mesh>

      <GratingCoupler position={[-2.82, 0.18, -1.1]} />
      <GratingCoupler position={[2.82, 0.18, 1.1]} />
      <GratingCoupler position={[-2.82, 0.18, 1.1]} />

      <LightPath offset={0.02} points={[[-2.85, 0.2, -1.1], [-1.5, 0.2, -1.1], [-0.8, 0.2, -0.35], [0.1, 0.2, -0.35], [1.0, 0.2, 0.55], [2.84, 0.2, 1.1]]} />
      <LightPath offset={0.42} speed={0.105} points={[[-2.85, 0.2, 1.1], [-1.55, 0.2, 1.1], [-0.9, 0.2, 0.45], [0, 0.2, 0.45], [0.7, 0.2, -0.15], [1.65, 0.2, -0.15]]} />
      <LightPath offset={0.72} speed={0.095} points={[[-1.7, 0.2, -0.35], [-1.25, 0.2, -0.35], [-0.85, 0.2, -1.02], [0.7, 0.2, -1.02], [1.5, 0.2, -0.25]]} />

      <RingResonator position={[0.25, 0.23, -0.38]} />
      <RingResonator position={[1.62, 0.23, -0.17]} mirrored />

      {[-2.2, -1.75, 2.15].map((x) => (
        <mesh key={x} position={[x, 0.17, 1.45]}>
          <boxGeometry args={[0.52, 0.05, 0.22]} />
          <meshStandardMaterial color="#5e573f" metalness={0.62} roughness={0.37} />
        </mesh>
      ))}
    </group>
  )
}

function ChipCanvas({ orbit, isInspecting }: { orbit: MutableRefObject<number>; isInspecting: boolean }) {
  return (
    <Canvas camera={{ position: [0, 3.25, 9.2], fov: 38 }} dpr={[1, 1.45]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <color attach="background" args={["#080a0b"]} />
      <ambientLight intensity={0.75} />
      <hemisphereLight args={["#f5ead0", "#090b0c", 0.72]} />
      <directionalLight position={[4, 5, 5]} intensity={1.55} color="#f1dfbb" />
      <pointLight position={[-4, 1, 3]} intensity={1.6} color="#c89739" distance={8} />
      <pointLight position={[3, 1, -4]} intensity={0.55} color="#f4f0e6" distance={7} />
      <PhotonicChip orbit={orbit} isInspecting={isInspecting} />
    </Canvas>
  )
}

export function PhotonicsChipFallback({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-[#080a0b] ${className}`} aria-hidden="true">
      <svg viewBox="0 0 900 560" className="h-full w-full" fill="none" preserveAspectRatio="xMidYMid slice">
        <rect x="113" y="118" width="674" height="334" rx="5" fill="#121719" stroke="#61635f" />
        <rect x="132" y="137" width="636" height="296" fill="#1d2223" stroke="#333a3a" />
        <path d="M154 211H334C372 211 371 291 408 291H506C540 291 540 350 598 350H743" stroke="#d1a247" strokeWidth="8" />
        <path d="M154 353H296C342 353 342 287 385 287H462C505 287 505 238 565 238H743" stroke="#c0933b" strokeWidth="8" opacity="0.85" />
        <circle cx="488" cy="292" r="54" stroke="#d1a247" strokeWidth="8" />
        <circle cx="599" cy="239" r="54" stroke="#d1a247" strokeWidth="8" />
        {[184, 194, 204, 214, 224, 234, 244].map((x) => <path key={x} d={`M${x} 189v44`} stroke="#dfca99" strokeWidth="4" />)}
        {[658, 668, 678, 688, 698, 708, 718].map((x) => <path key={x} d={`M${x} 329v44`} stroke="#dfca99" strokeWidth="4" />)}
        <circle cx="280" cy="211" r="9" fill="#f3efe7" />
        <circle cx="525" cy="291" r="9" fill="#f3efe7" />
      </svg>
      <div className="scientific-grid absolute inset-0 opacity-40" />
    </div>
  )
}

export function PhotonicsChipScene({ className = "" }: { className?: string }) {
  const [render3D, setRender3D] = useState(false)
  const [isInspecting, setIsInspecting] = useState(false)
  const orbit = useRef(0.18)

  useEffect(() => {
    const supportsReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const desktop = window.matchMedia("(min-width: 768px)").matches
    let webgl = false
    try {
      const canvas = document.createElement("canvas")
      webgl = Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    } catch {
      webgl = false
    }
    setRender3D(desktop && webgl && !supportsReducedMotion)
  }, [])

  return (
    <div
      className={`h-full w-full ${render3D ? "cursor-ew-resize" : ""} ${className}`}
      aria-label={render3D ? "Interactive 3D integrated photonics chip. Move the pointer horizontally to rotate the model." : "Integrated photonics chip schematic."}
      onPointerEnter={() => setIsInspecting(true)}
      onPointerLeave={() => setIsInspecting(false)}
      onPointerMove={(event) => {
        if (render3D) orbit.current += event.movementX * 0.009
      }}
    >
      {render3D ? <ChipCanvas orbit={orbit} isInspecting={isInspecting} /> : <PhotonicsChipFallback />}
    </div>
  )
}
