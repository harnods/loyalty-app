import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Header from '../../components/Header/Header'
import BackNav from '../../components/BackNav/BackNav'
import Footer from '../../components/Footer/Footer'
import { USER } from '../../data/loyalty'
import './AccountPage.css'

export default function AccountPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleSignOut() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="ac">
      <Header />

      <div className="ac__container">
        <div className="ac__stage">
          <BackNav />

          <div className="ac__hero">
            <h1 className="ac__hero-title">Account</h1>
          </div>

          <div className="ac__content">
            <div className="ac-group ac-group--bordered">
              <div className="ac-item">
                <p className="ac-item__label">Name</p>
                <p className="ac-item__value">{user?.name}</p>
              </div>
              <div className="ac-item">
                <p className="ac-item__label">Member ID</p>
                <p className="ac-item__value">{USER.memberId}</p>
              </div>
              <div className="ac-item">
                <p className="ac-item__label">Phone number</p>
                <p className="ac-item__value">{user?.phone}</p>
              </div>
              <div className="ac-item">
                <p className="ac-item__label">Member since</p>
                <p className="ac-item__value">{USER.memberSince}</p>
              </div>
            </div>

            <div className="ac-group">
              <button className="ac-signout" onClick={handleSignOut}>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
