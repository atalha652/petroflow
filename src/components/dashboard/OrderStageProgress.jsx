import { productionStageToolkit } from '../../data/orderStages.js'

function SubstageItem({ label, status }) {
  const statusClass =
    status === 'complete'
      ? 'border-brand/30 bg-brand/10 text-brand-text'
      : status === 'current'
        ? 'border-brand bg-brand/15 text-brand-text'
        : 'border-border bg-surface text-fg-muted'

  return (
    <li
      className={`rounded-lg border px-3 py-2 text-sm font-medium ${statusClass}`}
    >
      {label}
    </li>
  )
}

export default function OrderStageProgress({ order }) {
  const progress = productionStageToolkit.getStageProgress(order)
  const { stages } = productionStageToolkit

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-border bg-canvas/60 p-4">
        <p className="m-0 text-[11px] leading-tight text-fg-muted">Overall progress</p>
        <p className="mt-1 m-0 text-sm font-medium text-fg">
          {order.stagesComplete} / {order.stagesTotal} substages{' '}
          <span className="text-fg-muted">({progress}%)</span>
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-code-bg">
          <div
            className="h-full rounded-full bg-brand transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {stages.map((stage) => (
          <section
            key={stage.id}
            className="rounded-xl border border-border bg-canvas/40 p-4"
          >
            <h4 className="m-0 text-sm font-semibold text-fg">{stage.label}</h4>
            <ul className="mt-3 flex flex-col gap-2 p-0 m-0 list-none">
              {stage.substages.map((substage) => (
                <SubstageItem
                  key={substage.id}
                  label={substage.label}
                  status={productionStageToolkit.getSubstageStatus(order, substage.label)}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
