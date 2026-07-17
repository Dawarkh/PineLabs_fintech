import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Box, Sphere, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

const Particles = ({ count = 100 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null)
  
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 15
      const y = (Math.random() - 0.5) * 15
      const z = (Math.random() - 0.5) * 15
      const speed = 0.2 + Math.random() * 0.5
      temp.push({ x, y, z, speed })
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    particles.forEach((particle, i) => {
      const t = state.clock.elapsedTime * particle.speed
      dummy.position.set(
        particle.x + Math.sin(t) * 1.5,
        particle.y + Math.cos(t) * 1.5,
        particle.z
      )
      dummy.rotation.set(t, t, t)
      dummy.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.08, 0.08, 0.08]} />
      <meshBasicMaterial color="#00e5a8" transparent opacity={0.6} />
    </instancedMesh>
  )
}

export const HeroModule = () => {
  const groupRef = useRef<THREE.Group>(null)

  // Subtle breathing animation for the entire hero rig
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={groupRef} position={[3, 0, 0]}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        {/* The Core Engine */}
        <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={2}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.5}
            temporalDistortion={0.1}
            color="#ffffff"
            attenuationColor="#00e5a8"
            attenuationDistance={3}
          />
        </Sphere>
        
        {/* Floating POS/Terminal abstractions */}
        <Box args={[1, 1.5, 0.2]} position={[-2.5, 1, 1]} rotation={[0.2, 0.5, -0.1]}>
          <meshStandardMaterial color="#111" roughness={0.1} metalness={0.8} />
        </Box>
        
        <Box args={[1.2, 0.8, 0.2]} position={[2.5, -1, 1]} rotation={[-0.2, -0.4, 0.1]}>
          <meshStandardMaterial color="#222" roughness={0.2} metalness={0.7} />
        </Box>
      </Float>

      <Particles count={150} />
    </group>
  )
}
