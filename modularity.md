# Modularity Guide - SD Copy Transformer

## Backend (`src/`)

| File | Purpose | Functions |
|------|---------|-----------|
| `models.py` | Pydantic data models for API request/response | `GenerateRequest`, `GenerateResponse`, `QualitativeScores`, `ScoreDimension`, `ReadabilityMetrics`, `Iteration` |
| `prompt_registry.py` | All prompts and prompt construction (no LLM calls) | `TRANSFORM_SYSTEM`, `SCORE_SYSTEM`, `SCORE_USER_TEMPLATE`, `build_refine_prompt()` |
| `probe_llm.py` | All LLM calls via PydanticAI agents | `transform_text()`, `refine_text()`, `score_qualitative()` |
| `scoring.py` | Readability scoring via textstat | `compute_readability()` |
| `orchestrate.py` | Chains LLM + scoring into the generate workflow | `generate()` |
| `main.py` | FastAPI app, CORS, single `/generate` endpoint | `generate_endpoint()` |

## Frontend (`frontend/src/`)

| File | Purpose |
|------|---------|
| `main.jsx` | React entry point |
| `App.jsx` | Main app: state, API calls, layout |
| `data/presets.js` | Hardcoded preset data (no API call) |
| `styles/index.css` | All styling |
| `components/PresetSelector.jsx` | Three preset tiles |
| `components/TextPanel.jsx` | Side-by-side text + scores |
| `components/ReadabilityGauge.jsx` | Visual gauge for Flesch RE |
| `components/QualitativeScores.jsx` | 5-dimension score bars |
| `components/VoiceGuide.jsx` | Sidebar showing SD criteria |
| `components/IterationHistory.jsx` | Expandable refinement history |

## Rules

- **LLM calls** only in `probe_llm.py`
- **Prompts** only in `prompt_registry.py`
- **Models** only in `models.py`
- **I/O scoring** only in `scoring.py`
- **Orchestration** only in `orchestrate.py`
