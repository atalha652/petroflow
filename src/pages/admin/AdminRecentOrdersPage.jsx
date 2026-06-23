import { useMemo, useState } from 'react'
import { GiOilPump, GiShipWheel } from 'react-icons/gi'
import { RiSearchLine } from 'react-icons/ri'
import DashboardLayout from '../../components/dashboard/DashboardLayout.jsx'
import ProgressItemCard from '../../components/dashboard/ProgressItemCard.jsx'
import { getProgressImage } from '../../data/progressImages.js'
import {
  formatCurrency,
  getStageProgress,
  mockImportEntries,
  mockOrders,
} from '../../data/mockOrders.js'

const tabs = [
  { id: 'production', label: 'Production' },
  { id: 'imported', label: 'Imported' },
]

function getOrderBadge(status) {
  if (status === 'Completed') return null
  if (status === 'Not Started') return 'Not started'
  return 'In progress'
}

function getOrderProgressVariant(status) {
  if (status === 'Completed') return 'complete'
  if (status === 'Not Started') return 'pending'
  return 'active'
}

function getImportProgressVariant(entry, order) {
  if (order?.status === 'Completed') return 'complete'
  return 'active'
}

function ProductionTab({ searchQuery }) {
  const filteredOrders = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return mockOrders

    return mockOrders.filter(
      (order) =>
        order.name.toLowerCase().includes(query) ||
        order.client.toLowerCase().includes(query) ||
        order.orderNumber.includes(query) ||
        order.currentStage.toLowerCase().includes(query),
    )
  }, [searchQuery])

  if (filteredOrders.length === 0) {
    return (
      <p className="m-0 rounded-2xl border border-border bg-surface px-4 py-8 text-center text-sm text-fg-muted">
        No production orders match your search.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {filteredOrders.map((order) => {
        const progress = getStageProgress(order)
        const progressVariant = getOrderProgressVariant(order.status)

        return (
          <ProgressItemCard
            key={order.id}
            imageSrc={getProgressImage(order.id - 1)}
            icon={GiOilPump}
            title={`${order.client} — ${order.location.split(',')[0]}`}
            badge={getOrderBadge(order.status)}
            progressLabel={`${String(order.stagesComplete).padStart(2, '0')}/${String(order.stagesTotal).padStart(2, '0')} Stages · ${order.currentStage}`}
            timeLeft={
              order.status === 'Completed'
                ? 'Complete'
                : order.lastProductionUpdate === '—'
                  ? 'Not started'
                  : order.lastProductionUpdate
            }
            metaPrimary={`Site order • Updated ${order.lastProductionUpdate}`}
            metaSecondary={`#${order.orderNumber} · ${order.scheduledTime} · ${progress}% complete`}
            members={[order.productionUser, order.importerUser].filter(Boolean)}
            progressVariant={progressVariant}
          />
        )
      })}
    </div>
  )
}

function ImportedTab({ searchQuery }) {
  const ordersById = useMemo(
    () => Object.fromEntries(mockOrders.map((order) => [order.id, order])),
    [],
  )

  const filteredEntries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return mockImportEntries

    return mockImportEntries.filter((entry) => {
      const order = ordersById[entry.orderId]
      return (
        entry.itemName.toLowerCase().includes(query) ||
        entry.supplier.toLowerCase().includes(query) ||
        order?.name.toLowerCase().includes(query) ||
        order?.client.toLowerCase().includes(query)
      )
    })
  }, [ordersById, searchQuery])

  if (filteredEntries.length === 0) {
    return (
      <p className="m-0 rounded-2xl border border-border bg-surface px-4 py-8 text-center text-sm text-fg-muted">
        No imported equipment records match your search.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {filteredEntries.map((entry) => {
        const order = ordersById[entry.orderId]
        const progressVariant = getImportProgressVariant(entry, order)

        return (
          <ProgressItemCard
            key={entry.id}
            imageSrc={getProgressImage(entry.orderId - 1)}
            icon={GiShipWheel}
            title={entry.itemName}
            badge={order?.status === 'Completed' ? null : 'Import log'}
            progressLabel={`${entry.quantity} Units · ${formatCurrency(entry.totalCost)}`}
            timeLeft={order?.lastImportUpdate ?? entry.date}
            metaPrimary={`${entry.supplier} • Logged ${entry.date}`}
            metaSecondary={
              order
                ? `#${order.orderNumber} · ${order.client} · ${order.location}`
                : `Order ${entry.orderId}`
            }
            members={order?.importerUser ? [order.importerUser, order.productionUser] : []}
            progressVariant={progressVariant}
          />
        )
      })}
    </div>
  )
}

export default function AdminRecentOrdersPage() {
  const [activeTab, setActiveTab] = useState('production')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <DashboardLayout
      role="admin"
      title="Recent Orders"
      subtitle="Open an existing petrol pump order or review the latest site and import activity."
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative w-full sm:max-w-md">
            <RiSearchLine
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted"
              size={18}
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search orders, sites, or items"
              className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-fg outline-none transition-colors placeholder:text-fg-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </label>

          <div className="inline-flex w-full shrink-0 rounded-xl border border-border bg-surface p-1 sm:w-auto sm:min-w-[240px]">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-brand text-white shadow-sm shadow-brand/20'
                      : 'text-fg-muted hover:bg-canvas hover:text-fg'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {activeTab === 'production' ? (
          <ProductionTab searchQuery={searchQuery} />
        ) : (
          <ImportedTab searchQuery={searchQuery} />
        )}
      </div>
    </DashboardLayout>
  )
}
