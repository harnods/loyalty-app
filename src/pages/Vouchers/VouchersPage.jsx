import { useState } from 'react'
import Header from '../../components/Header/Header'
import BackNav from '../../components/BackNav/BackNav'
import Footer from '../../components/Footer/Footer'
import VoucherItem from '../../components/VoucherItem/VoucherItem'
import VoucherDetailSheet from '../../components/VoucherDetailSheet/VoucherDetailSheet'
import { USER, VOUCHERS } from '../../data/loyalty'
import './VouchersPage.css'

export default function VouchersPage() {
  const [selectedVoucher, setSelectedVoucher] = useState(null)

  const active  = VOUCHERS.filter((v) => v.status === 'Active')
  const used    = VOUCHERS.filter((v) => v.status === 'Used')
  const expired = VOUCHERS.filter((v) => v.status === 'Expired')

  function renderGroup(label, items, faded = false) {
    if (!items.length) return null
    return (
      <div className="vp-group">
        <p className="vp-group__label">{label}</p>
        <div className="vp-list">
          {items.map((v) => (
            <VoucherItem
              key={v.id}
              name={v.name}
              code={v.code}
              expiry={v.expiry}
              thumb={v.thumb}
              thumbStyle={v.thumbStyle}
              onClick={() => setSelectedVoucher(v)}
              faded={faded}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="vp-container">
        <div className="vp-stage">
          <BackNav label="Your vouchers" to="/" />
          <div className="vp-content">
            {renderGroup('Active', active)}
            {renderGroup('Used', used, true)}
            {renderGroup('Expired', expired, true)}
          </div>
        </div>
      </div>
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
