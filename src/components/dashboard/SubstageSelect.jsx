import { ORDER_STAGES } from '../../data/orderStages.js'

export default function SubstageSelect({ id, label, name, value, onChange, required }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full min-w-0 appearance-none rounded-xl border border-border bg-surface px-4 py-3 text-base text-fg outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20 sm:text-sm"
      >
        {ORDER_STAGES.map((stage) => (
          <optgroup key={stage.id} label={stage.label}>
            {stage.substages.map((substage) => (
              <option key={substage.id} value={substage.label}>
                {substage.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  )
}
