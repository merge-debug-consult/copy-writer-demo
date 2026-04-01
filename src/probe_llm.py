"""All LLM calls via PydanticAI agents."""

from functools import lru_cache

from pydantic_ai import Agent, BinaryContent

from .models import AlignmentScores, ChannelOutputs, QualitativeScores
from .prompt_registry import (
    IMAGE_ALIGNMENT_SYSTEM,
    IMAGE_ALIGNMENT_USER_TEMPLATE,
    IMAGE_DESCRIBE_SYSTEM,
    IMAGE_TO_COPY_USER_TEMPLATE,
    MULTICHANNEL_SYSTEM,
    MULTICHANNEL_USER_TEMPLATE,
    SCORE_SYSTEM,
    SCORE_USER_TEMPLATE,
    build_refine_prompt,
)

MODEL = "openai:gpt-5.4"


@lru_cache(maxsize=1)
def _get_score_agent() -> Agent[None, QualitativeScores]:
    return Agent(MODEL, system_prompt=SCORE_SYSTEM, output_type=QualitativeScores)


@lru_cache(maxsize=1)
def _get_channel_agent() -> Agent[None, ChannelOutputs]:
    return Agent(MODEL, system_prompt=MULTICHANNEL_SYSTEM, output_type=ChannelOutputs)


@lru_cache(maxsize=1)
def _get_alignment_agent() -> Agent[None, AlignmentScores]:
    return Agent(MODEL, system_prompt=IMAGE_ALIGNMENT_SYSTEM, output_type=AlignmentScores)


async def transform_text(input_text: str, system_prompt: str) -> str:
    agent = Agent(MODEL, system_prompt=system_prompt)
    result = await agent.run(input_text)
    return result.output


async def refine_text(
    text: str, score: float, target_min: int, target_max: int
) -> str:
    prompt = build_refine_prompt(text, score, target_min, target_max)
    agent = Agent(MODEL, system_prompt="You are a luxury travel copywriter refining text for readability.")
    result = await agent.run(prompt)
    return result.output


async def score_qualitative(text: str) -> QualitativeScores:
    prompt = SCORE_USER_TEMPLATE.format(text=text)
    result = await _get_score_agent().run(prompt)
    return result.output


async def generate_channels(text: str) -> ChannelOutputs:
    prompt = MULTICHANNEL_USER_TEMPLATE.format(text=text)
    result = await _get_channel_agent().run(prompt)
    return result.output


async def describe_image(image_bytes: bytes) -> str:
    agent = Agent(MODEL, system_prompt=IMAGE_DESCRIBE_SYSTEM)
    result = await agent.run([
        "Describe this property image for a luxury travel copywriter.",
        BinaryContent(data=image_bytes, media_type="image/jpeg"),
    ])
    return result.output


async def score_alignment(image_description: str, text: str) -> AlignmentScores:
    prompt = IMAGE_ALIGNMENT_USER_TEMPLATE.format(
        image_description=image_description, text=text
    )
    result = await _get_alignment_agent().run(prompt)
    return result.output


async def generate_from_image(image_description: str, system_prompt: str) -> str:
    prompt = IMAGE_TO_COPY_USER_TEMPLATE.format(image_description=image_description)
    agent = Agent(MODEL, system_prompt=system_prompt)
    result = await agent.run(prompt)
    return result.output
