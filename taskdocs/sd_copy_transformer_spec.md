# SD Copy Transformer - Demo App Specification

## Purpose

A demo application for a meeting with Scott Dunn's Head of Product. Shows how AI can transform generic supplier property descriptions into Scott Dunn's luxury brand voice, with measurable quality improvements. This is a sales tool - the UI should be polished, impressive, and make the value obvious at a glance.

---

## Architecture

### Frontend
- React SPA hosted on GitHub Pages
- Calls backend API for custom text transformation
- Three preset examples are hardcoded in the frontend (no API call needed)
- Clean, professional UI using Scott Dunn brand colours

### Backend
- FastAPI (Python), hosted locally and exposed via Pinggy
- Single endpoint handles all processing
- OpenAI GPT API for LLM calls
- `textstat` library for readability scoring

### API Key
- OpenAI API key loaded from environment variable `OPENAI_API_KEY`
- GPT-4o model for all LLM calls

---

## Brand Colours (from Scott Dunn's brand system)

```
Primary green:     #00402E
Subtitle accent:   #a8cfc2
Gold accent:       #F2C36A
White:             #FFFFFF
Light grey bg:     #F5F5F0
```

The UI should feel premium - think luxury travel website, not a SaaS dashboard. Use the dark green as the primary, gold as accents, plenty of white space. Clean serif or elegant sans-serif typography.

---

## Single API Endpoint

### `POST /generate`

**Request:**
```json
{
  "input_text": "string - the supplier's property description"
}
```

**Processing (server-side):**

These run in parallel where possible (asyncio.gather):

**Stream 1 - Qualitative score of input:**
- LLM call scoring the input text against 5 SD criteria (see below)

**Stream 2 - Transform + refine loop:**
1. LLM call: transform input into SD voice
2. `textstat.flesch_reading_ease()` score the output
3. While score outside target band (50-65) and iterations < 3: LLM call to refine with the score + nudge
4. After loop completes: LLM call scoring the final output against same 5 criteria

**Response:**
```json
{
  "input_readability": {
    "flesch_reading_ease": 34,
    "flesch_kincaid_grade": 12.1,
    "gunning_fog": 14.2
  },
  "input_qualitative": {
    "persuasiveness": {"score": 2, "rationale": "Factual but doesn't inspire action"},
    "sensory_language": {"score": 1, "rationale": "No sensory detail - purely informational"},
    "emotional_resonance": {"score": 2, "rationale": "No connection to how the trip will feel"},
    "specificity": {"score": 4, "rationale": "Good concrete details about facilities"},
    "brand_voice": {"score": 1, "rationale": "Reads like a supplier fact sheet, not a luxury curator"}
  },
  "output_text": "...",
  "output_readability": {
    "flesch_reading_ease": 58,
    "flesch_kincaid_grade": 9.3,
    "gunning_fog": 10.1
  },
  "output_qualitative": {
    "persuasiveness": {"score": 4, "rationale": "..."},
    "sensory_language": {"score": 5, "rationale": "..."},
    "emotional_resonance": {"score": 4, "rationale": "..."},
    "specificity": {"score": 4, "rationale": "..."},
    "brand_voice": {"score": 5, "rationale": "..."}
  },
  "iterations": [
    {"text": "...", "flesch_reading_ease": 42},
    {"text": "...", "flesch_reading_ease": 58}
  ]
}
```

---

## LLM Prompts

### Transform Prompt (system message)

```
You are a luxury travel copywriter for Scott Dunn, an award-winning luxury tour operator. Your job is to transform supplier property descriptions into the Scott Dunn voice.

Scott Dunn voice characteristics:
- Aspirational but authentic - never oversell, let the property speak for itself
- Sensory and evocative - the reader should feel, see, and taste the experience
- Second person ("you") to place the reader in the scene
- Expertise-led - subtle insider knowledge and recommendations woven in
- Warm and inviting, never stiff or corporate
- Specific over generic - concrete details over vague superlatives
- Balanced sophistication - readable and flowing, not dense or academic
- Avoids clichés like "nestled", "boasts", "unparalleled" unless truly warranted

Transform the supplier text into approximately 150-200 words of polished Scott Dunn website copy. Preserve all factual details. Do not invent facilities or features not mentioned in the source.
```

