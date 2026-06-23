import { Link } from 'react-router-dom'

export default function AuthFooterLink({ text, linkText, to }) {
  return (
    <p className="text-center text-sm text-fg-muted">
      {text}{' '}
      <Link to={to} className="font-semibold text-fg transition-colors hover:text-brand-text">
        {linkText}
      </Link>
    </p>
  )
}
