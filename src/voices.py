"""Voice profiles, style dimensions, and prompt composition for multi-voice support."""

TONE_FRAGMENTS: dict[str, str] = {
    "aspirational_warm": (
        "Aspirational but authentic - never oversell, let the property speak for itself. "
        "Warm and inviting, never stiff or corporate. The reader should feel welcomed "
        "and inspired, not lectured or sold to.\n"
        "Example signatures: 'Step out of your boots and onto the slopes', "
        "'It is the kind of perspective that makes you fall quiet', "
        "'Days here have no fixed shape'."
    ),
    "understated_confident": (
        "Understated confidence - never shouts, implies exclusivity through restraint. "
        "Quiet authority and discretion. Assumes the reader already knows luxury - "
        "don't explain why something is special, just state it.\n"
        "Example signatures: 'This is not a place that announces itself. It earns your attention.', "
        "'We arrange the rest.', 'For those who know the Mara, this is where it reveals itself differently.'"
    ),
    "joyful_reassuring": (
        "Warm, reassuring, slightly playful. Energetic and positive without being saccharine. "
        "The emotional hook is guilt-free enjoyment - parents should feel confident and excited. "
        "Celebrate the whole family experience.\n"
        "Example signatures: 'You ski, they play, everyone's happy.', "
        "'That's when the real holiday begins. Tired legs, big smiles, stories from the day.', "
        "'Even the teenagers will put their phones down for this.'"
    ),
    "philosophical_emotional": (
        "Philosophical and emotion-led. Lead with how the trip will make the reader feel, "
        "not where they will go. Short, punchy declarations mixed with reflective questions. "
        "Challenge conventional travel thinking. Intellectual curiosity over insider authority. "
        "The tone is 'rare and remarkable' - humble confidence, never arrogant.\n"
        "Example signatures: 'It's not where you want to go; it's how you want to feel.', "
        "'That's rare. That's remarkable. That's the point.', "
        "'She didn't build a lodge. She built a feeling.', 'Let's begin.'"
    ),
}

AUDIENCE_FRAGMENTS: dict[str, str] = {
    "couples_friends": (
        "Writing for affluent couples, friends, and groups seeking luxury tailor-made holidays. "
        "They value experiences over amenities, insider knowledge over star ratings, "
        "and authentic connection with a destination.\n"
        "Address them as 'you' - placing them in the scene. They want to feel like the "
        "writer has been there and is sharing a personal recommendation."
    ),
    "uhnw_individuals": (
        "Writing for ultra-high-net-worth individuals and family offices. Invitation-only mindset. "
        "They expect access to what others cannot reach - private collections, unmarked venues, "
        "doors that don't open for everyone. Think private banks, not travel agents.\n"
        "Use 'we' to position as a trusted partner. Never explain why something is luxurious - "
        "they already know. Example: 'We know that you appreciate the experience that comes "
        "from one person, someone who understands you and your needs.'"
    ),
    "parents_families": (
        "Writing for parents of children aged 4 months to 13 years. The copy speaks to parents, "
        "not children. Address the parent's dual need: quality time for themselves AND happy, "
        "engaged children. Practical detail matters - ratios, age groups, qualifications, routines.\n"
        "The guilt-free hook is central: 'guilt-free adult time', 'seamless, joyful', "
        "'happy and fulfilled children'. Trust signals: settling procedures, named staff, flexibility."
    ),
    "curious_seekers": (
        "Writing for culturally curious, experience-driven travellers who value meaning over "
        "amenities. They want to feel something, not tick a list. They care about hidden stories, "
        "local context, and personal transformation more than star ratings or facilities.\n"
        "Frame the traveller as a seeker: 'foregoing tick-lists and tourist traps', "
        "'a restless curiosity about what's around the next corner', "
        "'not where you want to go; it's how you want to feel.'"
    ),
}

FORMALITY_FRAGMENTS: dict[str, str] = {
    "elegant_editorial": (
        "Elegant editorial tone. Flowing sentences with varied rhythm. "
        "Sophisticated vocabulary without being pretentious. Balanced sentence lengths - "
        "short for impact, longer for description. Use second person ('you') to place "
        "the reader in the scene.\n"
        "Example rhythm: 'Mornings begin with a breakfast spread of regional cheeses and "
        "cured meats that tells you exactly where you are. After a day exploring the Brenta "
        "Dolomites, the spa becomes your reward.'"
    ),
    "refined_discreet": (
        "Refined and discreet. Shorter, more declarative sentences. Less descriptive flourish, "
        "more quiet authority. First person plural ('we') positioning as a trusted partner, "
        "not a vendor. Sparse language - every word earns its place.\n"
        "Example rhythm: 'Two intimate camps. A kopje reserved for sundowners. Polished wood, "
        "contemporary design, staff who understand the difference between service and intrusion.'"
    ),
    "conversational_energetic": (
        "Conversational and energetic. Lighter, more varied sentence rhythm. "
        "Direct address to the reader. Punchy sentences mixed with longer reassuring ones. "
        "A touch of playfulness - not afraid of the occasional exclamation or light humour.\n"
        "Example rhythm: 'Imagine their faces when the jeep stops and a giraffe crosses right "
        "in front of you. That's a Tuesday morning at Angama Mara - and the stories they'll "
        "bring back will keep them buzzing all afternoon.'"
    ),
    "poetic_punchy": (
        "Short, declarative, poetic. Punchy one-line statements for impact, then longer "
        "reflective passages. Use rhetorical questions and inversions. Challenge the reader's "
        "assumptions about travel. Second person 'you' focused on inner state and desire, "
        "not sensory experience.\n"
        "Example rhythm: 'How do you want to feel? Because Angama Mara isn't really about "
        "the lodge. It's about the moment you stop talking.' Then: 'Those are the what. "
        "The why is harder to describe.'"
    ),
}

