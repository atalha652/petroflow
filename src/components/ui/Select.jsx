export default function Select({
  id,
  label,
  options,
  placeholder,
  className = '',
  value,
  defaultValue,
  ...props
}) {
  const selectProps = {
    ...props,
    ...(value !== undefined ? { value } : { defaultValue: defaultValue ?? '' }),
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label}
      </label>
      <select
        id={id}
        className="w-full min-w-0 appearance-none rounded-xl border border-border bg-surface px-4 py-3 text-base text-fg outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20 sm:text-sm"
        {...selectProps}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
