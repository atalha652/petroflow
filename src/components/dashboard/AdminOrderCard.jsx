import {
  RiCheckLine,
  RiEyeLine,
  RiFileTextLine,
  RiPencilLine,
} from 'react-icons/ri'
import AdminOrderDetailsContent from './AdminOrderDetailsContent.jsx'

export default function AdminOrderCard({ order, onEdit, onShowDetails }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-4 shadow-sm">
      <AdminOrderDetailsContent order={order} />

      {order.status === 'In Progress' ? (
        <div className="mt-4">
          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            <RiCheckLine size={16} aria-hidden="true" />
            Mark as complete
          </button>
        </div>
      ) : null}

      {order.status === 'Not Started' ? (
        <div className="mt-4">
          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-border bg-surface px-4 py-2.5 text-sm font-semibold text-brand-text transition-colors hover:bg-brand-bg"
          >
            Assign production team
          </button>
        </div>
      ) : null}

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-3">
        <span className="shrink-0 text-xs font-medium text-fg-muted">#{order.orderNumber}</span>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-fg-muted transition-colors hover:border-brand-border hover:text-brand-text"
            aria-label="View order document"
          >
            <RiFileTextLine size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onEdit?.(order)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-fg transition-colors hover:border-brand-border hover:text-brand-text"
          >
            <RiPencilLine size={14} aria-hidden="true" />
            Edit
          </button>
          <button
            type="button"
            onClick={() => onShowDetails?.(order)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-fg transition-colors hover:border-brand-border hover:text-brand-text"
          >
            <RiEyeLine size={14} aria-hidden="true" />
            Show details
          </button>
        </div>
      </div>
    </article>
  )
}

export function getOrderTabKey(status) {
  if (status === 'Completed') return 'completed'
  if (status === 'In Progress') return 'in-progress'
  return 'initialized'
}
