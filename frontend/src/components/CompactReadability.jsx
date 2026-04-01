function getColour(score, targetRange) {
  if (score < 40) return '#e74c3c'
  if (score < targetRange.min) return '#f39c12'
  if (score <= targetRange.max) return '#00402E'
  if (score <= 75) return '#f39c12'
  return '#e74c3c'
}

function getLabel(score) {
  if (score < 40) return 'Dense'
  if (score < 50) return 'Complex'
  if (score < 60) return 'Editorial'
  if (score < 70) return 'Accessible'
  if (score < 80) return 'Easy'
  return 'Very easy'
}

export default function CompactReadability({ readability, targetRange = { min: 50, max: 65 } }) {
  const fre = readability.flesch_reading_ease
  const colour = getColour(fre, targetRange)
  const inRange = fre >= targetRange.min && fre <= targetRange.max

  return (
    <div className="compact-readability">
      <span className="compact-readability-label">Calculated Readability</span>
      <span className="compact-readability-score" style={{ color: colour }}>
        {fre.toFixed(0)}
      </span>
      <span className="compact-readability-desc">{getLabel(fre)}</span>
      {inRange && <span className="compact-readability-badge">In range</span>}
    </div>
  )
}
