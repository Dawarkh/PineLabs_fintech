import { useRef, useLayoutEffect } from 'react'
import { Scene } from './components/canvas/Scene'
import { Header } from './components/layout/Header'
import { SmoothScroll } from './components/layout/SmoothScroll'
import { Section } from './components/dom/Section'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. General Stagger Reveals for standard text and cards
      const revealSections = gsap.utils.toArray<HTMLElement>('.reveal-section')
      revealSections.forEach((section) => {
        const targets = section.querySelectorAll('.reveal-target')
        if (targets.length > 0) {
          gsap.fromTo(targets, 
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          )
        }
      })

      // 2. Horizontal Scroll for Founders
      const foundersWrapper = document.querySelector('.founders-pin-wrapper')
      const foundersContainer = document.querySelector('.founders-scroll-container')
      
      if (foundersWrapper && foundersContainer) {
        // Calculate how far to move horizontally
        const getScrollAmount = () => -(foundersContainer.scrollWidth - window.innerWidth + 80) // 80px padding/margin buffer
        
        gsap.to(foundersContainer, {
          x: getScrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: foundersWrapper,
            start: 'top top',
            end: () => `+=${foundersContainer.scrollWidth}`, // Scroll distance equals container width
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true, // Recalculate on resize
          }
        })
      }

    }, containerRef)

    return () => ctx.revert() // Cleanup on unmount
  }, [])

  return (
    <SmoothScroll>
      <div ref={containerRef} className="relative w-full text-white overflow-hidden font-sans selection:bg-pine selection:text-black">
        {/* The 3D Canvas layer stays fixed in the background */}
        <Scene />

        {/* Header navigation */}
        <Header />

        {/* Global Dark Overlay to fix text contrast without breaking GSAP pin */}
        <div className="fixed inset-0 bg-black/70 pointer-events-none z-[5]" />

        {/* Foreground DOM layer that scrolls over the canvas */}
        <div className="relative z-10 pointer-events-auto mix-blend-normal">
          
          {/* HERO */}
          <Section id="hero" className="items-start justify-center reveal-section">
            <div className="max-w-4xl mt-32 px-4 md:px-12">
              <div className="reveal-target inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-pine animate-pulse shadow-[0_0_10px_rgba(0,229,168,0.8)]" />
                <span className="text-xs font-bold tracking-widest uppercase text-pine">Publicly Listed · NSE: PINELABS · Nov 2025</span>
              </div>
              <h1 className="reveal-target font-display text-5xl md:text-7xl lg:text-8xl font-extrabold leading-none tracking-tighter">
                From Petrol Pumps to <em className="not-italic text-pine">Public Markets</em>
              </h1>
              <p className="reveal-target mt-8 text-lg md:text-xl text-dim max-w-2xl leading-relaxed">
                Pine Labs started in 1998 solving cash-reconciliation chaos at Indian petrol stations. Today it is the invisible payments layer powering nearly a million merchants across Asia and the Middle East.
              </p>
              
              <div className="reveal-target mt-8 flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full text-xs font-bold bg-pine/10 text-pine border border-pine/20">🇮🇳 Founded India 1998</span>
                <span className="px-4 py-2 rounded-full text-xs font-bold bg-white/5 text-dim border border-white/10">💳 Merchant Commerce</span>
                <span className="px-4 py-2 rounded-full text-xs font-bold bg-gold/10 text-gold border border-gold/20">📈 IPO 2025</span>
                <span className="px-4 py-2 rounded-full text-xs font-bold bg-pine/10 text-pine border border-pine/20">🌏 7+ Countries</span>
              </div>
            </div>
          </Section>

          {/* FRICTION */}
          <Section id="friction" className="reveal-section">
            <div className="max-w-6xl mx-auto w-full px-4 md:px-12">
              <p className="reveal-target text-xs tracking-[0.2em] text-dimmer uppercase flex items-center gap-4 mb-4">
                <span className="w-6 h-[1px] bg-dimmer"></span> Question 1 of 5
              </p>
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div>
                  <h2 className="reveal-target font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-8">
                    Why did Pine Labs <br/> exist <span className="text-red-500">at all?</span>
                  </h2>
                  <p className="reveal-target text-dim leading-relaxed mb-6 text-lg">
                    In late-1990s India, <strong className="text-white">cash was king</strong> — and that created a crushing operational problem for every large merchant and retail fuel station. Collecting, counting, securing, and reconciling cash was expensive, error-prone, and wide open to theft and fraud.
                  </p>
                  
                  <div className="reveal-target my-8 p-6 border-l-2 border-red-500 bg-red-500/5 rounded-r-2xl">
                    <p className="text-white font-display text-xl leading-relaxed font-semibold">
                      Petrol pump operators had no reliable way to run corporate loyalty programmes. Every transaction meant <em className="not-italic text-red-500">paper ledgers and human error</em> at the pump.
                    </p>
                  </div>

                  <p className="reveal-target text-dim leading-relaxed text-lg mb-6">
                    Banks and card networks existed, but POS terminals were locked inside closed, bank-only systems. There was <strong className="text-white">no neutral, multi-bank bridge</strong> into Indian retail.
                  </p>
                  
                  <div className="reveal-target my-8 p-6 border-l-2 border-pine bg-pine/5 rounded-r-2xl">
                    <p className="text-white font-display text-xl leading-relaxed font-semibold">
                      A three-way disconnect between merchants, consumers, and banks — <em className="not-italic text-pine">Pine Labs was the missing bridge.</em>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-8 lg:mt-0">
                  <h3 className="reveal-target font-display text-2xl font-bold mb-4">Who felt it most acutely?</h3>
                  
                  {[
                    { num: '01', title: 'Petroleum Retailers', desc: 'Managing fleet card programmes entirely on paper. Manual reconciliation meant revenue leakage and fraud exposure every single day.' },
                    { num: '02', title: 'Large-Format Retailers', desc: 'Electronics and fashion stores losing sales because card payments were not accepted. Customers walked away; merchants lost revenue.' },
                    { num: '03', title: 'Banks & Card Networks', desc: 'Unable to scale card acceptance without spending on proprietary, bank-locked terminals for each merchant. The unit economics made nationwide rollout impossible.' }
                  ].map((pain) => (
                    <div key={pain.num} className="reveal-target glass p-6 rounded-2xl border border-white/5 flex gap-6 items-start transition-all duration-500 ease-out hover:scale-[1.15] hover:z-50 origin-center bg-[#0a0a0a]/50 group">
                      <div className="text-4xl font-display font-extrabold text-red-500/20 group-hover:text-red-500/50 transition-colors">{pain.num}</div>
                      <div>
                        <h4 className="text-red-500 font-bold text-lg mb-2">{pain.title}</h4>
                        <p className="text-dim text-sm leading-relaxed">{pain.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* FOUNDERS - HORIZONTAL SCROLL PIN SECTION */}
          {/* We remove standard flex-col height from Section and handle it manually for GSAP Pinning */}
          <div id="founders" className="founders-pin-wrapper h-screen w-full relative overflow-hidden flex items-center bg-[#020509]/50 backdrop-blur-sm border-y border-white/5">
            <div className="founders-scroll-container flex items-center gap-16 px-12 md:px-24 h-full w-max">
              
              {/* Founders Intro Title block */}
              <div className="w-[80vw] md:w-[40vw] flex-shrink-0">
                <p className="text-xs tracking-[0.2em] text-dimmer uppercase flex items-center gap-4 mb-4">
                  <span className="w-6 h-[1px] bg-dimmer"></span> Question 2 of 5
                </p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-8">
                  The people who <br/> saw the <span className="text-indigo">gap.</span>
                </h2>
                <p className="text-dim text-lg leading-relaxed mb-12">
                  Pine Labs was co-founded in <strong>1998</strong> by three engineers from India's emerging IT ecosystem. Their connection to the problem was direct — they built for the merchant, not the bank.
                </p>
              </div>

              {/* Large Portrait Cards */}
              {[
                { name: 'Lokvir Kapoor', role: 'Co-Founder · Exec Chairman', img: '/lokvir_kapoor.jpg', color: 'bg-pine', border: 'border-pine', desc: 'The core architect of Pine Labs\'s vision. Led the company from its smart-card roots through a major pivot into mainstream POS.' },
                { name: 'Rajul Garg', role: 'Co-Founder', img: '/rajul_garg.jpg', color: 'bg-indigo', border: 'border-indigo', desc: 'Brought deep software and systems engineering DNA to Pine Labs. Was central to early product architecture.' },
                { name: 'Tarun Upadhyay', role: 'Co-Founder', img: '/tarun_upadhyay.jpg', color: 'bg-gold', border: 'border-gold', desc: 'Shaped the early technical stack for petroleum retail automation — the domain that gave Pine Labs its first product-market fit.' },
                { name: 'B. Amrish Rau', role: 'Growth CEO · Joined 2020', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', color: 'bg-purple-500', border: 'border-purple-500', desc: 'A fintech founder in his own right, Amrish Rau was brought in as CEO in 2020. He gave the company a second wave of ambition for IPO.' },
              ].map((f) => (
                <div key={f.name} className="w-[75vw] md:w-[35vw] lg:w-[25vw] flex-shrink-0 group relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 ease-out hover:scale-110 lg:hover:scale-[1.4] hover:z-50 origin-center">
                  {/* Background Image */}
                  <img src={f.img} alt={f.name} className="absolute inset-0 w-full h-full object-cover filter grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out" />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-start translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className={`w-8 h-1 ${f.color} mb-6`} />
                    <h3 className="font-display font-extrabold text-3xl mb-2 text-white">{f.name}</h3>
                    <p className={`text-xs font-bold tracking-widest uppercase mb-4 ${f.color.replace('bg-', 'text-')}`}>{f.role}</p>
                    <p className="text-dim text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{f.desc}</p>
                  </div>
                </div>
              ))}

              <div className="w-[80vw] md:w-[40vw] flex-shrink-0">
                <div className="p-8 border-l-2 border-indigo bg-indigo/5 rounded-r-3xl">
                  <h4 className="font-display text-xl font-bold mb-4">Why were they the right people?</h4>
                  <p className="text-white font-display text-2xl font-semibold mb-4">
                    Technologists, not bankers — they built <em className="not-italic text-indigo">rails, not apps.</em>
                  </p>
                  <p className="text-dim text-sm leading-relaxed">
                    Starting with petroleum retail gave them deep knowledge of B2B payment friction before scaling to all of retail. Their outsider perspective led to merchant-first design, creating a defensible, bank-agnostic platform that was difficult for anyone to replicate.
                  </p>
                </div>
              </div>

              {/* Buffer end block */}
              <div className="w-[10vw] flex-shrink-0" />
            </div>
          </div>

          {/* BUSINESS MODEL */}
          <Section id="business" className="reveal-section">
            <div className="max-w-6xl mx-auto w-full px-4 md:px-12 text-right">
              <p className="reveal-target text-xs tracking-[0.2em] text-dimmer uppercase flex items-center justify-end gap-4 mb-4">
                Question 3 of 5 <span className="w-6 h-[1px] bg-dimmer"></span>
              </p>
              <h2 className="reveal-target font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-8">
                A digital <br/> <span className="text-pine">tollbooth.</span>
              </h2>
              <p className="reveal-target text-dim text-lg max-w-2xl ml-auto leading-relaxed mb-6">
                Pine Labs sits between every payment event and earns a fee. It does not hold deposits or lend from its balance sheet. It is a <em>technology and orchestration layer</em> — SaaS + transactions — that earns from both sides of every payment.
              </p>
              
              <div className="reveal-target my-8 p-6 border-r-2 border-pine bg-pine/5 rounded-l-2xl max-w-3xl ml-auto text-right">
                <p className="text-white font-display text-xl leading-relaxed font-semibold">
                  It charges merchants for processing — and charges banks for routing customers into financial products. <em className="not-italic text-pine">Two-sided. Both sides pay.</em>
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 text-left">
                {[
                  { num: '01', title: 'Transaction Fees (MDR)', who: 'Merchants Pay', desc: 'A small percentage on every card or digital payment processed through Pine Labs terminals and gateways.' },
                  { num: '02', title: 'SaaS Subscriptions', who: 'Merchants Pay', desc: 'Recurring fees for billing software, analytics dashboards, and integration services. Predictable income.' },
                  { num: '03', title: 'EMI Orchestration & BNPL', who: 'Banks Pay', desc: 'Pine Labs enables no-cost EMI at POS. Banks pay a routing fee for connecting customers to their EMI products.' },
                  { num: '04', title: 'Gift Cards (Qwikcilver)', who: 'Retail Brands Pay', desc: 'Powers gifting programmes, prepaid cards, and loyalty platforms for retail brands across India & SEA.' },
                  { num: '05', title: 'Online Gateway (Plural)', who: 'Online Merchants Pay', desc: 'The "Plural" platform processes online merchant payments, competing with Razorpay and PayU in e-commerce.' },
                  { num: '06', title: 'Deals & Cashback (Fave)', who: 'Merchants Pay', desc: 'Via the Fave acquisition in SEA, Pine Labs runs a consumer-facing deals and cashback platform.' },
                ].map(rev => (
                  <div key={rev.num} className="reveal-target glass transition-all duration-500 ease-out hover:scale-[1.2] hover:z-50 p-6 rounded-2xl border border-white/5 relative overflow-hidden group origin-center bg-[#0a0a0a]/50">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pine to-indigo opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="text-xs font-extrabold text-dimmer tracking-widest mb-4">{rev.num}</div>
                    <h5 className="font-display font-bold text-white mb-2">{rev.title}</h5>
                    <p className="text-dim text-sm mb-4 leading-relaxed">{rev.desc}</p>
                    <span className="inline-block px-3 py-1 bg-pine/10 text-pine border border-pine/20 rounded-full text-[10px] tracking-widest uppercase font-bold">{rev.who}</span>
                  </div>
                ))}
              </div>

              <div className="reveal-target mt-16 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md text-center max-w-4xl mx-auto">
                <h4 className="text-xs tracking-[0.2em] uppercase text-dimmer mb-8">The Business Flywheel</h4>
                <div className="flex flex-wrap justify-center items-center gap-4">
                  {['More Merchants', 'More Txn Data', 'Better Products', 'Stickier Merchants'].map((node, i) => (
                    <div key={node} className="flex items-center gap-4">
                      <div className="bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm font-bold text-white shadow-xl hover:scale-105 hover:border-pine hover:bg-pine/10 transition-all">
                        {node}
                      </div>
                      {i < 3 && <span className="text-pine/50 font-bold">→</span>}
                    </div>
                  ))}
                  <div className="flex items-center gap-4">
                     <span className="text-pine/50 font-bold">→</span>
                     <div className="bg-pine/20 border border-pine rounded-full px-6 py-3 text-sm font-bold text-pine shadow-[0_0_15px_rgba(0,229,168,0.3)]">
                        Pine Labs Wins
                      </div>
                  </div>
                </div>
                <div className="mt-8 p-4 bg-indigo/10 border-l-2 border-indigo text-left text-sm text-dim leading-relaxed">
                  <strong className="text-indigo">Network effect:</strong> Every merchant added makes the platform more attractive for banks, which funds better products, which attracts more merchants. The loop compounds indefinitely.
                </div>
              </div>
            </div>
          </Section>

          {/* GEOGRAPHY */}
          <Section id="geography" className="reveal-section items-center text-center">
            <div className="max-w-6xl mx-auto w-full px-4 md:px-12">
              <p className="reveal-target text-xs tracking-[0.2em] text-dimmer uppercase flex justify-center items-center gap-4 mb-4">
                <span className="w-6 h-[1px] bg-dimmer"></span> Question 4 of 5 <span className="w-6 h-[1px] bg-dimmer"></span>
              </p>
              <h2 className="reveal-target font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-8">
                Born in India. <br/> Grown across <span className="text-pine">Asia.</span>
              </h2>
              <p className="reveal-target text-dim text-lg max-w-2xl mx-auto leading-relaxed mb-16">
                Pine Labs's story is a <strong>three-act geographic expansion</strong>: born in India, matured in Asia, now listed globally. The journey took 27 years and three acquisitions.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16 text-left">
                {[
                  { flag: '🇮🇳', name: 'India', desc: 'Home market · ~900K+ merchants', badge: 'HQ Market' },
                  { flag: '🇸🇬', name: 'Singapore', desc: 'APAC HQ · Fave platform', badge: 'APAC HQ' },
                  { flag: '🇲🇾', name: 'Malaysia', desc: 'Fave cashback & deals', badge: 'SEA Expansion' },
                  { flag: '🇦🇪', name: 'Middle East', desc: 'Enterprise POS & card acceptance', badge: 'ME Market' },
                  { flag: '🇮🇩', name: 'Indonesia', desc: 'Digital payment rails', badge: 'SEA Expansion' },
                  { flag: '🇺🇸', name: 'United States', desc: 'Global ops support', badge: 'Corp Presence' },
                ].map(c => (
                  <div key={c.name} className="reveal-target glass p-4 rounded-xl border border-white/5 hover:-translate-y-1 transition-transform group hover:bg-white/5">
                    <div className="text-3xl mb-2 grayscale group-hover:grayscale-0 transition-all">{c.flag}</div>
                    <h6 className="font-display font-bold text-white mb-1">{c.name}</h6>
                    <p className="text-[10px] text-dim mb-3 h-8">{c.desc}</p>
                    <span className="inline-block px-2 py-1 bg-pine/10 border border-pine/20 text-pine text-[9px] uppercase tracking-widest font-bold">{c.badge}</span>
                  </div>
                ))}
              </div>

              <div className="max-w-3xl mx-auto text-left relative pl-8 border-l border-gradient-to-b from-pine to-indigo">
                <div className="reveal-target text-xs tracking-[0.2em] text-dimmer uppercase mb-12">Expansion Timeline</div>
                {[
                  { yr: '1998', title: 'Founded — Gurgaon, India', desc: 'Smart-card automation for petroleum retail. B2B from day one.' },
                  { yr: 'Mid-2000s', title: 'The Pivot — Mainstream POS', desc: 'Shifted from petrol pumps to large-format retail and banking POS terminals. New total addressable market.' },
                  { yr: '2019', title: 'Acquires Qwikcilver', desc: 'India\'s largest gift card and loyalty platform — adding enterprise retail relationships.' },
                  { yr: '2021', title: 'Acquires Fave — SEA Entry', desc: 'South-East Asian consumer deals platform acquired. Gains consumer-facing foothold.' },
                  { yr: 'Nov 2025', title: 'IPO — Listed on BSE & NSE', desc: '₹3,900 crore IPO. A landmark exit for early investors including Sequoia and Mastercard.' },
                  { yr: 'FY 2026', title: 'First-Ever Full-Year Profit', desc: 'Net profit of ₹113 crore — the first full-year profitability in company history.' },
                ].map((tl, i) => (
                  <div key={i} className="reveal-target relative mb-12 last:mb-0">
                    <div className="absolute -left-[39px] top-1 w-3 h-3 rounded-full bg-pine border-[3px] border-black shadow-[0_0_10px_rgba(0,229,168,0.8)]" />
                    <div className="text-xs font-bold font-mono text-pine tracking-widest uppercase mb-1">{tl.yr}</div>
                    <h6 className="font-display font-bold text-white text-lg mb-2">{tl.title}</h6>
                    <p className="text-sm text-dim leading-relaxed">{tl.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* STATUS */}
          <Section id="status" className="reveal-section pb-32">
            <div className="max-w-6xl mx-auto w-full px-4 md:px-12">
              <p className="reveal-target text-xs tracking-[0.2em] text-dimmer uppercase flex items-center gap-4 mb-4">
                <span className="w-6 h-[1px] bg-dimmer"></span> Question 5 of 5
              </p>
              <h2 className="reveal-target font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-8">
                Thriving. <br/> Public. <br/> <span className="text-pine">Profitable.</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-16 mt-16">
                <div>
                  <p className="reveal-target text-dim text-lg leading-relaxed mb-6">
                    Pine Labs is <strong>thriving and public</strong>. As of July 2026, it trades on BSE and NSE, having completed its IPO in November 2025. It has crossed into profitability, reporting its <strong>first-ever annual net profit of ₹113 crore</strong> in FY26.
                  </p>
                  <div className="reveal-target my-8 p-6 border-l-2 border-pine bg-pine/5 rounded-r-2xl">
                    <p className="text-white font-display text-xl leading-relaxed font-semibold">
                      From "grow at any cost" to <em className="not-italic text-pine">"margin sustainability."</em> The company spent years building the rails; now it's monetising the volume.
                    </p>
                  </div>
                  
                  <div className="mt-8 space-y-6">
                    {[
                      { lbl: 'FY26 Operating Revenue', val: '₹2,711 Cr', sub: '+19% year-on-year', w: 'w-[80%]' },
                      { lbl: 'Revenue Growth YoY', val: '+19%', sub: 'Compound scaling phase', w: 'w-[19%]' },
                      { lbl: 'FY26 Net Profit — First Ever', val: '₹113 Cr', sub: '27 years to first full-year profit', w: 'w-[60%]' }
                    ].map(m => (
                      <div key={m.lbl} className="reveal-target py-4 border-b border-white/10 last:border-0">
                        <div className="text-[10px] tracking-widest uppercase text-dimmer mb-1">{m.lbl}</div>
                        <div className="font-display font-extrabold text-3xl text-pine leading-none mb-1">{m.val}</div>
                        <div className="text-xs text-dim mb-3">{m.sub}</div>
                        <div className="h-[2px] bg-white/5 w-full">
                          <div className={`h-full bg-gradient-to-r from-pine to-indigo ${m.w} shadow-[0_0_10px_rgba(0,229,168,0.5)]`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="space-y-2">
                    {[
                      { num: '01', desc: <><strong className="text-white">Patience & pivots matter.</strong> Pine Labs took nearly a decade to find its true market. The pivot from petrol pumps to mainstream retail was the company-defining move — most startups don't survive that kind of reinvention.</> },
                      { num: '02', desc: <><strong className="text-white">Infrastructure beats apps.</strong> By building payment rails (not a consumer app), Pine Labs made itself indispensable to banks, merchants, and card networks simultaneously — a classic B2B network-effects moat.</> },
                      { num: '03', desc: <><strong className="text-white">The IPO is not the end.</strong> Going public in 2025 after 27 years of private operation is unusual. It signals Pine Labs took the long road deliberately — building sustainable infrastructure rather than rushing to a quick exit.</> },
                      { num: '04', desc: <><strong className="text-white">The BNPL bet is central.</strong> Pine Labs's EMI orchestration layer positions it squarely inside India's next credit expansion wave — potentially its highest-margin business going forward.</> }
                    ].map(tk => (
                      <div key={tk.num} className="reveal-target glass group hover:-translate-y-1 transition-transform p-6 rounded-2xl border border-white/5 flex gap-6 items-start">
                        <div className="text-xl font-display font-extrabold text-pine">{tk.num}</div>
                        <p className="text-dim text-sm leading-relaxed">{tk.desc}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="reveal-target mt-12 p-8 bg-pine/5 border border-pine/20 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-4 font-display font-extrabold text-9xl text-pine/5 pointer-events-none select-none">27</div>
                    <h5 className="font-display font-extrabold text-lg text-pine mb-3">The Bottom Line</h5>
                    <p className="text-dim text-sm leading-relaxed relative z-10">
                      Pine Labs is a <strong className="text-white">27-year overnight success.</strong> It shows that in financial infrastructure, the winners are rarely the flashiest — they're the ones who understand the plumbing and build it so reliably that the world forgets it's even there.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* FOOTER */}
          <footer className="reveal-section bg-[#020509] border-t border-white/5 pt-20 pb-10 px-4 md:px-12 relative z-20">
            <div className="max-w-6xl mx-auto w-full">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <div className="lg:col-span-2">
                  <div className="reveal-target font-display font-extrabold text-2xl text-white mb-4">Pine Labs</div>
                  <p className="reveal-target text-dim text-sm leading-relaxed max-w-sm">
                    A research-backed profile built for the PGDM Fintech class encyclopedia. Course: PGDM Fintech · Instructor: Priyadarshi Dutta · Company: Pine Labs (Est. 1998)
                  </p>
                </div>
                <div>
                  <h4 className="reveal-target text-[10px] tracking-[0.2em] uppercase text-dimmer mb-6">Story</h4>
                  <div className="reveal-target flex flex-col gap-3">
                    <a href="#friction" className="text-sm text-dim hover:text-pine transition-colors">The Friction</a>
                    <a href="#founders" className="text-sm text-dim hover:text-pine transition-colors">The Founders</a>
                    <a href="#bizmodel" className="text-sm text-dim hover:text-pine transition-colors">Business Model</a>
                    <a href="#geography" className="text-sm text-dim hover:text-pine transition-colors">Geography</a>
                    <a href="#status" className="text-sm text-dim hover:text-pine transition-colors">Status Today</a>
                  </div>
                </div>
                <div>
                  <h4 className="reveal-target text-[10px] tracking-[0.2em] uppercase text-dimmer mb-6">Links</h4>
                  <div className="reveal-target flex flex-col gap-3">
                    <a href="https://www.pinelabs.com" target="_blank" rel="noreferrer" className="text-sm text-dim hover:text-pine transition-colors">pinelabs.com</a>
                    <a href="https://en.wikipedia.org/wiki/Pine_Labs" target="_blank" rel="noreferrer" className="text-sm text-dim hover:text-pine transition-colors">Wikipedia</a>
                  </div>
                </div>
              </div>
              <div className="reveal-target pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-xs text-dimmer">
                <span>© 2026 PGDM Fintech Course · Priyadarshi Dutta · For educational use only</span>
                <span>Data: public filings, Wikipedia, Entrackr, Startup Talky</span>
              </div>
            </div>
          </footer>

        </div>
      </div>
    </SmoothScroll>
  )
}

export default App
