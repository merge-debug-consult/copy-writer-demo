import { useState } from 'react'
import ErrorModal from '../components/ErrorModal.jsx'
import ImageUpload from '../components/ImageUpload.jsx'
import ReadabilityGauge from '../components/ReadabilityGauge.jsx'
import QualitativeScores from '../components/QualitativeScores.jsx'
import AlignmentScores from '../components/AlignmentScores.jsx'
import ChannelTabs from '../components/ChannelTabs.jsx'
import { getTargetRange } from '../data/voiceProfiles.js'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export default function ImageStudio({ style, modifiers = {} }) {
  const [imageFile, setImageFile] = useState(null)
  const [text, setText] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [activeChannel, setActiveChannel] = useState('website')

  const targetRange = getTargetRange(style)
  const mode = text.trim() ? 'alignment' : 'generate'

  async function handleAnalyse() {
    if (!imageFile) return

    setResponse(null)
    setLoading(true)
    setActiveChannel('website')

    const formData = new FormData()
    formData.append('image', imageFile)
    formData.append('text', text)
    formData.append('tone', style.tone)
    formData.append('audience', style.audience)
    formData.append('formality', style.formality)
    formData.append('detail_style', style.detail_style)
    formData.append('season', modifiers.season || '')
    formData.append('affluence', modifiers.affluence || '')
    formData.append('traveller', modifiers.traveller || '')

    try {
      const res = await fetch(`${API_BASE}/analyse-image`, {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) throw new Error(`API error: ${res.status}`)
      const data = await res.json()
      setResponse(data)
    } catch {
      setShowErrorModal(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="image-studio-controls">
        <div className="image-studio-inputs">
          <ImageUpload onImageSelect={setImageFile} />
          <div className="image-text-input">
            <label className="image-text-label">
              Optional: paste property copy to check alignment
            </label>
            <textarea
              className="image-textarea"
              placeholder="Leave empty to generate copy from the image, or paste existing copy to check how well the image matches..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="image-mode-indicator">
              Mode: {mode === 'alignment' ? 'Image + Text Alignment' : 'Image to Copy'}
            </div>
          </div>
        </div>

        <button
          className="transform-btn"
          onClick={handleAnalyse}
          disabled={loading || !imageFile}
        >
          {loading ? 'Analysing...' : mode === 'alignment' ? 'Check Alignment' : 'Generate Copy'}
        </button>
      </div>

      {showErrorModal && <ErrorModal onClose={() => setShowErrorModal(false)} />}

      {!response && !loading && (
        <div className="empty-state">
          <p>Upload a property image to get started</p>
        </div>
      )}

      {loading && (
        <div className="card">
          <div className="loading-overlay">
            <div className="loading-spinner" />
            <p className="loading-stage">
              {mode === 'alignment' ? 'Analysing image-text alignment...' : 'Generating copy from image...'}
            </p>
          </div>
        </div>
      )}

      {response && response.mode === 'generate' && (
        <div className="comparison">
          <div className="panel">
            <div className="panel-header input">AI Image Analysis</div>
            <div className="panel-body">
              <p className="panel-text">{response.image_description}</p>
            </div>
          </div>
          <div className="panel">
            <div className="panel-header output">Generated Copy</div>
            <div className="panel-body">
              {response.channels ? (
                <ChannelTabs
                  channels={response.channels}
                  activeChannel={activeChannel}
                  onChannelChange={setActiveChannel}
                />
              ) : (
                <p className="panel-text">{response.generated_copy}</p>
              )}
              {response.readability && (
                <ReadabilityGauge readability={response.readability} targetRange={targetRange} />
              )}
              {response.qualitative && (
                <QualitativeScores qualitative={response.qualitative} />
              )}
            </div>
          </div>
        </div>
      )}

      {response && response.mode === 'alignment' && (
        <div className="alignment-results">
          <div className="panel">
            <div className="panel-header input">Image Analysis</div>
            <div className="panel-body">
              <p className="panel-text">{response.image_description}</p>
            </div>
          </div>
          <div className="panel" style={{ marginTop: '1.5rem' }}>
            <div className="panel-header output">Alignment Assessment</div>
            <div className="panel-body">
              <AlignmentScores
                alignmentScores={response.alignment_scores}
                overallScore={response.overall_score}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
