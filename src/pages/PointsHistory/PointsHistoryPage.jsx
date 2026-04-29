import Header from '../../components/Header/Header'
import BackNav from '../../components/BackNav/BackNav'
import Footer from '../../components/Footer/Footer'
import { useBrand } from '../../contexts/BrandContext'
import './PointsHistoryPage.css'

function TransactionRow({ tx, isLast }) {
  return (
    <div className={`ph-row${isLast ? ' ph-row--last' : ''}`}>
      <div className="ph-row__col">
        <p className="ph-row__title">{tx.title}</p>
        <div className="ph-row__meta">
          <span>{tx.date}</span>
          {tx.location && <span>{tx.location}</span>}
        </div>
      </div>
      <p className={`ph-row__points${tx.points.startsWith('-') ? ' ph-row__points--negative' : ''}`}>{tx.points}</p>
    </div>
  )
}

function TransactionGroup({ group }) {
  return (
    <div className="ph-group">
      <div className="ph-group__month-row">
        <p className="ph-group__month">{group.month}</p>
      </div>
      {group.transactions.map((tx, i) => (
        <TransactionRow
          key={tx.id}
          tx={tx}
          isLast={i === group.transactions.length - 1}
        />
      ))}
    </div>
  )
}

export default function PointsHistoryPage() {
  const { brand } = useBrand()
  const { pointsHistory } = brand

  return (
    <div className="ph">
      <Header />

      <div className="ph__container">
        <div className="ph__stage">
          <BackNav />

          <div className="ph__hero">
            <h1 className="ph__hero-title">Points history</h1>
            <p className="ph__hero-desc">Total points: {pointsHistory.totalPoints}</p>
          </div>

          <div className="ph__content">
            {pointsHistory.groups.map((group) => (
              <TransactionGroup key={group.id} group={group} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
