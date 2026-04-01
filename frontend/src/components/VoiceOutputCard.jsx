import { useState } from 'react'
import ChannelTabs from './ChannelTabs.jsx'
import ReadabilityGauge from './ReadabilityGauge.jsx'
import QualitativeScores from './QualitativeScores.jsx'

export default function VoiceOutputCard({ label, colour, response, targetRange }) {
  const [activeChannel, setActiveChannel] = useState('website')

  return (
    <div className="voice-card">
      <div className="voice-card-header" style={{ borderLeftColor: colour }}>
        <span className="voice-card-dot" style={{ background: colour }} />
        {label}
      </div>
      <div className="voice-card-body">
        {response.channels ? (
          <ChannelTabs
            channels={response.channels}
            activeChannel={activeChannel}
            onChannelChange={setActiveChannel}
          />
        ) : (
          <p className="panel-text">{response.output_text}</p>
        )}
        <ReadabilityGauge readability={response.output_readability} targetRange={targetRange} />
        <QualitativeScores qualitative={response.output_qualitative} />
      </div>
    </div>
  )
}
