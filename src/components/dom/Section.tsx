import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
}

export const Section = ({ id, children, className = '' }: SectionProps) => {
  return (
    <section 
      id={id} 
      className={`relative w-full min-h-screen flex flex-col justify-center px-container py-section z-10 ${className}`}
    >
      {children}
    </section>
  )
}
