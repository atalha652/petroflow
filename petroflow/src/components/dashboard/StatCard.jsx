export default function StatCard({ label, value, hint }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-fg-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-fg sm:text-3xl">{value}</p>
      {hint ? <p className="mt-1 text-sm text-fg-muted">{hint}</p> : null}
    </div>
  )
}
