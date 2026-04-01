"""Readability scoring using textstat."""

import textstat

from .models import ReadabilityMetrics


def compute_readability(text: str) -> ReadabilityMetrics:
    return ReadabilityMetrics(
        flesch_reading_ease=textstat.flesch_reading_ease(text),
        flesch_kincaid_grade=textstat.flesch_kincaid_grade(text),
        gunning_fog=textstat.gunning_fog(text),
    )
