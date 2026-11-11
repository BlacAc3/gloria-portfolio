const words = [
  'Brand storytelling',
  'Contenu & réseaux',
  'Stratégie de marque',
  'Media buying',
  'Lagos ↔ Paris',
  'Le Cercle',
  'Canva · CapCut',
  'Francofest',
]

function Row() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {words.map((word) => (
        <span key={word} className="flex items-center">
          <span className="whitespace-nowrap px-6 text-[10px] uppercase tracking-[0.3em] text-bone/65">
            {word}
          </span>
          <span className="font-display text-sm text-violet/85">✦</span>
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div
      className="relative overflow-hidden border-y border-bone/15 bg-ink py-5"
      role="presentation"
    >
      <div className="marquee-track">
        <Row />
        <Row />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent" />
    </div>
  )
}
