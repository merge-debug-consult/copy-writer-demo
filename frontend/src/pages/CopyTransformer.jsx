import { useState } from 'react'
import ToneModifiers from '../components/ToneModifiers.jsx'
import CompactReadability from '../components/CompactReadability.jsx'
import CompactScores from '../components/CompactScores.jsx'
import VoiceOutputCard from '../components/VoiceOutputCard.jsx'
import ErrorModal from '../components/ErrorModal.jsx'
import { PRESETS } from '../data/presets.js'
import { BRAND_PRESETS } from '../data/voiceProfiles.js'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

const VOICE_KEYS = BRAND_PRESETS.map((bp) => ({
  key: bp.key,
  label: bp.label,
  colour: bp.colour,
  style: bp.style,
  targetRange: bp.targetRange,
  targetRationale: bp.targetRationale,
  description: bp.description,
}))

const DEFAULT_MODIFIERS = { season: '', affluence: '', traveller: '' }

export default function CopyTransformer() {
  const [activePreset, setActivePreset] = useState(null)
  const [showCustom, setShowCustom] = useState(false)
  const [customText, setCustomText] = useState('')
  const [inputText, setInputText] = useState('')
  const [inputReadability, setInputReadability] = useState(null)
  const [inputQualitative, setInputQualitative] = useState(null)
  const [responses, setResponses] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [modifiers, setModifiers] = useState(DEFAULT_MODIFIERS)

  function handlePresetClick(preset) {
    setActivePreset(preset.id)
    setShowCustom(false)
    setInputText(preset.input_text)
    setCustomText('')
    setResponses(preset.responses)
    const first = Object.values(preset.responses)[0]
    setInputReadability(first.input_readability)
    setInputQualitative(first.input_qualitative)
  }

  function handleCustomClick() {
    setActivePreset(null)
    setShowCustom(true)
    setResponses(null)
    setInputReadability(null)
    setInputQualitative(null)
    setInputText('')
  }

  async function handleTransform() {
    const text = customText.trim()
    if (!text) return

    setInputText(text)
    setResponses(null)
    setInputReadability(null)
    setInputQualitative(null)
    setLoading(true)

    try {
      const results = await Promise.all(
        VOICE_KEYS.map(async (voice) => {
          const res = await fetch(`${API_BASE}/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              input_text: text,
              style: voice.style,
              modifiers,
            }),
          })
          if (!res.ok) throw new Error(`API error: ${res.status}`)
          return { key: voice.key, data: await res.json() }
        })
      )

      const allResponses = {}
      for (const { key, data } of results) {
        allResponses[key] = data
      }
      setResponses(allResponses)

      const first = results[0].data
      setInputReadability(first.input_readability)
      setInputQualitative(first.input_qualitative)
    } catch {
      setShowErrorModal(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Preset pills + Custom tab */}
      <div className="source-tabs">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            className={`source-tab ${activePreset === preset.id ? 'active' : ''}`}
            onClick={() => handlePresetClick(preset)}
          >
            <span className="source-tab-icon">{preset.icon}</span>
            {preset.label}
          </button>
        ))}
        <button
          className={`source-tab ${showCustom ? 'active' : ''}`}
          onClick={handleCustomClick}
        >
          <span className="source-tab-icon">{'\u270F\uFE0F'}</span>
          Custom Text
        </button>
      </div>

      {/* Custom text expandable area */}
      {showCustom && (
        <div className="custom-input-area">
          <textarea
            placeholder="Paste a supplier property description here..."
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            rows={4}
          />
          <div className="custom-input-controls">
            <ToneModifiers modifiers={modifiers} onChange={setModifiers} />
            <button
              className="transform-btn"
              onClick={handleTransform}
              disabled={loading || !customText.trim()}
            >
              {loading ? 'Generating...' : 'Transform'}
            </button>
          </div>
        </div>
      )}

      {showErrorModal && <ErrorModal onClose={() => setShowErrorModal(false)} />}

      {!responses && !loading && (
        <div className="intro-panel">
          <h2>How it works</h2>
          <ul>
            <li>Select a property above to instantly see the same text rewritten in <strong>4 brand voices</strong></li>
            <li>Each voice adapts tone, audience, and detail style &mdash; compare Scott Dunn editorial vs competitor copy at a glance</li>
            <li>Every card includes <strong>multi-channel variants</strong> &mdash; website, social, print, and internal briefing from one input</li>
            <li>Use <strong>Custom Text</strong> to paste or type any supplier copy and generate all 4 voices live</li>
          </ul>
        </div>
      )}

      {loading && (
        <div className="card">
          <div className="loading-overlay">
            <div className="loading-spinner" />
            <p className="loading-stage">Generating all 4 voice variants...</p>
          </div>
        </div>
      )}

      {responses && (
        <>
          {/* Supplier original - collapsed */}
          <details className="input-details">
            <summary className="input-summary">
              <span className="input-summary-icon">{'\u2139\uFE0F'}</span>
              Supplier Original
              {inputReadability && (
                <span className="input-fre">
                  Readability: {inputReadability.flesch_reading_ease.toFixed(0)}
                </span>
              )}
              <span className="input-chevron">{'\u25BE'}</span>
            </summary>
            <div className="input-details-body">
              <p className="panel-text">{inputText}</p>
              {inputReadability && (
                <CompactReadability readability={inputReadability} targetRange={{ min: 50, max: 65 }} />
              )}
              {inputQualitative && (
                <CompactScores qualitative={inputQualitative} />
              )}
            </div>
          </details>

          {/* 2x2 voice grid */}
          <div className="voice-grid">
            {VOICE_KEYS.map((voice) => {
              const voiceResponse = responses[voice.key]
              if (!voiceResponse) return null
              return (
                <VoiceOutputCard
                  key={voice.key}
                  label={voice.label}
                  colour={voice.colour}
                  description={voice.description}
                  response={voiceResponse}
                  targetRange={voice.targetRange}
                  targetRationale={voice.targetRationale}
                />
              )
            })}
          </div>
        </>
      )}
    </>
  )
}
