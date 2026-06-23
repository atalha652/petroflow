import { apiRequest } from './api.js'

/** POC demo login — bypasses API when credentials match. */
const DEMO_CREDENTIALS = [
  {
    email: 'admin@gmail.com',
    password: 'admin1122',
    role: 'admin',
    access_token: 'demo-admin-token',
  },
]

function normalizeEmail(email) {
  return email?.trim().toLowerCase() ?? ''
}

function tryDemoLogin({ email, password }) {
  const normalizedEmail = normalizeEmail(email)
  const match = DEMO_CREDENTIALS.find(
    (entry) =>
      entry.email === normalizedEmail && entry.password === password,
  )

  if (!match) return null

  return {
    access_token: match.access_token,
    token_type: 'bearer',
    role: match.role,
  }
}

/**
 * @typedef {'admin' | 'production' | 'importer'} UserRole
 */

/**
 * @typedef {Object} SignupPayload
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {UserRole} role
 */

/**
 * @typedef {Object} SignupResponse
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {UserRole} role
 * @property {boolean} is_active
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} LoginPayload
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} LoginResponse
 * @property {string} access_token
 * @property {'bearer'} token_type
 * @property {UserRole} role
 */

/**
 * POST /auth/signup
 * @param {SignupPayload} payload
 * @returns {Promise<SignupResponse>}
 */
export function signup(payload) {
  return apiRequest('/auth/signup', {
    method: 'POST',
    body: payload,
  })
}

/**
 * POST /auth/login
 * @param {LoginPayload} payload
 * @returns {Promise<LoginResponse>}
 */
export async function login(payload) {
  const demoSession = tryDemoLogin(payload)
  if (demoSession) return demoSession

  return apiRequest('/auth/login', {
    method: 'POST',
    body: payload,
  })
}
