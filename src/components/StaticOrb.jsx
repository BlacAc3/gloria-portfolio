/**
 * Static CSS stand-in for the hero orb. Used while the 3D chunk loads, when
 * WebGL is unavailable, and when the visitor prefers reduced motion.
 */
export default function StaticOrb() {
  return (
    <div className="relative h-full w-full" aria-hidden="true">
      <div
        className="absolute inset-[16%] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 31% 27%, #e8dcff 0%, #b091ea 16%, #7048c4 36%, #3a7457 60%, #4a3327 80%, #201620 100%)',
          boxShadow:
            '0 0 130px rgba(189, 163, 255, 0.34), 0 0 60px rgba(168, 207, 180, 0.18)',
        }}
      />
      <div className="absolute inset-[15%] rounded-full ring-1 ring-violet/45" />
      <div className="absolute inset-[8%] rounded-full border border-dashed border-sage/40" />
      <div className="absolute inset-[2%] rounded-full border border-bone/15" />
    </div>
  )
}
