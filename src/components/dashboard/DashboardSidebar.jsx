import { Link } from 'react-router-dom'
import { RiGasStationLine } from 'react-icons/ri'
import AdminSidebar, { AdminSidebarNavHorizontal } from './AdminSidebar.jsx'

const navIcons = {
  '/dashboard-production': RiGasStationLine,
  '/dashboard-importer': RiGasStationLine,
}

function NavLink({ item, isActive, horizontal }) {
  const Icon = navIcons[item.to] ?? RiGasStationLine

  if (horizontal) {
    return (
      <Link
        to={item.to}
        className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all ${
          isActive
            ? 'border-brand/30 bg-brand text-white shadow-sm shadow-brand/25'
            : 'border-border bg-surface text-fg-muted hover:border-brand-border hover:text-fg'
        }`}
      >
        <Icon size={16} aria-hidden="true" />
        {item.label}
      </Link>
    )
  }

  return (
    <Link
      to={item.to}
      className={`group flex items-center gap-3 rounded-xl border-l-[3px] px-3 py-2.5 text-sm font-medium transition-all ${
        isActive
          ? 'border-brand bg-brand-bg text-brand-text shadow-sm shadow-brand/10'
          : 'border-transparent text-fg-muted hover:border-brand/20 hover:bg-canvas hover:text-fg'
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
          isActive
            ? 'bg-brand text-white'
            : 'bg-code-bg text-fg-muted group-hover:bg-brand-bg group-hover:text-brand-text'
        }`}
      >
        <Icon size={18} aria-hidden="true" />
      </span>

      <span className="truncate">{item.label}</span>
    </Link>
  )
}

export function DashboardSidebarNav({
  navItems,
  activePath,
  className = '',
  horizontal = false,
}) {
  return (
    <nav
      className={`flex ${horizontal ? 'min-w-max flex-row gap-2' : 'flex-col gap-1'} ${className}`}
      aria-label="Dashboard navigation"
    >
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          item={item}
          isActive={activePath === item.to}
          horizontal={horizontal}
        />
      ))}
    </nav>
  )
}

export default function DashboardSidebar({ navItems, activePath, role }) {
  if (role === 'admin') {
    return <AdminSidebar navItems={navItems} activePath={activePath} />
  }

  return (
    <aside className="hidden w-[17.5rem] shrink-0 flex-col border-r border-border bg-header lg:flex">
      <div className="flex flex-1 flex-col px-4 py-5">
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-muted/80">
          Menu
        </p>
        <DashboardSidebarNav navItems={navItems} activePath={activePath} />
      </div>

      <div className="mt-auto border-t border-border px-5 py-4">
        <div className="rounded-xl bg-brand-bg/60 px-3 py-3">
          <p className="m-0 text-xs font-semibold text-brand-text">PetroFlow POC</p>
          <p className="mt-1 m-0 text-[11px] leading-relaxed text-fg-muted">
            Track orders, clients, and site progress in one place.
          </p>
        </div>
      </div>
    </aside>
  )
}

export { AdminSidebarNavHorizontal }
