import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Torus } from '@react-three/drei'
import * as THREE from 'three'

export const BusinessModule = () => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Fast, compounding rotation representing the business flywheel
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <group position={[4, -2, 0]}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <group ref={groupRef}>
          {/* Outer Ring */}
          <Torus args={[2, 0.2, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#f5c842" roughness={0.3} metalness={0.9} emissive="#f5c842" emissiveIntensity={0.2} />
          </Torus>
          {/* Inner Ring */}
          <Torus args={[1.2, 0.15, 16, 50]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#00e5a8" roughness={0.1} metalness={0.8} />
          </Torus>
          {/* Core */}
          <Torus args={[0.5, 0.1, 16, 30]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#6d7cff" roughness={0.1} metalness={1} emissive="#6d7cff" emissiveIntensity={0.5} />
          </Torus>
        </group>
      </Float>
    </group>
  )
}
