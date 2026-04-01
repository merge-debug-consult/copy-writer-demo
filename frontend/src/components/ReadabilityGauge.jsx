function getGaugeColour(score, targetRange) {
  if (score < 40) return 'red'
  if (score < targetRange.min) return 'amber'
  if (score <= targetRange.max) return 'green'
  if (score <= 75) return 'amber'
  return 'red'
}

function getFreLabel(score) {
  if (score < 30) return 'Very difficult — academic journals, legal text'
  if (score < 40) return 'Difficult — specialist or technical writing'
  if (score < 50) return 'Fairly difficult — quality broadsheet prose'
  if (score < 60) return 'Standard — the sweet spot for luxury editorial'
  if (score < 70) return 'Fairly easy — conversational, accessible'
  if (score < 80) return 'Easy — mass-market consumer copy'
  return 'Very easy — simple, short sentences'
}

const SCALE_BANDS = [
  { label: '0-30', desc: 'Academic', colour: '#e74c3c', width: '30%' },
  { label: '30-50', desc: 'Complex', colour: '#f39c12', width: '20%' },
  { label: '50-70', desc: 'Editorial', colour: '#00402E', width: '20%' },
  { label: '70-100', desc: 'Simple', colour: '#f39c12', width: '30%' },
]

export default function ReadabilityGauge({ readability, targetRange = { min: 50, max: 65 } }) {
  const fre = readability.flesch_reading_ease
  const colour = getGaugeColour(fre, targetRange)
  const width = Math.min(Math.max(fre, 0), 100)

  return (
    <div className="readability-section">
      <h4>Calculated Readability</h4>
      <div className="gauge-track">
        <div
          className={`gauge-fill ${colour}`}
          style={{ width: `${width}%` }}
        />
      </div>
      <div className="gauge-labels">
        <span className="gauge-score">{fre.toFixed(1)}</span>
        <span className="gauge-desc">{getFreLabel(fre)}</span>
      </div>

      {colour === 'green' ? (
        <div className="gauge-target-hit">In target range ({targetRange.min}&ndash;{targetRange.max})</div>
      ) : (
        <div className="gauge-target-miss">Target: {targetRange.min}&ndash;{targetRange.max}</div>
      )}

      <div className="gauge-scale">
        {SCALE_BANDS.map((band) => (
          <div key={band.label} className="gauge-scale-band" style={{ width: band.width }}>
            <div className="gauge-scale-bar" style={{ background: band.colour }} />
            <span className="gauge-scale-label">{band.desc}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
