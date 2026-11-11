import Reveal from '../components/Reveal'
import Seal from '../components/Seal'
import SectionLabel from '../components/SectionLabel'

const details = [
  ['Formation', 'Licence de Français — University of Lagos, 2024 — présent (300 level)'],
  ['Certification', 'Digital Marketing — Scallop Academy, octobre 2026'],
  ['Langues', 'Anglais (courant) · Yoruba (courant) · Français (A2)'],
  ['Basée à', 'Yaba, Lagos, Nigeria'],
]

export default function About() {
  return (
    <section
      id="sur-moi"
      className="relative scroll-mt-20 bg-bone px-5 py-24 text-ink md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1500px]">
        <Reveal>
          <SectionLabel index="01" fr="Sur moi" en="About" tone="light" />
        </Reveal>

        <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <h2 className="font-display text-[clamp(2.7rem,6.2vw,5.3rem)] leading-[0.93] tracking-[-0.02em]">
                A French eye,
                <br />
                <em className="text-violet-deep">a marketer’s instinct.</em>
              </h2>
            </Reveal>

            <Reveal delay={160} className="mt-10 max-w-xl space-y-5">
              <p className="text-[0.95rem] leading-relaxed text-ink/75">
                Glory Damilola Bamgboye is a French undergraduate at the University of Lagos and
                a storyteller by instinct. She works where language, culture and content meet —
                turning brand messages into moments that feel human, local and worth sharing.
              </p>
              <p className="text-[0.95rem] leading-relaxed text-ink/75">
                Currently a Samsung Campus Ambassador and a digital marketing trainee at Scallop
                Academy, she spends her days building content calendars, editing in CapCut,
                designing in Canva, and studying how a campaign travels from a brief to a feed.
              </p>
            </Reveal>

            <Reveal delay={240} className="mt-10 flex items-center gap-4">
              <span className="h-px w-10 bg-ink/30" />
              <p className="font-display text-lg italic text-ink/75">
                « Les histoires d’abord, la stratégie ensuite. »
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={120} className="border border-ink/20 p-7 md:p-8">
              <div className="flex items-start justify-between gap-6">
                <Seal className="h-32 w-32 text-violet-deep md:h-40 md:w-40" />
                <span className="text-right text-[8px] uppercase leading-[1.9] tracking-[0.24em] text-ink/50">
                  Le Cercle
                  <br />
                  Est. 2024
                </span>
              </div>

              <dl className="mt-8 divide-y divide-ink/15 border-t border-ink/15">
                {details.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-3 gap-4 py-4">
                    <dt className="text-[8px] uppercase tracking-[0.22em] text-ink/50">
                      {label}
                    </dt>
                    <dd className="col-span-2 text-[11px] leading-relaxed text-ink/80">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-5 text-[9px] uppercase tracking-[0.22em] text-ink/45">
                Références disponibles sur demande
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
