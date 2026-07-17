import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../../store/useStore'

export const Earth = () => {
  const groupRef = useRef<THREE.Group>(null)
  
  // Ensure the asset path respects Vite's base URL for GitHub Pages
  const basePath = import.meta.env.BASE_URL || '/'
  const { scene } = useGLTF(`${basePath}earth.glb`)

  // We want to smoothly interpolate rotation towards the target rotation
  const currentRotation = useRef(0)

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Get scroll progress from 0 to 1
      const progress = useStore.getState().scrollProgress
      
      // Calculate target rotation. For example, 2 full rotations (Math.PI * 4) across the whole page scroll
      const targetRotation = progress * Math.PI * 4
      
      // Smoothly interpolate current rotation towards target using lerp for buttery smoothness
      currentRotation.current = THREE.MathUtils.lerp(currentRotation.current, targetRotation, delta * 2)
      
      // Apply to Y axis (horizontal spin)
      groupRef.current.rotation.y = currentRotation.current

      // Add a tiny bit of continuous idle floating rotation on X and Z just to keep it alive
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.15) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={[5, -1, 0]} scale={5.0}>
      {/* 
        Using primitive to render the loaded GLTF scene directly.
        We scale it down heavily and push it right/down to keep text readable.
      */}
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/earth.glb')
