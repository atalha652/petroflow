import { formatCurrency, getStageProgress } from '../../data/mockOrders.js'
import StatusBadge from './StatusBadge.jsx'

function ProgressBar({ value }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-code-bg">
      <div
        className="h-full rounded-full bg-brand transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

export default function OrderTable({ orders, showAssignees = false }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wide text-fg-muted">
            <th className="px-4 py-3 font-medium sm:px-5">Order</th>
            <th className="px-4 py-3 font-medium sm:px-5">Status</th>
            <th className="px-4 py-3 font-medium sm:px-5">Stages</th>
            <th className="px-4 py-3 font-medium sm:px-5">Import spend</th>
            {showAssignees ? (
              <th className="px-4 py-3 font-medium sm:px-5">Assigned</th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const progress = getStageProgress(order)

            return (
              <tr
                key={order.id}
                className="border-b border-border last:border-b-0 hover:bg-canvas/50"
              >
                <td className="px-4 py-4 sm:px-5">
                  <p className="font-medium text-fg">{order.name}</p>
                  <p className="mt-0.5 text-xs text-fg-muted">
                    {order.client} · {order.location}
                  </p>
                </td>
                <td className="px-4 py-4 sm:px-5">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-4 py-4 sm:px-5">
                  <div className="min-w-[120px]">
                    <p className="font-medium text-fg">
                      {order.stagesComplete} / {order.stagesTotal}{' '}
                      <span className="text-fg-muted">({progress}%)</span>
                    </p>
                    <div className="mt-2">
                      <ProgressBar value={progress} />
                    </div>
                    <p className="mt-1.5 text-xs text-fg-muted">{order.currentStage}</p>
                  </div>
                </td>
                <td className="px-4 py-4 font-medium text-fg sm:px-5">
                  {formatCurrency(order.importSpend)}
                </td>
                {showAssignees ? (
                  <td className="px-4 py-4 text-fg-muted sm:px-5">
                    <p className="text-sm">{order.productionUser}</p>
                    <p className="text-sm">{order.importerUser}</p>
                  </td>
                ) : null}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
