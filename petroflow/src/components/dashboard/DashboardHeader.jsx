import { Link } from 'react-router-dom'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import LogoMark from '../auth/LogoMark.jsx'
import ThemeToggle from '../ThemeToggle.jsx'
import { clearAuthSession } from '../../utils/authStorage.js'

const roleLabels = {
  admin: 'Admin',
  production: 'Production',
  importer: 'Importer',
}

const dashboardHome = {
  admin: '/dashboard-admin/recent-orders',
  production: '/dashboard-production',
  importer: '/dashboard-importer',
}

export default function DashboardHeader({ role }) {
  return (
    <header className="border-b border-border bg-header">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          to={dashboardHome[role]}
          className="flex min-w-0 shrink-0 items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white shadow-sm shadow-brand/20">
            <LogoMark size={18} />
          </div>
          <div className="min-w-0">
            <span className="block font-sans text-lg font-semibold leading-none tracking-tight text-brand-text sm:text-xl">
              PetroFlow
            </span>
            <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-wide text-fg-muted sm:text-xs">
              {roleLabels[role]} portal
            </span>
          </div>
        </Link>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-fg transition-colors hover:border-brand-border hover:text-brand-text"
            aria-label="Profile"
            title="Profile"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-bg text-xs font-semibold text-brand-text">
              AK
            </span>
          </button>

          <ThemeToggle />

          <Link
            to="/login"
            onClick={() => clearAuthSession()}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-xl text-fg transition-colors hover:border-brand-border hover:text-brand-text"
            aria-label="Logout"
            title="Logout"
          >
            <RiLogoutCircleRLine />
          </Link>
        </div>
      </div>
    </header>
  )
}
