import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import EarnPointsPage from './pages/EarnPoints/EarnPointsPage'

export default function App() {
  return (
    <div className="shell">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/earn-points" element={<EarnPointsPage />} />
      </Routes>
    </div>
  )
}
