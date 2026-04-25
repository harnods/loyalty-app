import VoucherItem from '../VoucherItem/VoucherItem'
import './VoucherSection.css'

export default function VoucherSection({ vouchers }) {
  return (
    <section className="voucher-section">
      <div className="voucher-section__header">
        <p className="voucher-section__title">Your vouchers</p>
        <button className="voucher-section__view-all">View all</button>
      </div>
      <div className="voucher-section__list">
        {vouchers.map((v) => (
          <VoucherItem
            key={v.id}
            name={v.name}
            code={v.code}
            expiry={v.expiry}
            thumb={v.thumb}
            thumbStyle={v.thumbStyle}
          />
        ))}
      </div>
    </section>
  )
}
