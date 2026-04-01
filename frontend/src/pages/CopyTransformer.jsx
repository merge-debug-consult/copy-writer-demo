import { useState } from 'react'
import PresetSelector from '../components/PresetSelector.jsx'
import ToneModifiers from '../components/ToneModifiers.jsx'
import ReadabilityGauge from '../components/ReadabilityGauge.jsx'
import QualitativeScores from '../components/QualitativeScores.jsx'
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
}))

const DEFAULT_MODIFIERS = { season: '', affluence: '', traveller: '' }

export default function CopyTransformer() {
  const [activePreset, setActivePreset] = useState(null)
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
    setInputText(preset.input_text)
    setCustomText('')
    setResponses(preset.responses)
    const first = Object.values(preset.responses)[0]
    setInputReadability(first.input_readability)
    setInputQualitative(first.input_qualitative)
  }

  async function handleTransform() {
    const text = customText.trim()
    if (!text) return

    setActivePreset(null)
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

  const hasModifiers = modifiers.season || modifiers.affluence || modifiers.traveller

  return (
    <>
      <PresetSelector
        presets={PRESETS}
        activeId={activePreset}
        onSelect={handlePresetClick}
      />

      <div className="custom-input-area">
        <textarea
          placeholder="Or paste your own supplier property description here..."
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
        />
        <div className="custom-input-controls">
          <ToneModifiers modifiers={modifiers} onChange={setModifiers} />
          <button
            className="transform-btn"
            onClick={handleTransform}
            disabled={loading || !customText.trim()}
          >
            {loading ? 'Generating all 4 voices...' : 'Transform'}
          </button>
        </div>
      </div>

      {showErrorModal && <ErrorModal onClose={() => setShowErrorModal(false)} />}

      {!responses && !loading && (
        <div className="empty-state">
          <p>Select a preset above or paste your own text to see all four voices side by side</p>
        </div>
      )}

      {loading && (
        <div className="card">
          <div className="loading-overlay">
            <div className="loading-spinner" />
            <p className="loading-stage">Generating all 4 voice variants in parallel...</p>
          </div>
        </div>
      )}

      {responses && (
        <>
          <div className="panel input-panel-full">
            <div className="panel-header input">Supplier Original</div>
            <div className="panel-body">
              <p className="panel-text">{inputText}</p>
              {inputReadability && (
                <ReadabilityGauge readability={inputReadability} targetRange={{ min: 50, max: 65 }} />
              )}
              {inputQualitative && (
                <QualitativeScores qualitative={inputQualitative} />
              )}
            </div>
          </div>

          <div className="voice-grid">
            {VOICE_KEYS.map((voice) => {
              const voiceResponse = responses[voice.key]
              if (!voiceResponse) return null
              return (
                <VoiceOutputCard
                  key={voice.key}
                  label={voice.label}
                  colour={voice.colour}
                  response={voiceResponse}
                  targetRange={voice.targetRange}
                />
              )
            })}
          </div>
        </>
      )}
    </>
  )
}
