export default function LogoMark({ className = '', size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M9.5 8.5c0-1.5 1.2-2.7 2.7-2.7 1.2 0 2.2.8 2.5 1.9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14.5 15.5c0 1.5-1.2 2.7-2.7 2.7-1.2 0-2.2-.8-2.5-1.9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8.5 14.5c-1.5 0-2.7-1.2-2.7-2.7 0-1.2.8-2.2 1.9-2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15.5 9.5c1.5 0 2.7 1.2 2.7 2.7 0 1.2-.8 2.2-1.9 2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