### Refine Prompt (when readability score is outside 50-65 band)

```
The following Scott Dunn property description has a Flesch Reading Ease score of {score}. The target band is 50-65 (sophisticated but accessible luxury travel copy).

{"Score is too low (text is too complex). Simplify sentence structures and reduce syllable-heavy words while keeping the evocative, luxury tone." if score < 50 else "Score is too high (text is too simple). Add more descriptive richness and varied sentence structure while keeping it readable."}

Revise the text to bring it closer to the 50-65 target band. Keep the same factual content and Scott Dunn voice.

Current text:
{text}
```

### Qualitative Scoring Prompt

```
You are evaluating travel property copy against Scott Dunn's luxury brand standards. Score each dimension 1-5 and give a single-sentence rationale.

Scoring dimensions:
1. Persuasiveness - does it make the reader want to book? (1 = purely informational, 5 = compelling and inspiring)
2. Sensory language - can you feel, see, taste the experience? (1 = no sensory detail, 5 = richly evocative)
3. Emotional resonance - does it connect to how the trip will make you feel? (1 = no emotional connection, 5 = deeply resonant)
4. Specificity - concrete details vs generic filler? (1 = vague superlatives only, 5 = vivid, specific detail)
5. Brand voice - does it sound like a premium, expert travel curator? (1 = generic/supplier-like, 5 = distinctly luxury editorial)

Return ONLY valid JSON in this exact format, no other text:
{
  "persuasiveness": {"score": 3, "rationale": "..."},
  "sensory_language": {"score": 2, "rationale": "..."},
  "emotional_resonance": {"score": 3, "rationale": "..."},
  "specificity": {"score": 4, "rationale": "..."},
  "brand_voice": {"score": 2, "rationale": "..."}
}

Text to evaluate:
{text}
```

---

## Transform + Refine Loop (Backend)

```python
import textstat

TARGET_MIN = 50
TARGET_MAX = 65
MAX_ITERATIONS = 3

# First pass - generate SD voice
output = await gpt_transform(input_text)
score = textstat.flesch_reading_ease(output)
iterations = [{"text": output, "flesch_reading_ease": score}]

# Refine if needed
while not (TARGET_MIN <= score <= TARGET_MAX) and len(iterations) < MAX_ITERATIONS:
    output = await gpt_refine(output, score)
    score = textstat.flesch_reading_ease(output)
    iterations.append({"text": output, "flesch_reading_ease": score})
```

---

## Frontend - Three Preset Examples

Hardcoded in the frontend. When clicked, they populate both panels instantly with pre-computed data (no API call). The preset data objects have the same shape as the API response.

### Preset 1: Ski - Hotel Chalet del Sogno, Dolomites

