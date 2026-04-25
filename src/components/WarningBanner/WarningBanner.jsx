import { IMAGES } from '../../data/loyalty'
import './WarningBanner.css'

export default function WarningBanner({ parts }) {
  return (
    <div className="warning-banner">
      <span className="warning-banner__icon">
        <span className="warning-banner__icon-path">
          <img src={IMAGES.warning} alt="" />
        </span>
      </span>
      <p className="warning-banner__text">
        {parts.map((part, i) =>
          part.bold
            ? <strong key={i}>{part.text}</strong>
            : <span key={i}>{part.text}</span>
        )}
      </p>
    </div>
  )
}
