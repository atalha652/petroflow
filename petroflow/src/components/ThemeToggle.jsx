import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface text-fg transition-colors hover:border-brand hover:text-brand-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <span className="text-lg leading-none" aria-hidden="true">
        {isDark ? '☀' : '☾'}
      </span>
    </button>
  )
}
