const TOKEN_KEY = 'petroflow-auth-token'
const TOKEN_TYPE_KEY = 'petroflow-auth-token-type'
const ROLE_KEY = 'petroflow-auth-role'

export function saveAuthSession({ access_token, token_type = 'bearer', role }) {
  localStorage.setItem(TOKEN_KEY, access_token)
  localStorage.setItem(TOKEN_TYPE_KEY, token_type)
  if (role) {
    localStorage.setItem(ROLE_KEY, role.trim().toLowerCase())
  }
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getAuthRole() {
  return localStorage.getItem(ROLE_KEY)
}

export function getAuthHeaders() {
  const token = getAuthToken()
  const tokenType = localStorage.getItem(TOKEN_TYPE_KEY) ?? 'bearer'

  if (!token) return {}

  return {
    Authorization: `${tokenType} ${token}`,
  }
}

export function clearAuthSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(TOKEN_TYPE_KEY)
  localStorage.removeItem(ROLE_KEY)
}
