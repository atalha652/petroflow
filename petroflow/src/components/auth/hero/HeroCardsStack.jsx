import LogoMark from '../LogoMark.jsx'
import HeroOrderCard from './HeroOrderCard.jsx'
import HeroSidebar from './HeroSidebar.jsx'

export default function HeroCardsStack() {
  return (
    <div className="flex w-full min-w-0 max-w-full items-end justify-end gap-3 lg:gap-4">
      {/* Logo tile */}
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[28px] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.14)]">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand text-white">
          <LogoMark size={16} />
        </div>
      </div>

      {/* Nav pill */}
      <div className="shrink-0">
        <HeroSidebar />
      </div>

      {/* Main order card — grows/shrinks within available space */}
      <div className="min-w-0 w-full max-w-[220px] shrink lg:max-w-[248px] xl:max-w-[268px]">
        <HeroOrderCard />
      </div>
    </div>
  )
}
