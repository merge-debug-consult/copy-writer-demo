"""Data models for the SD Copy Transformer API."""

from pydantic import BaseModel


class GenerateRequest(BaseModel):
    input_text: str


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


class GenerateResponse(BaseModel):
    input_readability: ReadabilityMetrics
    input_qualitative: QualitativeScores
    output_text: str
    output_readability: ReadabilityMetrics
    output_qualitative: QualitativeScores
    iterations: list[Iteration]
