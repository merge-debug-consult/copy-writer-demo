"""All LLM calls via PydanticAI agents."""

from functools import lru_cache

from pydantic_ai import Agent

from .models import QualitativeScores
from .prompt_registry import (
    SCORE_SYSTEM,
    SCORE_USER_TEMPLATE,
    TRANSFORM_SYSTEM,
    build_refine_prompt,
)

MODEL = "openai:gpt-5.4"


@lru_cache(maxsize=1)
def _get_transform_agent() -> Agent:
    return Agent(MODEL, system_prompt=TRANSFORM_SYSTEM)


@lru_cache(maxsize=1)
def _get_score_agent() -> Agent[None, QualitativeScores]:
    return Agent(MODEL, system_prompt=SCORE_SYSTEM, output_type=QualitativeScores)


async def transform_text(input_text: str) -> str:
    result = await _get_transform_agent().run(input_text)
    return result.output


async def refine_text(text: str, score: float) -> str:
    prompt = build_refine_prompt(text, score)
    result = await _get_transform_agent().run(prompt)
    return result.output


async def score_qualitative(text: str) -> QualitativeScores:
    prompt = SCORE_USER_TEMPLATE.format(text=text)
    result = await _get_score_agent().run(prompt)
    return result.output
