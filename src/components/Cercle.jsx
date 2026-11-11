import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import StaticOrb from './StaticOrb'

const vertexShader = /* glsl */ `
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;

  float field(vec3 p, float t) {
    return sin(p.x * 1.9 + t * 0.42)
         * sin(p.y * 2.2 - t * 0.34)
         * sin(p.z * 2.5 + t * 0.50);
  }

  float noise(vec3 p, float t) {
    return field(p, t) * 0.62
         + field(p * 1.9 + vec3(1.3, 2.7, 0.9), t * 1.20) * 0.27
         + field(p * 3.4 + vec3(4.1, 0.6, 2.3), t * 1.70) * 0.11;
  }

  void main() {
    vec3 pos = position;

    // Domain-warped, multi-octave displacement: soft molten lobes instead of spikes.
    float base = noise(pos, uTime);
    float warp = noise(pos * 0.65 + vec3(uTime * 0.05), uTime * 0.6);
    float disp = base * 0.060 + warp * 0.032;

    vDisp = disp;
    pos += normal * disp;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

const fragmentShader = /* glsl */ `
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vView);

    float fres = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 2.4);
    float vertical = n.y * 0.5 + 0.5;

    vec3 plum      = vec3(0.11, 0.07, 0.15);
    vec3 deepBrown = vec3(0.19, 0.12, 0.09);
    vec3 cocoa     = vec3(0.44, 0.28, 0.19);
    vec3 violet    = vec3(0.46, 0.29, 0.74);
    vec3 lilac     = vec3(0.84, 0.73, 1.00);
    vec3 sage      = vec3(0.43, 0.68, 0.51);

    // Warm brown belly, plum-shadow crown.
    vec3 col = mix(deepBrown, cocoa, smoothstep(0.02, 0.55, vertical));
    col = mix(col, plum, smoothstep(0.55, 1.0, vertical) * 0.65);

    // Violet lobe rolling across the lit hemisphere.
    float violetMask = smoothstep(-0.35, 0.85, n.x + n.y * 0.25);
    col = mix(col, violet, violetMask * 0.85);

    // Sage bloom underneath, mirroring the forest accents in the layout.
    float sageMask = smoothstep(0.15, 1.0, 0.5 - n.y * 0.5) * smoothstep(-0.25, 0.9, -n.x);
    col = mix(col, sage, sageMask * 0.62);

    // Ridges catch more light than troughs.
    col = mix(col, lilac, smoothstep(0.015, 0.095, vDisp) * 0.38);

    vec3 lightDir = normalize(vec3(-0.50, 0.90, 0.85));
    vec3 fillDir = normalize(vec3(0.72, -0.35, 0.50));
    float diff = clamp(dot(n, lightDir), 0.0, 1.0);
    float fill = clamp(dot(n, fillDir), 0.0, 1.0);
    col *= 0.56 + 0.76 * diff;
    col += sage * fill * 0.07;

    vec3 halfVec = normalize(lightDir + v);
    float spec = pow(clamp(dot(n, halfVec), 0.0, 1.0), 160.0);
    col += vec3(1.00, 0.97, 0.92) * spec * 0.60;

    float sheen = pow(clamp(dot(n, halfVec), 0.0, 1.0), 8.0);
    col += vec3(0.95, 0.86, 1.00) * sheen * 0.16;

    // Iridescent rim: violet at the top, sage at the bottom.
    vec3 rim = mix(vec3(0.74, 0.64, 1.00), vec3(0.62, 0.87, 0.72), 0.5 - n.y * 0.5);
    col += rim * fres * 0.95;

    gl_FragColor = vec4(col, 1.0);
  }
`

const haloVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

const haloFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;

  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vView);
    float rim = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 4.6);
    gl_FragColor = vec4(uColor * rim * uIntensity, rim * uIntensity);
  }
`

