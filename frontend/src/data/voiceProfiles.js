export const STYLE_DIMENSIONS = [
  {
    key: 'tone',
    label: 'Tone',
    options: [
      { value: 'aspirational_warm', label: 'Aspirational & Warm' },
      { value: 'understated_confident', label: 'Understated & Confident' },
      { value: 'joyful_reassuring', label: 'Joyful & Reassuring' },
      { value: 'philosophical_emotional', label: 'Philosophical & Emotional' },
    ],
  },
  {
    key: 'audience',
    label: 'Audience',
    options: [
      { value: 'couples_friends', label: 'Couples & Friends' },
      { value: 'uhnw_individuals', label: 'UHNW Individuals' },
      { value: 'parents_families', label: 'Parents & Families' },
      { value: 'curious_seekers', label: 'Curious Seekers' },
    ],
  },
  {
    key: 'formality',
    label: 'Formality',
    options: [
      { value: 'elegant_editorial', label: 'Elegant Editorial' },
      { value: 'refined_discreet', label: 'Refined & Discreet' },
      { value: 'conversational_energetic', label: 'Conversational & Energetic' },
      { value: 'poetic_punchy', label: 'Poetic & Punchy' },
    ],
  },
  {
    key: 'detail_style',
    label: 'Detail Style',
    options: [
      { value: 'sensory_evocative', label: 'Sensory & Evocative' },
      { value: 'minimal_declarative', label: 'Minimal & Declarative' },
      { value: 'practical_trust_building', label: 'Practical & Trust-Building' },
      { value: 'contextual_philosophical', label: 'Contextual & Philosophical' },
    ],
  },
]

export const BRAND_PRESETS = [
  {
    key: 'scott_dunn',
    label: 'Scott Dunn',
    colour: '#00402E',
    style: {
      tone: 'aspirational_warm',
      audience: 'couples_friends',
      formality: 'elegant_editorial',
      detail_style: 'sensory_evocative',
    },
    description: 'Luxury tailor-made holidays. Aspirational, sensory, expert-led.',
    targetRange: { min: 50, max: 65 },
  },
  {
    key: 'sd_private',
    label: 'SD Private',
    colour: '#FF9C9C',
    style: {
      tone: 'understated_confident',
      audience: 'uhnw_individuals',
      formality: 'refined_discreet',
      detail_style: 'minimal_declarative',
    },
    description: 'Invitation-only ultra-luxury. Understated, discreet, access-driven.',
    targetRange: { min: 40, max: 55 },
  },
  {
    key: 'explorers',
    label: 'Explorers',
    colour: '#F2C36A',
    style: {
      tone: 'joyful_reassuring',
      audience: 'parents_families',
      formality: 'conversational_energetic',
      detail_style: 'practical_trust_building',
    },
    description: 'Family kids clubs. Joyful, reassuring, guilt-free.',
    targetRange: { min: 60, max: 75 },
  },
  {
    key: 'black_tomato',
    label: 'Competitor OTA',
    colour: '#E4312B',
    style: {
      tone: 'philosophical_emotional',
      audience: 'curious_seekers',
      formality: 'poetic_punchy',
      detail_style: 'contextual_philosophical',
    },
    description: 'Feeling over destination. Philosophical, punchy, "rare and remarkable."',
    targetRange: { min: 55, max: 70 },
  },
]

export function getTargetRange(style) {
  const match = BRAND_PRESETS.find(
    (bp) =>
      bp.style.tone === style.tone &&
      bp.style.audience === style.audience &&
      bp.style.formality === style.formality &&
      bp.style.detail_style === style.detail_style
  )
  return match ? match.targetRange : { min: 50, max: 65 }
}

export function getActivePresetKey(style) {
  const match = BRAND_PRESETS.find(
    (bp) =>
      bp.style.tone === style.tone &&
      bp.style.audience === style.audience &&
      bp.style.formality === style.formality &&
      bp.style.detail_style === style.detail_style
  )
  return match ? match.key : null
}
