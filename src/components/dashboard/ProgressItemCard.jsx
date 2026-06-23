import { RiMore2Fill } from 'react-icons/ri'

function getInitials(name) {
  return name
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function MemberAvatars({ names }) {
  return (
    <div className="flex -space-x-2">
      {names.map((name) => (
        <span
          key={name}
          title={name}
          className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-surface bg-brand text-[10px] font-bold text-white"
        >
          {getInitials(name)}
        </span>
      ))}
    </div>
  )
}

export default function ProgressItemCard({
  title,
  badge,
  progressLabel,
  timeLeft,
  metaPrimary,
  metaSecondary,
  members = [],
  imageSrc,
  icon: Icon,
  progressVariant = 'active',
  onClick,
}) {
  const isClickable = Boolean(onClick)

  const accentClass =
    progressVariant === 'complete'
      ? 'bg-brand text-white'
      : progressVariant === 'pending'
        ? 'bg-code-bg text-fg-muted'
        : 'bg-amber-400 text-[#1a1a1a]'

  function handleKeyDown(event) {
    if (!onClick) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <article
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      className={`overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow ${
        isClickable
          ? 'cursor-pointer hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'
          : 'hover:shadow-md'
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-code-bg">
        {imageSrc ? (
          <img src={imageSrc} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-fg-muted/40">
            {Icon ? <Icon size={56} aria-hidden="true" /> : null}
          </div>
        )}

        {badge ? (
          <span
            className={`absolute right-3 top-3 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${accentClass}`}
          >
            {badge}
          </span>
        ) : null}
      </div>

      <div
        className={`flex items-center justify-between gap-3 px-3 py-2 text-xs font-semibold ${accentClass}`}
      >
        <span className="truncate">{progressLabel}</span>
        <span className="shrink-0">{timeLeft}</span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="m-0 line-clamp-2 text-base font-semibold leading-snug text-fg">
            {title}
          </h3>
          <button
            type="button"
            onClick={(event) => event.stopPropagation()}
            className="shrink-0 rounded-lg p-1 text-fg-muted transition-colors hover:bg-canvas hover:text-fg"
            aria-label="More options"
          >
            <RiMore2Fill size={18} aria-hidden="true" />
          </button>
        </div>

        <p className="mt-2 m-0 text-xs text-fg-muted">{metaPrimary}</p>
        <p className="mt-1 m-0 text-xs text-fg-muted">{metaSecondary}</p>

        {members.length > 0 ? (
          <div className="mt-4 flex justify-end">
            <MemberAvatars names={members} />
          </div>
        ) : null}
      </div>
    </article>
  )
}
