import Reveal from '../components/Reveal'
import Seal from '../components/Seal'

export default function Feature() {
  return (
    <section
      id="francofest"
      className="relative scroll-mt-20 overflow-hidden bg-violet-deep px-5 py-24 text-bone md:px-10 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            'radial-gradient(60% 70% at 78% 12%, rgba(189,163,255,0.62) 0%, transparent 70%), radial-gradient(50% 60% at 8% 92%, rgba(58,116,87,0.62) 0%, transparent 72%), radial-gradient(40% 45% at 92% 88%, rgba(240,185,120,0.22) 0%, transparent 70%)',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[135vw] max-h-[1100px] w-[135vw] max-w-[1100px] -translate-x-1/2 -translate-y-1/2"
      >
        <span className="absolute inset-[8%] rounded-full border border-bone/15" />
        <span className="absolute inset-[20%] rounded-full border border-bone/10" />
        <span className="absolute inset-[33%] rounded-full border border-bone/[0.07]" />
      </div>

      <div className="relative mx-auto max-w-[1500px]">
        <Reveal className="flex flex-wrap items-center gap-4">
          <span className="text-[9px] uppercase tracking-[0.26em] text-bone/80">
            En vedette
          </span>
          <span className="h-px w-10 bg-bone/30" />
          <span className="text-[9px] uppercase tracking-[0.26em] text-bone/80">
            Featured moment
          </span>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal delay={80}>
              <h2 className="font-display text-[clamp(4rem,15.5vw,14rem)] leading-[0.78] tracking-[-0.045em]">
                Francofest
                <br />
                <em className="text-bone/85">3.0</em>
              </h2>
            </Reveal>

            <Reveal delay={160} className="mt-10 max-w-lg">
              <p className="text-[0.95rem] leading-relaxed text-bone/80">
                As Assistant Social Secretary of Cercle Français, University of Lagos, she
                helped plan and coordinate Francofest 3.0 — collaborating with executives and
                members to grow participation and keep the association’s community alive.
              </p>
              <p className="mt-4 font-display text-lg italic text-bone/85">
                Le français, vécu ensemble.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-3 lg:col-start-10">
            <Reveal delay={220} className="flex flex-col items-start gap-6">
              <Seal className="h-36 w-36 text-bone md:h-44 md:w-44" />
              <dl className="w-full space-y-3 border-t border-bone/25 pt-5">
                <div>
                  <dt className="text-[8px] uppercase tracking-[0.24em] text-bone/75">
                    Rôle
                  </dt>
                  <dd className="mt-1 text-[11px] tracking-wide text-bone/90">
                    Assistant Social Secretary
                  </dd>
                </div>
                <div>
                  <dt className="text-[8px] uppercase tracking-[0.24em] text-bone/75">
                    Période
                  </dt>
                  <dd className="mt-1 text-[11px] tracking-wide text-bone/90">
                    Février — Juillet 2026
                  </dd>
                </div>
                <div>
                  <dt className="text-[8px] uppercase tracking-[0.24em] text-bone/75">
                    Association
                  </dt>
                  <dd className="mt-1 text-[11px] tracking-wide text-bone/90">
                    Cercle Français · UNILAG
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
