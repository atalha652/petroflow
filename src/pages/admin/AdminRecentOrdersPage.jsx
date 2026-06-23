import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GiOilPump, GiShipWheel } from 'react-icons/gi'
import { RiSearchLine } from 'react-icons/ri'
import DashboardLayout from '../../components/dashboard/DashboardLayout.jsx'
import ProgressItemCard from '../../components/dashboard/ProgressItemCard.jsx'
import { getProgressImage } from '../../data/progressImages.js'
import {
  getStageProgress,
  mockImportEntries,
  mockOrders,
} from '../../data/mockOrders.js'
import {
  formatStageLabel,
  getOrderCardBadge,
  getOrderCardProgressVariant,
  getOrderCardTimeLabel,
} from '../../data/orderStages.js'
import {
  formatImportStageLabel,
  getImportCardBadge,
  getImportCardProgressVariant,
  getImportCardTimeLabel,
  getImportStageProgress,
  normalizeImportProgress,
} from '../../data/importStages.js'

const tabs = [
  { id: 'production', label: 'Production' },
  { id: 'imported', label: 'Imported' },
]

function getImportProgressVariant(entry) {
  return getImportCardProgressVariant(normalizeImportProgress(entry))
}

function ProductionTab({ searchQuery, onSelectOrder }) {
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

        return (
          <ProgressItemCard
            key={order.id}
            imageSrc={getProgressImage(order.id - 1)}
            icon={GiOilPump}
            title={`${order.client} — ${order.location.split(',')[0]}`}
            badge={getOrderCardBadge(order)}
            progressLabel={`${String(order.stagesComplete).padStart(2, '0')}/${String(order.stagesTotal).padStart(2, '0')} Substages · ${formatStageLabel(order.currentStage)}`}
            timeLeft={getOrderCardTimeLabel(order)}
            metaPrimary={`${getOrderCardBadge(order)} phase • Updated ${order.lastProductionUpdate}`}
            metaSecondary={`#${order.orderNumber} · ${order.scheduledTime} · ${progress}% complete`}
            members={[order.productionUser, order.importerUser].filter(Boolean)}
            progressVariant={getOrderCardProgressVariant(order)}
            onClick={() => onSelectOrder?.(order)}
          />
        )
      })}
    </div>
  )
}

function ImportedTab({ searchQuery, onSelectEntry }) {
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
        const importProgress = normalizeImportProgress(entry)
        const progress = getImportStageProgress(importProgress)

        return (
          <ProgressItemCard
            key={entry.id}
            imageSrc={getProgressImage(entry.orderId - 1)}
            icon={GiShipWheel}
            title={entry.itemName}
            badge={getImportCardBadge(importProgress)}
            progressLabel={`${String(importProgress.stagesComplete).padStart(2, '0')}/${String(importProgress.stagesTotal).padStart(2, '0')} Substages · ${formatImportStageLabel(importProgress.currentStage)}`}
            timeLeft={getImportCardTimeLabel(importProgress)}
            metaPrimary={`${entry.supplier} • ${getImportCardBadge(importProgress)} phase`}
            metaSecondary={
              order
                ? `#${order.orderNumber} · ${order.client} · ${progress}% complete`
                : `Order ${entry.orderId}`
            }
            members={order?.importerUser ? [order.importerUser, order.productionUser] : []}
            progressVariant={getImportProgressVariant(entry)}
            onClick={() => onSelectEntry?.(entry)}
          />
        )
      })}
    </div>
  )
}

export default function AdminRecentOrdersPage() {
  const navigate = useNavigate()
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
          <ProductionTab
            searchQuery={searchQuery}
            onSelectOrder={(order) =>
              navigate(`/dashboard-admin/recent-orders/production/${order.id}`)
            }
          />
        ) : (
          <ImportedTab
            searchQuery={searchQuery}
            onSelectEntry={(entry) =>
              navigate(`/dashboard-admin/recent-orders/imported/${entry.id}`)
            }
          />
        )}
      </div>
    </DashboardLayout>
  )
}