DETAIL_FRAGMENTS: dict[str, str] = {
    "sensory_evocative": (
        "Sensory and evocative - the reader should feel, see, and taste the experience. "
        "Specific over generic - concrete details over vague superlatives. "
        "Weave factual details into narrative rather than listing them. "
        "Avoid clichés like 'nestled', 'boasts', 'unparalleled'.\n"
        "Example: 'the lagoon below shifts through impossible blues', "
        "'a sky so thick with stars it barely looks real', "
        "'a glass of something cold, the plains turning gold beneath you'."
    ),
    "minimal_declarative": (
        "Minimal and declarative. State quality without explaining it. "
        "Name-drop subtly - specific chefs, designers, private collections. "
        "References to bespoke, limitless, curated - but sparingly. "
        "Let the reader's imagination do the work.\n"
        "Example: 'Polished wood. Contemporary design. Staff who understand "
        "the difference between service and intrusion.', "
        "'The guiding is among the finest in East Africa.'"
    ),
    "practical_trust_building": (
        "Practical detail woven into aspirational language. Trust signals matter - "
        "mention settling-in routines, staff qualifications, communication with parents, "
        "flexibility and schedules. Show that the details have been thought through. "
        "Reassurance through specificity.\n"
        "Example: 'Game drives head out at dawn with expert guides who make everything "
        "come alive for young eyes - from dung beetles to big cats.', "
        "'two family tents in each camp, so the whole family has space to spread out'."
    ),
    "contextual_philosophical": (
        "Focus on meaning and cultural context over sensory detail. Describe what a place "
        "means, not just what it looks like. Frame features through the lens of personal "
        "significance - why this matters to the traveller's story. Use words like 'remarkable', "
        "'rare', 'tailor-made', 'restless', 'curious'. Forego tick-lists and tourist traps.\n"
        "Example: 'She didn't build a lodge. She built a feeling.', "
        "'The point isn't the amenities. The point is the way time stops.', "
        "'It's the restlessness that brought you here, and the stillness that makes you stay.'"
    ),
}

BRAND_PRESETS: dict[str, dict] = {
    "scott_dunn": {
        "tone": "aspirational_warm",
        "audience": "couples_friends",
        "formality": "elegant_editorial",
        "detail_style": "sensory_evocative",
        "target_min": 50,
        "target_max": 65,
        "label": "Scott Dunn",
    },
    "sd_private": {
        "tone": "understated_confident",
        "audience": "uhnw_individuals",
        "formality": "refined_discreet",
        "detail_style": "minimal_declarative",
        "target_min": 40,
        "target_max": 55,
        "label": "Scott Dunn Private",
    },
    "explorers": {
        "tone": "joyful_reassuring",
        "audience": "parents_families",
        "formality": "conversational_energetic",
        "detail_style": "practical_trust_building",
        "target_min": 60,
        "target_max": 75,
        "label": "Explorers",
    },
    "black_tomato": {
        "tone": "philosophical_emotional",
        "audience": "curious_seekers",
        "formality": "poetic_punchy",
        "detail_style": "contextual_philosophical",
        "target_min": 55,
        "target_max": 70,
        "label": "Competitor OTA",
    },
}

SEASON_FRAGMENTS: dict[str, str] = {
    "winter": (
        "Frame with a winter atmosphere: crisp air, snow, fireside warmth, hot drinks, "
        "cosy interiors, early sunsets, and that particular stillness only cold brings."
    ),
    "summer": (
        "Frame with a summer atmosphere: long golden days, warm evenings, outdoor dining, "
        "sun on skin, barefoot mornings, the unhurried pace of endless daylight."
    ),
    "spring": (
        "Frame with a spring atmosphere: fresh starts, blossom, clear light, green shoots, "
        "the sense of a world waking up. Lighter than winter, gentler than summer."
    ),
    "autumn": (
        "Frame with an autumn atmosphere: golden light, turning leaves, harvest tables, "
        "wood smoke, misty mornings, and the quiet contentment of slowing down."
    ),
}

