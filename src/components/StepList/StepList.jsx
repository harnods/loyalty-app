import './StepList.css'

function StepItem({ step }) {
  return (
    <li className="step-item">
      <span className="step-item__badge">{step.id}</span>
      <p className="step-item__text">
        {step.parts.map((part, i) =>
          part.bold
            ? <strong key={i}>{part.text}</strong>
            : <span key={i}>{part.text}</span>
        )}
      </p>
    </li>
  )
}

export default function StepList({ title, steps }) {
  return (
    <div className="step-list">
      <h2 className="step-list__title">{title}</h2>
      <ol className="step-list__items">
        {steps.map((step) => (
          <StepItem key={step.id} step={step} />
        ))}
      </ol>
    </div>
  )
}
