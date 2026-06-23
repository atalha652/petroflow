import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import AuthFormHeader from '../components/auth/AuthFormHeader.jsx'
import BrandLogo from '../components/auth/BrandLogo.jsx'
import Button from '../components/ui/Button.jsx'
import Input from '../components/ui/Input.jsx'
import PasswordInput from '../components/ui/PasswordInput.jsx'
import { ApiError, login } from '../services'
import { saveAuthSession } from '../utils/authStorage.js'
import { getDashboardPath } from '../utils/getDashboardPath.js'

export default function LoginPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      const session = await login({ email, password })

      if (!session?.role) {
        setError('Login succeeded but no role was returned. Please contact support.')
        return
      }

      const dashboardPath = getDashboardPath(session.role)

      if (!dashboardPath) {
        setError(`Unknown role "${session.role}". Please contact support.`)
        return
      }

      saveAuthSession(session)
      navigate(dashboardPath, { replace: true })
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : 'Sign in failed. Please try again.'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout>
      <BrandLogo />

      <AuthFormHeader
        title="Sign In"
        subtitle="Sign in with your account. Your role — Admin, Production, or Importer — is assigned to your profile."
      />

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {error ? (
          <p className="m-0 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        ) : null}

        <Input
          id="login-email"
          label="Email"
          type="email"
          name="email"
          placeholder="you@organization.com"
          autoComplete="email"
          required
          disabled={isSubmitting}
        />

        <PasswordInput
          id="login-password"
          label="Password"
          name="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          disabled={isSubmitting}
        />

        <Button type="submit" className="mt-2" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>

      <p className="text-center text-sm leading-relaxed text-fg-muted">
        Don&apos;t have an account?{' '}
        <Link
          to="/signup"
          className="font-semibold text-fg transition-colors hover:text-brand-text"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  )
}
