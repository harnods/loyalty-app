import { useEffect, useRef, useState } from 'react'
import { IMAGES } from '../../data/loyalty'
import './VoucherDetailSheet.css'

export default function VoucherDetailSheet({ voucher, onClose }) {
  const [visible, setVisible] = useState(false)
  const sheetRef = useRef(null)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 280)
  }

  const isExpired = voucher.status === 'Expired'
  const isUsed    = voucher.status === 'Used'
  const isInactive = isExpired || isUsed

  const codeCardClass = `vds-code-card${isExpired ? ' vds-code-card--expired' : isUsed ? ' vds-code-card--used' : ''}`
  const badgeClass    = `vds-status-badge${isExpired ? ' vds-status-badge--expired' : isUsed ? ' vds-status-badge--used' : ''}`

  const hint = isExpired
    ? 'This voucher has expired and can no longer be used.'
    : isUsed
    ? 'This voucher has already been used.'
    : 'Show this code at the cashier in any store.'

  const codeCardBottom = isUsed
    ? `Used on ${voucher.usedDate}`
    : voucher.expiry.replace('Exp.', isExpired ? 'Expired' : 'Expires')

  return (
    <div
      className={`vds-overlay${visible ? ' vds-overlay--open' : ''}`}
      onClick={handleClose}
    >
      <div
        ref={sheetRef}
        className={`vds-sheet${visible ? ' vds-sheet--open' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — close only */}
        <div className="vds-header">
          <button className="vds-close" onClick={handleClose} aria-label="Close">
            <span className="vds-close__path">
              <img src={IMAGES.closeIcon} alt="" />
            </span>
          </button>
        </div>

        {/* Title */}
        <div className="vds-title-section">
          <p className="vds-title">{voucher.name}</p>
        </div>

        {/* Hint */}
        <div className="vds-hint-section">
          <p className="vds-hint">{hint}</p>
        </div>

        {/* Voucher code card */}
        <div className={codeCardClass}>
          <div className="vds-code-card__top">
            <p className="vds-code-card__label">Voucher code</p>
            <p className="vds-code-card__code">{voucher.code}</p>
          </div>
          <div className="vds-code-card__bottom">
            <p className="vds-code-card__expiry">{codeCardBottom}</p>
          </div>
        </div>

        {/* Details card */}
        <div className="vds-details">
          <div className="vds-details__row">
            <span>Status</span>
            <span className={badgeClass}>{voucher.status}</span>
          </div>
          <div className="vds-details__row">
            <span>Cost</span>
            <span>{voucher.cost}</span>
          </div>
          <div className="vds-details__row">
            <span>Redeemed date</span>
            <span>{voucher.redeemedDate}</span>
          </div>
          {isUsed && (
            <div className="vds-details__row">
              <span>Used date</span>
              <span>{voucher.usedDate}</span>
            </div>
          )}
        </div>

        {/* Close button */}
        <div className="vds-btn-group">
          <button className="vds-btn-close" onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
