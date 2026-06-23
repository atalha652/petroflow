const variants = {
  primary:
    'bg-brand text-white hover:bg-brand-hover focus-visible:outline-brand',
  secondary:
    'border border-border bg-surface text-fg hover:border-brand-border hover:text-brand-text focus-visible:outline-brand',
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
