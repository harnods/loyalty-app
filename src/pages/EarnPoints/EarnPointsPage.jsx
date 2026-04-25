import BackNav from '../../components/BackNav/BackNav'
import StepList from '../../components/StepList/StepList'
import WarningBanner from '../../components/WarningBanner/WarningBanner'
import Footer from '../../components/Footer/Footer'
import { EARN_POINTS } from '../../data/loyalty'
import './EarnPointsPage.css'

export default function EarnPointsPage() {
  return (
    <div className="earn-points-page">
      <div className="earn-points-page__stage">
        <BackNav />
        <div className="earn-points-page__hero">
          <h1 className="earn-points-page__hero-title">{EARN_POINTS.hero.title}</h1>
          <p className="earn-points-page__hero-desc">{EARN_POINTS.hero.description}</p>
        </div>
      </div>

      <div className="earn-points-page__content">
        <StepList
          title={EARN_POINTS.howItWorks.title}
          steps={EARN_POINTS.howItWorks.steps}
        />
        <WarningBanner text={EARN_POINTS.warning} />
      </div>

      <Footer />
    </div>
  )
}
