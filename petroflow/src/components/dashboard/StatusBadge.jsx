const statusStyles = {
  'In Progress': 'bg-brand/10 text-brand-text',
  'Not Started': 'bg-code-bg text-fg-muted',
  Completed: 'bg-brand/15 text-brand',
}

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status] ?? 'bg-code-bg text-fg-muted'}`}
    >
      {status}
    </span>
  )
}
