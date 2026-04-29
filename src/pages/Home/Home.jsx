import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useBrand } from '../../contexts/BrandContext'
import Header from '../../components/Header/Header'
import PointsCard from '../../components/PointsCard/PointsCard'
import QuickActions from '../../components/QuickActions/QuickActions'
import VoucherSection from '../../components/VoucherSection/VoucherSection'
import VoucherDetailSheet from '../../components/VoucherDetailSheet/VoucherDetailSheet'
import PinSheet from '../../components/PinSheet/PinSheet'
import Footer from '../../components/Footer/Footer'
import { QUICK_ACTIONS } from '../../data/loyalty'

export default function Home() {
  const { user, savePin } = useAuth()
  const { brand } = useBrand()
  const location = useLocation()
  const [selectedVoucher, setSelectedVoucher] = useState(null)

  const [pinSheetDismissed, setPinSheetDismissed] = useState(false)
  const showPinSheet = location.state?.setupPin && !user?.pin && !pinSheetDismissed

  const activeVouchers = brand.vouchers.filter(v => v.status === 'Active')

  return (
    <>
      <Header />
      <PointsCard />
      <QuickActions actions={QUICK_ACTIONS} />
      <VoucherSection vouchers={activeVouchers} onSelect={setSelectedVoucher} />
      <Footer />

      {selectedVoucher && (
        <VoucherDetailSheet
          voucher={selectedVoucher}
          onClose={() => setSelectedVoucher(null)}
        />
      )}

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
