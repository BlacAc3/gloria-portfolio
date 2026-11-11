import Reveal from '../components/Reveal'
import SectionLabel from '../components/SectionLabel'

const roles = [
  {
    period: 'Jan 2026 — présent',
    place: 'University of Lagos',
    role: 'Samsung Campus Ambassador',
    org: 'Samsung',
    points: [
      'Represented Samsung on campus and supported brand promotions and activations.',
      'Created awareness among students through direct, personal communication.',
      'Engaged students in brand activities, demonstrating teamwork and leadership.',
    ],
  },
  {
    period: '2024 — présent',
    place: 'French Unit · UNILAG',
    role: 'Course Representative',
    org: 'European Languages & Integration Studies',
    points: [
      'Acted as the bridge between the French Unit and its students.',
      'Relayed academic information and raised class concerns with lecturers.',
      'Kept the cohort coordinated, informed and heard.',
    ],
  },
  {
    period: 'Fév — Juil 2026',
    place: 'University of Lagos',
    role: 'Assistant Social Secretary',
    org: 'Cercle Français',
    points: [
      'Supported the planning and coordination of Francofest 3.0.',
      'Worked with executives and members to grow participation in the association.',
      'Helped build a community students wanted to belong to.',
    ],
  },
  {
    period: 'Oct 2026',
    place: 'Lagos, Nigeria',
    role: 'Digital Marketing Trainee',
    org: 'Scallop Academy',
    points: [
      'Trained in social media management, content strategy and media buying.',
      'Built content calendars, branding assets and Meta ad campaigns.',
      'Applied campaign strategy to audience engagement and brand promotion.',
    ],
  },
]

export default function Experience() {
  return (
    <section
      id="parcours"
      className="relative scroll-mt-20 bg-ink px-5 py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1500px]">
        <Reveal>
          <SectionLabel index="02" fr="Parcours" en="Experience" />
        </Reveal>

        <div className="mt-9 flex flex-wrap items-end justify-between gap-8">
          <Reveal delay={80}>
            <h2 className="font-display text-[clamp(2.7rem,6.2vw,5.3rem)] leading-[0.93] tracking-[-0.02em] text-bone">
              The work <em className="text-violet">so far.</em>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="max-w-xs text-[0.9rem] leading-relaxed text-bone/60">
              Four roles, one thread: helping brands and communities speak the same language.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 border-b border-bone/15">
          {roles.map((item, index) => (
            <Reveal
              as="article"
              key={item.role}
              delay={index * 60}
              className="group grid gap-5 border-t border-bone/15 py-10 transition-colors duration-500 md:grid-cols-12 md:gap-8 md:py-12"
            >
              <div className="md:col-span-3">
                <p className="text-[9px] uppercase tracking-[0.22em] text-violet/85">
                  {item.period}
                </p>
                <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-bone/45">
                  {item.place}
                </p>
              </div>

              <div className="md:col-span-9">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-display text-[clamp(1.7rem,3.2vw,2.5rem)] leading-tight text-bone transition-colors duration-500 group-hover:text-violet">
                    {item.role}
                  </h3>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-bone/55">
                    {item.org}
                  </span>
                </div>

                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 sm:gap-x-8">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-[0.85rem] leading-relaxed text-bone/70"
                    >
                      <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-sage/80" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
