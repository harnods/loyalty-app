import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import BackNav from '../../components/BackNav/BackNav'
import Footer from '../../components/Footer/Footer'
import VoucherItem from '../../components/VoucherItem/VoucherItem'
import VoucherDetailSheet from '../../components/VoucherDetailSheet/VoucherDetailSheet'
import { USER, VOUCHERS } from '../../data/loyalty'
import './VouchersPage.css'

export default function VouchersPage() {
  const [selectedVoucher, setSelectedVoucher] = useState(null)

  const active = VOUCHERS.filter((v) => v.status !== 'Expired')
  const expired = VOUCHERS.filter((v) => v.status === 'Expired')

  return (
    <>
      <Header userName={USER.name} />
      <div className="vp-container">
        <div className="vp-stage">
          <BackNav label="Your vouchers" to="/" />
          <div className="vp-content">
            {active.length > 0 && (
              <div className="vp-group">
                <p className="vp-group__label">Active</p>
                <div className="vp-list">
                  {active.map((v) => (
                    <VoucherItem
                      key={v.id}
                      name={v.name}
                      code={v.code}
                      expiry={v.expiry}
                      thumb={v.thumb}
                      thumbStyle={v.thumbStyle}
                      onClick={() => setSelectedVoucher(v)}
                    />
                  ))}
                </div>
              </div>
            )}
            {expired.length > 0 && (
              <div className="vp-group">
                <p className="vp-group__label">Expired</p>
                <div className="vp-list">
                  {expired.map((v) => (
                    <VoucherItem
                      key={v.id}
                      name={v.name}
                      code={v.code}
                      expiry={v.expiry}
                      thumb={v.thumb}
                      thumbStyle={v.thumbStyle}
                      onClick={() => setSelectedVoucher(v)}
                      faded
                    />
                  ))}
                </div>
              </div>
            )}
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
