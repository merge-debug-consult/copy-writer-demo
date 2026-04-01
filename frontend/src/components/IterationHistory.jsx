import { useState } from 'react'

export default function IterationHistory({ iterations, targetRange = { min: 50, max: 65 } }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="iteration-history">
      <button className="iteration-toggle" onClick={() => setOpen(!open)}>
        {open ? '\u25BC' : '\u25B6'} Refinement process ({iterations.length} iteration{iterations.length !== 1 ? 's' : ''})
      </button>

      {open && (
        <div className="iteration-list">
          {iterations.map((iter, i) => {
            const inRange = iter.flesch_reading_ease >= targetRange.min && iter.flesch_reading_ease <= targetRange.max
            return (
              <div key={i} className="iteration-item">
                <div className="iter-header">
                  <span className="iter-label">Iteration {i + 1}</span>
                  <span className={`iter-score ${inRange ? 'in-range' : 'out-range'}`}>
                    FRE: {iter.flesch_reading_ease.toFixed(1)}
                  </span>
                </div>
                <p className="iter-text">{iter.text}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
