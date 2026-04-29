import { IMAGES } from '../../data/loyalty'
import './PointsCard.css'

export default function PointsCard({ user }) {
  const isSpecialPhone = user?.phone === '087880851479'

  if (isSpecialPhone) {
    const items = [
      { id: 'machimoto', title: 'Machimoto Cafe', value: '1,250 pts', tier: 'Gold' },
      { id: 'tomodachi', title: 'Tomodachi Cafe', value: '3,250 exp', tier: 'Level 2' },
      { id: 'daitomo', title: 'Daitomo Ramen', value: 'Rp50.000', tier: 'Basic' },
    ]

    return (
      <section className="points-section">
        <div className="points-card points-card--multi">
          {items.map((item, index) => (
            <article
              key={item.id}
              className={`points-card__merchant${index < items.length - 1 ? ' points-card__merchant--divider' : ''}`}
            >
              <div className="points-card__merchant-label">
                <p className="points-card__merchant-title">{item.title}</p>
                <p className="points-card__merchant-value">{item.value}</p>
              </div>
              <div className="points-card__tier">
                <img src={IMAGES.crown} alt="" width={20} height={20} />
                <span>{item.tier}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="points-section">
      <p className="points-section__welcome">Welcome, {user.name}!</p>

      <div className="points-card">
        <div className="points-card__col">
          <div>
            <p className="points-card__label">Total points</p>
            <p className="points-card__value">{user.points} pts</p>
          </div>

          <div className="points-card__tier">
            <img src={IMAGES.crown} alt="" width={20} height={20} />
            <span>{user.tier}</span>
          </div>

          <p className="points-card__updated">{user.memberId}</p>
        </div>

        <div className="points-card__hero" aria-hidden="true">
          <img src={IMAGES.heroCoins} alt="" />
        </div>
      </div>
    </section>
  )
}