**Supplier input text (from the hotel's own positioning):**
```
Hotel Chalet del Sogno is the only five star hotel in Madonna di Campiglio in the heart of the Dolomites. The hotel is an eco-friendly property heated with geothermal energy and built using natural materials including wood, wool, lime and local stone. It has an ideal ski in/ski out location right next to the Spinale lift, and is just a 5-minute walk from the village center. Family run, the hotel has warm and welcoming staff who are always available to help. The hotel features a wellness area with spa facilities, gourmet cuisine, and luxurious accommodation. The Chalet del Sogno serves a good breakfast with a variety of local cheeses and meats. It is just 25m from the end of the ski slope and the Spinale cable car, and 250m from the center of Madonna di Campiglio. The hotel is perfect for families, couples and friends.
```

**Pre-computed SD voice output:**
```
Step out of your boots and onto the slopes - Chalet del Sogno sits just 25 metres from the Spinale cable car, making first tracks an effortless morning ritual. Madonna di Campiglio's only five-star hotel brings a warmth that goes beyond the geothermal heating beneath your feet. The family who run it have crafted something rare: genuine alpine hospitality wrapped in considered luxury, built from the Dolomites themselves - local stone, natural wood, wool and lime.

Mornings begin with a breakfast spread of regional cheeses and cured meats that tells you exactly where you are. After a day exploring the Brenta Dolomites, the spa becomes your reward - a quiet counterpoint to the mountain air outside. The village centre is a five-minute stroll for those evenings when you want to wander, though you may find it hard to leave the warmth of the hotel itself.

Whether you're here as a family, a couple or a group of friends, this is a place where the mountains feel close and the details feel personal.
```

Pre-compute the readability scores and qualitative scores for both input and output. Run these through the actual scoring system and hardcode the results.

### Preset 2: Safari - Angama Mara, Kenya

**Supplier input text:**
```
Angama Mara is a luxury safari lodge located in the Maasai Mara in Kenya. The lodge is split into two camps, each with fifteen suites and two family tents. The camps sit on two kopjes on the edge of the Great Rift Valley escarpment. A third kopje is reserved for picnics and sundowners, and was the filming location for key scenes in Out of Africa. Each suite is suspended off the edge of the escarpment with a 10 metre wide floor-to-ceiling glass wall providing 180 degree views. Suites have polished wooden floors and modern furnishings. The owner-manager Nicky Fitzgerald built and ran more than 60 safari lodges and camps across Africa before creating Angama Mara. The lodge provides superb hosting, attention to detail and expert guides. Game drives are conducted in open 4x4 safari vehicles with professional guides. Walking safaris, hot air balloon rides, and visits to Maasai communities are also available.
```

**Pre-computed SD voice output:**
```
There are lodges with views, and then there is Angama Mara - thirty suites suspended from the rim of the Great Rift Valley, each with ten metres of floor-to-ceiling glass opening onto the Mara below. It is the kind of perspective that makes you fall quiet.

The lodge sits across two intimate camps on the Oloololo Escarpment, the same ridge where Out of Africa was filmed. A third kopje is kept free for sundowners and picnics - a glass of something cold, the plains turning gold beneath you. Nicky Fitzgerald, who built over sixty safari properties across Africa before this one, designed Angama to feel less like a lodge and more like a home that happens to occupy one of the most extraordinary locations on earth. Polished wood floors, contemporary furnishings, and staff who remember your name by lunch.

Your days unfold at your own pace: dawn game drives tracking big cats through the long grass, walking safaris that bring the smaller details to life, or a hot air balloon ride to see the migration from above. The guiding here is exceptional - expect real knowledge, not rehearsed commentary.
```

### Preset 3: Beach - Soneva Jani, Maldives

**Supplier input text:**
```
Soneva Jani is a luxury resort located in the Noonu Atoll in the Maldives. The resort is comprised of spacious overwater and island villas offering private and secluded experiences. The majority of villas are over-water with direct access to the lagoon. Villas feature contemporary design and modern furnishings with several areas for lounging and dining. The standout feature is the retractable roof over the master bedroom for stargazing. There is a private pool and a slide from the upper floor into the lagoon. The resort offers dining experiences, spa treatments, and water sports. Soneva Jani is built using sustainable materials and is committed to environmental preservation. From Male it is a 40-minute scenic seaplane flight to Medhufaru island. The resort has an ice cream room and a chocolate room. Guests can visit the observatory for stargazing with an in-house astronomer.
```

**Pre-computed SD voice output:**
```
The seaplane descent into Noonu Atoll is your first clue that Soneva Jani operates on a different frequency. Forty minutes from Malé, the lagoon below shifts through impossible blues before you touch down on Medhufaru - and everything slows.

Your villa hovers above water so clear you can watch reef fish from the bathroom. The design is clean and contemporary, all natural materials and considered space, with a private pool, outdoor decks for every mood, and that slide - yes, a slide - dropping you straight from the upper floor into the lagoon below. But the detail that stays with you is simpler: lying in bed as the retractable roof draws back overhead, revealing a sky so thick with stars it barely looks real. The in-house astronomer will tell you exactly what you are looking at.

Days here have no fixed shape. Snorkel the house reef before breakfast, graze through the ice cream and chocolate rooms mid-afternoon, and let the spa set the pace for everything between. Soneva pioneered barefoot luxury before the phrase existed - you will feel it in every unforced, unhurried moment.
```

---

## Frontend UI Layout

### Header
- "SD Copy Transformer" title in SD green
- Subtle tagline: "AI-powered property copy in the Scott Dunn voice"
- Clean, minimal - no clutter

### SD Voice Guide Panel
- Visible sidebar or collapsible section
- Shows the 5 scoring criteria with brief descriptions
- Shows target Flesch Reading Ease band (50-65)
- Shows tone descriptors: "Aspirational, Sensory, Expert-led, Second person"
- This makes it feel like a configurable product, not just a GPT wrapper

### Main Area

**Top: Source selector**
- Three preset tiles (Ski / Safari / Beach) with a small image or icon and property name
- "Or paste your own" text input area with a "Transform" button
- When a preset is clicked, both panels populate instantly

**Below: Side-by-side comparison**

| Left Panel: "Supplier Original" | Right Panel: "Scott Dunn Voice" |
|---|---|
| Input text | Output text (or loading animation for custom) |
| Readability metrics (Flesch RE, Grade Level) | Readability metrics (same, showing improvement) |
| Qualitative score cards (5 criteria, 1-5) | Qualitative score cards (5 criteria, showing improvement) |

**Readability display:**
- Show Flesch Reading Ease as a visual gauge/meter
- Colour code: red zone (too complex, <40), amber (40-50), green (50-65 target), amber (65-75), red (too simple, >75)
- Show the actual numbers + what they mean ("Grade 12 - Academic" vs "Grade 9 - Accessible sophistication")

**Qualitative scores display:**
- Either a radar/spider chart showing both input and output overlaid, OR
- Side-by-side score cards with visual bars for each dimension (1-5)
- Show the rationale text on hover or in a collapsed section
- The improvement should be visually obvious at a glance

**Iteration history (collapsed by default):**
- "Refinement process" expandable section
- Shows each iteration: the text, the Flesch score, and what the system asked for
- Demonstrates the feedback loop concept

### Loading State (for custom text)
- Elegant loading animation while the API processes
- Could show progress stages: "Analysing input..." → "Generating SD voice..." → "Refining readability..." → "Scoring output..."

---

## Python Dependencies (Backend)

```
fastapi
uvicorn
openai
textstat
pydantic
```

CORS must be enabled for the GitHub Pages frontend domain.

---

## Project Structure

```
sd-copy-transformer/
├── frontend/           # React app (GitHub Pages)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── PresetSelector.jsx
│   │   │   ├── TextPanel.jsx
│   │   │   ├── ReadabilityGauge.jsx
│   │   │   ├── QualitativeScores.jsx
│   │   │   ├── VoiceGuide.jsx
│   │   │   └── IterationHistory.jsx
│   │   ├── data/
│   │   │   └── presets.js    # Hardcoded preset data
│   │   └── styles/
│   └── package.json
├── backend/
│   ├── main.py               # FastAPI app, single /generate endpoint
│   ├── llm.py                # GPT calls (transform, refine, score)
│   ├── scoring.py            # textstat wrapper
│   └── requirements.txt
└── README.md
```

---

## Key Reminders for Build

1. **Presets are frontend-only** - hardcoded JSON objects, same shape as API response. No API call when preset is clicked.
2. **One backend endpoint** - `/generate` does everything: scores input, transforms, refines, scores output, returns all in one payload.
3. **Parallel where possible** - input qualitative scoring and the transform can fire simultaneously.
4. **The UI is a sales tool** - polish matters. Smooth animations, clear visual hierarchy, obvious before/after improvement.
5. **CORS** - backend must allow requests from the GitHub Pages domain (and localhost for dev).
6. **Error handling** - if the API fails, show a graceful error, don't break the UI.
7. **The backend URL** - the frontend needs a configurable API base URL (environment variable or config) since it will point to the Pinggy tunnel URL.
8. **textstat** is the readability library - `pip install textstat`, pure Python, no extra downloads. Key functions: `textstat.flesch_reading_ease(text)`, `textstat.flesch_kincaid_grade(text)`, `textstat.gunning_fog(text)`.
9. **OpenAI API** - use `gpt-4o` model, load key from `OPENAI_API_KEY` env var.
10. **Pre-compute preset scores** - run the actual scoring pipeline on the preset texts and hardcode the real numbers. Don't make up the scores.
