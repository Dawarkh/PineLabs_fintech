import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats, Environment } from '@react-three/drei'
import { CameraRig } from './CameraRig'
import { ScrollController } from './ScrollController'
import { Earth } from './Earth'

export const Scene = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none bg-dark">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#030303']} />
        
        {/* Foundation */}
        <Stats className="!absolute !right-4 !bottom-4 !top-auto !left-auto" />
        <CameraRig />
        <ScrollController />
        
        {/* Global Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <Environment preset="city" environmentIntensity={1} />

        {/* 3D Modules */}
        <React.Suspense fallback={null}>
          <Earth />
        </React.Suspense>
      </Canvas>
    </div>
  )
}
