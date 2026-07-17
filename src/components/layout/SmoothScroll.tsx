import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { useStore } from '../../store/useStore'

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const setScrollProgress = useStore((state) => state.setScrollProgress)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenis.on('scroll', (e: any) => {
      setScrollProgress(e.progress)
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [setScrollProgress])

  return <>{children}</>
}
