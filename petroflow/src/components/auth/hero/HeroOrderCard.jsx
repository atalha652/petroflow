import LogoMark from '../LogoMark.jsx'

export default function HeroOrderCard() {
  return (
    <div className="w-full rounded-[28px] bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.14)]">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ececeb] text-[#b8b8bc]">
          <LogoMark size={16} />
        </div>
        <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-medium text-brand-text">
          In Progress
        </span>
      </div>

      <p className="text-sm font-semibold leading-snug text-[#1a1a1a]">
        Site A — Highway 12 Pump
      </p>
      <p className="mt-0.5 text-xs text-[#8a8a8e]">Northstar Fuels · Lahore</p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-[#f5f5f4] px-2.5 py-2.5">
          <p className="text-[10px] uppercase tracking-wide text-[#8a8a8e]">Stages</p>
          <p className="mt-0.5 text-lg font-semibold text-[#1a1a1a]">6 / 9</p>
          <p className="mt-0.5 text-[10px] text-brand-text">67% complete</p>
        </div>
        <div className="rounded-xl bg-[#f5f5f4] px-2.5 py-2.5">
          <p className="text-[10px] uppercase tracking-wide text-[#8a8a8e]">Import spend</p>
          <p className="mt-0.5 text-lg font-semibold text-[#1a1a1a]">$24,580</p>
          <p className="mt-0.5 text-[10px] text-[#8a8a8e]">12 entries</p>
        </div>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#ececeb]">
        <div className="h-full w-[67%] rounded-full bg-brand" />
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#e3e3e2] pt-3">
        <div className="min-w-0">
          <p className="text-[10px] text-[#8a8a8e]">Assigned team</p>
          <p className="mt-0.5 truncate text-xs font-medium text-[#1a1a1a]">
            Ahmed K. · Sara M.
          </p>
        </div>
        <button
          type="button"
          className="shrink-0 rounded-full bg-[#ececeb] px-3 py-1 text-[10px] font-medium text-[#5c5c62]"
        >
          View All
        </button>
      </div>
    </div>
  )
}
