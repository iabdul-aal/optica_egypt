"use client"

import React, { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { SceneWrapper } from "./SceneWrapper"

// Single fiber optic light tube
function LightTube({ curve, color = "#fa8716", speed = 1, offset = 0 }: { curve: THREE.CatmullRomCurve3; color?: string; speed?: number; offset?: number }) {
  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.04, 8, false), [curve])
  const photonRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (photonRef.current) {
      const t = ((state.clock.getElapsedTime() * 0.25 * speed + offset) % 1)
      const point = curve.getPointAt(t)
      photonRef.current.position.copy(point)
    }
  })

  return (
    <group>
      {/* Semi-transparent guiding tube */}
      <mesh geometry={tubeGeo}>
        <meshBasicMaterial color={color} transparent opacity={0.35} wireframe={false} />
      </mesh>

      {/* Moving photon particle */}
      <mesh ref={photonRef}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#00ADEF" />
      </mesh>
    </group>
  )
}

// Low-poly pyramid silhouette representing Egyptian heritage at scene base
function PyramidBase() {
  const geom = useMemo(() => new THREE.ConeGeometry(3.5, 2.5, 4), [])
  return (
    <mesh geometry={geom} position={[0, -4, -2]} rotation={[0, Math.PI / 4, 0]}>
      <meshBasicMaterial color="#fa8716" wireframe transparent opacity={0.2} />
    </mesh>
  )
}

// Background photon / star field
function ParticleField({ count = 150 }: { count?: number }) {
  const points = useMemo(() => {
    const coords = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 30
      coords[i * 3 + 1] = (Math.random() - 0.5) * 20
      coords[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return coords
  }, [count])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#00ADEF" transparent opacity={0.6} />
    </points>
  )
}

// Main interactive cluster
function FiberCluster() {
  const groupRef = useRef<THREE.Group>(null)

  // Generate 5 distinct CatmullRom curves emerging like an optic river
  const curves = useMemo(() => {
    return [
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-4, -4, 0),
        new THREE.Vector3(-2, -1, 2),
        new THREE.Vector3(-1, 2, -1),
        new THREE.Vector3(-3, 5, 1),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -4, -1),
        new THREE.Vector3(-0.5, -1, 1),
        new THREE.Vector3(0.5, 1.5, 0),
        new THREE.Vector3(0, 5, -2),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(4, -4, 0),
        new THREE.Vector3(2, -1, 2),
        new THREE.Vector3(1, 2, -1),
        new THREE.Vector3(3, 5, 1),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2, -4, -2),
        new THREE.Vector3(0, 0, 2),
        new THREE.Vector3(2, 3, 0),
        new THREE.Vector3(1, 6, -1),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(2, -4, -2),
        new THREE.Vector3(0, 0, -2),
        new THREE.Vector3(-2, 3, 0),
        new THREE.Vector3(-1, 6, -1),
      ]),
    ]
  }, [])

  // Subtle mouse parallax
  useFrame((state) => {
    if (groupRef.current) {
      const targetX = (state.pointer.x * 0.8)
      const targetY = (state.pointer.y * 0.4)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05)
    }
  })

  return (
    <group ref={groupRef}>
      <PyramidBase />
      <ParticleField />
      {curves.map((curve, idx) => (
        <LightTube
          key={idx}
          curve={curve}
          color={idx % 2 === 0 ? "#fa8716" : "#00ADEF"}
          speed={1 + idx * 0.2}
          offset={idx * 0.2}
        />
      ))}
    </group>
  )
}

// Fallback Graphic when 3D is disabled or loading
function FiberFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#000000] overflow-hidden">
      {/* Geometric laser / optical river SVG illustration */}
      <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 100 600 Q 300 350 400 300 T 700 0" stroke="url(#laserGold)" strokeWidth="3" fill="none" />
        <path d="M 200 600 Q 350 400 400 300 T 600 0" stroke="url(#laserTeal)" strokeWidth="2" fill="none" />
        <path d="M 600 600 Q 450 350 400 300 T 200 0" stroke="url(#laserGold)" strokeWidth="2.5" fill="none" />
        <path d="M 700 600 Q 500 400 400 300 T 100 0" stroke="url(#laserTeal)" strokeWidth="3" fill="none" />
        
        {/* Pyramid Silhouette */}
        <polygon points="400,280 480,480 320,480" stroke="#fa8716" strokeWidth="1.5" fill="none" opacity="0.5" />
        <polygon points="340,340 400,480 280,480" stroke="#fa8716" strokeWidth="1" fill="none" opacity="0.3" />
        <polygon points="460,340 520,480 400,480" stroke="#fa8716" strokeWidth="1" fill="none" opacity="0.3" />

        <defs>
          <linearGradient id="laserGold" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="50%" stopColor="#fa8716" stopOpacity="1" />
            <stop offset="100%" stopColor="#00ADEF" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="laserTeal" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="50%" stopColor="#00ADEF" stopOpacity="1" />
            <stop offset="100%" stopColor="#fa8716" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent" />
    </div>
  )
}

export function FiberScene({ className = "" }: { className?: string }) {
  return (
    <SceneWrapper
      fallbackSrc="/assets/photography/scene-fiber-fallback.webp"
      fallbackAlt={{ en: "Fiber Optic River 3D Scene" }}
      fallbackPlaceholder={<FiberFallback />}
      className={className}
      height="h-full min-h-[420px]"
    >
      <Canvas
        camera={{ position: [0, 0, 11], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#fa8716" />
        <pointLight position={[-5, -5, 5]} intensity={1.5} color="#00ADEF" />
        <FiberCluster />
      </Canvas>
    </SceneWrapper>
  )
}