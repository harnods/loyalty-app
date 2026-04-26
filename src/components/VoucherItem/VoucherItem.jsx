import './VoucherItem.css'

export default function VoucherItem({ name, code, expiry, thumb, thumbStyle, onClick, faded }) {
  return (
    <div
      className={`voucher-item${faded ? ' voucher-item--faded' : ''}`}
      onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.() }}
    >
      <div className="voucher-item__thumb">
        <img src={thumb} alt={name} style={thumbStyle} />
      </div>
      <div className="voucher-item__col">
        <p className="voucher-item__name">{name}</p>
        <div className="voucher-item__meta">
          <span>{code}</span>
          <span className="voucher-item__dot" aria-hidden="true" />
          <span>{expiry}</span>
        </div>
      </div>
    </div>
  )
}
