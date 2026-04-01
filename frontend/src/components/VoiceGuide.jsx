import { DIMENSIONS } from '../data/dimensions.js'
import { BRAND_PRESETS, getTargetRange } from '../data/voiceProfiles.js'

const VOICE_TONE_TAGS = {
  scott_dunn: ['Aspirational', 'Sensory', 'Expert-led', 'Second person'],
  sd_private: ['Understated', 'Discreet', 'Declarative', 'First person plural'],
  explorers: ['Joyful', 'Reassuring', 'Energetic', 'Parent-focused'],
  black_tomato: ['Philosophical', 'Emotion-led', 'Punchy', 'Curious'],
}

export default function VoiceGuide({ style, activePreset }) {
  const targetRange = getTargetRange(style)
  const preset = BRAND_PRESETS.find((bp) => bp.key === activePreset)
  const toneTags = VOICE_TONE_TAGS[activePreset] || ['Custom configuration']
  const label = preset ? preset.label : 'Custom Voice'

  return (
    <div className="card voice-guide">
      <h3>{label} Voice Guide</h3>

      {DIMENSIONS.map((c) => (
        <div key={c.key} className="guide-item">
          <div className="guide-title">{c.label}</div>
          <div className="guide-desc">{c.desc}</div>
        </div>
      ))}

      <div className="guide-target">
        <div className="target-label">Target Readability</div>
        <div className="target-value">{targetRange.min} &ndash; {targetRange.max}</div>
        <div className="target-desc">Flesch Reading Ease</div>
      </div>

      <div className="tone-tags">
        {toneTags.map((t) => (
          <span key={t} className="tone-tag">{t}</span>
        ))}
      </div>
    </div>
  )
}
