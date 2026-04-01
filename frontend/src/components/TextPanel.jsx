import ReadabilityGauge from './ReadabilityGauge.jsx'
import QualitativeScores from './QualitativeScores.jsx'

export default function TextPanel({ type, title, text, readability, qualitative }) {
  return (
    <div className="panel">
      <div className={`panel-header ${type}`}>{title}</div>
      <div className="panel-body">
        <p className="panel-text">{text}</p>
        <ReadabilityGauge readability={readability} />
        <QualitativeScores qualitative={qualitative} />
      </div>
    </div>
  )
}
