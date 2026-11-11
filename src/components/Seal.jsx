import { useId } from 'react'

/**
 * A slowly rotating circular seal — the Cercle Français motif used as a stamp.
 */
export default function Seal({
  className = '',
  text = 'GLORY BAMGBOYE · LAGOS · NIGERIA · 2026 · ',
}) {
  const rawId = useId()
  const id = `seal-${rawId.replace(/[:]/g, '')}`

  return (
    <div className={`relative aspect-square ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="seal-spin h-full w-full">
        <defs>
          <path
            id={id}
            d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"
            fill="none"
          />
        </defs>
        <text fontSize="9" letterSpacing="3.6" fill="currentColor">
          <textPath href={`#${id}`} startOffset="0">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display text-[2.2rem] leading-none tracking-tight">
        GB
      </span>
      <span className="absolute inset-[27%] rounded-full border border-current opacity-25" />
      <span className="absolute inset-[8%] rounded-full border border-current opacity-10" />
    </div>
  )
}