function Orb({ pointerRef, segments }) {
  const group = useRef(null)
  const ringA = useRef(null)
  const ringB = useRef(null)
  const ringC = useRef(null)
  const ringD = useRef(null)

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])
  const haloUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color('#bda3ff') },
      uIntensity: { value: 0.55 },
    }),
    [],
  )

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    uniforms.uTime.value = t

    const pointer = pointerRef.current
    const g = group.current

    if (g) {
      const damp = Math.min(1, delta * 2.4)
      const targetY = t * 0.1 + pointer.x * 0.36
      const targetX = -0.08 + pointer.y * 0.2
      g.rotation.y += (targetY - g.rotation.y) * damp
      g.rotation.x += (targetX - g.rotation.x) * damp

      const scroll = Math.min(window.scrollY, 1400)
      const bob = Math.sin(t * 0.55) * 0.035
      g.position.y = scroll * 0.0007 + bob

      const breathe = 1 + Math.sin(t * 0.42) * 0.012
      g.scale.setScalar(Math.max(0.82, 1 - scroll * 0.00006) * breathe)
    }

    if (ringA.current) {
      ringA.current.rotation.z = 0.5 + t * 0.22
      ringA.current.rotation.x = 1.25 + Math.sin(t * 0.24) * 0.12
    }
    if (ringB.current) {
      ringB.current.rotation.z = -0.6 - t * 0.13
      ringB.current.rotation.y = -0.35 + Math.cos(t * 0.19) * 0.14
    }
    if (ringC.current) {
      ringC.current.rotation.z = 1.1 - t * 0.08
      ringC.current.rotation.x = 1.35 + Math.cos(t * 0.17) * 0.16
    }
    if (ringD.current) {
      ringD.current.rotation.z = -1.2 + t * 0.06
      ringD.current.rotation.y = 0.6 + Math.sin(t * 0.14) * 0.12
    }
  })

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1, segments, segments]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>

      {/* Additive fresnel shell — a soft aura hugging the silhouette. */}
      <mesh scale={1.16}>
        <sphereGeometry args={[1, 48, 48]} />
        <shaderMaterial
          vertexShader={haloVertexShader}
          fragmentShader={haloFragmentShader}
          uniforms={haloUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      <group ref={ringA} rotation={[1.25, 0.15, 0.5]}>
        <mesh>
          <torusGeometry args={[1.42, 0.0045, 8, 240]} />
          <meshBasicMaterial color="#bda3ff" transparent opacity={0.7} />
        </mesh>
        <mesh position={[1.42, 0, 0]}>
          <sphereGeometry args={[0.024, 12, 12]} />
          <meshBasicMaterial color="#eadcff" />
        </mesh>
      </group>

      <group ref={ringB} rotation={[1.45, -0.35, -0.6]}>
        <mesh>
          <torusGeometry args={[1.66, 0.0035, 8, 240]} />
          <meshBasicMaterial color="#a8cfb4" transparent opacity={0.45} />
        </mesh>
        <mesh position={[-1.66, 0, 0]}>
          <sphereGeometry args={[0.018, 10, 10]} />
          <meshBasicMaterial color="#c8efd4" />
        </mesh>
      </group>

      <group ref={ringC} rotation={[1.35, 0.1, 1.1]}>
        <mesh>
          <torusGeometry args={[1.27, 0.0028, 8, 220]} />
          <meshBasicMaterial color="#fdf6ea" transparent opacity={0.26} />
        </mesh>
      </group>

      <group ref={ringD} rotation={[1.05, 0.6, -1.2]}>
        <mesh>
          <torusGeometry args={[1.92, 0.0022, 8, 260]} />
          <meshBasicMaterial color="#f0b978" transparent opacity={0.22} />
        </mesh>
        <mesh position={[0, 1.92, 0]}>
          <sphereGeometry args={[0.016, 10, 10]} />
          <meshBasicMaterial color="#f7d3a1" />
        </mesh>
      </group>
    </group>
  )
}

/**
 * The site's single 3D moment: a slow, iridescent sphere circled by thin rings —
 * a nod to "Cercle Français". It degrades to a static CSS orb when WebGL is
 * unavailable or the visitor prefers reduced motion, and stops rendering when
 * it leaves the viewport.
 */
export default function Cercle({ className = '' }) {
  const wrapRef = useRef(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const [mode, setMode] = useState('static')
  const [active, setActive] = useState(true)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let webgl = false
    try {
      const probe = document.createElement('canvas')
      webgl = Boolean(
        window.WebGLRenderingContext &&
          (probe.getContext('webgl2') || probe.getContext('webgl')),
      )
    } catch {
      webgl = false
    }

    setMode(!reduceMotion && webgl ? 'live' : 'static')
  }, [])

  useEffect(() => {
    if (mode !== 'live') return

    const onPointerMove = (event) => {
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointerRef.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [mode])

  useEffect(() => {
    const el = wrapRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.05 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const segments = window.innerWidth < 720 ? 96 : 160

  return (
    <div ref={wrapRef} className={`relative ${className}`} aria-hidden="true">
      <div className="absolute inset-[12%] rounded-full bg-violet/30 blur-[70px]" />
      <div className="absolute inset-[30%] rounded-full bg-forest/30 blur-[60px]" />
      <div className="absolute inset-[42%] rounded-full bg-honey/[0.14] blur-[55px]" />

      {mode === 'live' ? (
        <Canvas
          dpr={[1, 1.75]}
          frameloop={active ? 'always' : 'never'}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0, 4.4], fov: 36 }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping
            gl.toneMappingExposure = 1.05
          }}
        >
          <Suspense fallback={null}>
            <Orb pointerRef={pointerRef} segments={segments} />
          </Suspense>
        </Canvas>
      ) : (
        <StaticOrb />
      )}
    </div>
  )
}
