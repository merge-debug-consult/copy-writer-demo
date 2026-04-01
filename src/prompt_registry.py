"""All prompts for the SD Copy Transformer. No LLM calls here."""

from .voices import compose_system_prompt


def build_transform_system(
    tone: str, audience: str, formality: str, detail_style: str
) -> str:
    """Build a voice-specific transform system prompt from style dimensions."""
    return compose_system_prompt(tone, audience, formality, detail_style)


def build_refine_prompt(
    text: str, score: float, target_min: int, target_max: int
) -> str:
    if score < target_min:
        direction = (
            "Score is too low (text is too complex). Simplify sentence structures "
            "and reduce syllable-heavy words while keeping the intended tone and voice."
        )
    else:
        direction = (
            "Score is too high (text is too simple). Add more descriptive richness "
            "and varied sentence structure while keeping it readable."
        )

    return (
        f"The following property description has a Flesch Reading Ease score of {score}. "
        f"The target band is {target_min}-{target_max}.\n\n"
        f"{direction}\n\n"
        f"Revise the text to bring it closer to the {target_min}-{target_max} target band. "
        f"Keep the same factual content and voice.\n\n"
        f"Current text:\n{text}"
    )


SCORE_SYSTEM = """\
You are evaluating travel property copy against luxury brand standards. \
Score each dimension 1-5 and give a single-sentence rationale.

Scoring dimensions:
1. Persuasiveness - does it make the reader want to book? (1 = purely informational, 5 = compelling and inspiring)
2. Sensory language - can you feel, see, taste the experience? (1 = no sensory detail, 5 = richly evocative)
3. Emotional resonance - does it connect to how the trip will make you feel? (1 = no emotional connection, 5 = deeply resonant)
4. Specificity - concrete details vs generic filler? (1 = vague superlatives only, 5 = vivid, specific detail)
5. Brand voice - does it sound like a premium, expert travel curator? (1 = generic/supplier-like, 5 = distinctly luxury editorial)"""


SCORE_USER_TEMPLATE = """\
Return ONLY valid JSON in this exact format, no other text:
{{
  "persuasiveness": {{"score": 3, "rationale": "..."}},
  "sensory_language": {{"score": 2, "rationale": "..."}},
  "emotional_resonance": {{"score": 3, "rationale": "..."}},
  "specificity": {{"score": 4, "rationale": "..."}},
  "brand_voice": {{"score": 2, "rationale": "..."}}
}}

Text to evaluate:
{text}"""


MULTICHANNEL_SYSTEM = """\
You are a luxury travel copywriter. Given website property copy, create three additional \
versions adapted for different channels while maintaining the same brand voice and tone."""

MULTICHANNEL_USER_TEMPLATE = """\
Create three additional versions of this website copy:

1. INSTAGRAM CAPTION (max 150 words): Punchy, visual, emoji-light (max 2), with a call to \
action. First line must hook.

2. BROCHURE EXCERPT (max 100 words): Print-ready. Elegant, slightly more formal than website. \
No "click here" language. Should work alongside a full-page photo.

3. TE BRIEFING NOTES (max 120 words): Internal notes for a Travel Executive. Third person, \
factual, highlights key selling points and guest-type suitability. Not customer-facing - \
practical and direct.

Return ONLY valid JSON with keys: instagram, brochure, te_briefing

Website copy:
{text}"""


IMAGE_DESCRIBE_SYSTEM = """\
Describe this image in detail for a luxury travel copywriter. Focus on:
- The physical setting and architecture
- Lighting, time of day, atmosphere
- Key features visible (pool, view, furnishings, landscape)
- The mood and emotional tone of the image
- What type of traveller this would appeal to

Be factual and specific. Do not invent features you cannot see."""


IMAGE_ALIGNMENT_SYSTEM = """\
You are assessing how well a property image matches its marketing copy.

Score each dimension 1-5 with a single-sentence rationale:

1. Visual match - does the image show what the text describes?
2. Mood alignment - does the image's atmosphere match the text's tone?
3. Hero feature - does the image highlight the property's key selling point from the text?
4. Audience fit - would this image appeal to the target reader of this text?
5. Scroll-stopping - is this image compelling enough to make someone pause and read?

Also provide a "suggestions" field with 1-2 sentences on what kind of image would score higher.

Return ONLY valid JSON:
{{
  "visual_match": {{"score": 4, "rationale": "..."}},
  "mood_alignment": {{"score": 5, "rationale": "..."}},
  "hero_feature": {{"score": 2, "rationale": "..."}},
  "audience_fit": {{"score": 4, "rationale": "..."}},
  "scroll_stopping": {{"score": 3, "rationale": "..."}},
  "suggestions": "..."
}}"""

IMAGE_ALIGNMENT_USER_TEMPLATE = """\
IMAGE DESCRIPTION:
{image_description}

PROPERTY COPY:
{text}"""

IMAGE_TO_COPY_USER_TEMPLATE = """\
Based on this image description, write property marketing copy (150-200 words):

{image_description}"""
