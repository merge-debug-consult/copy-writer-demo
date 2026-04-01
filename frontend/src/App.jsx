import { useState } from 'react'
import PresetSelector from './components/PresetSelector.jsx'
import TextPanel from './components/TextPanel.jsx'
import VoiceGuide from './components/VoiceGuide.jsx'
import IterationHistory from './components/IterationHistory.jsx'
import { PRESETS } from './data/presets.js'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

const LOADING_STAGES = [
  'Analysing input...',
  'Generating Scott Dunn voice...',
  'Refining readability...',
  'Scoring output...',
]

export default function App() {
  const [activePreset, setActivePreset] = useState(null)
  const [customText, setCustomText] = useState('')
  const [inputText, setInputText] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingStage, setLoadingStage] = useState(0)
  const [error, setError] = useState(null)

  function handlePresetClick(preset) {
    setActivePreset(preset.id)
    setInputText(preset.input_text)
    setResponse(preset.response)
    setError(null)
    setCustomText('')
  }

  async function handleTransform() {
    const text = customText.trim()
    if (!text) return

    setActivePreset(null)
    setInputText(text)
    setResponse(null)
    setError(null)
    setLoading(true)
    setLoadingStage(0)

    const interval = setInterval(() => {
      setLoadingStage((s) => Math.min(s + 1, LOADING_STAGES.length - 1))
    }, 3000)

    try {
      const res = await fetch(`${API_BASE}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input_text: text }),
      })
      if (!res.ok) throw new Error(`API error: ${res.status}`)
      const data = await res.json()
      setResponse(data)
    } catch (err) {
      setError(err.message)
    } finally {
      clearInterval(interval)
      setLoading(false)
    }
  }

  return (
    <>
      <header className="header">
        <h1>SD Copy Transformer</h1>
        <p>AI-powered property copy in the Scott Dunn voice</p>
      </header>

      <div className="app-layout">
        <aside className="voice-guide-sidebar">
          <VoiceGuide />
        </aside>

        <main className="main-content">
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

          {error && (
            <div className="card" style={{ borderLeft: '3px solid #e74c3c', marginBottom: '1.5rem' }}>
              <p style={{ color: '#e74c3c', fontSize: '0.9rem' }}>{error}</p>
            </div>
          )}

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
                />
                <TextPanel
                  type="output"
                  title="Scott Dunn Voice"
                  text={response.output_text}
                  readability={response.output_readability}
                  qualitative={response.output_qualitative}
                />
              </div>

              {response.iterations.length > 1 && (
                <IterationHistory iterations={response.iterations} />
              )}
            </>
          )}
        </main>
      </div>
    </>
  )
}
