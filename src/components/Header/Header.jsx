import { IMAGES } from '../../data/loyalty'
import './Header.css'

export default function Header({ userName }) {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={IMAGES.logo} alt="machimoto" width={132} height={56} />
      </div>
      <button className="header__avatar" aria-label={`Profile of ${userName}`}>
        <img src={IMAGES.avatar} alt="" width={36} height={36} />
      </button>
    </header>
  )
}
