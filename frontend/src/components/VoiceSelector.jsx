import { STYLE_DIMENSIONS, BRAND_PRESETS, getActivePresetKey } from '../data/voiceProfiles.js'

export default function VoiceSelector({ style, onStyleChange, onPresetSelect }) {
  const activePresetKey = getActivePresetKey(style)

  function handlePresetClick(preset) {
    onPresetSelect(preset.key)
    onStyleChange({ ...preset.style })
  }

  function handleDimensionChange(key, value) {
    onStyleChange({ ...style, [key]: value })
  }

  return (
    <div className="voice-selector">
      <div className="brand-chips">
        {BRAND_PRESETS.map((bp) => (
          <button
            key={bp.key}
            className={`brand-chip ${activePresetKey === bp.key ? 'active' : ''}`}
            onClick={() => handlePresetClick(bp)}
            title={bp.description}
          >
            <span className="brand-dot" style={{ background: bp.colour }} />
            {bp.label}
          </button>
        ))}
      </div>

      <div className="style-dropdowns">
        {STYLE_DIMENSIONS.map((dim) => (
          <div key={dim.key} className="style-dropdown-group">
            <label className="style-dropdown-label">{dim.label}</label>
            <select
              className="style-dropdown"
              value={style[dim.key]}
              onChange={(e) => handleDimensionChange(dim.key, e.target.value)}
            >
              {dim.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}
