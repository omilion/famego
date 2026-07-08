export default function Stat({ value, label, sub }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-6 text-center backdrop-blur">
      <div className="font-display text-3xl font-900 text-brand-400 sm:text-4xl">{value}</div>
      <div className="mt-1 text-xs font-700 uppercase tracking-wider text-white">{label}</div>
      {sub && <div className="mt-0.5 text-[11px] text-white/50">{sub}</div>}
    </div>
  )
}
