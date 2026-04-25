import './VoucherItem.css'

export default function VoucherItem({ name, code, expiry, thumb, thumbStyle }) {
  return (
    <div className="voucher-item">
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
