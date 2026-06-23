export const DASHBOARD_BY_ROLE = {
  admin: '/dashboard-admin/recent-orders',
  production: '/dashboard-production',
  importer: '/dashboard-importer',
}

export function normalizeRole(role) {
  return role?.trim().toLowerCase() ?? ''
}

export function getDashboardPath(role) {
  return DASHBOARD_BY_ROLE[normalizeRole(role)] ?? null
}

export function isValidRole(role) {
  return normalizeRole(role) in DASHBOARD_BY_ROLE
}
