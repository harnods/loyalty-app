import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { IMAGES } from '../../data/loyalty'
import './auth.css'

const LOGIN_PHONE_OPTIONS = [
  { label: '087880851479', value: '087880851479' },
  { label: 'Random number', value: '081234567890' },
]

export default function SignInPage() {
  const [phone, setPhone] = useState(LOGIN_PHONE_OPTIONS[0].value)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { user } = useAuth()

  if (user) return <Navigate to="/" replace />

  function handleSubmit(e) {
    e.preventDefault()
    if (!phone) {
      setError('Please select a phone number')
      return
    }

    navigate('/otp', { state: { mode: 'signin', phone } })
  }

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <form className="auth-card" onSubmit={handleSubmit} noValidate>
          <div className="auth-card__header">
            <img src={IMAGES.logo} alt="machimoto" className="auth-logo" />
            <p className="auth-title">Sign in</p>
          </div>
          <div className="auth-form">
            <div className="auth-input-group">
              <label className="auth-label" htmlFor="phone">Phone number</label>
              <select
                id="phone"
                className={`auth-input${error ? ' auth-input--error' : ''}`}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                  setError('')
                }}
              >
                {LOGIN_PHONE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {error && <p className="auth-error">{error}</p>}
            </div>
            <div className="auth-btn-group">
              <button className="auth-btn-primary" type="submit">Send OTP</button>
              <p className="auth-link-row">
                Don't have an account?{' '}
                <button className="auth-link" type="button" onClick={() => navigate('/signup')}>
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </form>

        <div className="auth-footer">
          <p className="auth-footer__text">Powered by</p>
          <img src={IMAGES.mekariQontak} alt="Mekari Qontak" className="auth-footer__logo" />
        </div>
      </div>
    </div>
  )
}
