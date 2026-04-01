import { useState } from 'react'
import ChannelTabs from './ChannelTabs.jsx'
import CompactReadability from './CompactReadability.jsx'
import CompactScores from './CompactScores.jsx'

export default function VoiceOutputCard({ label, colour, description, response, targetRange, targetRationale }) {
  const [activeChannel, setActiveChannel] = useState('website')

  return (
    <div className="voice-card" style={{ borderColor: colour }}>
      <div className="voice-card-header" style={{ borderLeftColor: colour }}>
        <span className="voice-card-dot" style={{ background: colour }} />
        <div>
          <div className="voice-card-name">Voice: {label}</div>
          {description && <div className="voice-card-desc">{description}</div>}
        </div>
      </div>
      <div className="voice-card-body">
        {response.channels ? (
          <ChannelTabs
            channels={response.channels}
            activeChannel={activeChannel}
            onChannelChange={setActiveChannel}
            accentColour={colour}
          />
        ) : (
          <p className="panel-text">{response.output_text}</p>
        )}
        <CompactReadability readability={response.output_readability} targetRange={targetRange} />
        {targetRationale && (
          <div className="voice-card-target-rationale">
            Target: {targetRange.min}&ndash;{targetRange.max} &mdash; {targetRationale}
          </div>
        )}
        <CompactScores qualitative={response.output_qualitative} />
      </div>
    </div>
  )
}
