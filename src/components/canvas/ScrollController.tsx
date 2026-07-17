import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../../store/useStore'

const dummyPosition = new THREE.Vector3()

export const ScrollController = () => {
  const { camera } = useThree()

  useFrame((_state, delta) => {
    // Read directly from store to avoid React re-renders on scroll
    const progress = useStore.getState().scrollProgress

    // Simple parallax camera movement. 
    // Start at z=8, move down slightly on y, move slightly left on x.
    const targetX = THREE.MathUtils.lerp(0, -1, progress)
    const targetY = THREE.MathUtils.lerp(0, -2, progress)
    const targetZ = 15
    
    dummyPosition.set(targetX, targetY, targetZ)

    // Smoothly apply to camera position
    camera.position.lerp(dummyPosition, 4 * delta)
    
    // Always look at origin where Earth is centered (offset in Earth component)
    camera.lookAt(0, 0, 0)
  })

  return null
}
