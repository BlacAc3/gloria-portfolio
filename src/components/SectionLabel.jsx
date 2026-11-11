export default function SectionLabel({ index, fr, en, tone = 'dark' }) {
  const light = tone === 'light'
  const dim = light ? 'text-ink/60' : 'text-bone/65'
  const rule = light ? 'bg-ink/30' : 'bg-bone/30'
  const accent = light ? 'text-violet-deep' : 'text-violet'

  return (
    <div
      className={`flex items-center gap-3 text-[9px] uppercase tracking-[0.28em] ${dim}`}
    >
      <span className={`font-display text-sm tracking-normal ${accent}`}>{index}</span>
      <span className="h-px w-6 bg-current opacity-40" />
      <span className={light ? 'text-ink' : 'text-bone'}>{fr}</span>
      <span className={`hidden h-px max-w-20 flex-1 sm:block ${rule}`} />
      <span className="hidden sm:inline">{en}</span>
    </div>
  )
}
