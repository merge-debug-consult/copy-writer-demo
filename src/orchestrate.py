"""Orchestration: chains LLM calls and scoring into workflows."""

import asyncio
import json
from datetime import datetime, timezone
from pathlib import Path

from .models import (
    ChannelOutputs,
    GenerateResponse,
    ImageAnalyseResponse,
    Iteration,
    StyleDimensions,
    ToneModifiers,
)
from .probe_llm import (
    describe_image,
    generate_channels,
    generate_from_image,
    refine_text,
    score_alignment,
    score_qualitative,
    transform_text,
)
from .prompt_registry import build_transform_system
from .scoring import compute_readability
from .voices import build_modifier_text, get_target_range

MAX_ITERATIONS = 3
LOG_DIR = Path(__file__).parent.parent / "logs"
LOG_DIR.mkdir(exist_ok=True)


def _log_generation(input_text: str, system_prompt: str, output_text: str, style, modifiers) -> None:
    entry = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "style": style.model_dump() if style else None,
        "modifiers": modifiers.model_dump() if modifiers else None,
        "system_prompt": system_prompt,
        "input_text": input_text[:500],
        "output_text": output_text[:500],
    }
    log_file = LOG_DIR / "generations.jsonl"
    with open(log_file, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")


async def generate(
    input_text: str, style: StyleDimensions, modifiers: ToneModifiers | None = None,
) -> GenerateResponse:
    modifier_text = ""
    if modifiers:
        modifier_text = build_modifier_text(modifiers.season, modifiers.affluence, modifiers.traveller)
    system_prompt = build_transform_system(
        style.tone, style.audience, style.formality, style.detail_style,
        modifier_text=modifier_text,
    )
    target_min, target_max = get_target_range(
        style.tone, style.audience, style.formality, style.detail_style
    )

    input_readability = compute_readability(input_text)

    # Parallel: score input qualitatively + transform text
    input_qual_task = asyncio.create_task(score_qualitative(input_text))
    transform_task = asyncio.create_task(transform_text(input_text, system_prompt))

    input_qualitative, output_text = await asyncio.gather(
        input_qual_task, transform_task
    )

    _log_generation(input_text, system_prompt, output_text, style, modifiers)

    # Refine loop
    fre = compute_readability(output_text).flesch_reading_ease
    iterations: list[Iteration] = [Iteration(text=output_text, flesch_reading_ease=fre)]

    while not (target_min <= fre <= target_max) and len(iterations) < MAX_ITERATIONS:
        output_text = await refine_text(output_text, fre, target_min, target_max)
        fre = compute_readability(output_text).flesch_reading_ease
        iterations.append(Iteration(text=output_text, flesch_reading_ease=fre))

    # Parallel: score final output + generate channel variants
    output_qual_task = asyncio.create_task(score_qualitative(output_text))
    channels_task = asyncio.create_task(generate_channels(output_text))

    output_qualitative, channel_variants = await asyncio.gather(
        output_qual_task, channels_task
    )
    output_readability = compute_readability(output_text)

    channels = ChannelOutputs(
        website=output_text,
        instagram=channel_variants.instagram,
        brochure=channel_variants.brochure,
        te_briefing=channel_variants.te_briefing,
    )

    return GenerateResponse(
        input_readability=input_readability,
        input_qualitative=input_qualitative,
        output_text=output_text,
        output_readability=output_readability,
        output_qualitative=output_qualitative,
        channels=channels,
        iterations=iterations,
    )


async def analyse_image(
    image_bytes: bytes, style: StyleDimensions, text: str | None = None,
    modifiers: ToneModifiers | None = None,
) -> ImageAnalyseResponse:
    image_description = await describe_image(image_bytes)

    if text:
        # Mode B: image + text alignment
        alignment_scores = await score_alignment(image_description, text)
        scores = [
            alignment_scores.visual_match.score,
            alignment_scores.mood_alignment.score,
            alignment_scores.hero_feature.score,
            alignment_scores.audience_fit.score,
            alignment_scores.scroll_stopping.score,
        ]
        overall = sum(scores) / len(scores)

        return ImageAnalyseResponse(
            image_description=image_description,
            mode="alignment",
            alignment_scores=alignment_scores,
            overall_score=round(overall, 1),
        )

    # Mode A: image to copy
    modifier_text = ""
    if modifiers:
        modifier_text = build_modifier_text(modifiers.season, modifiers.affluence, modifiers.traveller)
    system_prompt = build_transform_system(
        style.tone, style.audience, style.formality, style.detail_style,
        modifier_text=modifier_text,
    )
    generated_copy = await generate_from_image(image_description, system_prompt)

    # Parallel: score + generate channels
    qual_task = asyncio.create_task(score_qualitative(generated_copy))
    channels_task = asyncio.create_task(generate_channels(generated_copy))
    qualitative, channel_variants = await asyncio.gather(qual_task, channels_task)

    readability = compute_readability(generated_copy)
    channels = ChannelOutputs(
        website=generated_copy,
        instagram=channel_variants.instagram,
        brochure=channel_variants.brochure,
        te_briefing=channel_variants.te_briefing,
    )

    return ImageAnalyseResponse(
        image_description=image_description,
        mode="generate",
        generated_copy=generated_copy,
        readability=readability,
        qualitative=qualitative,
        channels=channels,
    )
