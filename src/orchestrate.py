"""Orchestration: chains LLM calls and scoring into the generate workflow."""

import asyncio

from .models import GenerateResponse, Iteration
from .probe_llm import refine_text, score_qualitative, transform_text
from .scoring import compute_readability

TARGET_MIN = 50
TARGET_MAX = 65
MAX_ITERATIONS = 3


async def generate(input_text: str) -> GenerateResponse:
    input_readability = compute_readability(input_text)

    # Parallel: score input qualitatively + transform text
    input_qual_task = asyncio.create_task(score_qualitative(input_text))
    transform_task = asyncio.create_task(transform_text(input_text))

    input_qualitative, output_text = await asyncio.gather(
        input_qual_task, transform_task
    )

    # Refine loop
    fre = compute_readability(output_text).flesch_reading_ease
    iterations: list[Iteration] = [Iteration(text=output_text, flesch_reading_ease=fre)]

    while not (TARGET_MIN <= fre <= TARGET_MAX) and len(iterations) < MAX_ITERATIONS:
        output_text = await refine_text(output_text, fre)
        fre = compute_readability(output_text).flesch_reading_ease
        iterations.append(Iteration(text=output_text, flesch_reading_ease=fre))

    # Score final output
    output_qualitative = await score_qualitative(output_text)
    output_readability = compute_readability(output_text)

    return GenerateResponse(
        input_readability=input_readability,
        input_qualitative=input_qualitative,
        output_text=output_text,
        output_readability=output_readability,
        output_qualitative=output_qualitative,
        iterations=iterations,
    )
