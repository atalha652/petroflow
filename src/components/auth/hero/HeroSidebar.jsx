export default function HeroSidebar() {
  const items = [
    {
      label: 'Dashboard',
      icon: (
        <path d="M12 3l9 8h-3v9h-5v-6H11v6H6v-9H3l9-8z" />
      ),
      active: true,
    },
    {
      label: 'Orders',
      icon: (
        <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z" />
      ),
    },
    {
      label: 'Imports',
      icon: (
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.4L12 16.8 5.7 21.4 8 13.6 2 9.4h7.6L12 2z" />
      ),
    },
  ]

  return (
    <div className="flex flex-col items-center gap-4 rounded-[28px] bg-white px-2.5 py-5 shadow-[0_12px_40px_rgba(0,0,0,0.14)]">
      {items.map((item) => (
        <div
          key={item.label}
          title={item.label}
          className={`flex h-7 w-7 items-center justify-center ${
            item.active ? 'text-brand' : 'text-[#8a8a8e]'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            {item.icon}
          </svg>
        </div>
      ))}
    </div>
  )
}
