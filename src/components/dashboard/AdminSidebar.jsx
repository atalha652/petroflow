import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  RiAddLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiBuilding2Line,
  RiDashboardLine,
  RiFileList3Line,
  RiHistoryLine,
  RiLayoutGridLine,
  RiLineChartLine,
  RiMoreFill,
  RiSendPlaneLine,
  RiSparklingLine,
  RiStarFill,
  RiTeamLine,
} from 'react-icons/ri'
import { starredOrders, teamLinks } from '../../data/mockAdminSidebar.js'

const mainNavIcons = {
  '/dashboard-admin': RiDashboardLine,
  '/dashboard-admin/orders': RiFileList3Line,
  '/dashboard-admin/recent-orders': RiHistoryLine,
  '/dashboard-admin/clients': RiBuilding2Line,
  '/dashboard-admin/users': RiTeamLine,
}

const teamLinkIcons = {
  grid: RiLayoutGridLine,
  draft: RiFileList3Line,
  library: RiLineChartLine,
  members: RiTeamLine,
}

function MainNavLink({ item, isActive, horizontal = false }) {
  const Icon = mainNavIcons[item.to] ?? RiDashboardLine

  return (
    <Link
      to={item.to}
      className={`items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
        horizontal ? 'inline-flex shrink-0' : 'flex'
      } ${
        isActive
          ? 'bg-brand text-white shadow-sm shadow-brand/25'
          : 'text-fg-muted hover:bg-canvas hover:text-fg'
      }`}
    >
      <Icon size={18} className="shrink-0" aria-hidden="true" />
      <span className="truncate">{item.label}</span>
    </Link>
  )
}

function AskAiBox() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-3">
      <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-fg-muted">
        <RiSparklingLine className="text-brand-text" size={14} aria-hidden="true" />
        <span>Ask AI — Get instant solutions</span>
      </div>

      <textarea
        readOnly
        rows={3}
        placeholder="Feel free to ask anything!"
        className="w-full resize-none rounded-xl border border-border bg-code-bg px-3 py-2.5 text-sm text-fg outline-none placeholder:text-fg-muted/70"
      />

      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-header text-fg-muted transition-colors hover:border-brand-border hover:text-brand-text"
          aria-label="Add attachment"
        >
          <RiAddLine size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
        >
          <RiSendPlaneLine size={16} aria-hidden="true" />
          Send message
        </button>
      </div>

      <p className="mt-2 text-[11px] leading-relaxed text-fg-muted">
        Ask about orders, site progress, import logs, or workspace tips.
      </p>
    </div>
  )
}

function StarredSection() {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between px-1">
        <h3 className="m-0 text-sm font-semibold text-fg">Starred</h3>
        <button
          type="button"
          className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-canvas hover:text-fg"
          aria-label="Add starred item"
        >
          <RiAddLine size={16} aria-hidden="true" />
        </button>
      </div>

      <ul className="m-0 flex list-none flex-col gap-1 p-0">
        {starredOrders.map((item) => (
          <li key={item.id}>
            <Link
              to={item.to}
              className="group flex items-center gap-2.5 rounded-xl px-2 py-2 transition-colors hover:bg-canvas"
            >
              <img
                src={item.image}
                alt=""
                className="h-9 w-9 shrink-0 rounded-lg object-cover"
              />
              <span className="min-w-0 flex-1 truncate text-sm text-fg">{item.label}</span>
              <RiStarFill className="shrink-0 text-amber-400" size={14} aria-hidden="true" />
              <button
                type="button"
                onClick={(event) => event.preventDefault()}
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-fg-muted opacity-0 transition-all group-hover:opacity-100 hover:bg-surface hover:text-fg"
                aria-label={`More options for ${item.label}`}
              >
                <RiMoreFill size={16} aria-hidden="true" />
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TeamSection({ activePath }) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((open) => !open)}
        className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-canvas"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
          PF
        </span>
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-fg">
          PetroFlow Admin
        </span>
        {expanded ? (
          <RiArrowUpSLine className="shrink-0 text-fg-muted" size={18} aria-hidden="true" />
        ) : (
          <RiArrowDownSLine className="shrink-0 text-fg-muted" size={18} aria-hidden="true" />
        )}
      </button>

      {expanded ? (
        <ul className="m-0 mt-1 flex list-none flex-col gap-0.5 p-0 pl-4">
          {teamLinks.map((link) => {
            const Icon = teamLinkIcons[link.icon] ?? RiLayoutGridLine
            const isActive = activePath === link.to

            return (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-brand-bg font-medium text-brand-text'
                      : 'text-fg-muted hover:bg-canvas hover:text-fg'
                  }`}
                >
                  <Icon size={16} className="shrink-0" aria-hidden="true" />
                  <span className="truncate">{link.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

export default function AdminSidebar({ navItems, activePath }) {
  return (
    <aside className="hidden w-[19rem] shrink-0 flex-col border-r border-border bg-header lg:flex">
      <div className="scrollbar-hidden flex flex-1 flex-col gap-5 overflow-y-auto px-3 py-5">
        <nav className="flex flex-col gap-1" aria-label="Main navigation">
          {navItems.map((item) => (
            <MainNavLink key={item.label} item={item} isActive={activePath === item.to} />
          ))}
        </nav>

        <AskAiBox />
        <StarredSection />
        <TeamSection activePath={activePath} />
      </div>
    </aside>
  )
}

export function AdminSidebarNavHorizontal({ navItems, activePath }) {
  return (
    <nav className="flex min-w-max flex-row gap-2" aria-label="Dashboard navigation">
      {navItems.map((item) => (
        <MainNavLink
          key={item.label}
          item={item}
          isActive={activePath === item.to}
          horizontal
        />
      ))}
    </nav>
  )
}
