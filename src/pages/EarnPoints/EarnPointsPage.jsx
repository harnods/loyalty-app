import Header from '../../components/Header/Header'
import BackNav from '../../components/BackNav/BackNav'
import WarningBanner from '../../components/WarningBanner/WarningBanner'
import Footer from '../../components/Footer/Footer'
import { USER, EARN_POINTS } from '../../data/loyalty'
import './EarnPointsPage.css'

function StepItem({ step }) {
  return (
    <div className="ep-step">
      <span className="ep-step__badge">{step.id}</span>
      <p className="ep-step__text">
        {step.parts.map((part, i) =>
          part.bold
            ? <strong key={i}>{part.text}</strong>
            : <span key={i}>{part.text}</span>
        )}
      </p>
    </div>
  )
}

export default function EarnPointsPage() {
  return (
    <div className="ep">
      <Header userName={USER.name} />

      <div className="ep__container">
        <div className="ep__stage">
          <BackNav />

          <div className="ep__hero">
            <h1 className="ep__hero-title">{EARN_POINTS.hero.title}</h1>
            <p className="ep__hero-desc">{EARN_POINTS.hero.description}</p>
          </div>

          <div className="ep__content">
            {EARN_POINTS.sections.map((section) => (
              <div key={section.id} className="ep__section">
                <h2 className="ep__section-title">{section.title}</h2>
                {section.intro && (
                  <p className="ep__section-intro">{section.intro}</p>
                )}
                <div className="ep__step-list">
                  {section.steps.map((step) => (
                    <StepItem key={step.id} step={step} />
                  ))}
                </div>
                {section.warning && (
                  <WarningBanner parts={section.warning} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
