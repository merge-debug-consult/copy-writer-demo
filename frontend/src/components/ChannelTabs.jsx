const CHANNELS = [
  { key: 'website', label: 'Website' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'brochure', label: 'Brochure' },
  { key: 'te_briefing', label: 'TE Briefing' },
]

export default function ChannelTabs({ channels, activeChannel, onChannelChange }) {
  if (!channels) return null

  return (
    <div className="channel-tabs">
      <div className="channel-tab-bar">
        {CHANNELS.map((ch) => (
          <button
            key={ch.key}
            className={`channel-tab ${activeChannel === ch.key ? 'active' : ''}`}
            onClick={() => onChannelChange(ch.key)}
          >
            {ch.label}
          </button>
        ))}
      </div>
      <div className="channel-content">
        <p className="panel-text">{channels[activeChannel]}</p>
      </div>
    </div>
  )
}
