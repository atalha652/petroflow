import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import OrderTable from '../components/dashboard/OrderTable.jsx'
import StatCard from '../components/dashboard/StatCard.jsx'
import { getStageProgress, mockOrders } from '../data/mockOrders.js'

const assignedOrders = mockOrders.filter((o) => o.productionUser === 'Ahmed K.')

export default function ProductionDashboardPage() {
  const inProgress = assignedOrders.filter((o) => o.status === 'In Progress').length

  return (
    <DashboardLayout
      role="production"
      title="My Orders"
      subtitle="Update construction stages for your assigned petrol pump orders."
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Assigned orders" value={assignedOrders.length} />
          <StatCard label="In progress" value={inProgress} />
          <StatCard
            label="Current focus"
            value={assignedOrders[0]?.currentStage ?? '—'}
            hint="Latest active stage"
          />
        </div>

        <div>
          <h2 className="m-0 mb-4 text-lg font-semibold text-fg">Construction progress</h2>
          <OrderTable orders={assignedOrders} />
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
          <h3 className="m-0 text-base font-semibold text-fg">Stage checklist (POC)</h3>
          <p className="mt-2 text-sm text-fg-muted">
            Open an order to mark stages as Pending, In Progress, or Completed and add notes.
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-fg sm:grid-cols-2">
            {[
              'Site Survey',
              'Excavation',
              'Civil Work / Foundation',
              'Underground Tank Installation',
              'Piping & Plumbing',
              'Equipment Installation',
              'Electrical & Safety Systems',
              'Testing & Inspection',
              'Handover to Client',
            ].map((stage) => (
              <li key={stage} className="rounded-lg bg-canvas px-3 py-2">
                {stage}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  )
}
