import { useState } from 'react'

const DIMS = [
  { key: 'persuasiveness', short: 'Persuade' },
  { key: 'sensory_language', short: 'Sensory' },
  { key: 'emotional_resonance', short: 'Emotion' },
  { key: 'specificity', short: 'Specific' },
  { key: 'brand_voice', short: 'Voice' },
]

function scoreColour(score) {
  if (score <= 2) return '#e74c3c'
  if (score <= 3) return '#f39c12'
  return '#00402E'
}

export default function CompactScores({ qualitative }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="compact-scores">
      <div className="compact-scores-row" onClick={() => setExpanded(!expanded)} style={{ cursor: 'pointer' }}>
        <span className="compact-scores-label">Quality</span>
        {DIMS.map(({ key, short }) => {
          const s = qualitative[key]?.score
          return (
            <span key={key} className="compact-score-pill" style={{ color: scoreColour(s) }}>
              {short} <strong>{s}</strong>
            </span>
          )
        })}
      </div>
      {expanded && (
        <div className="compact-scores-detail">
          {DIMS.map(({ key, short }) => {
            const d = qualitative[key]
            return (
              <div key={key} className="compact-score-rationale">
                <strong>{short}:</strong> {d?.rationale}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
