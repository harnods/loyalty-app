import { useState } from 'react'
import Header from '../../components/Header/Header'
import BackNav from '../../components/BackNav/BackNav'
import Footer from '../../components/Footer/Footer'
import { USER, IMAGES, REDEEM_REWARDS } from '../../data/loyalty'
import './RedeemRewardsPage.css'

function RewardThumb({ reward }) {
  if (reward.thumbStyle) {
    return (
      <div className="rr-item__thumb">
        <div className="rr-item__thumb-inner">
          <img
            src={IMAGES[reward.thumbKey]}
            alt=""
            style={{
              position: 'absolute',
              width: reward.thumbStyle.width,
              height: reward.thumbStyle.height,
              top: reward.thumbStyle.top,
              left: reward.thumbStyle.left,
              maxWidth: 'none',
            }}
          />
        </div>
      </div>
    )
  }
  return (
    <div className="rr-item__thumb">
      <img src={IMAGES[reward.thumbKey]} alt="" className="rr-item__thumb-cover" />
    </div>
  )
}

function RewardRow({ reward, isLast }) {
  return (
    <div className={`rr-item${isLast ? ' rr-item--last' : ''}`}>
      <RewardThumb reward={reward} />
      <div className="rr-item__col">
        <p className={`rr-item__name${reward.locked ? ' rr-item__name--locked' : ''}`}>
          {reward.name}
        </p>
        <div className="rr-item__meta">
          <span className="rr-item__category">{reward.category}</span>
          {reward.locked && (
            <span className="rr-item__lock-badge">{reward.lockLabel}</span>
          )}
        </div>
      </div>
      <p className={`rr-item__points${reward.locked ? ' rr-item__points--locked' : ''}`}>
        {reward.points}
      </p>
    </div>
  )
}

export default function RedeemRewardsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [query, setQuery] = useState('')
  const filtered = REDEEM_REWARDS.rewards.filter((r) => {
    const matchesFilter = activeFilter === 'All' || r.category === activeFilter
    const matchesQuery = r.name.toLowerCase().includes(query.toLowerCase())
    return matchesFilter && matchesQuery
  })

  return (
    <div className="rr">
      <Header userName={USER.name} />

      <div className="rr__container">
        <div className="rr__stage">
          <BackNav />
          <div className="rr__hero">
            <h1 className="rr__hero-title">Redeem rewards</h1>
            <p className="rr__hero-desc">Total points: {USER.points} pts</p>
          </div>

          <div className="rr__content">
            <div className="rr__filter-section">
              <div className="rr__search">
                <span className="rr__search-icon">
                  <span className="rr__search-icon-path">
                    <img src={IMAGES.searchIcon} alt="" />
                  </span>
                </span>
                <input
                  className="rr__search-input"
                  type="text"
                  placeholder="Search rewards..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="rr__chips">
                {REDEEM_REWARDS.filters.map((f) => (
                  <button
                    key={f}
                    className={`rr-chip${activeFilter === f ? ' rr-chip--active' : ''}`}
                    onClick={() => setActiveFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="rr__list">
              {filtered.map((reward, i) => (
                <RewardRow
                  key={reward.id}
                  reward={reward}
                  isLast={i === filtered.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
