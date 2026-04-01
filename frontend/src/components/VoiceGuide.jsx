import { DIMENSIONS, TARGET_RANGE } from '../data/dimensions.js'

const TONES = ['Aspirational', 'Sensory', 'Expert-led', 'Second person']

export default function VoiceGuide() {
  return (
    <div className="card voice-guide">
      <h3>SD Voice Guide</h3>

      {DIMENSIONS.map((c) => (
        <div key={c.key} className="guide-item">
          <div className="guide-title">{c.label}</div>
          <div className="guide-desc">{c.desc}</div>
        </div>
      ))}

      <div className="guide-target">
        <div className="target-label">Target Readability</div>
        <div className="target-value">{TARGET_RANGE.min} &ndash; {TARGET_RANGE.max}</div>
        <div className="target-desc">Flesch Reading Ease</div>
      </div>

      <div className="tone-tags">
        {TONES.map((t) => (
          <span key={t} className="tone-tag">{t}</span>
        ))}
      </div>
    </div>
  )
}
