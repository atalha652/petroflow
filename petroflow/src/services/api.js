import { getAuthHeaders } from '../utils/authStorage.js'

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

function getBaseUrl() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL

  if (!baseUrl) {
    throw new Error('VITE_API_BASE_URL is not defined. Add it to your .env file.')
  }

  return baseUrl.replace(/\/+$/, '')
}

function buildUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${getBaseUrl()}${normalizedPath}`
}

function parseValidationMessage(data) {
  if (!data?.detail) return null

  if (typeof data.detail === 'string') return data.detail

  if (Array.isArray(data.detail)) {
    return data.detail
      .map((item) => {
        const field = Array.isArray(item.loc) ? item.loc.at(-1) : null
        return field ? `${field}: ${item.msg}` : item.msg
      })
      .join(', ')
  }

  return null
}

export async function apiRequest(path, options = {}) {
  const { body, headers, ...rest } = options

  const response = await fetch(buildUrl(path), {
    ...rest,
    headers: {
      Accept: 'application/json',
      ...getAuthHeaders(),
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const contentType = response.headers.get('content-type') ?? ''
  const hasJsonBody = contentType.includes('application/json')
  const data = hasJsonBody ? await response.json() : null

  if (!response.ok) {
    const validationMessage = parseValidationMessage(data)
    const message =
      validationMessage ??
      data?.message ??
      data?.detail ??
      `Request failed with status ${response.status}`

    throw new ApiError(message, response.status, data)
  }

  return data
}

export { getBaseUrl }
