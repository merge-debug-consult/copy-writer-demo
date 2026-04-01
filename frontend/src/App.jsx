import { useState } from 'react'
import VoiceSelector from './components/VoiceSelector.jsx'
import VoiceGuide from './components/VoiceGuide.jsx'
import ToneModifiers from './components/ToneModifiers.jsx'
import CopyTransformer from './pages/CopyTransformer.jsx'
import ImageStudio from './pages/ImageStudio.jsx'
import { BRAND_PRESETS } from './data/voiceProfiles.js'

const DEFAULT_STYLE = { ...BRAND_PRESETS[0].style }

export default function App() {
  const [activePage, setActivePage] = useState('copy')
  const [style, setStyle] = useState(DEFAULT_STYLE)
  const [activeVoiceBrand, setActiveVoiceBrand] = useState('scott_dunn')
  const [imageModifiers, setImageModifiers] = useState({ season: '', affluence: '', traveller: '' })

  function handleStyleChange(newStyle) {
    setStyle(newStyle)
    const match = BRAND_PRESETS.find(
      (bp) =>
        bp.style.tone === newStyle.tone &&
        bp.style.audience === newStyle.audience &&
        bp.style.formality === newStyle.formality &&
        bp.style.detail_style === newStyle.detail_style
    )
    setActiveVoiceBrand(match ? match.key : null)
  }

  function handlePresetSelect(presetKey) {
    setActiveVoiceBrand(presetKey)
  }

  const showSidebar = activePage === 'image'

  return (
    <>
      <header className="header">
        <h1>SD Copy Transformer</h1>
        <p>AI-powered property copy in the Scott Dunn voice</p>
        <nav className="nav-tabs">
          <button
            className={`nav-tab ${activePage === 'copy' ? 'active' : ''}`}
            onClick={() => setActivePage('copy')}
          >
            Copy Transformer
          </button>
          <button
            className={`nav-tab ${activePage === 'image' ? 'active' : ''}`}
            onClick={() => setActivePage('image')}
          >
            Image &amp; Copy Studio
          </button>
        </nav>
      </header>

      <div className={`app-layout ${showSidebar ? '' : 'no-sidebar'}`}>
        {showSidebar && (
          <aside className="voice-guide-sidebar">
            <VoiceSelector
              style={style}
              onStyleChange={handleStyleChange}
              onPresetSelect={handlePresetSelect}
            />
            <ToneModifiers modifiers={imageModifiers} onChange={setImageModifiers} />
            <VoiceGuide style={style} activePreset={activeVoiceBrand} />
          </aside>
        )}

        <main className="main-content">
          {activePage === 'copy' ? (
            <CopyTransformer />
          ) : (
            <ImageStudio style={style} modifiers={imageModifiers} />
          )}
        </main>
      </div>
    </>
  )
}
