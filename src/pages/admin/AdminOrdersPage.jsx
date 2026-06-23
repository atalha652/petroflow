import { useMemo, useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import CreateOrderModal from '../../components/dashboard/CreateOrderModal.jsx'
import DashboardLayout from '../../components/dashboard/DashboardLayout.jsx'
import AdminOrderCard, { getOrderTabKey } from '../../components/dashboard/AdminOrderCard.jsx'
import OrderDetailsModal from '../../components/dashboard/OrderDetailsModal.jsx'
import Button from '../../components/ui/Button.jsx'
import { mockOrders } from '../../data/mockOrders.js'

const tabs = [
  { id: 'completed', label: 'Completed' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'initialized', label: 'Initialized' },
]

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(mockOrders)
  const [activeTab, setActiveTab] = useState('in-progress')
  const [searchQuery, setSearchQuery] = useState('')
  const [appliedSearch, setAppliedSearch] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingOrder, setEditingOrder] = useState(null)
  const [detailsOrder, setDetailsOrder] = useState(null)

  const tabOrders = useMemo(
    () => orders.filter((order) => getOrderTabKey(order.status) === activeTab),
    [activeTab, orders],
  )

  const filteredOrders = useMemo(() => {
    const query = appliedSearch.trim().toLowerCase()
    if (!query) return tabOrders

    return tabOrders.filter(
      (order) =>
        order.name.toLowerCase().includes(query) ||
        order.client.toLowerCase().includes(query) ||
        order.orderNumber.includes(query) ||
        order.location.toLowerCase().includes(query),
    )
  }, [appliedSearch, tabOrders])

  function handleSearchSubmit(event) {
    event.preventDefault()
    setAppliedSearch(searchQuery)
  }

  function handleCreateOrder(order) {
    const nextOrderNumber = String(
      Math.max(...orders.map((entry) => Number(entry.orderNumber) || 0)) + 1,
    )

    setOrders((current) => [
      {
        ...order,
        id: Math.max(...current.map((entry) => entry.id), 0) + 1,
        orderNumber: nextOrderNumber,
      },
      ...current,
    ])
    setActiveTab('initialized')
  }

  function handleUpdateOrder(updatedOrder) {
    setOrders((current) =>
      current.map((entry) => (entry.id === updatedOrder.id ? updatedOrder : entry)),
    )
  }

  return (
    <DashboardLayout
      role="admin"
      title="Orders"
      subtitle="Create and assign petrol pump orders — link customers with Production and Importer users."
    >
      <div className="flex flex-col gap-5">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center"
          >
            <label className="relative min-w-0 flex-1">
              <RiSearchLine
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted"
                size={18}
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search orders, customers, or site locations"
                className="w-full rounded-xl border border-border bg-header py-2.5 pl-10 pr-4 text-sm text-fg outline-none transition-colors placeholder:text-fg-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </label>
            <Button type="submit" className="w-full shrink-0 sm:w-auto sm:min-w-[120px]">
              Search
            </Button>
          </form>

          <div className="grid w-full grid-cols-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              const count = orders.filter(
                (order) => getOrderTabKey(order.status) === tab.id,
              ).length

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`border-b-2 px-2 py-3 text-center text-sm font-semibold transition-colors sm:px-4 ${
                    isActive
                      ? 'border-brand text-brand-text'
                      : 'border-transparent text-fg-muted hover:text-fg'
                  }`}
                >
                  <span className="block truncate">
                    {tab.label}
                    <span className="font-medium text-fg-muted">({count})</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0 text-sm text-fg-muted">
            Showing {filteredOrders.length} of {tabOrders.length} orders
          </p>
          <Button
            type="button"
            className="w-full sm:w-auto sm:min-w-[140px]"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create order
          </Button>
        </div>

        {filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {filteredOrders.map((order) => (
              <AdminOrderCard
                key={order.id}
                order={order}
                onEdit={setEditingOrder}
                onShowDetails={setDetailsOrder}
              />
            ))}
          </div>
        ) : (
          <p className="m-0 rounded-2xl border border-border bg-surface px-4 py-10 text-center text-sm text-fg-muted">
            No orders found for this tab.
          </p>
        )}
      </div>

      <CreateOrderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateOrder}
      />

      <CreateOrderModal
        isOpen={editingOrder !== null}
        onClose={() => setEditingOrder(null)}
        order={editingOrder}
        onSave={handleUpdateOrder}
      />

      <OrderDetailsModal
        isOpen={detailsOrder !== null}
        onClose={() => setDetailsOrder(null)}
        order={detailsOrder}
        onEdit={setEditingOrder}
      />
    </DashboardLayout>
  )
}
