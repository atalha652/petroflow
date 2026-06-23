import DashboardLayout from '../../components/dashboard/DashboardLayout.jsx'
import Button from '../../components/ui/Button.jsx'
import { mockClients } from '../../data/mockAdmin.js'

export default function AdminClientsPage() {
  return (
    <DashboardLayout
      role="admin"
      title="Clients"
      subtitle="Manage client records — name, contact, and pump site location."
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0 text-sm text-fg-muted">
            {mockClients.length} clients registered
          </p>
          <Button type="button" className="w-full sm:w-auto sm:max-w-[160px]">
            Add client
          </Button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-fg-muted">
                <th className="px-4 py-3 font-medium sm:px-5">Client name</th>
                <th className="px-4 py-3 font-medium sm:px-5">Contact phone</th>
                <th className="px-4 py-3 font-medium sm:px-5">Site location</th>
              </tr>
            </thead>
            <tbody>
              {mockClients.map((client) => (
                <tr
                  key={client.id}
                  className="border-b border-border last:border-b-0 hover:bg-canvas/50"
                >
                  <td className="px-4 py-4 font-medium text-fg sm:px-5">{client.name}</td>
                  <td className="px-4 py-4 text-fg-muted sm:px-5">{client.contactPhone}</td>
                  <td className="px-4 py-4 text-fg-muted sm:px-5">{client.siteLocation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
