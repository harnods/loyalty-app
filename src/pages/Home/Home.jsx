import { useState } from 'react'
import Header from '../../components/Header/Header'
import PointsCard from '../../components/PointsCard/PointsCard'
import QuickActions from '../../components/QuickActions/QuickActions'
import VoucherSection from '../../components/VoucherSection/VoucherSection'
import VoucherDetailSheet from '../../components/VoucherDetailSheet/VoucherDetailSheet'
import Footer from '../../components/Footer/Footer'
import { USER, QUICK_ACTIONS, VOUCHERS } from '../../data/loyalty'

export default function Home() {
  const [selectedVoucher, setSelectedVoucher] = useState(null)

  return (
    <>
      <Header userName={USER.name} />
      <PointsCard user={USER} />
      <QuickActions actions={QUICK_ACTIONS} />
      <VoucherSection vouchers={VOUCHERS} onSelect={setSelectedVoucher} />
      <Footer />
      {selectedVoucher && (
        <VoucherDetailSheet
          voucher={selectedVoucher}
          onClose={() => setSelectedVoucher(null)}
        />
      )}
    </>
  )
}
