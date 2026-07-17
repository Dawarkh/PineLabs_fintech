import { Header } from './components/layout/Header'
import { Section } from './components/dom/Section'
import { Scene } from './components/canvas/Scene'

function App() {
  return (
    <>
      <Scene />
      <Header />
      
      {/* DOM Layer */}
      <main className="w-full relative pointer-events-auto">
        
        <Section id="hero" className="items-start">
          <div className="max-w-3xl mt-32">
            <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter">
              The Invisible Engine of <em className="not-italic text-pine">Commerce</em>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed">
              Powering $40B+ in annualized transactions. From local merchants to global enterprises, we build the infrastructure of modern retail.
            </p>
          </div>
        </Section>

        <Section id="friction">
          <div className="max-w-4xl grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-4xl font-bold mb-6">The Friction Problem</h2>
              <p className="text-text-secondary leading-relaxed">
                Before Pine Labs, merchants faced a fragmented landscape of payment processors, hardware terminals, and reconciliation nightmares. We unified it.
              </p>
            </div>
            <div className="glass p-4 rounded-xl">
              <img src="/friction_icon.jpg" alt="Friction Concept" className="w-full h-auto rounded-lg" />
            </div>
          </div>
        </Section>

        <Section id="founders">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="font-display text-4xl font-bold mb-12 text-center">The Architects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass rounded-xl p-4 flex flex-col items-center hover:scale-105 transition-transform duration-300">
                <img src="/lokvir_kapoor.jpg" alt="Lokvir Kapoor" className="w-full h-64 object-cover object-top rounded-lg mb-4" />
                <h3 className="font-bold text-xl">Lokvir Kapoor</h3>
                <p className="text-text-secondary text-sm">Founder</p>
              </div>
              <div className="glass rounded-xl p-4 flex flex-col items-center hover:scale-105 transition-transform duration-300">
                <img src="/rajul_garg.jpg" alt="Rajul Garg" className="w-full h-64 object-cover object-top rounded-lg mb-4" />
                <h3 className="font-bold text-xl">Rajul Garg</h3>
                <p className="text-text-secondary text-sm">Founder</p>
              </div>
              <div className="glass rounded-xl p-4 flex flex-col items-center hover:scale-105 transition-transform duration-300">
                <img src="/tarun_upadhyay.jpg" alt="Tarun Upadhyay" className="w-full h-64 object-cover object-top rounded-lg mb-4" />
                <h3 className="font-bold text-xl">Tarun Upadhyay</h3>
                <p className="text-text-secondary text-sm">Founder</p>
              </div>
            </div>
          </div>
        </Section>

        <Section id="business">
          <div className="max-w-4xl ml-auto grid md:grid-cols-2 gap-12 items-center text-right">
            <div className="glass p-4 rounded-xl order-last md:order-first">
              <img src="/business_icon.jpg" alt="Business Model Gear System" className="w-full h-auto rounded-lg" />
            </div>
            <div>
              <h2 className="font-display text-4xl font-bold mb-6">The Business Model</h2>
              <p className="text-text-secondary leading-relaxed">
                A compounding flywheel of hardware, software, and financial services.
              </p>
            </div>
          </div>
        </Section>

        <Section id="geography" className="items-center text-center">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-bold mb-6">Global Scale</h2>
            <p className="text-text-secondary leading-relaxed">
              Operating across India, Southeast Asia, and the Middle East.
            </p>
          </div>
        </Section>

      </main>
    </>
  )
}

export default App
