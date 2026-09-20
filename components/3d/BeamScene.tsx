"use client"

import React, { useRef, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { SceneWrapper } from "./SceneWrapper"

const SPECTRUM = [
  "#FF0000",
  "#FF7F00",
  "#FFFF00",
  "#00FF00",
  "#00ADEF",
  "#0000FF",
  "#4B0082",
]

function PrismMesh({ isHovered, onHover }: { isHovered: boolean; onHover: (hover: boolean) => void }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
    }
  })

  const prismGeo = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-1, -1)
    shape.lineTo(1, -1)
    shape.lineTo(0, 1.2)
    shape.closePath()

    const extrudeSettings = { depth: 1.5, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.1, bevelThickness: 0.1 }
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  return (
    <mesh
      ref={meshRef}
      geometry={prismGeo}
      position={[0, 0, -0.75]}
      onPointerOver={() => onHover(true)}
      onPointerOut={() => onHover(false)}
    >
      <meshPhysicalMaterial
        color="#F1F5F9"
        transparent
        opacity={isHovered ? 0.75 : 0.45}
        roughness={0.1}
        transmission={0.9}
        thickness={1.2}
      />
    </mesh>
  )
}

function Beams({ isDispersed }: { isDispersed: boolean }) {
  const inputLine = useMemo(() => {
    const points = [new THREE.Vector3(-6, -0.2, 0), new THREE.Vector3(-0.5, 0.1, 0)]
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    const mat = new THREE.LineBasicMaterial({ color: 0xfa8716, linewidth: 3 })
    return new THREE.Line(geo, mat)
  }, [])

  const dispersedLines = useMemo(() => {
    return SPECTRUM.map((color, i) => {
      const angle = (i - 3) * 0.12
      const endX = 6
      const endY = 0.2 + angle * 3.5
      const points = [
        new THREE.Vector3(0.5, 0.1, 0),
        new THREE.Vector3(endX, endY, (i - 3) * 0.2),
      ]
      const geo = new THREE.BufferGeometry().setFromPoints(points)
      const mat = new THREE.LineBasicMaterial({ color: new THREE.Color(color), linewidth: 2 })
      return new THREE.Line(geo, mat)
    })
  }, [])

  const straightLine = useMemo(() => {
    const points = [new THREE.Vector3(0.5, 0.1, 0), new THREE.Vector3(6, 0.1, 0)]
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    const mat = new THREE.LineBasicMaterial({ color: 0xfa8716, transparent: true, opacity: 0.6 })
    return new THREE.Line(geo, mat)
  }, [])

  return (
    <group>
      <primitive object={inputLine} />
      {isDispersed ? (
        dispersedLines.map((line, i) => (
          <primitive key={i} object={line} />
        ))
      ) : (
        <primitive object={straightLine} />
      )}
    </group>
  )
}

function BeamInteractiveScene() {
  const [isHovered, setIsHovered] = useState(true)

  return (
    <group>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 2]} intensity={1.5} />
      <PrismMesh isHovered={isHovered} onHover={setIsHovered} />
      <Beams isDispersed={isHovered} />
    </group>
  )
}

function BeamFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#000000] overflow-hidden">
      <svg className="w-full max-w-2xl h-auto" viewBox="0 0 600 240" fill="none">
        <line x1="0" y1="120" x2="250" y2="120" stroke="#fa8716" strokeWidth="3" />
        <polygon points="250,60 330,180 170,180" stroke="#fa8716" strokeWidth="2" fill="#111111" fillOpacity="0.7" />
        <line x1="290" y1="120" x2="600" y2="70" stroke="#FF0000" strokeWidth="2" />
        <line x1="290" y1="120" x2="600" y2="85" stroke="#FF7F00" strokeWidth="2" />
        <line x1="290" y1="120" x2="600" y2="100" stroke="#FFFF00" strokeWidth="2" />
        <line x1="290" y1="120" x2="600" y2="115" stroke="#00FF00" strokeWidth="2" />
        <line x1="290" y1="120" x2="600" y2="130" stroke="#00ADEF" strokeWidth="2" />
        <line x1="290" y1="120" x2="600" y2="145" stroke="#0000FF" strokeWidth="2" />
        <line x1="290" y1="120" x2="600" y2="160" stroke="#4B0082" strokeWidth="2" />
      </svg>
    </div>
  )
}

export function BeamScene({ className = "" }: { className?: string }) {
  return (
    <SceneWrapper
      fallbackSrc="/assets/photography/scene-beam-fallback.webp"
      fallbackAlt={{ en: "Laser Beamsplitter Prism 3D Scene" }}
      fallbackPlaceholder={<BeamFallback />}
      className={className}
      height="h-[260px] md:h-[320px]"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <BeamInteractiveScene />
      </Canvas>
    </SceneWrapper>
  )
}