import { Link } from 'react-router-dom'

export default function AuthFooter({ text, linkText, linkTo }) {
  return (
    <p className="text-center text-sm text-fg-muted">
      {text}{' '}
      <Link
        to={linkTo}
        className="font-semibold text-fg underline-offset-4 transition-colors hover:text-brand-text hover:underline"
      >
        {linkText}
      </Link>
    </p>
  )
}
