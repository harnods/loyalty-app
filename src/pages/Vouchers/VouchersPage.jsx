import { useState } from 'react'
import Header from '../../components/Header/Header'
import BackNav from '../../components/BackNav/BackNav'
import Footer from '../../components/Footer/Footer'
import VoucherItem from '../../components/VoucherItem/VoucherItem'
import VoucherDetailSheet from '../../components/VoucherDetailSheet/VoucherDetailSheet'
import { IMAGES } from '../../data/loyalty'
import { useBrand } from '../../contexts/BrandContext'
import './VouchersPage.css'

function AccordionGroup({ label, items, onSelect }) {
  const [open, setOpen] = useState(false)
  if (!items.length) return null
  return (
    <div className="vp-group">
      <button
        className="vp-accordion-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="vp-group__label">{label}</span>
        <span className={`vp-accordion-chevron${open ? ' vp-accordion-chevron--open' : ''}`}>
          <span className="vp-accordion-chevron__path">
            <img src={IMAGES.chevronLeft} alt="" />
          </span>
        </span>
      </button>
      {open && (
        <div className="vp-list">
          {items.map((v) => (
            <VoucherItem
              key={v.id}
              name={v.name}
              code={v.code}
              expiry={v.expiry}
              thumb={v.thumb}
              thumbStyle={v.thumbStyle}
              onClick={() => onSelect(v)}
              faded
              vertical
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function VouchersPage() {
  const { brand } = useBrand()
  const [selectedVoucher, setSelectedVoucher] = useState(null)

  const active  = brand.vouchers.filter((v) => v.status === 'Active')
  const used    = brand.vouchers.filter((v) => v.status === 'Used')
  const expired = brand.vouchers.filter((v) => v.status === 'Expired')

  return (
    <>
      <Header />
      <div className="vp-container">
        <div className="vp-stage">
          <BackNav label="Back" to="/" />
          <div className="vp-hero">
            <p className="vp-hero__title">Your vouchers</p>
          </div>
          <div className="vp-content">
            {/* Active — always visible, vertical layout */}
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
                      vertical
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Used — accordion, collapsed by default */}
            <AccordionGroup label="Used" items={used} onSelect={setSelectedVoucher} />

            {/* Expired — accordion, collapsed by default */}
            <AccordionGroup label="Expired" items={expired} onSelect={setSelectedVoucher} />
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
