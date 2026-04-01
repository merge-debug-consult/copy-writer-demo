"""Data models for the SD Copy Transformer API."""

from pydantic import BaseModel


class StyleDimensions(BaseModel):
    tone: str = "aspirational_warm"
    audience: str = "couples_friends"
    formality: str = "elegant_editorial"
    detail_style: str = "sensory_evocative"


class ToneModifiers(BaseModel):
    season: str = ""
    affluence: str = ""
    traveller: str = ""


class GenerateRequest(BaseModel):
    input_text: str
    style: StyleDimensions = StyleDimensions()
    modifiers: ToneModifiers = ToneModifiers()


class ScoreDimension(BaseModel):
    score: int
    rationale: str


class QualitativeScores(BaseModel):
    persuasiveness: ScoreDimension
    sensory_language: ScoreDimension
    emotional_resonance: ScoreDimension
    specificity: ScoreDimension
    brand_voice: ScoreDimension


class ReadabilityMetrics(BaseModel):
    flesch_reading_ease: float
    flesch_kincaid_grade: float
    gunning_fog: float


class Iteration(BaseModel):
    text: str
    flesch_reading_ease: float


class ChannelOutputs(BaseModel):
    website: str
    instagram: str
    brochure: str
    te_briefing: str


class GenerateResponse(BaseModel):
    input_readability: ReadabilityMetrics
    input_qualitative: QualitativeScores
    output_text: str
    output_readability: ReadabilityMetrics
    output_qualitative: QualitativeScores
    channels: ChannelOutputs
    iterations: list[Iteration]


# --- Page 2: Image Analysis ---

class AlignmentDimension(BaseModel):
    score: int
    rationale: str


class AlignmentScores(BaseModel):
    visual_match: AlignmentDimension
    mood_alignment: AlignmentDimension
    hero_feature: AlignmentDimension
    audience_fit: AlignmentDimension
    scroll_stopping: AlignmentDimension
    suggestions: str


class ImageAnalyseResponse(BaseModel):
    image_description: str
    mode: str  # "generate" or "alignment"
    # Mode A fields
    generated_copy: str | None = None
    readability: ReadabilityMetrics | None = None
    qualitative: QualitativeScores | None = None
    channels: ChannelOutputs | None = None
    # Mode B fields
    alignment_scores: AlignmentScores | None = None
    overall_score: float | None = None
