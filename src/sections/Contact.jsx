import Reveal from '../components/Reveal'
import SectionLabel from '../components/SectionLabel'

const phones = [
  { label: '0907 711 0680', href: 'tel:+2349077110680' },
  { label: '0816 823 9437', href: 'tel:+2348168239437' },
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-20 bg-bone px-5 pt-24 text-ink md:px-10 md:pt-36"
    >
      <div className="mx-auto max-w-[1500px]">
        <Reveal>
          <SectionLabel index="04" fr="Contact" en="Say bonjour" tone="light" />
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal delay={80}>
              <h2 className="font-display text-[clamp(2.7rem,7vw,6rem)] leading-[0.9] tracking-[-0.025em]">
                Let’s make something
                <br />
                <em className="text-violet-deep">worth sharing.</em>
              </h2>
            </Reveal>

            <Reveal delay={160} className="mt-10">
              <p className="text-[9px] uppercase tracking-[0.24em] text-ink/60">
                Écrivez-moi / Write to me
              </p>
              <a
                href="mailto:bamgboyeglory3@gmail.com"
                className="link-underline mt-3 inline-block break-all font-display text-[clamp(1.45rem,4.4vw,3.1rem)] leading-tight text-ink transition-colors duration-500 hover:text-violet-deep"
              >
                bamgboyeglory3@gmail.com
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-3 lg:col-start-10">
            <Reveal delay={200} className="space-y-8">
              <div>
                <p className="text-[8px] uppercase tracking-[0.24em] text-ink/60">Téléphone</p>
                <ul className="mt-3 space-y-1.5">
                  {phones.map((phone) => (
                    <li key={phone.href}>
                      <a
                        href={phone.href}
                        className="text-[0.9rem] tracking-wide text-ink/80 transition-colors hover:text-violet-deep"
                      >
                        {phone.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[8px] uppercase tracking-[0.24em] text-ink/60">Basée à</p>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-ink/80">
                  Yaba, Lagos
                  <br />
                  Nigeria
                </p>
              </div>

              <div>
                <p className="text-[8px] uppercase tracking-[0.24em] text-ink/60">
                  Disponibilité
                </p>
                <p className="mt-3 text-[0.85rem] leading-relaxed text-ink/70">
                  Open to internships, campus campaigns and brand content work.
                </p>
              </div>

              <p className="text-[9px] uppercase tracking-[0.22em] text-ink/55">
                Références disponibles sur demande
              </p>
            </Reveal>
          </div>
        </div>

        <footer className="mt-20 border-t border-ink/25 py-8 md:mt-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/35 font-display text-[0.95rem] tracking-tight text-ink">
                GB
              </span>
              <p className="text-[9px] uppercase leading-[1.8] tracking-[0.22em] text-ink/70">
                Glory Bamgboye
                <br />
                Brand & content storyteller
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[9px] uppercase tracking-[0.22em] text-ink/65">
              <span>© 2026</span>
              <span className="hidden h-px w-6 bg-ink/30 sm:block" />
              <span>Conçu à Lagos</span>
              <a
                href="#top"
                className="group inline-flex items-center gap-2 text-ink/75 transition-colors hover:text-violet-deep"
              >
                Retour en haut
                <span
                  aria-hidden="true"
                  className="transition-transform duration-500 group-hover:-translate-y-0.5"
                >
                  ↑
                </span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}
