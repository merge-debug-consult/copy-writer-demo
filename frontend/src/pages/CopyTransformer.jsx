import { useState } from 'react'
import PresetSelector from '../components/PresetSelector.jsx'
import TextPanel from '../components/TextPanel.jsx'
import ChannelTabs from '../components/ChannelTabs.jsx'
import ReadabilityGauge from '../components/ReadabilityGauge.jsx'
import QualitativeScores from '../components/QualitativeScores.jsx'
import IterationHistory from '../components/IterationHistory.jsx'
import ErrorModal from '../components/ErrorModal.jsx'
import { PRESETS } from '../data/presets.js'
import { getTargetRange } from '../data/voiceProfiles.js'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

const LOADING_STAGES = [
  'Analysing input...',
  'Generating styled copy...',
  'Refining readability...',
  'Creating channel variants...',
  'Scoring output...',
]

export default function CopyTransformer({ style, activeVoiceBrand }) {
  const [activePreset, setActivePreset] = useState(null)
  const [customText, setCustomText] = useState('')
  const [inputText, setInputText] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingStage, setLoadingStage] = useState(0)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [activeChannel, setActiveChannel] = useState('website')

  const targetRange = getTargetRange(style)

  function handlePresetClick(preset) {
    setActivePreset(preset.id)
    setInputText(preset.input_text)
    // Use voice-specific preset response if available, fall back to scott_dunn
    const voiceKey = activeVoiceBrand || 'scott_dunn'
    const presetResponse = preset.responses?.[voiceKey] || preset.responses?.scott_dunn || preset.response
    setResponse(presetResponse)
    setError(null)
    setCustomText('')
    setActiveChannel('website')
  }

  async function handleTransform() {
    const text = customText.trim()
    if (!text) return

    setActivePreset(null)
    setInputText(text)
    setResponse(null)
    setLoading(true)
    setLoadingStage(0)
    setActiveChannel('website')

    const interval = setInterval(() => {
      setLoadingStage((s) => Math.min(s + 1, LOADING_STAGES.length - 1))
    }, 3000)

    try {
      const res = await fetch(`${API_BASE}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input_text: text, style }),
      })
      if (!res.ok) throw new Error(`API error: ${res.status}`)
      const data = await res.json()
      setResponse(data)
    } catch {
      setShowErrorModal(true)
    } finally {
      clearInterval(interval)
      setLoading(false)
    }
  }

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
        <button
          className="transform-btn"
          onClick={handleTransform}
          disabled={loading || !customText.trim()}
        >
          {loading ? 'Transforming...' : 'Transform'}
        </button>
      </div>

      {showErrorModal && <ErrorModal onClose={() => setShowErrorModal(false)} />}

      {!response && !loading && (
        <div className="empty-state">
          <p>Select a preset above or paste your own text to see the transformation</p>
        </div>
      )}

      {loading && (
        <div className="card">
          <div className="loading-overlay">
            <div className="loading-spinner" />
            <p className="loading-stage">{LOADING_STAGES[loadingStage]}</p>
          </div>
        </div>
      )}

      {response && (
        <>
          <div className="comparison">
            <TextPanel
              type="input"
              title="Supplier Original"
              text={inputText}
              readability={response.input_readability}
              qualitative={response.input_qualitative}
              targetRange={targetRange}
            />
            <div className="panel">
              <div className="panel-header output">Transformed Output</div>
              <div className="panel-body">
                {response.channels ? (
                  <ChannelTabs
                    channels={response.channels}
                    activeChannel={activeChannel}
                    onChannelChange={setActiveChannel}
                  />
                ) : (
                  <p className="panel-text">{response.output_text}</p>
                )}
                <ReadabilityGauge
                  readability={response.output_readability}
                  targetRange={targetRange}
                />
                <QualitativeScores qualitative={response.output_qualitative} />
              </div>
            </div>
          </div>

          {response.iterations && response.iterations.length > 1 && (
            <IterationHistory iterations={response.iterations} targetRange={targetRange} />
          )}
        </>
      )}
    </>
  )
}
