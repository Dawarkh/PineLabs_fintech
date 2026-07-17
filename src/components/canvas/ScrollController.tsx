import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../../store/useStore'

// The Camera Anchor blueprint
const anchors = [
  { p: new THREE.Vector3(0, 0, 10), r: new THREE.Euler(0, 0, 0) },        // 0.0 - Hero
  { p: new THREE.Vector3(6, 2, 8), r: new THREE.Euler(0, 0.6, 0) },       // 0.25 - Friction
  { p: new THREE.Vector3(-5, 1, 6), r: new THREE.Euler(-0.2, -0.4, 0) },   // 0.50 - Founders
  { p: new THREE.Vector3(4, -2, 5), r: new THREE.Euler(0.3, 0.4, 0.1) },   // 0.75 - Business
  { p: new THREE.Vector3(0, 5, 12), r: new THREE.Euler(-0.5, 0, 0) },      // 1.00 - Geography
]

const dummyPosition = new THREE.Vector3()
const dummyQuaternion = new THREE.Quaternion()
const targetQuaternion = new THREE.Quaternion()

export const ScrollController = () => {
  const { camera } = useThree()

  useFrame((_state, delta) => {
    // We read directly from the store state to avoid expensive React re-renders on every scroll tick.
    const progress = useStore.getState().scrollProgress

    // Calculate which segment we are in
    const maxIndex = anchors.length - 1
    const scaledProgress = progress * maxIndex
    
    // Determine the two anchors to interpolate between
    const startIndex = Math.min(Math.floor(scaledProgress), maxIndex - 1)
    const endIndex = startIndex + 1
    
    // Calculate the local progress between those two anchors (0 to 1)
    const localProgress = scaledProgress - startIndex

    const startAnchor = anchors[startIndex]
    const endAnchor = anchors[endIndex]

    // Interpolate Position
    dummyPosition.lerpVectors(startAnchor.p, endAnchor.p, localProgress)
    
    // Interpolate Rotation using Quaternions for smooth spherical interpolation
    const qStart = new THREE.Quaternion().setFromEuler(startAnchor.r)
    const qEnd = new THREE.Quaternion().setFromEuler(endAnchor.r)
    dummyQuaternion.slerpQuaternions(qStart, qEnd, localProgress)

    // Smoothly apply to the actual camera (dampening for that heavy cinematic feel)
    camera.position.lerp(dummyPosition, 4 * delta)
    targetQuaternion.copy(camera.quaternion).slerp(dummyQuaternion, 4 * delta)
    camera.quaternion.copy(targetQuaternion)
  })

  return null
}
