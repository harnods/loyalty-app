import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Header from '../../components/Header/Header'
import BackNav from '../../components/BackNav/BackNav'
import Footer from '../../components/Footer/Footer'
import PinSheet from '../../components/PinSheet/PinSheet'
import { IMAGES } from '../../data/loyalty'
import { useBrand } from '../../contexts/BrandContext'
import './AccountPage.css'

export default function AccountPage() {
  const { user, logout, savePin } = useAuth()
  const { brand } = useBrand()
  const navigate = useNavigate()
  const [pinSheetMode, setPinSheetMode] = useState(null) // null | 'create' | 'change'

  function handleSignOut() {
    logout()
    navigate('/login', { replace: true })
  }

  function handlePinSuccess(pin) {
    savePin(pin)
  }

  const hasPin = Boolean(user?.pin)

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
            {/* Profile info */}
            <div className="ac-group ac-group--bordered">
              <div className="ac-item">
                <p className="ac-item__label">Name</p>
                <p className="ac-item__value">{user?.name}</p>
              </div>
              <div className="ac-item">
                <p className="ac-item__label">Member ID</p>
                <p className="ac-item__value">{brand.memberId}</p>
              </div>
              <div className="ac-item">
                <p className="ac-item__label">Phone number</p>
                <p className="ac-item__value">{user?.phone}</p>
              </div>
              <div className="ac-item">
                <p className="ac-item__label">Member since</p>
                <p className="ac-item__value">{brand.memberSince}</p>
              </div>
            </div>

            {/* Security — PIN */}
            <div className="ac-group ac-group--bordered">
              <p className="ac-section-label">Security</p>
              <button
                className="ac-pin-row"
                onClick={() => setPinSheetMode(hasPin ? 'change' : 'create')}
              >
                <span className="ac-pin-row__label">PIN</span>
                <span className="ac-pin-row__right">
                  {hasPin ? (
                    <>
                      <span className="ac-pin-row__dots">●●●●●●</span>
                      <span className="ac-pin-row__action">Change</span>
                    </>
                  ) : (
                    <span className="ac-pin-row__action ac-pin-row__action--setup">Set up</span>
                  )}
                  <span className="ac-pin-row__chevron">
                    <span className="ac-pin-row__chevron-path">
                      <img src={IMAGES.chevronLeft} alt="" style={{ transform: 'rotate(180deg)' }} />
                    </span>
                  </span>
                </span>
              </button>
            </div>

            {/* Sign out */}
            <div className="ac-group">
              <button className="ac-signout" onClick={handleSignOut}>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {pinSheetMode && (
        <PinSheet
          mode={pinSheetMode}
          phone={user?.phone}
          dismissable
          onClose={() => setPinSheetMode(null)}
          onSuccess={handlePinSuccess}
        />
      )}
    </div>
  )
}
