import { IMAGES } from '../../data/loyalty'
import './WarningBanner.css'

export default function WarningBanner({ text }) {
  return (
    <div className="warning-banner">
      <img src={IMAGES.warning} alt="" width={20} height={20} className="warning-banner__icon" />
      <p className="warning-banner__text">{text}</p>
    </div>
  )
}
