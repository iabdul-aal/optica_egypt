"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { OpticalWaveguideDiagram } from "@/components/sections/OpticalWaveguideDiagram"

const GOLD = "#d7ae5b"
const IVORY = "#f7f2e8"

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
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.048, 8, false), [curve])
  const photon = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!photon.current) return
    const t = running ? (state.clock.getElapsedTime() * speed + offset) % 1 : offset
    photon.current.position.copy(curve.getPointAt(t))
  })

  return (
    <group>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={GOLD}
          emissive={GOLD}
          emissiveIntensity={0.22}
          metalness={0.35}
          roughness={0.36}
        />
      </mesh>
      <mesh ref={photon}>
        <sphereGeometry args={[0.11, 12, 12]} />
        <meshBasicMaterial color={IVORY} />
      </mesh>
    </group>
  )
}

function GratingCoupler({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {Array.from({ length: 7 }, (_, index) => (
        <mesh key={index} position={[(index - 3) * 0.09, 0, 0]}>
          <boxGeometry args={[0.028, 0.06, 0.54]} />
          <meshStandardMaterial color="#e6cf98" metalness={0.65} roughness={0.32} />
        </mesh>
      ))}
    </group>
  )
}

function RingResonator({
  position,
  mirrored = false,
}: {
  position: [number, number, number]
  mirrored?: boolean
}) {
  return (
    <group position={position} rotation={[Math.PI / 2, 0, mirrored ? Math.PI : 0]}>
      <mesh>
        <torusGeometry args={[0.54, 0.055, 14, 56]} />
        <meshStandardMaterial
          color="#c99d43"
          emissive="#8a6928"
          emissiveIntensity={0.2}
          metalness={0.35}
          roughness={0.38}
        />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0.68, 0, 0]}>
        <boxGeometry args={[0.58, 0.055, 0.055]} />
        <meshStandardMaterial color={GOLD} metalness={0.38} roughness={0.36} />
      </mesh>
    </group>
  )
}

function PhotonicChip({ running }: { running: boolean }) {
  return (
    <group scale={[1.25, 1.25, 1.25]}>
      {/* Silicon Substrate */}
      <mesh position={[0, -0.18, 0]}>
        <boxGeometry args={[7.6, 0.44, 4.6]} />
        <meshStandardMaterial color="#0e1316" metalness={0.72} roughness={0.28} />
      </mesh>

      {/* Cladding Oxide Interlayer */}
      <mesh position={[0, 0.07, 0]}>
        <boxGeometry args={[7.25, 0.12, 4.25]} />
        <meshStandardMaterial color="#1d2327" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Active Waveguide Core Plane */}
      <mesh position={[0, 0.14, 0]}>
        <boxGeometry args={[6.95, 0.04, 3.95]} />
        <meshStandardMaterial color="#262d31" metalness={0.45} roughness={0.42} />
      </mesh>

      {/* Gold Perimeter Ground Bars */}
      <mesh position={[0, 0.165, -1.9]}>
        <boxGeometry args={[6.8, 0.015, 0.06]} />
        <meshStandardMaterial color={GOLD} metalness={0.65} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.165, 1.9]}>
        <boxGeometry args={[6.8, 0.015, 0.06]} />
        <meshStandardMaterial color={GOLD} metalness={0.65} roughness={0.3} />
      </mesh>

      {/* Grating Couplers */}
      <GratingCoupler position={[-2.85, 0.22, -1.1]} />
      <GratingCoupler position={[2.85, 0.22, 1.1]} />
      <GratingCoupler position={[-2.85, 0.22, 1.1]} />

      {/* Optical Waveguides with Gliding Photons */}
      <LightPath
        running={running}
        offset={0.02}
        points={[
          [-2.85, 0.23, -1.1],
          [-1.5, 0.23, -1.1],
          [-0.8, 0.23, -0.35],
          [0.1, 0.23, -0.35],
          [1.0, 0.23, 0.55],
          [2.85, 0.23, 1.1],
        ]}
      />
      <LightPath
        running={running}
        offset={0.42}
        speed={0.105}
        points={[
          [-2.85, 0.23, 1.1],
          [-1.55, 0.23, 1.1],
          [-0.9, 0.23, 0.45],
          [0, 0.23, 0.45],
          [0.7, 0.23, -0.15],
          [1.65, 0.23, -0.15],
        ]}
      />
      <LightPath
        running={running}
        offset={0.72}
        speed={0.095}
        points={[
          [-1.7, 0.23, -0.35],
          [-1.25, 0.23, -0.35],
          [-0.85, 0.23, -1.02],
          [0.7, 0.23, -1.02],
          [1.5, 0.23, -0.25],
        ]}
      />

      {/* Microring Resonators */}
      <RingResonator position={[0.25, 0.27, -0.38]} />
      <RingResonator position={[1.62, 0.27, -0.17]} mirrored />

      {/* Surface Bond Pads */}
      {[-2.5, -1.95, -1.4, 1.4, 1.95, 2.5].map((x) => (
        <mesh key={x} position={[x, 0.17, 1.5]}>
          <boxGeometry args={[0.42, 0.04, 0.22]} />
          <meshStandardMaterial color="#c29a47" metalness={0.62} roughness={0.34} />
        </mesh>
      ))}
    </group>
  )
}

