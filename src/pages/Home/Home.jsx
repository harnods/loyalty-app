import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Header from '../../components/Header/Header'
import PointsCard from '../../components/PointsCard/PointsCard'
import QuickActions from '../../components/QuickActions/QuickActions'
import VoucherSection from '../../components/VoucherSection/VoucherSection'
import VoucherDetailSheet from '../../components/VoucherDetailSheet/VoucherDetailSheet'
import PinSheet from '../../components/PinSheet/PinSheet'
import Footer from '../../components/Footer/Footer'
import { USER, QUICK_ACTIONS, VOUCHERS } from '../../data/loyalty'

export default function Home() {
  const { user, savePin } = useAuth()
  const location = useLocation()
  const [selectedVoucher, setSelectedVoucher] = useState(null)

  // Show forced PIN setup only when redirected from signup flow
  const [pinSheetDismissed, setPinSheetDismissed] = useState(false)
  const showPinSheet = location.state?.setupPin && !user?.pin && !pinSheetDismissed

  return (
    <>
      <Header userName={USER.name} />
      <PointsCard user={USER} />
      <QuickActions actions={QUICK_ACTIONS} />
      <VoucherSection vouchers={VOUCHERS.filter((v) => v.status === 'Active')} onSelect={setSelectedVoucher} />
      <Footer />

      {selectedVoucher && (
        <VoucherDetailSheet
          voucher={selectedVoucher}
          onClose={() => setSelectedVoucher(null)}
        />
      )}

      {/* First-time PIN setup — non-dismissable until PIN is created */}
      {showPinSheet && (
        <PinSheet
          mode="create"
          phone={user?.phone}
          dismissable={false}
          onClose={() => setPinSheetDismissed(true)}
          onSuccess={(pin) => {
            savePin(pin)
            setPinSheetDismissed(true)
          }}
        />
      )}
    </>
  )
}
