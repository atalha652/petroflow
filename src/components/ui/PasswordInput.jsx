import { useState } from 'react'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'

export default function PasswordInput({
  id,
  label,
  placeholder,
  labelAction,
  className = '',
  ...props
}) {
  const [visible, setVisible] = useState(false)

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-fg">
          {label}
        </label>
        {labelAction}
      </div>

      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          className="w-full min-w-0 rounded-xl border border-border bg-surface py-3 pl-4 pr-11 text-base text-fg outline-none transition-colors placeholder:text-fg-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20 sm:text-sm"
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((show) => !show)}
          className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-md p-1 text-fg-muted transition-colors hover:text-brand-text"
          aria-label={visible ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {visible ? (
            <RiEyeOffLine size={18} aria-hidden="true" />
          ) : (
            <RiEyeLine size={18} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  )
}
