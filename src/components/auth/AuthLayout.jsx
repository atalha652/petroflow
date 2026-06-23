import AuthHero from './AuthHero.jsx'
import ThemeToggle from '../ThemeToggle.jsx'

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-svh w-full bg-canvas p-3 sm:p-4 lg:p-5">
      <div className="flex min-h-[calc(100svh-24px)] w-full flex-col overflow-hidden rounded-[28px] bg-surface shadow-elevation sm:min-h-[calc(100svh-32px)] sm:rounded-[32px] lg:min-h-[calc(100svh-40px)] lg:flex-row">
        <section className="scrollbar-hidden relative flex w-full min-h-0 flex-col overflow-y-auto px-4 py-6 sm:px-10 sm:py-8 lg:w-1/2 lg:px-12 lg:py-10 xl:px-14">
          <div className="absolute right-4 top-4 sm:right-6 sm:top-6 lg:right-10 lg:top-10">
            <ThemeToggle />
          </div>

          <div className="mx-auto flex w-full min-w-0 max-w-md flex-1 flex-col justify-center gap-6 py-2 sm:gap-8 sm:py-4 lg:py-0">
            {children}
          </div>
        </section>

        <section className="hidden bg-surface p-4 lg:flex lg:w-1/2 lg:p-5">
          <AuthHero />
        </section>
      </div>
    </div>
  )
}
