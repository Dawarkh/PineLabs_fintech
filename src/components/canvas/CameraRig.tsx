import { PerspectiveCamera } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

export const CameraRig = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)

  return (
    <PerspectiveCamera 
      ref={cameraRef}
      makeDefault 
      position={[0, 0, 10]} 
      fov={45} 
      near={0.1} 
      far={1000} 
    />
  )
}
