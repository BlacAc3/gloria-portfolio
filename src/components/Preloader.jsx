import { useEffect, useState } from 'react'

/**
 * Font-gated preloader. It holds an opaque curtain over the page until the
 * display and body fonts have actually loaded, so no headline ever flashes
 * a fallback face or reflows. Then it lifts and the hero animates in.
 */
export default function Preloader() {
  const [pct, setPct] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const startedAt = performance.now()
    const minDuration = reduce ? 0 : 950
    let fontsDone = false
    let finished = false
    let raf = 0

    document.body.style.overflow = 'hidden'

    const markFonts = () => {
      fontsDone = true
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(markFonts).catch(markFonts)
      // Explicitly ask for the two faces used above the fold.
      document.fonts.load('1em "Instrument Serif"').catch(() => {})
      document.fonts.load('italic 1em "Instrument Serif"').catch(() => {})
      document.fonts.load('1em "Inter Variable"').catch(() => {})
    } else {
      fontsDone = true
    }

    const finish = () => {
      if (finished) return
      finished = true
      setPct(100)
      document.documentElement.classList.add('is-ready')
      document.body.style.overflow = ''
      setLeaving(true)
      window.setTimeout(() => setGone(true), reduce ? 0 : 1000)
    }

    const tick = (now) => {
      const elapsed = now - startedAt
      const timeProgress = Math.min(elapsed / (minDuration || 260), 1)
      setPct(Math.min(97, Math.round(timeProgress * 100)))

      if (fontsDone && elapsed >= minDuration) {
        finish()
        return
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = ''
    }
  }, [])

  if (gone) return null

  return (
    <div
      id="preloader"
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-ink px-6 py-7 transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] md:px-10 md:py-9 ${
        leaving ? '[clip-path:inset(0_0_100%_0)]' : '[clip-path:inset(0_0_0_0)]'
      }`}
    >
      <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.28em] text-bone/60">
        <span>Glory Bamgboye</span>
        <span className="hidden sm:inline">Portfolio — 2026</span>
        <span>Lagos, NG</span>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-[clamp(3rem,9vw,6rem)] leading-none tracking-[-0.02em]">
            Bonjour
          </span>
          <span className="mb-2 block h-2 w-2 rounded-full bg-violet md:mb-3" />
        </div>
        <div className="h-px w-[min(58vw,420px)] overflow-hidden bg-bone/18">
          <div
            className="h-full bg-violet transition-[width] duration-200 ease-linear"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="flex items-end justify-between text-[9px] uppercase tracking-[0.28em] text-bone/55">
        <span>Chargement de l'univers</span>
        <span className="font-display text-lg tracking-normal text-bone/85">
          {String(pct).padStart(3, '0')}
        </span>
      </div>
    </div>
  )
}
