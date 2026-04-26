import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { IMAGES } from '../../data/loyalty'
import './Header.css'

export default function Header({ userName }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="header">
      <div className="header__logo">
        <img src={IMAGES.logo} alt="machimoto" width={132} height={56} />
      </div>
      <button className="header__avatar" aria-label="Logout" onClick={handleLogout}>
        <img src={IMAGES.avatar} alt="" width={36} height={36} />
      </button>
    </header>
  )
}
