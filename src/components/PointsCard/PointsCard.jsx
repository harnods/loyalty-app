import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useBrand } from '../../contexts/BrandContext'
import BrandPicker from '../BrandPicker/BrandPicker'
import { IMAGES } from '../../data/loyalty'
import './PointsCard.css'

export default function PointsCard() {
  const { user } = useAuth()
  const { brand, brands, setActiveBrandId } = useBrand()
  const [pickerOpen, setPickerOpen] = useState(false)

  return (
    <section className="points-section">
      {/* Header: welcome + brand selector */}
      <div className="points-section__header">
        <p className="points-section__welcome">Welcome, {user?.name}!</p>
        <button className="points-section__brand-btn" onClick={() => setPickerOpen(true)}>
          <span className="points-section__brand-name">{brand.name}</span>
          <img src={IMAGES.caretDown} alt="" width={20} height={20} className="points-section__caret" />
        </button>
      </div>

      {/* Card */}
      <div className="points-card">
        <div className="points-card__col">
          <div className="points-card__label-block">
            <p className="points-card__label">Total points</p>
            <p className="points-card__value">{brand.points}</p>
          </div>

          <div className="points-card__tier-wrapper">
            <div className="points-card__tier">
              <img src={IMAGES.crown} alt="" width={20} height={20} />
              <span>{brand.tier}</span>
            </div>
            <p className="points-card__hint">{brand.nextTierHint}</p>
          </div>
        </div>

        <div className="points-card__hero" aria-hidden="true">
          <img src={IMAGES.heroCoins} alt="" />
        </div>
      </div>

      {pickerOpen && (
        <BrandPicker
          brands={brands}
          activeBrandId={brand.id}
          onSelect={setActiveBrandId}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </section>
  )
}
