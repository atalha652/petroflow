import { Link, useParams } from 'react-router-dom'
import { RiArrowLeftLine } from 'react-icons/ri'
import AdminOrderDetailsContent, { DetailCell } from '../../components/dashboard/AdminOrderDetailsContent.jsx'
import OrderStageStepper from '../../components/dashboard/OrderStageStepper.jsx'
import DashboardLayout from '../../components/dashboard/DashboardLayout.jsx'
import {
  importStageToolkit,
  normalizeImportProgress,
} from '../../data/importStages.js'
import { productionStageToolkit } from '../../data/orderStages.js'
import {
  formatCurrency,
  formatOrderAmount,
  getImportProgressForOrder,
  mockImportEntries,
  mockOrders,
} from '../../data/mockOrders.js'

function BackLink() {
  return (
    <Link
      to="/dashboard-admin/recent-orders"
      className="inline-flex w-fit items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-brand-border hover:text-brand-text"
    >
      <RiArrowLeftLine size={16} aria-hidden="true" />
      Back to recent orders
    </Link>
  )
}

function NotFoundMessage({ message }) {
  return (
    <div className="flex flex-col gap-4">
      <BackLink />
      <p className="m-0 rounded-2xl border border-border bg-surface px-4 py-10 text-center text-sm text-fg-muted">
        {message}
      </p>
    </div>
  )
}

export function AdminRecentProductionDetailPage() {
  const { orderId } = useParams()
  const order = mockOrders.find((entry) => String(entry.id) === orderId)
  const importProgress =
    getImportProgressForOrder(order?.id) ??
    (order?.currentImportStage
      ? normalizeImportProgress(order)
      : null)

  if (!order) {
    return (
      <DashboardLayout
        role="admin"
        title="Order details"
        subtitle="Production order not found."
      >
        <NotFoundMessage message="This production order could not be found." />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout
      role="admin"
      title="Order details"
      subtitle={`Production activity for ${order.client} — ${order.location}`}
    >
      <div className="flex flex-col gap-5">
        <BackLink />

        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex flex-col gap-1 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="m-0 text-xs font-semibold uppercase tracking-wide text-fg-muted">
                Order #{order.orderNumber}
              </p>
              <h2 className="mt-1 m-0 text-xl font-semibold text-fg">{order.name}</h2>
              <p className="mt-1 m-0 text-sm text-fg-muted">
                {order.client} · {order.location}
              </p>
            </div>
          </div>
          <OrderStageStepper
            toolkit={productionStageToolkit}
            progress={order}
            heading="Production progress"
          />
        </div>

        {importProgress ? (
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
            <div className="mb-6 border-b border-border pb-5">
              <p className="m-0 text-xs font-semibold uppercase tracking-wide text-fg-muted">
                Import procurement
              </p>
              <h2 className="mt-1 m-0 text-lg font-semibold text-fg">
                Equipment & materials sourcing
              </h2>
            </div>
            <OrderStageStepper
              toolkit={importStageToolkit}
              progress={importProgress}
              heading="Import progress"
              minWidth={780}
            />
          </div>
        ) : null}

        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <h3 className="m-0 text-sm font-semibold uppercase tracking-wide text-fg-muted">
            Order details
          </h3>
          <div className="mt-4">
            <AdminOrderDetailsContent order={order} showExtended showStageProgress={false} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export function AdminRecentImportDetailPage() {
  const { entryId } = useParams()
  const entry = mockImportEntries.find((item) => String(item.id) === entryId)
  const order = entry ? mockOrders.find((item) => item.id === entry.orderId) : null
  const importProgress = entry ? normalizeImportProgress(entry) : null

  if (!entry) {
    return (
      <DashboardLayout
        role="admin"
        title="Import details"
        subtitle="Import record not found."
      >
        <NotFoundMessage message="This import record could not be found." />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout
      role="admin"
      title="Import details"
      subtitle={entry.itemName}
    >
      <div className="flex flex-col gap-5">
        <BackLink />

        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex flex-col gap-1 border-b border-border pb-5">
            <p className="m-0 text-xs font-semibold uppercase tracking-wide text-fg-muted">
              Import record
            </p>
            <h2 className="mt-1 m-0 text-xl font-semibold text-fg">{entry.itemName}</h2>
            <p className="mt-1 m-0 text-sm text-fg-muted">
              Logged on {entry.date} · {entry.supplier}
            </p>
          </div>

          {importProgress ? (
            <OrderStageStepper
              toolkit={importStageToolkit}
              progress={importProgress}
              heading="Import progress"
              minWidth={780}
            />
          ) : null}

          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3">
            <DetailCell label="Quantity" value={String(entry.quantity)} />
            <DetailCell label="Unit cost" value={formatOrderAmount(entry.unitCost)} />
            <DetailCell label="Total cost" value={formatCurrency(entry.totalCost)} />
            <DetailCell label="Supplier" value={entry.supplier} />
            <DetailCell label="Date logged" value={entry.date} />
            <DetailCell
              label="Linked order"
              value={order ? `#${order.orderNumber}` : `Order ${entry.orderId}`}
            />
          </div>
        </div>

        {order ? (
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
            <h3 className="m-0 text-sm font-semibold uppercase tracking-wide text-fg-muted">
              Related production order
            </h3>
            <div className="mt-4">
              <AdminOrderDetailsContent order={order} showExtended showStageProgress={false} />
            </div>
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  )
}
