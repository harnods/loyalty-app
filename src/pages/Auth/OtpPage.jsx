import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { IMAGES } from '../../data/loyalty'
import './auth.css'

const DUMMY_OTP = '123456'

export default function OtpPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [timeLeft, setTimeLeft] = useState(50)
  const inputRefs = useRef([])
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const { mode, phone, name } = location.state || {}

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timerId)
    }
  }, [timeLeft])

  useEffect(() => {
    const otpString = otp.join('')
    if (otpString.length === 6) {
      verifyOtp(otpString)
    }
  }, [otp])

  if (!phone) return <Navigate to="/login" replace />

  function verifyOtp(otpString) {
    if (otpString !== DUMMY_OTP) {
      setError('Incorrect OTP. Use 123456 for now.')
      return
    }
    login({
      name: mode === 'signup' ? name : 'Dona',
      phone,
    })
    navigate('/', { replace: true })
  }

  function handleOtpChange(index, value) {
    if (!/^\d*$/.test(value)) return
    
    // Handle pasting multiple digits
    if (value.length > 1) {
      const chars = value.slice(0, 6).split('')
      const newOtp = [...otp]
      chars.forEach((c, i) => {
        if (index + i < 6) newOtp[index + i] = c
      })
      setOtp(newOtp)
      setError('')
      const nextIndex = Math.min(index + chars.length, 5)
      inputRefs.current[nextIndex]?.focus()
      return
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError('')

    // Move to next input if filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleOtpKeyDown(index, e) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handleResend() {
    if (timeLeft > 0) return
    setOtp(['', '', '', '', '', ''])
    setError('')
    setTimeLeft(50)
    inputRefs.current[0]?.focus()
  }

  const formattedPhone = phone?.startsWith('62') ? `+${phone}` : phone

  // We don't need onSubmit anymore since it auto-submits, but we'll prevent default anyway
  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <form className="auth-card" onSubmit={handleSubmit} noValidate>
          <div className="auth-card__header">
            <img src={IMAGES.logo} alt="machimoto" className="auth-logo" />
            <p className="auth-title">Verification</p>
          </div>
          <div className="auth-form">
            <p className="auth-otp-hint">
              Enter the OTP sent to {formattedPhone}
            </p>
            <p className="auth-otp-test-hint">Use <strong>123456</strong> for testing</p>
            <div className="auth-otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className={`auth-otp-box${error ? ' auth-otp-box--error' : ''}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  autoFocus={index === 0}
                />
              ))}
            </div>
            {error && <p className="auth-error auth-error--center">{error}</p>}
            
            <div className="auth-resend-container">
              {timeLeft > 0 ? (
                <p className="auth-resend-text">Resend OTP in {timeLeft}s</p>
              ) : (
                <button className="auth-resend-btn" type="button" onClick={handleResend}>
                  Resend OTP
                </button>
              )}
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
