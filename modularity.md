# Modularity Guide - SD Copy Transformer

## Backend (`src/`)

| File | Purpose | Functions |
|------|---------|-----------|
| `models.py` | Pydantic data models for API request/response | `StyleDimensions`, `GenerateRequest`, `GenerateResponse`, `ChannelOutputs`, `QualitativeScores`, `ScoreDimension`, `ReadabilityMetrics`, `Iteration`, `AlignmentDimension`, `AlignmentScores`, `ImageAnalyseResponse` |
| `voices.py` | Voice profiles, style dimensions, prompt composition | `TONE_FRAGMENTS`, `AUDIENCE_FRAGMENTS`, `FORMALITY_FRAGMENTS`, `DETAIL_FRAGMENTS`, `BRAND_PRESETS`, `compose_system_prompt()`, `get_target_range()` |
| `prompt_registry.py` | All prompts and prompt construction (no LLM calls) | `build_transform_system()`, `build_refine_prompt()`, `SCORE_SYSTEM`, `SCORE_USER_TEMPLATE`, `MULTICHANNEL_SYSTEM`, `MULTICHANNEL_USER_TEMPLATE`, `IMAGE_DESCRIBE_SYSTEM`, `IMAGE_ALIGNMENT_SYSTEM`, `IMAGE_ALIGNMENT_USER_TEMPLATE`, `IMAGE_TO_COPY_USER_TEMPLATE` |
| `probe_llm.py` | All LLM calls via PydanticAI agents | `transform_text()`, `refine_text()`, `score_qualitative()`, `generate_channels()`, `describe_image()`, `score_alignment()`, `generate_from_image()` |
| `scoring.py` | Readability scoring via textstat | `compute_readability()` |
| `orchestrate.py` | Chains LLM + scoring into workflows | `generate()`, `analyse_image()` |
| `main.py` | FastAPI app, CORS, `/generate` + `/analyse-image` endpoints | `generate_endpoint()`, `analyse_image_endpoint()` |

## Frontend (`frontend/src/`)

| File | Purpose |
|------|---------|
| `main.jsx` | React entry point |
| `App.jsx` | Main app: nav, voice state, page routing |
| `pages/CopyTransformer.jsx` | Page 1: text transform with presets, channel tabs, comparison |
| `pages/ImageStudio.jsx` | Page 2: image upload, Mode A/B analysis |
| `data/presets.js` | Hardcoded preset data (4 voices x 3 properties, no API call) |
| `data/voiceProfiles.js` | Style dimensions, brand presets, target range helpers |
| `data/dimensions.js` | Scoring dimensions (qualitative + alignment) |
| `styles/index.css` | All styling |
| `components/VoiceSelector.jsx` | Brand preset chips + style dimension dropdowns |
| `components/PresetSelector.jsx` | Three preset property tiles |
| `components/TextPanel.jsx` | Side-by-side text + scores |
| `components/ChannelTabs.jsx` | Multi-channel output tabs (Website/Instagram/Brochure/TE) |
| `components/ReadabilityGauge.jsx` | Visual gauge for Flesch RE (dynamic target) |
| `components/QualitativeScores.jsx` | 5-dimension score bars |
| `components/VoiceGuide.jsx` | Sidebar showing voice-specific criteria |
| `components/IterationHistory.jsx` | Expandable refinement history |
| `components/ImageUpload.jsx` | Drag-and-drop image upload |
| `components/AlignmentScores.jsx` | Image-text alignment score cards |

## Rules

- **LLM calls** only in `probe_llm.py`
- **Prompts** only in `prompt_registry.py`
- **Models** only in `models.py`
- **Voice config** only in `voices.py`
- **I/O scoring** only in `scoring.py`
- **Orchestration** only in `orchestrate.py`
