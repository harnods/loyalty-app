import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import EarnPointsPage from './pages/EarnPoints/EarnPointsPage'
import PointsHistoryPage from './pages/PointsHistory/PointsHistoryPage'
import RedeemRewardsPage from './pages/RedeemRewards/RedeemRewardsPage'
import VouchersPage from './pages/Vouchers/VouchersPage'

export default function App() {
  return (
    <div className="shell">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/earn-points" element={<EarnPointsPage />} />
        <Route path="/points-history" element={<PointsHistoryPage />} />
        <Route path="/redeem-rewards" element={<RedeemRewardsPage />} />
        <Route path="/vouchers" element={<VouchersPage />} />
      </Routes>
    </div>
  )
}
