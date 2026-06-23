import HeroCardsStack from './hero/HeroCardsStack.jsx'

function HeroWaves() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 800 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-wave-a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="hero-wave-b" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(0,176,80,0.35)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <path
        d="M-80 120 C 120 40, 280 220, 480 140 S 760 60, 920 180 L 920 900 L -80 900 Z"
        fill="url(#hero-wave-a)"
        opacity="0.55"
      />
      <path
        d="M-40 380 C 180 280, 340 460, 560 360 S 820 260, 960 400 L 960 900 L -40 900 Z"
        fill="url(#hero-wave-b)"
        opacity="0.45"
      />
      <path
        d="M0 580 C 200 500, 360 680, 520 600 S 760 520, 900 640 L 900 900 L 0 900 Z"
        fill="url(#hero-wave-a)"
        opacity="0.35"
      />
    </svg>
  )
}

export default function AuthHero() {
  return (
    <div className="relative flex h-full min-h-[520px] w-full flex-col overflow-hidden rounded-[28px] bg-auth-hero">
      <HeroWaves />
      <div className="auth-hero-sheen pointer-events-none absolute inset-0" />

      <div className="relative z-10 px-6 pt-8 xl:px-10 xl:pt-10">
        <h2 className="m-0 max-w-lg text-white">
          <span className="block font-sans text-[2rem] font-semibold leading-[1.1] tracking-[-0.02em] xl:text-[2.35rem]">
            Track every
          </span>
          <span className="block font-sans text-[2rem] font-semibold leading-[1.1] tracking-[-0.02em] xl:text-[2.35rem]">
            petrol pump.
          </span>
        </h2>
      </div>

      <div className="relative z-10 mt-auto flex w-full min-w-0 flex-1 items-end justify-end px-3 pb-5 pl-6 pt-6 xl:px-6 xl:pb-6 xl:pl-8">
        <HeroCardsStack />
      </div>
    </div>
  )
}
