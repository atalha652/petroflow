export default function Input({
  id,
  label,
  type = 'text',
  placeholder,
  labelAction,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-fg">
          {label}
        </label>
        {labelAction}
      </div>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full min-w-0 rounded-xl border border-border bg-surface px-4 py-3 text-base text-fg outline-none transition-colors placeholder:text-fg-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20 sm:text-sm"
        {...props}
      />
    </div>
  )
}
