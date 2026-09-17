"use client"

import React, { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { SceneWrapper } from "./SceneWrapper"

// Wave Shader Material
const WaveShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uSource1: { value: new THREE.Vector2(0.35, 0.5) },
    uSource2: { value: new THREE.Vector2(0.65, 0.5) },
    uColorDark: { value: new THREE.Color("#000000") },
    uColorGold: { value: new THREE.Color("#fa8716") },
    uColorTeal: { value: new THREE.Color("#00ADEF") },
  },
  vertexShader: `
    varying vec2 vUv;
    varying float vElevation;
    uniform float uTime;
    uniform vec2 uSource1;
    uniform vec2 uSource2;

    void main() {
      vUv = uv;
      float d1 = length(uv - uSource1) * 22.0;
      float d2 = length(uv - uSource2) * 22.0;
      float elevation = sin(d1 - uTime * 2.0) * 0.15 + sin(d2 - uTime * 2.0) * 0.15;
      vElevation = elevation;

      vec3 newPos = position + normal * elevation;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying float vElevation;
    uniform vec3 uColorDark;
    uniform vec3 uColorGold;
    uniform vec3 uColorTeal;

    void main() {
      float intensity = clamp((vElevation + 0.3) / 0.6, 0.0, 1.0);
      vec3 waveColor = mix(uColorDark, uColorGold, intensity);
      // Subtle teal rim at crests
      if (intensity > 0.8) {
        waveColor = mix(waveColor, uColorTeal, (intensity - 0.8) * 4.0);
      }
      gl_FragColor = vec4(waveColor, 0.85);
    }
  `,
}

function WaveMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSource1: { value: new THREE.Vector2(0.35, 0.5) },
      uSource2: { value: new THREE.Vector2(0.65, 0.5) },
      uColorDark: { value: new THREE.Color("#000000") },
      uColorGold: { value: new THREE.Color("#fa8716") },
      uColorTeal: { value: new THREE.Color("#00ADEF") },
    }),
    []
  )

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime() * 1.2
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[10, 6, 64, 64]} />
      <shaderMaterial
        vertexShader={WaveShaderMaterial.vertexShader}
        fragmentShader={WaveShaderMaterial.fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function WaveFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#000000] overflow-hidden">
      <svg className="w-full h-full opacity-35" viewBox="0 0 1000 400" preserveAspectRatio="none">
        {/* Concentric interference rings from two slit sources */}
        {[30, 60, 90, 120, 150, 180, 210, 240].map((r, i) => (
          <g key={i}>
            <circle cx="350" cy="200" r={r} fill="none" stroke="#fa8716" strokeWidth="1" strokeDasharray="6 6" opacity={1 - i * 0.1} />
            <circle cx="650" cy="200" r={r} fill="none" stroke="#00ADEF" strokeWidth="1" strokeDasharray="6 6" opacity={1 - i * 0.1} />
          </g>
        ))}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-transparent to-[#000000]" />
    </div>
  )
}

export function WaveScene({ className = "" }: { className?: string }) {
  return (
    <SceneWrapper
      fallbackSrc="/assets/photography/scene-wave-fallback.webp"
      fallbackAlt={{ en: "Wave Interference Pattern 3D Scene", ar: "مشهد نمط تداخل الموجات ثلاثي الأبعاد" }}
      fallbackPlaceholder={<WaveFallback />}
      className={className}
      height="h-[280px] md:h-[360px]"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <WaveMesh />
      </Canvas>
    </SceneWrapper>
  )
}