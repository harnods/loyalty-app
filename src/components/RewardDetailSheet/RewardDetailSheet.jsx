import { useEffect, useRef, useState } from 'react'
import { useBrand } from '../../contexts/BrandContext'
import { IMAGES } from '../../data/loyalty'
import './RewardDetailSheet.css'

function parsePts(str) {
  return parseInt(str.replace(/[^0-9]/g, ''), 10)
}

function formatPts(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'pts'
}

function RewardThumb({ reward }) {
  if (reward.thumbStyle) {
    return (
      <div className="rds-thumb">
        <div className="rds-thumb__inner">
          <img
            src={IMAGES[reward.thumbKey]}
            alt=""
            style={{
              position: 'absolute',
              width: reward.thumbStyle.width,
              height: reward.thumbStyle.height,
              top: reward.thumbStyle.top,
              left: reward.thumbStyle.left,
              maxWidth: 'none',
            }}
          />
        </div>
      </div>
    )
  }
  return (
    <div className="rds-thumb">
      <img src={IMAGES[reward.thumbKey]} alt="" className="rds-thumb__cover" />
    </div>
  )
}

function DetailView({ reward, onRedeem, onClose }) {
  const { brand } = useBrand()
  const userPts = parsePts(brand.points)
  const cost = parsePts(reward.points)
  const afterPts = userPts - cost

  return (
    <>
      <div className="rds-header">
        <div className="rds-header__col">
          <p className="rds-header__name">{reward.name}</p>
          <p className="rds-header__category">{reward.category}</p>
        </div>
        <button className="rds-close" onClick={onClose} aria-label="Close">
          <span className="rds-close__path">
            <img src={IMAGES.closeIcon} alt="" />
          </span>
        </button>
      </div>

      <div className="rds-thumb-section">
        <RewardThumb reward={reward} />
      </div>

      <div className="rds-desc-section">
        <p className="rds-desc">{reward.description}</p>
      </div>

      <div className="rds-terms">
        <p className="rds-terms__label">Terms</p>
        <ul className="rds-terms__list">
          {reward.terms.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </div>

      <div className="rds-pricing">
        <div className="rds-pricing__cost-row">
          <span className="rds-pricing__cost-label">Cost</span>
          <span className="rds-pricing__cost-value">{reward.points}</span>
        </div>
        <div className="rds-pricing__balance-rows">
          <div className="rds-pricing__row">
            <span>Your balance</span>
            <span>{formatPts(userPts)}</span>
          </div>
          <div className="rds-pricing__row">
            <span>After redeem</span>
            <span>{formatPts(afterPts)}</span>
          </div>
        </div>
      </div>

      <button className="rds-cta" onClick={onRedeem}>
        Redeem for {reward.points}
      </button>
    </>
  )
}

function SuccessView({ reward, onClose }) {
  return (
    <>
      <div className="rds-header rds-header--end">
        <button className="rds-close" onClick={onClose} aria-label="Close">
          <span className="rds-close__path">
            <img src={IMAGES.closeIcon} alt="" />
          </span>
        </button>
      </div>

      <div className="rds-success-icon-section">
        <span className="rds-success-icon">
          <span className="rds-success-icon__path">
            <img src={IMAGES.doneIcon} alt="" />
          </span>
        </span>
      </div>

      <div className="rds-success-title-section">
        <p className="rds-success-label">Redeemed</p>
        <p className="rds-success-name">{reward.name}</p>
      </div>

      <div className="rds-success-hint-section">
        <p className="rds-success-hint">Show this code at the cashier in any store.</p>
      </div>

      <div className="rds-voucher">
        <div className="rds-voucher__code-row">
          <p className="rds-voucher__code-label">Voucher code</p>
          <p className="rds-voucher__code">{reward.voucherCode}</p>
        </div>
        <div className="rds-voucher__expiry-row">
          <p className="rds-voucher__expiry">{reward.voucherExpiry}</p>
        </div>
      </div>

      <div className="rds-btn-group">
        <button className="rds-btn-secondary">All vouchers</button>
        <button className="rds-btn-primary" onClick={onClose}>Done</button>
      </div>
    </>
  )
}

export default function RewardDetailSheet({ reward, onClose }) {
  const [visible, setVisible] = useState(false)
  const [redeemed, setRedeemed] = useState(false)
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

  return (
    <div
      className={`rds-overlay${visible ? ' rds-overlay--open' : ''}`}
      onClick={handleClose}
    >
      <div
        ref={sheetRef}
        className={`rds-sheet${visible ? ' rds-sheet--open' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {redeemed
          ? <SuccessView reward={reward} onClose={handleClose} />
          : <DetailView reward={reward} onRedeem={() => setRedeemed(true)} onClose={handleClose} />
        }
      </div>
    </div>
  )
}
