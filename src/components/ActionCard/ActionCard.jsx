import { IMAGES } from '../../data/loyalty'
import './ActionCard.css'

export default function ActionCard({ color, icon, label }) {
  return (
    <button className={`action-card action-card--${color}`}>
      <div className="action-card__icon">
        <img src={icon} alt="" width={32} height={32} />
      </div>
      <div className="action-card__bottom">
        <p className="action-card__label">
          {label[0]}<br />{label[1]}
        </p>
        <div className="action-card__arrow">
          <img src={IMAGES.arrow} alt="" width={20} height={20} />
        </div>
      </div>
    </button>
  )
}
