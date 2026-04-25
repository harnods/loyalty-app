import ActionCard from '../ActionCard/ActionCard'
import './QuickActions.css'

export default function QuickActions({ actions }) {
  return (
    <section className="quick-actions">
      <p className="quick-actions__title">Quick actions</p>
      <div className="quick-actions__list">
        {actions.map((action) => (
          <ActionCard
            key={action.id}
            color={action.color}
            icon={action.icon}
            label={action.label}
            href={action.href}
          />
        ))}
      </div>
    </section>
  )
}
