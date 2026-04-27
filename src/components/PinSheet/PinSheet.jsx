import { useEffect, useRef, useState } from 'react'
import { IMAGES } from '../../data/loyalty'
import './PinSheet.css'

const DUMMY_OTP = '123456'

// ---------------------------------------------------------------------------
// Dot-based PIN input
// ---------------------------------------------------------------------------
function PinDots({ value, onChange, onComplete, hasError, inputRef }) {
  function handleChange(e) {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6)
    onChange(val)
    if (val.length === 6) onComplete?.(val)
  }

  return (
    <div className="ps-pin-dots" onClick={() => inputRef?.current?.focus()}>
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          className={[
            'ps-pin-dot',
            value.length > i ? 'ps-pin-dot--filled' : '',
            hasError        ? 'ps-pin-dot--error'  : '',
          ].filter(Boolean).join(' ')}
        />
      ))}
      <input
        ref={inputRef}
        className="ps-pin-hidden"
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main sheet
// ---------------------------------------------------------------------------
export default function PinSheet({
  mode       = 'create', // 'create' | 'change'
  phone,
  dismissable = true,
  onClose,
  onSuccess,             // onSuccess(pin) — parent saves the PIN
}) {
  const [visible, setVisible] = useState(false)

  // Steps: change → otp → create → confirm → success
  //        create → create → confirm → success
  const allSteps = mode === 'change'
    ? ['otp', 'create', 'confirm', 'success']
    : ['create', 'confirm', 'success']

  const [stepIdx, setStepIdx]       = useState(0)
  const step                        = allSteps[stepIdx]
  const progressSteps               = allSteps.filter(s => s !== 'success')
  const progressIdx                 = progressSteps.indexOf(step)

  // OTP
  const [otp, setOtp]               = useState(['', '', '', '', '', ''])
  const [otpError, setOtpError]     = useState('')
  const [timeLeft, setTimeLeft]     = useState(50)
  const otpRefs                     = useRef([])

  // PIN
  const [pin, setPin]               = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [pinError, setPinError]     = useState('')
  const [shake, setShake]           = useState(false)
  const pinRef                      = useRef(null)
  const confirmRef                  = useRef(null)

  // Slide-in
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // OTP resend timer
  useEffect(() => {
    if (step !== 'otp' || timeLeft <= 0) return
    const t = setTimeout(() => setTimeLeft(n => n - 1), 1000)
    return () => clearTimeout(t)
  }, [step, timeLeft])

  // Auto-focus PIN inputs when step changes
  useEffect(() => {
    if (step === 'create')  setTimeout(() => pinRef.current?.focus(),    80)
    if (step === 'confirm') setTimeout(() => confirmRef.current?.focus(), 80)
  }, [step])

  // Auto-close after success
  useEffect(() => {
    if (step !== 'success') return
    const t = setTimeout(() => {
      handleClose()
    }, 1600)
    return () => clearTimeout(t)
  }, [step])

  function handleClose() {
    setVisible(false)
    setTimeout(() => onClose?.(), 280)
  }

  function next() { setStepIdx(i => i + 1) }

  // ── OTP ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const s = otp.join('')
    if (s.length === 6) verifyOtp(s)
  }, [otp])

  function verifyOtp(s) {
    if (s !== DUMMY_OTP) {
      setOtpError('Incorrect OTP. Use 123456.')
      return
    }
    setOtpError('')
    next()
  }

  function handleOtpChange(index, value) {
    if (!/^\d*$/.test(value)) return
    if (value.length > 1) {
      const chars = value.slice(0, 6).split('')
      const newOtp = [...otp]
      chars.forEach((c, i) => { if (index + i < 6) newOtp[index + i] = c })
      setOtp(newOtp)
      setOtpError('')
      otpRefs.current[Math.min(index + chars.length, 5)]?.focus()
      return
    }
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setOtpError('')
    if (value && index < 5) otpRefs.current[index + 1]?.focus()
  }

  function handleOtpKeyDown(index, e) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  function handleResend() {
    if (timeLeft > 0) return
    setOtp(['', '', '', '', '', ''])
    setOtpError('')
    setTimeLeft(50)
    otpRefs.current[0]?.focus()
  }

  // ── Create PIN ────────────────────────────────────────────────────────────
  function handlePinComplete() {
    setTimeout(() => next(), 120)
  }

  // ── Confirm PIN ───────────────────────────────────────────────────────────
  function handleConfirmComplete(val) {
    if (val !== pin) {
      triggerShake()
      setPinError("PINs don't match. Try again.")
      setTimeout(() => {
        setConfirmPin('')
        setPinError('')
        confirmRef.current?.focus()
      }, 900)
      return
    }
    onSuccess?.(pin)
    setTimeout(() => next(), 120)
  }

  function triggerShake() {
    setShake(true)
    setTimeout(() => setShake(false), 600)
  }

  const formattedPhone = phone?.startsWith('62') ? `+${phone}` : phone

  return (
    <div
      className={`ps-overlay${visible ? ' ps-overlay--open' : ''}`}
      onClick={dismissable ? handleClose : undefined}
    >
      <div
        className={`ps-sheet${visible ? ' ps-sheet--open' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header ──────────────────────────────────────────────────── */}
        {step !== 'success' && (
          <div className="ps-header">
            {/* Step progress dots */}
            <div className="ps-progress">
              {progressSteps.map((_, i) => (
                <span
                  key={i}
                  className={[
                    'ps-progress__dot',
                    i < progressIdx  ? 'ps-progress__dot--done'   : '',
                    i === progressIdx ? 'ps-progress__dot--active' : '',
                  ].filter(Boolean).join(' ')}
                />
              ))}
            </div>

            {/* Close — only when dismissable */}
            {dismissable ? (
              <button className="ps-close" onClick={handleClose} aria-label="Close">
                <span className="ps-close__path">
                  <img src={IMAGES.closeIcon} alt="" />
                </span>
              </button>
            ) : (
              <span className="ps-close-placeholder" />
            )}
          </div>
        )}

        {/* ── OTP step ────────────────────────────────────────────────── */}
        {step === 'otp' && (
          <div className="ps-body">
            <p className="ps-title">Verify identity</p>
            <p className="ps-subtitle">Enter the OTP sent to {formattedPhone}</p>
            <p className="ps-test-hint">Use <strong>123456</strong> for testing</p>

            <div className="ps-otp-inputs">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={el => (otpRefs.current[i] = el)}
                  className={`ps-otp-box${otpError ? ' ps-otp-box--error' : ''}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={digit}
                  onChange={e => handleOtpChange(i, e.target.value)}
                  onKeyDown={e => handleOtpKeyDown(i, e)}
                  autoFocus={i === 0}
                />
              ))}
            </div>
            {otpError && <p className="ps-error ps-error--center">{otpError}</p>}

            <div className="ps-resend">
              {timeLeft > 0 ? (
                <span className="ps-resend__text">Resend OTP in {timeLeft}s</span>
              ) : (
                <button className="ps-resend__btn" type="button" onClick={handleResend}>
                  Resend OTP
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── Create PIN step ─────────────────────────────────────────── */}
        {step === 'create' && (
          <div className="ps-body">
            <p className="ps-title">Create PIN</p>
            <p className="ps-subtitle">Set a 6-digit PIN to secure your account</p>
            <PinDots
              value={pin}
              onChange={v => { setPin(v); setPinError('') }}
              onComplete={handlePinComplete}
              hasError={false}
              inputRef={pinRef}
            />
          </div>
        )}

        {/* ── Confirm PIN step ─────────────────────────────────────────── */}
        {step === 'confirm' && (
          <div className="ps-body">
            <p className="ps-title">Confirm PIN</p>
            <p className="ps-subtitle">Re-enter your 6-digit PIN</p>
            <div className={shake ? 'ps-shake' : ''}>
              <PinDots
                value={confirmPin}
                onChange={v => { setConfirmPin(v); setPinError('') }}
                onComplete={handleConfirmComplete}
                hasError={!!pinError}
                inputRef={confirmRef}
              />
            </div>
            {pinError && <p className="ps-error ps-error--center">{pinError}</p>}
          </div>
        )}

        {/* ── Success step ─────────────────────────────────────────────── */}
        {step === 'success' && (
          <div className="ps-body ps-body--success">
            <div className="ps-success-icon">
              <img src={IMAGES.doneIcon} alt="" />
            </div>
            <p className="ps-title">PIN set successfully</p>
            <p className="ps-subtitle">Your account is now secured</p>
          </div>
        )}
      </div>
    </div>
  )
}
