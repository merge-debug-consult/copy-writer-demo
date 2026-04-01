export default function PresetSelector({ presets, activeId, onSelect }) {
  return (
    <div className="preset-selector">
      {presets.map((preset) => (
        <button
          key={preset.id}
          className={`preset-tile${activeId === preset.id ? ' active' : ''}`}
          onClick={() => onSelect(preset)}
        >
          <div className="icon">{preset.icon}</div>
          <div className="label">{preset.label}</div>
          <div className="name">{preset.name}</div>
        </button>
      ))}
    </div>
  )
}
