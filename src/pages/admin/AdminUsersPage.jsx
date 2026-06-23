import { useState } from 'react'
import AddUserModal from '../../components/dashboard/AddUserModal.jsx'
import DashboardLayout from '../../components/dashboard/DashboardLayout.jsx'
import Button from '../../components/ui/Button.jsx'
import { mockUsers } from '../../data/mockAdmin.js'

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  function handleAddUser(user) {
    setUsers((current) => [
      ...current,
      {
        ...user,
        id: Math.max(...current.map((entry) => entry.id), 0) + 1,
      },
    ])
  }

  return (
    <DashboardLayout
      role="admin"
      title="Users"
      subtitle="Manage internal accounts for Admin, Production, and Importer roles."
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0 text-sm text-fg-muted">
            {users.length} users registered
          </p>
          <Button
            type="button"
            className="w-full sm:w-auto sm:max-w-[160px]"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add user
          </Button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-fg-muted">
                <th className="px-4 py-3 font-medium sm:px-5">Name</th>
                <th className="px-4 py-3 font-medium sm:px-5">Email</th>
                <th className="px-4 py-3 font-medium sm:px-5">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border last:border-b-0 hover:bg-canvas/50"
                >
                  <td className="px-4 py-4 font-medium text-fg sm:px-5">{user.name}</td>
                  <td className="px-4 py-4 text-fg-muted sm:px-5">{user.email}</td>
                  <td className="px-4 py-4 text-fg sm:px-5">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCreate={handleAddUser}
      />
    </DashboardLayout>
  )
}
