import { useState } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { IMAGES } from '../../data/loyalty'
import './auth.css'

const DUMMY_OTP = '123456'

export default function OtpPage() {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [resent, setResent] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const { mode, phone, name } = location.state || {}

  if (!phone) return <Navigate to="/login" replace />

  const maskedPhone = phone.length > 7
    ? `${phone.slice(0, 4)}****${phone.slice(-3)}`
    : phone

  function handleResend() {
    setOtp('')
    setError('')
    setResent(true)
    setTimeout(() => setResent(false), 3000)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (otp !== DUMMY_OTP) {
      setError('Incorrect OTP. Use 123456 for now.')
      return
    }
    login({
      name: mode === 'signup' ? name : 'Dona',
      phone,
    })
    navigate('/', { replace: true })
  }

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <form className="auth-card" onSubmit={handleSubmit} noValidate>
          <div className="auth-card__header">
            <img src={IMAGES.logo} alt="machimoto" className="auth-logo" />
            <p className="auth-title">Enter OTP</p>
          </div>
          <div className="auth-form">
            <p className="auth-otp-hint">
              {resent ? 'OTP resent! ' : ''}
              We sent the code to {maskedPhone}
            </p>
            <div className="auth-input-group">
              <label className="auth-label" htmlFor="otp">OTP code</label>
              <input
                id="otp"
                className={`auth-input auth-input--otp${error ? ' auth-input--error' : ''}`}
                type="tel"
                placeholder="------"
                maxLength={6}
                value={otp}
                onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '')); setError('') }}
                autoComplete="one-time-code"
                autoFocus
              />
              {error && <p className="auth-error">{error}</p>}
            </div>
            <div className="auth-btn-group">
              <button className="auth-btn-primary" type="submit">Verify</button>
              <p className="auth-link-row">
                Didn't receive it?{' '}
                <button className="auth-link" type="button" onClick={handleResend}>
                  Resend OTP
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
