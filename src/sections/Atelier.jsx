import Reveal from '../components/Reveal'
import SectionLabel from '../components/SectionLabel'

const groups = [
  {
    fr: 'Social & contenu',
    en: 'Social & Content',
    items: [
      'Social media management',
      'Content creation',
      'Content calendar development',
      'Digital marketing strategy',
    ],
  },
  {
    fr: 'Marque & campagnes',
    en: 'Brand & Campaigns',
    items: ['Brand promotion', 'Media buying', 'Meta advertising', 'Online campaign planning'],
  },
  {
    fr: 'Outils & artisanat',
    en: 'Tools & Craft',
    items: ['Canva', 'CapCut', 'Google Sheets', 'Website design'],
  },
]

const languages = [
  { name: 'Anglais', label: 'Courant', level: 5 },
  { name: 'Yoruba', label: 'Courant', level: 5 },
  { name: 'Français', label: 'Basique · A2', level: 2 },
]

const professional = [
  'Leadership',
  'Communication',
  'Public relations',
  'Creativity',
  'Problem-solving',
  'Teamwork',
  'Adaptability',
  'Organisation',
]

export default function Atelier() {
  return (
    <section
      id="atelier"
      className="relative scroll-mt-20 overflow-hidden bg-cocoa px-5 py-24 md:px-10 md:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-52 h-[560px] w-[560px] rounded-full opacity-[0.16] blur-3xl"
        style={{
          background: 'radial-gradient(circle, #a8cfb4 0%, transparent 68%)',
        }}
      />

      <div className="relative mx-auto max-w-[1500px]">
        <Reveal>
          <SectionLabel index="03" fr="L’Atelier" en="The craft" />
        </Reveal>

        <div className="mt-9 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal delay={80} className="lg:col-span-7">
            <h2 className="font-display text-[clamp(2.7rem,6.2vw,5.3rem)] leading-[0.93] tracking-[-0.02em] text-bone">
              What I bring <em className="text-sage">to the table.</em>
            </h2>
          </Reveal>
          <Reveal delay={160} className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-sm text-[0.9rem] leading-relaxed text-bone/70">
              A practical toolkit built across campus activations, association work and a
              digital marketing traineeship — equal parts strategy and craft.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px border-t border-bone/15 md:grid-cols-3">
          {groups.map((group, index) => (
            <Reveal
              key={group.fr}
              delay={index * 80}
              className="border-b border-bone/15 py-9 md:border-b-0 md:pr-8 md:pt-9"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl leading-none text-bone">{group.fr}</h3>
                <span className="text-[8px] uppercase tracking-[0.2em] text-bone/55">
                  {group.en}
                </span>
              </div>

              <ul className="mt-7 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-[0.85rem] leading-relaxed text-bone/70"
                  >
                    <span className="h-px w-4 shrink-0 bg-sage/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-10 border-t border-bone/15 pt-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h3 className="text-[9px] uppercase tracking-[0.26em] text-bone/65">
              Langues / Languages
            </h3>

            <ul className="mt-6 space-y-5">
              {languages.map((language) => (
                <li
                  key={language.name}
                  className="flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-xl text-bone">{language.name}</span>
                    <span className="text-[8px] uppercase tracking-[0.2em] text-bone/60">
                      {language.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="sr-only">
                      {language.name}: {language.label}, {language.level} of 5
                    </span>
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <span
                        key={dot}
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full ${
                          dot <= language.level ? 'bg-violet' : 'bg-bone/20'
                        }`}
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
            <h3 className="text-[9px] uppercase tracking-[0.26em] text-bone/65">
              Savoir-être / Professional skills
            </h3>

            <ul className="mt-6 flex flex-wrap gap-2.5">
              {professional.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-bone/20 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-bone/75"
                >
                  {skill}
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-sm text-[0.8rem] leading-relaxed text-bone/60">
              Currently deepening the French side of all of this — 300 level at UNILAG, with an
              A2 certificate and a growing appetite for francophone brand work.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
