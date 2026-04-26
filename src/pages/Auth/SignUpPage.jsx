import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { IMAGES } from '../../data/loyalty'
import './auth.css'

export default function SignUpPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { user } = useAuth()

  if (user) return <Navigate to="/" replace />

  function clearField(field) {
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = {}
    if (name.trim().length < 2) errs.name = 'Enter your full name (min 2 characters)'
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length < 10) errs.phone = 'Enter a valid phone number (min 10 digits)'
    if (Object.keys(errs).length) { setErrors(errs); return }
    navigate('/otp', { state: { mode: 'signup', phone: cleaned, name: name.trim() } })
  }

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <form className="auth-card" onSubmit={handleSubmit} noValidate>
          <div className="auth-card__header">
            <img src={IMAGES.logo} alt="machimoto" className="auth-logo" />
            <p className="auth-title">Sign up</p>
          </div>
          <div className="auth-form">
            <div className="auth-input-group">
              <label className="auth-label" htmlFor="name">Full name</label>
              <input
                id="name"
                className={`auth-input${errors.name ? ' auth-input--error' : ''}`}
                type="text"
                placeholder="e.g. Dona"
                value={name}
                onChange={(e) => { setName(e.target.value); clearField('name') }}
                autoComplete="name"
                autoFocus
              />
              {errors.name && <p className="auth-error">{errors.name}</p>}
            </div>
            <div className="auth-input-group">
              <label className="auth-label" htmlFor="phone">Phone number</label>
              <input
                id="phone"
                className={`auth-input${errors.phone ? ' auth-input--error' : ''}`}
                type="tel"
                placeholder="e.g. 08123456789"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); clearField('phone') }}
                autoComplete="tel"
              />
              {errors.phone && <p className="auth-error">{errors.phone}</p>}
            </div>
            <div className="auth-btn-group">
              <button className="auth-btn-primary" type="submit">Send OTP</button>
              <p className="auth-link-row">
                Already have an account?{' '}
                <button className="auth-link" type="button" onClick={() => navigate('/login')}>
                  Sign in
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
