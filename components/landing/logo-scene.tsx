'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Lightformer } from '@react-three/drei'
import * as THREE from 'three'

const RIBBON_POINTS: [number, number, number][] = [
  [1.1, 1.25, 0],
  [0.2, 0.86, 0.05],
  [-0.68, 0.5, 0.15],
  [-0.95, 0.34, 0.2],
  [-0.74, 0.18, 0.15],
  [0.0, -0.06, 0],
  [0.72, -0.3, -0.15],
  [0.96, -0.46, -0.2],
  [0.74, -0.64, -0.15],
  [-0.2, -1.0, 0],
  [-1.0, -1.3, 0.05],
]

const GRADIENT_STOPS: [number, string][] = [
  [0, '#7cc8ff'],
  [0.22, '#1f5fff'],
  [0.34, '#1438d6'],
  [0.5, '#2a8cf5'],
  [0.7, '#1438d6'],
  [0.86, '#2370ff'],
  [1, '#6ec0ff'],
]

function colorAt(t: number) {
  for (let i = 0; i < GRADIENT_STOPS.length - 1; i++) {
    const [t0, c0] = GRADIENT_STOPS[i]
    const [t1, c1] = GRADIENT_STOPS[i + 1]
    if (t >= t0 && t <= t1) {
      return new THREE.Color(c0).lerp(new THREE.Color(c1), (t - t0) / (t1 - t0))
    }
  }
  return new THREE.Color(GRADIENT_STOPS[GRADIENT_STOPS.length - 1][1])
}

function Ribbon() {
  const { geometry, start, end, startColor, endColor } = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      RIBBON_POINTS.map((p) => new THREE.Vector3(...p)),
      false,
      'catmullrom',
      0.5,
    )
    const tubularSegments = 240
    const radialSegments = 40
    const geo = new THREE.TubeGeometry(curve, tubularSegments, 0.27, radialSegments, false)
    const colors: number[] = []
    const uv = geo.attributes.uv
    for (let i = 0; i < uv.count; i++) {
      const c = colorAt(uv.getX(i))
      colors.push(c.r, c.g, c.b)
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    return {
      geometry: geo,
      start: curve.getPoint(0),
      end: curve.getPoint(1),
      startColor: colorAt(0),
      endColor: colorAt(1),
    }
  }, [])

  return (
    <group>
      <mesh geometry={geometry} castShadow>
        <meshPhysicalMaterial vertexColors roughness={0.22} metalness={0.05} clearcoat={1} clearcoatRoughness={0.15} />
      </mesh>
      <mesh position={start}>
        <sphereGeometry args={[0.27, 40, 40]} />
        <meshPhysicalMaterial color={startColor} roughness={0.22} clearcoat={1} />
      </mesh>
      <mesh position={end}>
        <sphereGeometry args={[0.27, 40, 40]} />
        <meshPhysicalMaterial color={endColor} roughness={0.22} clearcoat={1} />
      </mesh>
    </group>
  )
}

function EmeraldDot() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.position.y = 1.62 + Math.sin(t * 1.6) * 0.06
  })
  return (
    <group>
      <mesh ref={ref} position={[1.48, 1.62, 0.15]}>
        <sphereGeometry args={[0.3, 48, 48]} />
        <meshPhysicalMaterial color="#12c98b" roughness={0.18} clearcoat={1} emissive="#0a7a55" emissiveIntensity={0.15} />
      </mesh>
    </group>
  )
}

function DataOrbit() {
  const ref = useRef<THREE.Group>(null)
  const nodes = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => {
        const angle = (i / 9) * Math.PI * 2
        const colors = ['#286bff', '#08b8d4', '#12c98b']
        return {
          position: [Math.cos(angle) * 2.05, Math.sin(angle) * 2.05, 0] as [number, number, number],
          color: colors[i % 3],
          size: i % 3 === 0 ? 0.075 : 0.05,
        }
      }),
    [],
  )
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.18
  })
  return (
    <group rotation={[1.15, 0.25, 0]}>
      <mesh>
        <torusGeometry args={[2.05, 0.006, 8, 160]} />
        <meshBasicMaterial color="#286bff" transparent opacity={0.28} />
      </mesh>
      <group ref={ref}>
        {nodes.map((n, i) => (
          <mesh key={i} position={n.position}>
            <sphereGeometry args={[n.size, 20, 20]} />
            <meshStandardMaterial color={n.color} emissive={n.color} emissiveIntensity={0.4} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function Rig({ interactive }: { interactive: boolean }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ pointer, clock }, delta) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    const targetY = interactive ? pointer.x * 0.55 : Math.sin(t * 0.4) * 0.3
    const targetX = interactive ? -pointer.y * 0.35 : Math.cos(t * 0.3) * 0.12
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, targetY - 0.15, 4, delta)
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, targetX, 4, delta)
  })
  return (
    <group ref={ref}>
      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.6}>
        <Ribbon />
        <EmeraldDot />
      </Float>
      <DataOrbit />
    </group>
  )
}

export default function LogoScene({ interactive = true }: { interactive?: boolean }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7.6], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <directionalLight position={[-4, -2, 2]} intensity={0.5} color="#9cc3ff" />
      <Rig interactive={interactive} />
      <ContactShadows position={[0, -2.25, 0]} opacity={0.28} scale={7} blur={2.6} far={4} color="#1438d6" />
      <Environment resolution={256}>
        <Lightformer intensity={2} position={[0, 4, 3]} scale={[8, 2, 1]} />
        <Lightformer intensity={1.2} position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} color="#cfe0ff" />
        <Lightformer intensity={1.2} position={[5, 1, 2]} rotation-y={-Math.PI / 2} scale={[6, 2, 1]} />
        <Lightformer intensity={0.6} position={[0, -4, 2]} rotation-x={Math.PI / 2} scale={[8, 2, 1]} color="#e8f3ff" />
      </Environment>
    </Canvas>
  )
}
