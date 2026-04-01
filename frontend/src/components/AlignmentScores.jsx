import { useState } from 'react'
import { ALIGNMENT_DIMENSIONS } from '../data/dimensions.js'

export default function AlignmentScores({ alignmentScores, overallScore }) {
  const [expanded, setExpanded] = useState(null)

  if (!alignmentScores) return null

  return (
    <div className="alignment-section">
      <div className="alignment-overall">
        <span className="alignment-overall-score">{overallScore}</span>
        <span className="alignment-overall-label">Overall Alignment</span>
      </div>

      <div className="qualitative-section">
        <h4>Alignment Dimensions</h4>
        {ALIGNMENT_DIMENSIONS.map((dim) => {
          const data = alignmentScores[dim.key]
          if (!data) return null
          return (
            <div key={dim.key}>
              <div
                className="score-row"
                style={{ cursor: 'pointer' }}
                onClick={() => setExpanded(expanded === dim.key ? null : dim.key)}
              >
                <span className="score-label">{dim.label}</span>
                <div className="score-bar-track">
                  <div
                    className="score-bar-fill"
                    style={{ width: `${(data.score / 5) * 100}%` }}
                  />
                </div>
                <span className="score-value">{data.score}</span>
              </div>
              {expanded === dim.key && (
                <p className="score-rationale">{data.rationale}</p>
              )}
            </div>
          )
        })}
      </div>

      {alignmentScores.suggestions && (
        <div className="alignment-suggestions">
          <h4>Suggestions</h4>
          <p>{alignmentScores.suggestions}</p>
        </div>
      )}
    </div>
  )
}