AFFLUENCE_FRAGMENTS: dict[str, str] = {
    "budget_friendly": (
        "Position as smart-value travel. Emphasise great experiences without the premium "
        "price tag. Words like 'accessible', 'great value', 'clever choice'. "
        "Avoid anything that sounds cheap - this is savvy, not budget."
    ),
    "mid_range": (
        "Position as quality without excess. Comfortable luxury, well-chosen rather than "
        "extravagant. Emphasise good taste over big spending. The reader wants to treat "
        "themselves without feeling wasteful."
    ),
    "premium": (
        "Position as premium luxury. Emphasise quality, exclusivity, and attention to detail. "
        "The reader expects the best and is willing to pay for it. Everything should feel "
        "considered, curated, and worth every penny."
    ),
    "lavish": (
        "Position as ultra-lavish, no-expense-spared luxury. Private jets, butler service, "
        "the presidential suite, money-is-no-object experiences. Emphasise the extraordinary, "
        "the one-of-a-kind, the 'you can't buy this anywhere else'."
    ),
}

TRAVELLER_FRAGMENTS: dict[str, str] = {
    "couple": (
        "Writing for a couple travelling together. Emphasise shared moments, togetherness, "
        "things to discover as a pair, and the intimacy of exploring somewhere new together."
    ),
    "honeymoon": (
        "Writing for honeymooners. Frame as the first chapter of a new story - celebration, "
        "romance, once-in-a-lifetime indulgence, and creating memories they'll talk about forever."
    ),
    "family_young": (
        "Writing for families with young children (under 8). Address parents directly. "
        "Emphasise safety, convenience, kids' facilities, easy logistics, and guilt-free "
        "parent time. The kids being happy is what makes it a holiday."
    ),
    "family_teens": (
        "Writing for families with teenagers. Emphasise activities that genuinely engage "
        "teens (not childish, not boring), shared experiences the whole family can bond over, "
        "and enough independence that nobody feels dragged along."
    ),
    "friends_group": (
        "Writing for a group of friends travelling together. Emphasise shared fun, social "
        "spaces, group activities, late nights, laughter, and the kind of trip that becomes "
        "the story everyone tells for years."
    ),
    "solo": (
        "Writing for a solo traveller. Emphasise freedom, self-discovery, meeting people, "
        "doing things at your own pace, and the particular confidence of travelling alone. "
        "Never frame solo travel as lonely - frame it as liberating."
    ),
}

_DEFAULT_TARGET = (50, 65)


def build_modifier_text(season: str, affluence: str, traveller: str) -> str:
    """Build additional prompt context from tone modifiers."""
    parts = []
    if season and season in SEASON_FRAGMENTS:
        parts.append(SEASON_FRAGMENTS[season])
    if affluence and affluence in AFFLUENCE_FRAGMENTS:
        parts.append(AFFLUENCE_FRAGMENTS[affluence])
    if traveller and traveller in TRAVELLER_FRAGMENTS:
        parts.append(TRAVELLER_FRAGMENTS[traveller])
    return "\n\n".join(parts)


def compose_system_prompt(
    tone: str, audience: str, formality: str, detail_style: str,
    modifier_text: str = "",
) -> str:
    """Build a full transform system prompt from style dimension values."""
    tone_text = TONE_FRAGMENTS.get(tone, TONE_FRAGMENTS["aspirational_warm"])
    audience_text = AUDIENCE_FRAGMENTS.get(audience, AUDIENCE_FRAGMENTS["couples_friends"])
    formality_text = FORMALITY_FRAGMENTS.get(formality, FORMALITY_FRAGMENTS["elegant_editorial"])
    detail_text = DETAIL_FRAGMENTS.get(detail_style, DETAIL_FRAGMENTS["sensory_evocative"])

    prompt = (
        "You are a luxury travel copywriter. Your job is to transform supplier property "
        "descriptions into polished marketing copy.\n\n"
        f"TONE:\n{tone_text}\n\n"
        f"TARGET AUDIENCE:\n{audience_text}\n\n"
        f"WRITING STYLE:\n{formality_text}\n\n"
        f"DETAIL APPROACH:\n{detail_text}"
    )

    if modifier_text:
        prompt += f"\n\nADDITIONAL CONTEXT:\n{modifier_text}"

    prompt += (
        "\n\nTransform the supplier text into approximately 150-200 words of polished copy. "
        "Preserve all factual details. Do not invent facilities or features not mentioned "
        "in the source."
    )
    return prompt


def get_target_range(
    tone: str, audience: str, formality: str, detail_style: str
) -> tuple[int, int]:
    """Return (min, max) Flesch Reading Ease target for this style combination."""
    for preset in BRAND_PRESETS.values():
        if (
            preset["tone"] == tone
            and preset["audience"] == audience
            and preset["formality"] == formality
            and preset["detail_style"] == detail_style
        ):
            return (preset["target_min"], preset["target_max"])

    return _DEFAULT_TARGET
