import { TARGET_RANGE } from '../data/dimensions.js'

function getGaugeColour(score) {
  if (score < 40) return 'red'
  if (score < TARGET_RANGE.min) return 'amber'
  if (score <= TARGET_RANGE.max) return 'green'
  if (score <= 75) return 'amber'
  return 'red'
}

function getGradeLabel(grade) {
  if (grade <= 6) return 'Very easy'
  if (grade <= 8) return 'Easy reading'
  if (grade <= 10) return 'Accessible sophistication'
  if (grade <= 12) return 'Academic'
  return 'Postgraduate'
}

export default function ReadabilityGauge({ readability }) {
  const fre = readability.flesch_reading_ease
  const colour = getGaugeColour(fre)
  const width = Math.min(Math.max(fre, 0), 100)

  return (
    <div className="readability-section">
      <h4>Readability</h4>
      <div className="gauge-track">
        <div
          className={`gauge-fill ${colour}`}
          style={{ width: `${width}%` }}
        />
      </div>
      <div className="gauge-labels">
        <span className="gauge-score">{fre.toFixed(1)}</span>
        <span className="gauge-desc">
          {colour === 'green' ? `Target range (${TARGET_RANGE.min}-${TARGET_RANGE.max})` : `Grade ${readability.flesch_kincaid_grade.toFixed(1)} \u2013 ${getGradeLabel(readability.flesch_kincaid_grade)}`}
        </span>
      </div>
      <div className="readability-metrics">
        <span className="metric">
          <strong>{readability.flesch_kincaid_grade.toFixed(1)}</strong> Grade Level
        </span>
        <span className="metric">
          <strong>{readability.gunning_fog.toFixed(1)}</strong> Gunning Fog
        </span>
      </div>
    </div>
  )
}
