import { useEffect, useRef, useState } from 'react'

const links = [
  { href: '#sur-moi', fr: 'Sur moi', en: 'About' },
  { href: '#parcours', fr: 'Parcours', en: 'Experience' },
  { href: '#atelier', fr: 'Atelier', en: 'Craft' },
  { href: '#contact', fr: 'Contact', en: 'Say bonjour' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const closeRef = useRef(null)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 24))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (!open) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-colors duration-500 ${
          scrolled || open
            ? 'border-b border-bone/15 bg-ink/85 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 md:h-20 md:px-10">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-3"
            aria-label="Glory Bamgboye — back to top"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-violet/45 font-display text-[0.95rem] tracking-tight text-bone transition-colors duration-500 group-hover:border-violet group-hover:text-violet">
              GB
            </span>
            <span className="hidden text-[9px] uppercase leading-[1.7] tracking-[0.26em] text-bone/70 sm:block">
              Glory
              <br />
              Bamgboye
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group flex flex-col items-start text-[9px] uppercase tracking-[0.24em] text-bone/85 transition-colors hover:text-bone"
              >
                <span>{link.fr}</span>
                <span className="text-[8px] tracking-[0.18em] text-bone/45 transition-colors group-hover:text-violet/80">
                  {link.en}
                </span>
              </a>
            ))}
          </nav>

          <a
            href="mailto:bamgboyeglory3@gmail.com"
            className="hidden items-center gap-2 rounded-full border border-bone/25 px-5 py-2.5 text-[9px] uppercase tracking-[0.24em] text-bone transition-colors duration-500 hover:border-violet hover:bg-violet hover:text-ink md:inline-flex"
          >
            Écrivez-moi
            <span aria-hidden="true">↗</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex items-center gap-3 text-[9px] uppercase tracking-[0.24em] text-bone md:hidden"
          >
            Menu
            <span className="flex w-6 flex-col gap-1.5" aria-hidden="true">
              <span className="h-px w-full bg-current" />
              <span className="h-px w-2/3 bg-current" />
            </span>
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-[75] flex flex-col justify-between bg-ink px-5 pb-8 pt-24 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-3 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.26em] text-bone/55">
            Le sommaire
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full border border-bone/25 px-4 py-2 text-[9px] uppercase tracking-[0.24em] text-bone"
          >
            Fermer
          </button>
        </div>

        <nav aria-label="Mobile" className="flex flex-col">
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 border-t border-bone/15 py-4"
            >
              <span className="font-display text-sm text-violet">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-display text-[clamp(2.2rem,9vw,3.4rem)] leading-none tracking-tight text-bone transition-colors group-hover:text-violet">
                {link.fr}
              </span>
              <span className="ml-auto text-[9px] uppercase tracking-[0.2em] text-bone/50">
                {link.en}
              </span>
            </a>
          ))}
        </nav>

        <div className="space-y-4 border-t border-bone/15 pt-6">
          <a
            href="mailto:bamgboyeglory3@gmail.com"
            className="block font-display text-xl text-bone"
          >
            bamgboyeglory3@gmail.com
          </a>
          <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.24em] text-bone/55">
            <span>Yaba, Lagos</span>
            <span>Portfolio 2026</span>
          </div>
        </div>
      </div>
    </>
  )
}
