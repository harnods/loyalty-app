import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import './App.css'
import Home from './pages/Home/Home'
import EarnPointsPage from './pages/EarnPoints/EarnPointsPage'
import PointsHistoryPage from './pages/PointsHistory/PointsHistoryPage'
import RedeemRewardsPage from './pages/RedeemRewards/RedeemRewardsPage'
import VouchersPage from './pages/Vouchers/VouchersPage'
import SignInPage from './pages/Auth/SignInPage'
import SignUpPage from './pages/Auth/SignUpPage'
import OtpPage from './pages/Auth/OtpPage'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <div className="shell">
      <Routes>
        <Route path="/login" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/earn-points" element={<ProtectedRoute><EarnPointsPage /></ProtectedRoute>} />
        <Route path="/points-history" element={<ProtectedRoute><PointsHistoryPage /></ProtectedRoute>} />
        <Route path="/redeem-rewards" element={<ProtectedRoute><RedeemRewardsPage /></ProtectedRoute>} />
        <Route path="/vouchers" element={<ProtectedRoute><VouchersPage /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}
