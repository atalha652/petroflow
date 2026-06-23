import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import OrderTable from '../components/dashboard/OrderTable.jsx'
import StatCard from '../components/dashboard/StatCard.jsx'
import { formatCurrency, mockImportEntries, mockOrders } from '../data/mockOrders.js'

const assignedOrders = mockOrders.filter((o) => o.importerUser === 'Sara M.')
const assignedImports = mockImportEntries.filter((entry) =>
  assignedOrders.some((order) => order.id === entry.orderId),
)
const totalSpend = assignedImports.reduce((sum, entry) => sum + entry.totalCost, 0)

export default function ImporterDashboardPage() {
  return (
    <DashboardLayout
      role="importer"
      title="My Orders"
      subtitle="Log imported equipment, quantities, and costs for assigned orders."
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Assigned orders" value={assignedOrders.length} />
          <StatCard label="Import entries" value={assignedImports.length} />
          <StatCard label="Total logged spend" value={formatCurrency(totalSpend)} />
        </div>

        <div>
          <h2 className="m-0 mb-4 text-lg font-semibold text-fg">Assigned orders</h2>
          <OrderTable orders={assignedOrders} />
        </div>

        <div>
          <h2 className="m-0 mb-4 text-lg font-semibold text-fg">Recent import log</h2>
          <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-fg-muted">
                  <th className="px-4 py-3 font-medium sm:px-5">Item</th>
                  <th className="px-4 py-3 font-medium sm:px-5">Qty</th>
                  <th className="px-4 py-3 font-medium sm:px-5">Unit cost</th>
                  <th className="px-4 py-3 font-medium sm:px-5">Total</th>
                  <th className="px-4 py-3 font-medium sm:px-5">Supplier</th>
                  <th className="px-4 py-3 font-medium sm:px-5">Date</th>
                </tr>
              </thead>
              <tbody>
                {assignedImports.map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-border last:border-b-0 hover:bg-canvas/50"
                  >
                    <td className="px-4 py-4 font-medium text-fg sm:px-5">{entry.itemName}</td>
                    <td className="px-4 py-4 text-fg sm:px-5">{entry.quantity}</td>
                    <td className="px-4 py-4 text-fg sm:px-5">
                      {formatCurrency(entry.unitCost)}
                    </td>
                    <td className="px-4 py-4 font-medium text-fg sm:px-5">
                      {formatCurrency(entry.totalCost)}
                    </td>
                    <td className="px-4 py-4 text-fg-muted sm:px-5">{entry.supplier}</td>
                    <td className="px-4 py-4 text-fg-muted sm:px-5">{entry.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
