import { useState } from 'react'
import { DIMENSIONS } from '../data/dimensions.js'

export default function QualitativeScores({ qualitative }) {
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="qualitative-section">
      <h4>Quality Scores</h4>
      {DIMENSIONS.map(({ key, label }) => {
        const dim = qualitative[key]
        return (
          <div key={key}>
            <div
              className="score-row"
              style={{ cursor: 'pointer' }}
              onClick={() => setExpanded(expanded === key ? null : key)}
            >
              <span className="score-label">{label}</span>
              <div className="score-bar-track">
                <div
                  className="score-bar-fill"
                  style={{ width: `${(dim.score / 5) * 100}%` }}
                />
              </div>
              <span className="score-value">{dim.score}</span>
            </div>
            {expanded === key && (
              <div className="score-rationale">{dim.rationale}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}
