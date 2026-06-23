import {
  RiCalendarLine,
  RiCheckLine,
  RiEyeLine,
  RiFileTextLine,
  RiTimeLine,
} from 'react-icons/ri'
import { formatOrderAmount, getOrderTotal } from '../../data/mockOrders.js'

function getClientInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function getStatusBadge(status) {
  if (status === 'Completed') {
    return {
      label: 'Completed',
      className: 'bg-brand/15 text-brand-text',
    }
  }
  if (status === 'In Progress') {
    return {
      label: 'In Progress',
      className: 'bg-brand/10 text-brand-text',
    }
  }
  return {
    label: 'Initialized',
    className: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  }
}

function DetailCell({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="m-0 text-[11px] leading-tight text-fg-muted">{label}</p>
      <p className="mt-1 m-0 break-words text-sm font-medium leading-snug text-fg">
        {value}
      </p>
    </div>
  )
}

function InfoBox({ icon: Icon, label, value }) {
  return (
    <div className="flex min-h-[4.5rem] rounded-xl bg-canvas px-3 py-2.5">
      <div className="flex min-w-0 items-start gap-2">
        <Icon className="mt-0.5 shrink-0 text-brand-text" size={16} aria-hidden="true" />
        <div className="min-w-0">
          <p className="m-0 text-[11px] leading-tight text-fg-muted">{label}</p>
          <p className="mt-1 m-0 break-words text-sm font-medium leading-snug text-fg">
            {value}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AdminOrderCard({ order }) {
  const total = getOrderTotal(order)
  const badge = getStatusBadge(order.status)
  const itemCount = order.items?.length ?? 0

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-bg text-sm font-bold text-brand-text">
          {getClientInitials(order.client)}
        </span>
        <span
          className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${badge.className}`}
        >
          {badge.label}
        </span>
      </div>

      <div className="mt-3 min-w-0 text-left">
        <h3 className="m-0 text-base font-semibold leading-snug text-fg">{order.name}</h3>
        <p className="mt-1 m-0 text-sm leading-relaxed text-fg-muted">
          {itemCount} scope items · {order.client}
        </p>
        <p className="mt-1 m-0 text-xs leading-relaxed text-fg-muted">
          Created on: {order.orderTime}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <InfoBox icon={RiCalendarLine} label="Scheduled date" value={order.scheduledTime} />
        <InfoBox icon={RiTimeLine} label="Current stage" value={order.currentStage} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4">
        <DetailCell label="Fulfillment" value={order.fulfillmentMode} />
        <DetailCell label="Production lead" value={order.productionUser} />
        <DetailCell label="Total amount" value={formatOrderAmount(total)} />
        <DetailCell label="Importer" value={order.importerUser} />
        <DetailCell label="Budget type" value={order.budgetType} />
        <DetailCell label="Site location" value={order.location} />
      </div>

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
