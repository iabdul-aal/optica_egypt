---
name: 3d-scene
description: >
  Contract spec and implementation guide for the three React Three Fiber scenes
  in the Optica Egypt website. Invoke when working on any WebGL, Three.js,
  R3F, shader, or animation task.
metadata:
  author: optica-egypt-local-section
  version: "1.0.0"
---

# 3D Scene Skill

## THE THREE CONTRACTUAL SCENES

These scenes are architectural requirements, not optional enhancements.
Do not remove, replace, or merge them.

### Scene A: Fiber Optic River (Homepage Hero)

Component: components/3d/FiberScene.tsx
Location: app/[locale]/page.tsx HeroSection
Interaction: mouse parallax
Post-processing: Bloom threshold=0.3 strength=1.5 + Vignette

Visual spec:
- CatmullRomCurve3 tubes rising from a low-poly pyramid base
- Gold #D4AF37 photon particles animated along tube paths
- Background particle field for depth
- Dark navy canvas #09131F

Sub-components:
  LightTube.tsx       single tube with particle instances
  PyramidBase.tsx     low-poly 3-pyramid silhouette at scene bottom
  ParticleField.tsx   background star-field particles

Mobile: static WebP fallback at public/assets/photography/scene-fiber-fallback.webp

### Scene B: Wave Interference (Homepage Strip)

Component: components/3d/WaveScene.tsx
Location: app/[locale]/page.tsx between AudienceBento and NewsFeed
Interaction: scroll-driven via GSAP ScrollTrigger
Post-processing: none (performance budget)

Visual spec:
- PlaneGeometry with custom GLSL vertex displacement shader
- Two interference sources, wave equation encoded in shader
- Gold #D4AF37 bright nodes, dark navy #09131F dark nodes
- Scroll position drives time uniform

GLSL core fragment:
  float d1 = length(uv - source1);
  float d2 = length(uv - source2);
  float wave = cos(d1 * freq - time) + cos(d2 * freq - time);
  float intensity = pow((wave + 2.0) / 4.0, 2.0);
  gl_FragColor = vec4(mix(darkColor, goldColor, intensity), 1.0);

Mobile: static WebP fallback at public/assets/photography/scene-wave-fallback.webp

### Scene C: Laser Beamsplitter (Events Page)

Component: components/3d/BeamScene.tsx
Location: app/[locale]/events/page.tsx above event filter
Interaction: hover prism mesh -> beam splits into spectrum
Post-processing: Bloom on beam lines

Visual spec:
- Input beam: gold tube entering prism from left
- Prism: glass-like mesh, thin BoxGeometry with transparency
- On hover: 7 colored Line components disperse from prism exit
- Spectrum colors: #4B0082 #00ADEF #00FF00 #FFFF00 #FF7F00 #FF0000
- Raycasting detects prism hover event

Mobile: static WebP fallback at public/assets/photography/scene-beam-fallback.webp

---

## IMPLEMENTATION RULES

### Every scene must:
1. Be wrapped in React.lazy() + Suspense with a static image fallback
2. Detect mobile (window.innerWidth < 768) and render fallback only
3. Cap devicePixelRatio at 1.5 for canvas resolution
4. Disable all animations when prefers-reduced-motion is true
5. Use useThree() hook to adapt colors when data-theme changes

### SceneWrapper.tsx contract:
props:
  fallbackSrc: string       path to static WebP fallback image
  fallbackAlt: { en: string, ar: string }
  children: ReactNode       the R3F canvas content

behavior:
  - On mount: detect mobile and prefers-reduced-motion
  - If mobile OR reduced-motion: render <img src={fallbackSrc} alt={...} />
  - Otherwise: render <Canvas> with Suspense wrapping children
  - On WebGL context loss: recover or fall back to static image

### Performance budget per scene:
  Draw calls: < 50
  Triangle count: < 100k
  JS frame budget: < 8ms (target 120fps capable)
  GPU memory: < 50MB

### GSAP ScrollTrigger integration (Scene B only):
- Register ScrollTrigger plugin in a useEffect on mount
- scrub: 1 for smooth tracking
- start: "top 80%" end: "bottom 20%"
- Update shader time uniform directly (not via React state)

### Lenis integration:
- Lenis smooth scroll must be initialized in the root layout
- All ScrollTrigger instances must use Lenis scroll proxy
- Pattern: `ScrollTrigger.scrollerProxy(lenisRef.current.wrapper, {...})`

---

## FORBIDDEN IN 3D COMPONENTS

- Using useState for per-frame animation updates (use useRef + useFrame)
- Importing Three.js directly alongside R3F (use drei utilities)
- Blocking the main thread with synchronous asset loading
- Hardcoding canvas colors (always read from CSS variables or theme context)
- Leaving a scene without a mobile/reduced-motion fallback
