import DashboardLayout from '../../components/dashboard/DashboardLayout.jsx'
import OrderTable from '../../components/dashboard/OrderTable.jsx'
import StatCard from '../../components/dashboard/StatCard.jsx'
import {
  formatCurrency,
  getStageProgress,
  mockOrders,
} from '../../data/mockOrders.js'

export default function AdminDashboardPage() {
  const activeOrders = mockOrders.filter((o) => o.status !== 'Completed')
  const totalImportSpend = mockOrders.reduce((sum, o) => sum + o.importSpend, 0)
  const avgProgress = Math.round(
    mockOrders.reduce((sum, o) => sum + getStageProgress(o), 0) / mockOrders.length,
  )

  return (
    <DashboardLayout
      role="admin"
      title="Dashboard"
      subtitle="Monitor all petrol pump orders, stage progress, and import costs."
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total orders" value={mockOrders.length} hint="All client sites" />
          <StatCard
            label="Active orders"
            value={activeOrders.length}
            hint="Not started or in progress"
          />
          <StatCard
            label="Avg stage progress"
            value={`${avgProgress}%`}
            hint="Across all orders"
          />
          <StatCard
            label="Total import spend"
            value={formatCurrency(totalImportSpend)}
            hint="Logged procurement costs"
          />
        </div>

        <div>
          <h2 className="m-0 mb-4 text-lg font-semibold text-fg">Recent orders</h2>
          <OrderTable orders={mockOrders.slice(0, 3)} showAssignees />
        </div>
      </div>
    </DashboardLayout>
  )
}
