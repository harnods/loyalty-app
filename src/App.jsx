import './App.css'
import Header from './components/Header/Header'
import PointsCard from './components/PointsCard/PointsCard'
import QuickActions from './components/QuickActions/QuickActions'
import VoucherSection from './components/VoucherSection/VoucherSection'
import Footer from './components/Footer/Footer'
import { USER, QUICK_ACTIONS, VOUCHERS } from './data/loyalty'

export default function App() {
  return (
    <div className="shell">
      <Header userName={USER.name} />
      <PointsCard user={USER} />
      <QuickActions actions={QUICK_ACTIONS} />
      <VoucherSection vouchers={VOUCHERS} />
      <Footer />
    </div>
  )
}
