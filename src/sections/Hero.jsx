import { lazy, Suspense } from 'react'
import StaticOrb from '../components/StaticOrb'

const Cercle = lazy(() => import('../components/Cercle'))

const facts = [
  ['Basée à', 'Yaba, Lagos'],
  ['Étudie', 'Français · UNILAG, 300L'],
  ['Actuellement', 'Samsung Campus Ambassador'],
  ['Langues', 'Anglais · Yoruba · Français A2'],
]

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-5 pb-8 pt-28 md:px-10 md:pb-10 md:pt-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(52% 48% at 82% 16%, rgba(112,72,196,0.42) 0%, transparent 70%), radial-gradient(46% 42% at 6% 94%, rgba(58,116,87,0.30) 0%, transparent 72%), radial-gradient(34% 30% at 48% 14%, rgba(240,185,120,0.10) 0%, transparent 70%)',
        }}
      />

      <div className="pointer-events-none absolute -right-[30%] top-[7%] w-[94vw] max-w-[560px] opacity-45 sm:right-[-16%] sm:opacity-55 lg:hidden">
        <div className="aspect-square">
          <Suspense fallback={<StaticOrb />}>
            <Cercle className="h-full w-full" />
          </Suspense>
        </div>
      </div>

      <div className="relative mx-auto grid w-full max-w-[1500px] flex-1 items-center gap-12 lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-7">
          <p
            className="hero-fade flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-bone/70"
            style={{ '--line-delay': '0ms' }}
          >
            <span className="h-px w-8 bg-violet/70" />
            Portfolio — 2026 · Lagos, Nigeria
          </p>

          <h1 className="mt-6 font-display text-[clamp(3.7rem,11.5vw,9.6rem)] font-normal leading-[0.84] tracking-[-0.035em] text-bone">
            <span className="hero-line">
              <span style={{ '--line-delay': '120ms' }}>Glory</span>
            </span>
            <span className="hero-line">
              <span className="italic" style={{ '--line-delay': '260ms' }}>
                Bamgboye<span className="not-italic text-violet">.</span>
              </span>
            </span>
          </h1>

          <p
            className="hero-fade mt-8 max-w-md text-[0.95rem] leading-relaxed text-bone/72"
            style={{ '--line-delay': '440ms' }}
          >
            French undergraduate, brand storyteller and Samsung Campus Ambassador. I build
            content, campaigns and campus moments that bring brands closer to the people they
            speak to — in Lagos, and increasingly in French.
          </p>

          <div
            className="hero-fade mt-9 flex flex-wrap items-center gap-4"
            style={{ '--line-delay': '580ms' }}
          >
            <a
              href="mailto:bamgboyeglory3@gmail.com"
              className="group inline-flex items-center gap-2.5 rounded-full bg-violet px-6 py-3.5 text-[10px] uppercase tracking-[0.22em] text-ink transition-colors duration-500 hover:bg-bone"
            >
              Say bonjour
              <span
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:translate-x-1"
              >
                ↗
              </span>
            </a>
            <a
              href="/Glory_Bamgboye_CV.pdf"
              download
              className="inline-flex items-center gap-2.5 rounded-full border border-bone/25 px-6 py-3.5 text-[10px] uppercase tracking-[0.22em] text-bone/85 transition-colors duration-500 hover:border-bone/55 hover:text-bone"
            >
              Read the CV
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="relative hidden lg:col-span-5 lg:block">
          <div className="relative ml-auto aspect-square w-full max-w-[620px]">
            <Suspense fallback={<StaticOrb />}>
              <Cercle className="h-full w-full" />
            </Suspense>
          </div>
          <p className="absolute -bottom-2 right-0 font-display text-sm italic text-bone/50">
            le cercle, en mouvement
          </p>
        </div>
      </div>

      <dl
        className="hero-fade relative mx-auto mt-14 grid w-full max-w-[1500px] grid-cols-2 gap-x-6 gap-y-5 border-t border-bone/15 pt-6 md:mt-16 md:grid-cols-4"
        style={{ '--line-delay': '740ms' }}
      >
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt className="text-[8px] uppercase tracking-[0.26em] text-bone/50">{label}</dt>
            <dd className="mt-1.5 text-[11px] tracking-wide text-bone/85">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
