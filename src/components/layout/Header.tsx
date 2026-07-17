import { useStore } from '../../store/useStore'

import logo from '../../assets/pinelabs-logo.svg'

export const Header = () => {
  const scrollProgress = useStore((state) => state.scrollProgress)

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-container py-6 flex items-center justify-between mix-blend-difference">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Pine Labs" className="h-8 w-auto" />
      </div>
      
      <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider text-text-secondary uppercase">
        <a href="#friction" className="hover:text-pine transition-colors">Friction</a>
        <a href="#business" className="hover:text-pine transition-colors">Engine</a>
        <a href="#founders" className="hover:text-pine transition-colors">Founders</a>
        <a href="#geography" className="hover:text-pine transition-colors">Global</a>
      </nav>

      <button className="px-6 py-2.5 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
        Progress: {Math.round(scrollProgress * 100)}%
      </button>
    </header>
  )
}
