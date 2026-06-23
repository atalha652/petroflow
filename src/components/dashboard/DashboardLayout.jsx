import { useLocation } from 'react-router-dom'
import DashboardHeader from './DashboardHeader.jsx'
import DashboardSidebar, {
  AdminSidebarNavHorizontal,
  DashboardSidebarNav,
} from './DashboardSidebar.jsx'

const navByRole = {
  admin: [
    { label: 'Recent Orders', to: '/dashboard-admin/recent-orders' },
    { label: 'Dashboard', to: '/dashboard-admin' },
    { label: 'Orders', to: '/dashboard-admin/orders' },
    { label: 'Customers', to: '/dashboard-admin/clients' },
    { label: 'Users', to: '/dashboard-admin/users' },
  ],
  production: [{ label: 'My Orders', to: '/dashboard-production' }],
  importer: [{ label: 'My Orders', to: '/dashboard-importer' }],
}

export default function DashboardLayout({ role, title, subtitle, children }) {
  const location = useLocation()
  const navItems = navByRole[role]

  return (
    <div className="flex min-h-svh w-full flex-col bg-canvas">
      <DashboardHeader role={role} />

      <div className="flex min-h-0 w-full flex-1">
        <DashboardSidebar navItems={navItems} activePath={location.pathname} role={role} />

        <div className="flex min-w-0 flex-1 flex-col">
          {navItems.length > 1 ? (
            <div className="scrollbar-hidden overflow-x-auto border-b border-border bg-header px-4 py-3 lg:hidden">
              {role === 'admin' ? (
                <AdminSidebarNavHorizontal
                  navItems={navItems}
                  activePath={location.pathname}
                />
              ) : (
                <DashboardSidebarNav
                  navItems={navItems}
                  activePath={location.pathname}
                  horizontal
                />
              )}
            </div>
          ) : null}

          <div className="border-b border-border bg-surface/50 px-4 py-4 sm:px-6 sm:py-5">
            <h1 className="m-0 text-xl font-semibold text-fg sm:text-2xl">{title}</h1>
            {subtitle ? <p className="mt-1 text-sm text-fg-muted">{subtitle}</p> : null}
          </div>

          <main className="scrollbar-hidden flex-1 overflow-y-auto p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
