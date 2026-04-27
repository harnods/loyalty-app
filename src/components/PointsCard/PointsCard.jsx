import { IMAGES } from '../../data/loyalty'
import './PointsCard.css'

export default function PointsCard({ user }) {
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
