import { create } from 'zustand'

interface AppState {
  scrollProgress: number
  currentSection: string
  isMobile: boolean
  reducedMotion: boolean
  performanceTier: 'high' | 'low'
  
  setScrollProgress: (progress: number) => void
  setCurrentSection: (section: string) => void
}

export const useStore = create<AppState>((set) => ({
  scrollProgress: 0,
  currentSection: 'hero',
  isMobile: false,
  reducedMotion: false,
  performanceTier: 'high',
  
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setCurrentSection: (section) => set({ currentSection: section }),
}))
