import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Box } from '@react-three/drei'
import * as THREE from 'three'

export const FrictionModule = () => {
  const groupRef = useRef<THREE.Group>(null)

  // Floating, chaotic rotation for fragmented pieces
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={[6, 2, 2]}>
      <Float speed={3} rotationIntensity={2} floatIntensity={3}>
        {/* Fragmented pieces representing friction */}
        <Box args={[0.5, 2, 0.5]} position={[-1.5, 1, 0]} rotation={[0.4, 0.2, 0.1]}>
          <meshStandardMaterial color="#ff3d57" roughness={0.2} metalness={0.8} />
        </Box>
        <Box args={[1.5, 0.5, 0.5]} position={[1, -1, 1]} rotation={[-0.2, -0.4, 0.5]}>
          <meshStandardMaterial color="#ff3d57" roughness={0.2} metalness={0.8} />
        </Box>
        <Box args={[0.8, 0.8, 0.8]} position={[0, 0.5, -1.5]} rotation={[0.7, 0.1, 0.2]}>
          <meshStandardMaterial color="#333" roughness={0.6} metalness={0.2} wireframe />
        </Box>
      </Float>
    </group>
  )
}
