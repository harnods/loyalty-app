import { useNavigate } from 'react-router-dom'
import { IMAGES } from '../../data/loyalty'
import './BackNav.css'

export default function BackNav({ label = 'Back', to = -1 }) {
  const navigate = useNavigate()

  return (
    <button className="back-nav" onClick={() => navigate(to)}>
      <span className="back-nav__icon">
        <span className="back-nav__icon-path">
          <img src={IMAGES.chevronLeft} alt="" />
        </span>
      </span>
      <span className="back-nav__label">{label}</span>
    </button>
  )
}
