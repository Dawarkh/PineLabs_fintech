import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sphere } from '@react-three/drei'
import * as THREE from 'three'

export const GeographyModule = () => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group position={[0, 5, 0]}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <group ref={groupRef}>
          {/* Abstract Wireframe Globe */}
          <Sphere args={[2, 32, 32]}>
            <meshStandardMaterial color="#00e5a8" roughness={0.4} metalness={0.6} wireframe />
          </Sphere>
          
          {/* Inner solid core */}
          <Sphere args={[1.9, 32, 32]}>
            <meshStandardMaterial color="#111111" roughness={0.8} metalness={0.2} />
          </Sphere>

          {/* Glowing data nodes on the globe */}
          <mesh position={[1.5, 1, 1]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshBasicMaterial color="#f5c842" />
          </mesh>
          <mesh position={[-1.2, 1.5, -1]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshBasicMaterial color="#ff3d57" />
          </mesh>
          <mesh position={[0, -1.8, 0.5]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshBasicMaterial color="#6d7cff" />
          </mesh>
        </group>
      </Float>
    </group>
  )
}
