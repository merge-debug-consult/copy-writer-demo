export const PRESETS = [
  {
    id: 'ski',
    icon: '\u26F7\uFE0F',
    label: 'Ski',
    name: 'Hotel Chalet del Sogno, Dolomites',
    input_text: `Hotel Chalet del Sogno is the only five star hotel in Madonna di Campiglio in the heart of the Dolomites. The hotel is an eco-friendly property heated with geothermal energy and built using natural materials including wood, wool, lime and local stone. It has an ideal ski in/ski out location right next to the Spinale lift, and is just a 5-minute walk from the village center. Family run, the hotel has warm and welcoming staff who are always available to help. The hotel features a wellness area with spa facilities, gourmet cuisine, and luxurious accommodation. The Chalet del Sogno serves a good breakfast with a variety of local cheeses and meats. It is just 25m from the end of the ski slope and the Spinale cable car, and 250m from the center of Madonna di Campiglio. The hotel is perfect for families, couples and friends.`,
    response: {
      input_readability: {
        flesch_reading_ease: 52.3,
        flesch_kincaid_grade: 10.8,
        gunning_fog: 13.1,
      },
      input_qualitative: {
        persuasiveness: { score: 2, rationale: 'Factual but does not inspire action or longing' },
        sensory_language: { score: 1, rationale: 'No sensory detail - purely informational listing of features' },
        emotional_resonance: { score: 2, rationale: 'No connection to how the trip will feel' },
        specificity: { score: 4, rationale: 'Good concrete details about facilities, distances and materials' },
        brand_voice: { score: 1, rationale: 'Reads like a supplier fact sheet, not a luxury curator' },
      },
      output_text: `Step out of your boots and onto the slopes \u2013 Chalet del Sogno sits just 25 metres from the Spinale cable car, making first tracks an effortless morning ritual. Madonna di Campiglio\u2019s only five-star hotel brings a warmth that goes beyond the geothermal heating beneath your feet. The family who run it have crafted something rare: genuine alpine hospitality wrapped in considered luxury, built from the Dolomites themselves \u2013 local stone, natural wood, wool and lime.

Mornings begin with a breakfast spread of regional cheeses and cured meats that tells you exactly where you are. After a day exploring the Brenta Dolomites, the spa becomes your reward \u2013 a quiet counterpoint to the mountain air outside. The village centre is a five-minute stroll for those evenings when you want to wander, though you may find it hard to leave the warmth of the hotel itself.

Whether you\u2019re here as a family, a couple or a group of friends, this is a place where the mountains feel close and the details feel personal.`,
      output_readability: {
        flesch_reading_ease: 61.2,
        flesch_kincaid_grade: 9.1,
        gunning_fog: 10.8,
      },
      output_qualitative: {
        persuasiveness: { score: 4, rationale: 'Places the reader in the experience with compelling scene-setting' },
        sensory_language: { score: 5, rationale: 'Rich sensory detail - warmth, mountain air, breakfast spread' },
        emotional_resonance: { score: 4, rationale: 'Evokes the feeling of alpine escape and personal attention' },
        specificity: { score: 4, rationale: 'Retains all factual details while weaving them into narrative' },
        brand_voice: { score: 5, rationale: 'Distinctly luxury editorial with expert insider tone' },
      },
      iterations: [
        {
          text: `Step out of your boots and onto the slopes \u2013 Chalet del Sogno sits just 25 metres from the Spinale cable car, making first tracks an effortless morning ritual. Madonna di Campiglio\u2019s only five-star hotel brings a warmth that goes beyond the geothermal heating beneath your feet. The family who run it have crafted something rare: genuine alpine hospitality wrapped in considered luxury, built from the Dolomites themselves \u2013 local stone, natural wood, wool and lime.

Mornings begin with a breakfast spread of regional cheeses and cured meats that tells you exactly where you are. After a day exploring the Brenta Dolomites, the spa becomes your reward \u2013 a quiet counterpoint to the mountain air outside. The village centre is a five-minute stroll for those evenings when you want to wander, though you may find it hard to leave the warmth of the hotel itself.

Whether you\u2019re here as a family, a couple or a group of friends, this is a place where the mountains feel close and the details feel personal.`,
          flesch_reading_ease: 61.2,
        },
      ],
    },
  },
  {
    id: 'safari',
    icon: '\uD83E\uDD81',
    label: 'Safari',
    name: 'Angama Mara, Kenya',
    input_text: `Angama Mara is a luxury safari lodge located in the Maasai Mara in Kenya. The lodge is split into two camps, each with fifteen suites and two family tents. The camps sit on two kopjes on the edge of the Great Rift Valley escarpment. A third kopje is reserved for picnics and sundowners, and was the filming location for key scenes in Out of Africa. Each suite is suspended off the edge of the escarpment with a 10 metre wide floor-to-ceiling glass wall providing 180 degree views. Suites have polished wooden floors and modern furnishings. The owner-manager Nicky Fitzgerald built and ran more than 60 safari lodges and camps across Africa before creating Angama Mara. The lodge provides superb hosting, attention to detail and expert guides. Game drives are conducted in open 4x4 safari vehicles with professional guides. Walking safaris, hot air balloon rides, and visits to Maasai communities are also available.`,
    response: {
      input_readability: {
        flesch_reading_ease: 44.7,
        flesch_kincaid_grade: 12.3,
        gunning_fog: 14.8,
      },
      input_qualitative: {
        persuasiveness: { score: 3, rationale: 'Interesting details but presented as a factual list rather than a compelling narrative' },
        sensory_language: { score: 2, rationale: 'Mentions views and glass walls but lacks immersive sensory language' },
        emotional_resonance: { score: 2, rationale: 'Facts without emotional connection to the experience' },
        specificity: { score: 5, rationale: 'Excellent specific details - exact numbers, names, history' },
        brand_voice: { score: 2, rationale: 'Informative supplier tone, not luxury editorial' },
      },
      output_text: `There are lodges with views, and then there is Angama Mara \u2013 thirty suites suspended from the rim of the Great Rift Valley, each with ten metres of floor-to-ceiling glass opening onto the Mara below. It is the kind of perspective that makes you fall quiet.

The lodge sits across two intimate camps on the Oloololo Escarpment, the same ridge where Out of Africa was filmed. A third kopje is kept free for sundowners and picnics \u2013 a glass of something cold, the plains turning gold beneath you. Nicky Fitzgerald, who built over sixty safari properties across Africa before this one, designed Angama to feel less like a lodge and more like a home that happens to occupy one of the most extraordinary locations on earth. Polished wood floors, contemporary furnishings, and staff who remember your name by lunch.

Your days unfold at your own pace: dawn game drives tracking big cats through the long grass, walking safaris that bring the smaller details to life, or a hot air balloon ride to see the migration from above. The guiding here is exceptional \u2013 expect real knowledge, not rehearsed commentary.`,
      output_readability: {
        flesch_reading_ease: 57.4,
        flesch_kincaid_grade: 9.8,
        gunning_fog: 11.3,
      },
      output_qualitative: {
        persuasiveness: { score: 5, rationale: 'Compelling narrative that makes you want to be there immediately' },
        sensory_language: { score: 5, rationale: 'Vivid imagery - plains turning gold, long grass, falling quiet' },
        emotional_resonance: { score: 5, rationale: 'Deep emotional pull through personal, intimate framing' },
        specificity: { score: 5, rationale: 'All factual details preserved and enhanced with narrative context' },
        brand_voice: { score: 5, rationale: 'Perfectly captures the expert curator tone with understated confidence' },
      },
      iterations: [
        {
          text: `There are lodges with views, and then there is Angama Mara \u2013 thirty suites suspended from the rim of the Great Rift Valley, each with ten metres of floor-to-ceiling glass opening onto the Mara below. It is the kind of perspective that makes you fall quiet.

The lodge sits across two intimate camps on the Oloololo Escarpment, the same ridge where Out of Africa was filmed. A third kopje is kept free for sundowners and picnics \u2013 a glass of something cold, the plains turning gold beneath you. Nicky Fitzgerald, who built over sixty safari properties across Africa before this one, designed Angama to feel less like a lodge and more like a home that happens to occupy one of the most extraordinary locations on earth. Polished wood floors, contemporary furnishings, and staff who remember your name by lunch.

Your days unfold at your own pace: dawn game drives tracking big cats through the long grass, walking safaris that bring the smaller details to life, or a hot air balloon ride to see the migration from above. The guiding here is exceptional \u2013 expect real knowledge, not rehearsed commentary.`,
          flesch_reading_ease: 57.4,
        },
      ],
    },
  },
  {
    id: 'beach',
    icon: '\uD83C\uDFD6\uFE0F',
    label: 'Beach',
    name: 'Soneva Jani, Maldives',
    input_text: `Soneva Jani is a luxury resort located in the Noonu Atoll in the Maldives. The resort is comprised of spacious overwater and island villas offering private and secluded experiences. The majority of villas are over-water with direct access to the lagoon. Villas feature contemporary design and modern furnishings with several areas for lounging and dining. The standout feature is the retractable roof over the master bedroom for stargazing. There is a private pool and a slide from the upper floor into the lagoon. The resort offers dining experiences, spa treatments, and water sports. Soneva Jani is built using sustainable materials and is committed to environmental preservation. From Male it is a 40-minute scenic seaplane flight to Medhufaru island. The resort has an ice cream room and a chocolate room. Guests can visit the observatory for stargazing with an in-house astronomer.`,
    response: {
      input_readability: {
        flesch_reading_ease: 46.1,
        flesch_kincaid_grade: 11.9,
        gunning_fog: 14.2,
      },
      input_qualitative: {
        persuasiveness: { score: 2, rationale: 'Lists features without creating desire or urgency' },
        sensory_language: { score: 1, rationale: 'No sensory detail - purely factual description' },
        emotional_resonance: { score: 1, rationale: 'No emotional connection to the guest experience' },
        specificity: { score: 4, rationale: 'Good concrete details about features and travel logistics' },
        brand_voice: { score: 1, rationale: 'Generic resort brochure language, not luxury editorial' },
      },
      output_text: `The seaplane descent into Noonu Atoll is your first clue that Soneva Jani operates on a different frequency. Forty minutes from Mal\u00e9, the lagoon below shifts through impossible blues before you touch down on Medhufaru \u2013 and everything slows.

Your villa hovers above water so clear you can watch reef fish from the bathroom. The design is clean and contemporary, all natural materials and considered space, with a private pool, outdoor decks for every mood, and that slide \u2013 yes, a slide \u2013 dropping you straight from the upper floor into the lagoon below. But the detail that stays with you is simpler: lying in bed as the retractable roof draws back overhead, revealing a sky so thick with stars it barely looks real. The in-house astronomer will tell you exactly what you are looking at.

Days here have no fixed shape. Snorkel the house reef before breakfast, graze through the ice cream and chocolate rooms mid-afternoon, and let the spa set the pace for everything between. Soneva pioneered barefoot luxury before the phrase existed \u2013 you will feel it in every unforced, unhurried moment.`,
      output_readability: {
        flesch_reading_ease: 62.8,
        flesch_kincaid_grade: 8.7,
        gunning_fog: 10.5,
      },
      output_qualitative: {
        persuasiveness: { score: 5, rationale: 'Irresistible - you want to book before you finish reading' },
        sensory_language: { score: 5, rationale: 'Extraordinary sensory detail - impossible blues, stars overhead, reef fish' },
        emotional_resonance: { score: 5, rationale: 'Captures the feeling of time stopping and total immersion' },
        specificity: { score: 4, rationale: 'All features woven naturally into narrative with vivid detail' },
        brand_voice: { score: 5, rationale: 'Peak luxury editorial - confident, understated, knowing' },
      },
      iterations: [
        {
          text: `The seaplane descent into Noonu Atoll is your first clue that Soneva Jani operates on a different frequency. Forty minutes from Mal\u00e9, the lagoon below shifts through impossible blues before you touch down on Medhufaru \u2013 and everything slows.

Your villa hovers above water so clear you can watch reef fish from the bathroom. The design is clean and contemporary, all natural materials and considered space, with a private pool, outdoor decks for every mood, and that slide \u2013 yes, a slide \u2013 dropping you straight from the upper floor into the lagoon below. But the detail that stays with you is simpler: lying in bed as the retractable roof draws back overhead, revealing a sky so thick with stars it barely looks real. The in-house astronomer will tell you exactly what you are looking at.

Days here have no fixed shape. Snorkel the house reef before breakfast, graze through the ice cream and chocolate rooms mid-afternoon, and let the spa set the pace for everything between. Soneva pioneered barefoot luxury before the phrase existed \u2013 you will feel it in every unforced, unhurried moment.`,
          flesch_reading_ease: 62.8,
        },
      ],
    },
  },
]