function HoverController({
  running,
  children,
}: {
  running: boolean
  children: React.ReactNode
}) {
  const groupRef = useRef<THREE.Group>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    const handlePointerLeave = () => {
      mouseRef.current.x = 0
      mouseRef.current.y = 0
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerleave", handlePointerLeave)
    }
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const time = running ? state.clock.getElapsedTime() : 0
    const idleFloatY = running ? Math.sin(time * 0.75) * 0.07 : 0
    const idleRotX = running ? Math.sin(time * 0.6) * 0.015 : 0
    const idleRotY = running ? Math.cos(time * 0.5) * 0.02 : 0

    const baseRotX = 0.82
    const baseRotY = -0.45
    const baseRotZ = 0.12

    const targetRotX = baseRotX - mouseRef.current.y * 0.15 + idleRotX
    const targetRotY = baseRotY + mouseRef.current.x * 0.22 + idleRotY
    const targetRotZ = baseRotZ - mouseRef.current.x * 0.05
    const targetPosX = 0.2 + mouseRef.current.x * 0.18
    const targetPosY = 0.25 + mouseRef.current.y * 0.14 + idleFloatY

    const lerpSpeed = Math.min(delta * 3.4, 0.14)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, lerpSpeed)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, lerpSpeed)
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, lerpSpeed)
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, lerpSpeed)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, lerpSpeed)
  })

  return <group ref={groupRef}>{children}</group>
}

export function PhotonicsChipScene() {
  const [interactive, setInteractive] = useState(false)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const detect = () => {
      try {
        const canvas = document.createElement("canvas")
        const supportsWebGl = Boolean(
          canvas.getContext("webgl2") ||
            canvas.getContext("webgl") ||
            canvas.getContext("experimental-webgl")
        )
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

  if (!interactive) {
    return (
      <div className="h-full flex items-center justify-center p-4 sm:p-6">
        <OpticalWaveguideDiagram />
      </div>
    )
  }

  return (
    <div
      className="photonics-viewer"
      role="img"
      aria-label="Interactive 3D Silicon Photonic Chip showing waveguides, microring resonators, and grating couplers"
    >
      <div className="viewer-stage">
        <Canvas
          className="viewer-canvas"
          camera={{ position: [0, 0, 11], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener("webglcontextlost", () => setInteractive(false), {
              once: true,
            })
          }}
        >
          <ambientLight intensity={0.78} />
          <hemisphereLight args={["#f5ead0", "#090b0c", 0.75]} />
          <directionalLight position={[4, 7, 5]} intensity={1.65} color="#f5e4c3" />
          <pointLight position={[-4, 3, 4]} intensity={1.4} color="#d4af37" distance={10} />
          <pointLight position={[3, -2, 3]} intensity={0.6} color="#f4f0e6" distance={8} />

          <HoverController running={running}>
            <PhotonicChip running={running} />
          </HoverController>
        </Canvas>
      </div>
    </div>
  )
}
