import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import AuthFormHeader from '../components/auth/AuthFormHeader.jsx'
import BrandLogo from '../components/auth/BrandLogo.jsx'
import Button from '../components/ui/Button.jsx'
import Input from '../components/ui/Input.jsx'
import PasswordInput from '../components/ui/PasswordInput.jsx'
import Select from '../components/ui/Select.jsx'
import { ApiError, login, signup } from '../services'
import { saveAuthSession } from '../utils/authStorage.js'
import { getDashboardPath } from '../utils/getDashboardPath.js'

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'production', label: 'Production' },
  { value: 'importer', label: 'Importer' },
]

export default function SignupPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const role = formData.get('role')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      setIsSubmitting(false)
      return
    }

    try {
      await signup({ name, email, password, role })
      const session = await login({ email, password })

      if (!session?.role) {
        setError('Account created but no role was returned on login. Please sign in manually.')
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
        err instanceof ApiError ? err.message : 'Sign up failed. Please try again.'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout>
      <BrandLogo />

      <AuthFormHeader
        title="Get Started"
        subtitle="Create an internal PetroFlow account. Admins can also add users from the Users screen."
      />

      <form
        className="flex w-full min-w-0 flex-col gap-4 sm:gap-5"
        onSubmit={handleSubmit}
      >
        {error ? (
          <p className="m-0 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        ) : null}

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          <Input
            id="signup-name"
            label="Full name"
            type="text"
            name="name"
            placeholder="Ahmed Khan"
            autoComplete="name"
            required
            disabled={isSubmitting}
          />

          <Input
            id="signup-email"
            label="Email"
            type="email"
            name="email"
            placeholder="you@organization.com"
            autoComplete="email"
            required
            disabled={isSubmitting}
          />
        </div>

        <Select
          id="signup-role"
          label="Role"
          name="role"
          placeholder="Select a role"
          options={roleOptions}
          required
          disabled={isSubmitting}
        />

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          <PasswordInput
            id="signup-password"
            label="Password"
            name="password"
            placeholder="Create a password"
            autoComplete="new-password"
            required
            disabled={isSubmitting}
          />

          <PasswordInput
            id="signup-confirm-password"
            label="Confirm password"
            name="confirmPassword"
            placeholder="Re-enter password"
            autoComplete="new-password"
            required
            disabled={isSubmitting}
          />
        </div>

        <Button type="submit" className="mt-1 w-full sm:mt-2" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account…' : 'Sign up'}
        </Button>
      </form>

      <p className="text-center text-sm leading-relaxed text-fg-muted">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-fg transition-colors hover:text-brand-text"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
