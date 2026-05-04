import { useNavigate } from 'react-router-dom'
import { IMAGES } from '../../data/loyalty'
import './BackNav.css'

export default function BackNav({ label = 'Back', to = -1 }) {
  const navigate = useNavigate()

  return (
    <button className="back-nav" onClick={() => navigate(to)}>
      <img src={IMAGES.chevronLeft} alt="" width={20} height={20} className="back-nav__icon" />
      <span className="back-nav__label">{label}</span>
    </button>
  )
}
