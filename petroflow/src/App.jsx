import { Navigate, Route, Routes } from 'react-router-dom'
import AdminClientsPage from './pages/admin/AdminClientsPage.jsx'
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx'
import AdminOrdersPage from './pages/admin/AdminOrdersPage.jsx'
import AdminRecentOrdersPage from './pages/admin/AdminRecentOrdersPage.jsx'
import AdminUsersPage from './pages/admin/AdminUsersPage.jsx'
import ImporterDashboardPage from './pages/ImporterDashboardPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProductionDashboardPage from './pages/ProductionDashboardPage.jsx'
import SignupPage from './pages/SignupPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard-admin" element={<AdminDashboardPage />} />
      <Route path="/dashboard-admin/clients" element={<AdminClientsPage />} />
      <Route path="/dashboard-admin/orders" element={<AdminOrdersPage />} />
      <Route path="/dashboard-admin/progress" element={<Navigate to="/dashboard-admin/recent-orders" replace />} />
      <Route path="/dashboard-admin/recent-projects" element={<Navigate to="/dashboard-admin/recent-orders" replace />} />
      <Route path="/dashboard-admin/recent-orders" element={<AdminRecentOrdersPage />} />
      <Route path="/dashboard-admin/users" element={<AdminUsersPage />} />
      <Route path="/dashboard-production" element={<ProductionDashboardPage />} />
      <Route path="/dashboard-importer" element={<ImporterDashboardPage />} />
    </Routes>
  )
}

export default App
