const MODIFIERS = [
  {
    key: 'season',
    label: 'Season',
    options: [
      { value: '', label: 'Any' },
      { value: 'winter', label: 'Winter' },
      { value: 'summer', label: 'Summer' },
      { value: 'spring', label: 'Spring' },
      { value: 'autumn', label: 'Autumn' },
    ],
  },
  {
    key: 'affluence',
    label: 'Price Position',
    options: [
      { value: '', label: 'Default' },
      { value: 'budget_friendly', label: 'Budget-Friendly' },
      { value: 'mid_range', label: 'Mid-Range' },
      { value: 'premium', label: 'Premium' },
      { value: 'lavish', label: 'Ultra-Lavish' },
    ],
  },
  {
    key: 'traveller',
    label: 'Traveller',
    options: [
      { value: '', label: 'Any' },
      { value: 'couple', label: 'Couple' },
      { value: 'honeymoon', label: 'Honeymooners' },
      { value: 'family_young', label: 'Family (Young Kids)' },
      { value: 'family_teens', label: 'Family (Teens)' },
      { value: 'friends_group', label: 'Friends Group' },
      { value: 'solo', label: 'Solo Traveller' },
    ],
  },
]

export default function ToneModifiers({ modifiers, onChange }) {
  function handleChange(key, value) {
    onChange({ ...modifiers, [key]: value })
  }

  return (
    <div className="tone-modifiers">
      <h4 className="tone-modifiers-title">Tone Adjustments</h4>
      <p className="tone-modifiers-hint">Apply to all 4 voices with custom text</p>
      <div className="modifier-dropdowns">
        {MODIFIERS.map((mod) => (
          <div key={mod.key} className="style-dropdown-group">
            <label className="style-dropdown-label">{mod.label}</label>
            <select
              className="style-dropdown"
              value={modifiers[mod.key] || ''}
              onChange={(e) => handleChange(mod.key, e.target.value)}
            >
              {mod.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}
