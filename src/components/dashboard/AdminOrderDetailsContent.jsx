import {
  RiCalendarLine,
  RiTimeLine,
} from 'react-icons/ri'
import {
  formatCurrency,
  formatOrderAmount,
  getOrderTotal,
} from '../../data/mockOrders.js'
import { formatStageLabel, productionStageToolkit } from '../../data/orderStages.js'
import OrderStageProgress from './OrderStageProgress.jsx'
import OrderStageStepper from './OrderStageStepper.jsx'

export function getClientInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function getStatusBadge(status) {
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

export function DetailCell({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="m-0 text-[11px] leading-tight text-fg-muted">{label}</p>
      <p className="mt-1 m-0 break-words text-sm font-medium leading-snug text-fg">
        {value}
      </p>
    </div>
  )
}

export function InfoBox({ icon: Icon, label, value }) {
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

export default function AdminOrderDetailsContent({
  order,
  showExtended = false,
  stageView = 'grid',
  showStageProgress = true,
}) {
  const total = getOrderTotal(order)
  const badge = getStatusBadge(order.status)
  const itemCount = order.items?.length ?? 0

  return (
    <div className="flex flex-col gap-4">
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

      <div className="min-w-0 text-left">
        <h3 className="m-0 text-base font-semibold leading-snug text-fg">{order.name}</h3>
        <p className="mt-1 m-0 text-sm leading-relaxed text-fg-muted">
          {itemCount} scope items · {order.client}
        </p>
        <p className="mt-1 m-0 text-xs leading-relaxed text-fg-muted">
          Created on: {order.orderTime}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <InfoBox icon={RiCalendarLine} label="Scheduled date" value={order.scheduledTime} />
        <InfoBox icon={RiTimeLine} label="Current stage" value={formatStageLabel(order.currentStage)} />
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        <DetailCell label="Fulfillment" value={order.fulfillmentMode} />
        <DetailCell label="Production lead" value={order.productionUser} />
        <DetailCell label="Total amount" value={formatOrderAmount(total)} />
        <DetailCell label="Importer" value={order.importerUser} />
        <DetailCell label="Budget type" value={order.budgetType} />
        <DetailCell label="Site location" value={order.location} />
      </div>

      {showExtended ? (
        <>
          {showStageProgress ? (
            stageView === 'stepper' ? (
              <OrderStageStepper
                toolkit={productionStageToolkit}
                progress={order}
                heading="Production progress"
              />
            ) : (
              <OrderStageProgress order={order} />
            )
          ) : null}

          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <DetailCell label="Order number" value={`#${order.orderNumber}`} />
            <DetailCell label="Import spend" value={formatCurrency(order.importSpend)} />
            {order.siteAddress ? (
              <div className="col-span-2">
                <DetailCell label="Site address" value={order.siteAddress} />
              </div>
            ) : null}
            <DetailCell label="Production update" value={order.lastProductionUpdate} />
            <DetailCell label="Import update" value={order.lastImportUpdate} />
          </div>

          {order.items?.length ? (
            <div>
              <p className="m-0 text-sm font-semibold text-fg">Scope items</p>
              <div className="mt-3 overflow-hidden rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-canvas/60 text-xs uppercase tracking-wide text-fg-muted">
                      <th className="px-3 py-2.5 font-medium">Item</th>
                      <th className="px-3 py-2.5 font-medium">Qty</th>
                      <th className="px-3 py-2.5 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.id} className="border-b border-border last:border-b-0">
                        <td className="px-3 py-3 font-medium text-fg">{item.name}</td>
                        <td className="px-3 py-3 text-fg-muted">{item.quantity}</td>
                        <td className="px-3 py-3 text-fg">{formatOrderAmount(item.totalCost)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
