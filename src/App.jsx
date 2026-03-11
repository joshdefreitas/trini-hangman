import { useState, useEffect, useCallback } from "react";

// =============================================================================
// WORD LIST
// =============================================================================
// To add a word, copy any line below and change the four fields:
//
//   { word: "ANSWER",  hint: "Category",  emoji: "🎯",
//     sentence: "Use ___ in a sentence here." },
//
// RULES:
//   • word      — always UPPERCASE
//   • hint      — the category label shown to the player
//   • emoji     — single emoji shown next to the hint
//   • sentence  — use ___ for every word in a multi-word answer
//                 e.g. "CORN SOUP" needs two ___: "She buy ___ ___ every night."
// =============================================================================
const WORDS = [
  // ── Trini Food ─────────────────────────────────────────────────────────────
  {
    word: "DOUBLES",
    hint: "Trini Food",
    emoji: "🫓",
    sentence:
      "Every morning before work, he stop by the roadside to grab some ___.",
  },

  {
    word: "PHOLOURIE",
    hint: "Trini Food",
    emoji: "🍢",
    sentence: "She buying ___ with tamarind sauce from the lady by the market.",
  },

  {
    word: "PELAU",
    hint: "Trini Food",
    emoji: "🍚",
    sentence:
      "Mammie make a big pot of ___ with pigeon peas for the whole family on Sunday.",
  },

  {
    word: "ROTI",
    hint: "Trini Food",
    emoji: "🫔",
    sentence: "He take away a chicken ___ for lunch by the dhalpuri shop.",
  },

  {
    word: "BAKE",
    hint: "Trini Food",
    emoji: "🥖",
    sentence: "She fry some ___ and buljol for breakfast dis morning.",
  },

  {
    word: "CHOKA",
    hint: "Trini Food",
    emoji: "🌶️",
    sentence:
      "Dey roast the tomato on the fire and make a nice ___ to eat with sada roti.",
  },

  {
    word: "ACCRA",
    hint: "Trini Food",
    emoji: "🐟",
    sentence:
      "The ___ and float does sell out fast on a Sunday morning by the market.",
  },

  {
    word: "SAHINA",
    hint: "Trini Food",
    emoji: "🌿",
    sentence:
      "Tantie roll the dasheen bush leaf in the batter and fry the ___ crispy.",
  },

  {
    word: "ALOO PIE",
    hint: "Trini Food",
    emoji: "🥟",
    sentence:
      "She grab a ___ ___ with pepper sauce on the way home from school.",
  },

  {
    word: "KURMA",
    hint: "Trini Food",
    emoji: "🍬",
    sentence:
      "Dey does always put out ___ at a Hindu wedding to sweeten the mouth.",
  },

  {
    word: "BAIGAN",
    hint: "Trini Food",
    emoji: "🍆",
    sentence:
      "Mammy make ___ choka on the fire to go with the sada roti for breakfast.",
  },

  {
    word: "BULJOL",
    hint: "Trini Food",
    emoji: "🐠",
    sentence:
      "He soak the saltfish overnight and make ___ with onion and tomato.",
  },

  {
    word: "SOUSE",
    hint: "Trini Food",
    emoji: "🍖",
    sentence:
      "The pig trotter ___ with cucumber and shadow beni was real nice at the fete.",
  },

  {
    word: "CORN SOUP",
    hint: "Trini Food",
    emoji: "🌽",
    sentence:
      "After the fete finish, everybody line up for ___ ___ by the side of the road.",
  },

  {
    word: "CALLALOO",
    hint: "Trini Food",
    emoji: "🥬",
    sentence:
      "Sunday lunch ain't Sunday lunch in this house without ___ and crab.",
  },

  {
    word: "GEERA PORK",
    hint: "Trini Food",
    emoji: "🥩",
    sentence:
      "The ___ ___ at the rum bar does done before nine o clock every Friday night.",
  },

  {
    word: "PASTELLE",
    hint: "Trini Food",
    emoji: "🫔",
    sentence:
      "Every Christmas, the whole family does spend the whole night folding and wrapping ___.",
  },

  {
    word: "BULJOL",
    hint: "Trini Food",
    emoji: "🐠",
    sentence:
      "He soak the saltfish overnight and make ___ with onion, tomato and cucumber.",
  },

  {
    word: "BUSS UP SHUT",
    hint: "Trini Food",
    emoji: "🫔",
    sentence:
      "She order a ___ ___ ___ with curry duck to soak up all the gravy.",
  },

  {
    word: "SHARK AND BAKE",
    hint: "Trini Food",
    emoji: "🦈",
    sentence:
      "Nothing beats a ___ ___ ___ with pepper sauce dripping down yuh hand on Maracas beach.",
  },

  {
    word: "OILDOWN",
    hint: "Tobago Food",
    emoji: "🍲",
    sentence:
      "The ___ with breadfruit, provision and saltfish is the national dish of Tobago.",
  },

  {
    word: "CRAB AND DUMPLING",
    hint: "Tobago Food",
    emoji: "🦀",
    sentence:
      "She drive all the way to Tobago just to eat ___ ___ ___ by the beach.",
  },

  {
    word: "BLACK PUDDING",
    hint: "Trini Food",
    emoji: "🩸",
    sentence:
      "The lady does sell ___ ___ and souse every Saturday morning by the market.",
  },

  {
    word: "PONE",
    hint: "Trini Food",
    emoji: "🍮",
    sentence:
      "Granny bake a cassava ___ in the oven that smell up the whole house.",
  },

  {
    word: "TOOLUM",
    hint: "Trini Food",
    emoji: "🍬",
    sentence:
      "The old lady selling ___ and sugar cake by the side of the road.",
  },

  {
    word: "TAMARIND BALLS",
    hint: "Trini Food",
    emoji: "🍡",
    sentence:
      "She roll the ___ ___ in sugar and pepper to sell by the school gate.",
  },

  {
    word: "SUGAR CAKE",
    hint: "Trini Food",
    emoji: "🍭",
    sentence:
      "She cut the coconut fine and make ___ ___ that melt in yuh mouth.",
  },

  {
    word: "CHIP CHIP",
    hint: "Trini Food",
    emoji: "🐚",
    sentence:
      "Dey does pick ___ ___ from the sand at Manzanilla to make a pepper sauce.",
  },

  {
    word: "PROVISIONS",
    hint: "Trini Food",
    emoji: "🥔",
    sentence:
      "Mammie boil all kinda ___ — dasheen, eddoe, cassava — to eat with the stew.",
  },

  {
    word: "BHAJI",
    hint: "Trini Food",
    emoji: "🌿",
    sentence:
      "She fry the spinach down with onion and garlic to make ___ for the roti.",
  },

  {
    word: "EDDOE",
    hint: "Trini Food",
    emoji: "🥔",
    sentence: "She boil the ___ and mash it up to eat with the saltfish choka.",
  },

  {
    word: "DASHEEN",
    hint: "Trini Food",
    emoji: "🌱",
    sentence:
      "He plant ___ in the garden by the river where the ground does stay wet.",
  },

  // ── Trini Fruit ────────────────────────────────────────────────────────────
  {
    word: "POMMERAC",
    hint: "Trini Fruit",
    emoji: "🍎",
    sentence:
      "The children pelting ___ from the tree in the yard to make juice.",
  },

  {
    word: "CHENETTE",
    hint: "Trini Fruit",
    emoji: "🍇",
    sentence: "Dey selling ___ in a bag by the school gate for five dollars.",
  },

  {
    word: "JULIE MANGO",
    hint: "Trini Fruit",
    emoji: "🥭",
    sentence:
      "Nothing sweeter than a ripe ___ ___ straight off the tree in the back yard.",
  },

  {
    word: "POMMECYTHERE",
    hint: "Trini Fruit",
    emoji: "🍑",
    sentence:
      "She cut up the ___ and season it with salt and pepper for a quick snack.",
  },

  {
    word: "STARCHEE",
    hint: "Trini Fruit",
    emoji: "⭐",
    sentence:
      "The ___ from the tree in front the house does fall ripe every rainy season.",
  },

  {
    word: "FIVE FINGER",
    hint: "Trini Fruit",
    emoji: "✋",
    sentence: "She slice up the ___ ___ and put it in the juice with some ice.",
  },

  {
    word: "GOLDEN APPLE",
    hint: "Trini Fruit",
    emoji: "🍏",
    sentence:
      "He eat the ___ ___ with salt and pepper standing right under the tree.",
  },

  {
    word: "SAPODILLA",
    hint: "Trini Fruit",
    emoji: "🟤",
    sentence:
      "The ___ does be real sweet and soft when it ripe up proper on the tree.",
  },

  {
    word: "PAWA",
    hint: "Trini Fruit",
    emoji: "🍈",
    sentence:
      "She eat ___ with lime juice and salt every morning for breakfast.",
  },

  {
    word: "COCORITE",
    hint: "Trini Fruit",
    emoji: "🌴",
    sentence:
      "The ___ palm does line the road in Chaguaramas and bear small orange fruit.",
  },

  // ── Trini Drinks ───────────────────────────────────────────────────────────
  {
    word: "MAUBY",
    hint: "Trini Drink",
    emoji: "🥤",
    sentence: "She does always make a big bottle of ___ to sell by the school.",
  },

  {
    word: "SORREL",
    hint: "Trini Drink",
    emoji: "🌺",
    sentence:
      "Christmas ain't Christmas in this house without a cold glass of ___ with cloves.",
  },

  {
    word: "PUNCH DE CREME",
    hint: "Trini Drink",
    emoji: "🥛",
    sentence:
      "She make a full batch of ___ ___ ___ to bring by the Christmas lime.",
  },

  {
    word: "PUNCHEON",
    hint: "Trini Drink",
    emoji: "🍶",
    sentence:
      "One shot of ___ rum does warm yuh belly faster than anything else.",
  },

  {
    word: "CARIB",
    hint: "Trini Drink",
    emoji: "🍺",
    sentence:
      "He crack open a cold ___ and sit down on the gallery to watch the rain.",
  },

  {
    word: "COCONUT WATER",
    hint: "Trini Drink",
    emoji: "🥥",
    sentence:
      "Nothing does beat a cold ___ ___ on a hot Carnival Monday morning.",
  },

  {
    word: "GINGER BEER",
    hint: "Trini Drink",
    emoji: "🍺",
    sentence:
      "Mammy make homemade ___ ___ for the Christmas fete that had a real kick to it.",
  },

  {
    word: "SEA MOSS",
    hint: "Trini Drink",
    emoji: "🌊",
    sentence:
      "He does drink ___ ___ every morning and swear by it for strength and energy.",
  },

  {
    word: "BUSH TEA",
    hint: "Trini Drink",
    emoji: "🍵",
    sentence:
      "When yuh sick, granny does make ___ ___ from the garden to fix yuh right up.",
  },

  // ── Trini Slang ────────────────────────────────────────────────────────────
  {
    word: "BACCHANAL",
    hint: "Trini Slang",
    emoji: "😤",
    sentence:
      "All kinda ___ break out at the fete when the lights went out and the music stop.",
  },

  {
    word: "MACCO",
    hint: "Trini Slang",
    emoji: "👀",
    sentence:
      "Stop being a ___ and mind yuh own business nah — it ain't have nothing to see.",
  },

  {
    word: "LIME",
    hint: "Trini Slang",
    emoji: "🎉",
    sentence: "Dey having a ___ by the beach on Sunday — yuh coming or wha?",
  },

  {
    word: "STEUPS",
    hint: "Trini Slang",
    emoji: "😒",
    sentence:
      "She give him one long ___ and walk away without saying a single word.",
  },

  {
    word: "TRINI",
    hint: "Trini Slang",
    emoji: "🇹🇹",
    sentence:
      "Only a real ___ would know how to properly eat a doubles without making a mess.",
  },

  {
    word: "FETE",
    hint: "Trini Slang",
    emoji: "🎊",
    sentence:
      "He spend the whole week saving money just to go to the big ___ on Saturday night.",
  },

  {
    word: "LIMING",
    hint: "Trini Slang",
    emoji: "😎",
    sentence:
      "Dey not doing nothing — just ___ by the corner and watching people pass.",
  },

  {
    word: "DOTISH",
    hint: "Trini Slang",
    emoji: "🤪",
    sentence:
      "He real ___ — he lock he keys inside the car again for the third time this month.",
  },

  {
    word: "MAMAGUY",
    hint: "Trini Slang",
    emoji: "😏",
    sentence:
      "Doh let him ___ yuh — he only saying dat to get what he want from yuh.",
  },

  {
    word: "FATIGUE",
    hint: "Trini Slang",
    emoji: "😜",
    sentence:
      "She giving him real ___ about coming home late — the whole street could hear.",
  },

  {
    word: "TABANCA",
    hint: "Trini Slang",
    emoji: "💔",
    sentence:
      "He walking round with real bad ___ since she leave him last month for somebody else.",
  },

  {
    word: "WOTLESS",
    hint: "Trini Slang",
    emoji: "😈",
    sentence:
      "Dey is a set of ___ people who only want to fete and doh want to work at all.",
  },

  {
    word: "MAUVAIS LANGUE",
    hint: "Trini Slang",
    emoji: "👅",
    sentence:
      "Watch out for she — she have real ___ ___ and does talk everybody business.",
  },

  {
    word: "SKYLARKING",
    hint: "Trini Slang",
    emoji: "🛝",
    sentence:
      "Stop ___ and do yuh homework right now before yuh father come home from work.",
  },

  {
    word: "VIBES",
    hint: "Trini Slang",
    emoji: "✨",
    sentence:
      "The ___ at the fete was real good — everybody was happy and the music was on point.",
  },

  {
    word: "TANTIE",
    hint: "Trini Slang",
    emoji: "👩",
    sentence:
      "Every Sunday we does go by ___ for lunch and she does cook way too much food.",
  },

  {
    word: "YAMPEE",
    hint: "Trini Slang",
    emoji: "😴",
    sentence:
      "He wake up with ___ in he eye and went straight back to sleep on the couch.",
  },

  {
    word: "HORNERMAN",
    hint: "Trini Slang",
    emoji: "🤘",
    sentence:
      "The crowd went crazy when the ___ come on stage and wave he flag in the air.",
  },

  {
    word: "BOLDFACE",
    hint: "Trini Slang",
    emoji: "😤",
    sentence:
      "She real ___ — she ask for a pay raise the same week she reach late every single day.",
  },

  {
    word: "SAGA BOY",
    hint: "Trini Slang",
    emoji: "🕺",
    sentence:
      "He dress up like a real ___ ___ for the fete — gold chain, shirt open and everything.",
  },

  {
    word: "OLE TALK",
    hint: "Trini Slang",
    emoji: "💬",
    sentence:
      "Dem fellas by the corner does spend the whole day on ___ ___ and never do a thing.",
  },

  {
    word: "SWEET MAN",
    hint: "Trini Slang",
    emoji: "😍",
    sentence:
      "Everybody in the village know he is she ___ ___ — he always by she house.",
  },

  {
    word: "JAMETTE",
    hint: "Trini Slang",
    emoji: "💅",
    sentence:
      "She acting like a real ___ at the fete — carrying on and drawing attention to sheself.",
  },

  {
    word: "GYUL",
    hint: "Trini Slang",
    emoji: "👧",
    sentence:
      "Aye ___, yuh looking nice today — where yuh going all dressed up so?",
  },

  {
    word: "PARDNER",
    hint: "Trini Slang",
    emoji: "🤝",
    sentence:
      "She in a ___ with five other women and saving money every week to get a lump sum.",
  },

  {
    word: "BREDS",
    hint: "Trini Slang",
    emoji: "👊",
    sentence:
      "All my ___ showed up to support me at the show — I didn't expect so many people.",
  },

  {
    word: "PRESSURE",
    hint: "Trini Slang",
    emoji: "😰",
    sentence:
      "Don't give him no ___ right now — he already stressed out about the work situation.",
  },

  {
    word: "HORNER",
    hint: "Trini Slang",
    emoji: "🤫",
    sentence:
      "Everybody in the road know he is a ___ — she playing the man right in front his face.",
  },

  {
    word: "BLAG",
    hint: "Trini Slang",
    emoji: "🎭",
    sentence:
      "He try to ___ his way into the VIP section but the bouncer see through him quick.",
  },

  {
    word: "BOOF",
    hint: "Trini Slang",
    emoji: "😵",
    sentence:
      "She give him a good ___ right in front everybody — his head snap back and everything.",
  },

  {
    word: "FARSE",
    hint: "Trini Slang",
    emoji: "🫣",
    sentence:
      "He too ___ — always in everybody business and repeating what he hear on the road.",
  },

  {
    word: "GOUTI",
    hint: "Trini Slang",
    emoji: "🐀",
    sentence:
      "They find a ___ living under the house and set a trap to catch it.",
  },

  {
    word: "MAUVAISE",
    hint: "Trini Slang",
    emoji: "😠",
    sentence:
      "She in a real ___ mood today — doh bother talk to she about anything right now.",
  },

  // ── Carnival ───────────────────────────────────────────────────────────────
  {
    word: "WINING",
    hint: "Carnival Term",
    emoji: "💃",
    sentence:
      "She was ___ down de road on a big truck with she whole section on Carnival Tuesday.",
  },

  {
    word: "JOUVERT",
    hint: "Carnival Term",
    emoji: "🥁",
    sentence:
      "They wake up at two in the morning to catch ___ before the sun even rise.",
  },

  {
    word: "MASMAN",
    hint: "Carnival Term",
    emoji: "🎭",
    sentence:
      "The old ___ from Laventille was famous for his hand-crafted wire-bending costumes.",
  },

  {
    word: "CARNIVAL",
    hint: "Cultural Event",
    emoji: "🎉",
    sentence:
      "Every year the whole country does shut down for ___ Monday and Tuesday.",
  },

  {
    word: "CHIPPING",
    hint: "Carnival Term",
    emoji: "🚶",
    sentence:
      "Everybody was ___ slowly down the road with the music truck in the hot sun.",
  },

  {
    word: "MASQUERADE",
    hint: "Carnival Term",
    emoji: "🎭",
    sentence:
      "The children dress up in ___ costumes and parade around the school for the junior carnival.",
  },

  {
    word: "MUDMAS",
    hint: "Carnival Term",
    emoji: "🎨",
    sentence:
      "They cover themselves in mud from head to toe for ___ before Carnival proper starts.",
  },

  {
    word: "FETING",
    hint: "Carnival Term",
    emoji: "🥳",
    sentence:
      "He been ___ every weekend since January and spend all his money before Carnival come.",
  },

  {
    word: "ROADMARCH",
    hint: "Carnival Term",
    emoji: "🏆",
    sentence:
      "The song that cross the most stages on Carnival day wins the ___ title.",
  },

  {
    word: "BAND LAUNCH",
    hint: "Carnival Term",
    emoji: "🎉",
    sentence:
      "She bought her costume at the ___ ___ and couldn't wait to see how it would look on the road.",
  },

  {
    word: "FETE SEASON",
    hint: "Carnival Term",
    emoji: "📅",
    sentence:
      "From January, ___ ___ start and everybody pocket getting lighter every weekend.",
  },

  {
    word: "KING AND QUEEN",
    hint: "Carnival Term",
    emoji: "👑",
    sentence:
      "The ___ ___ ___ competition at the Savannah was the highlight of Carnival dimanche gras.",
  },

  {
    word: "PAN YARD",
    hint: "Carnival Term",
    emoji: "🥁",
    sentence:
      "The whole neighbourhood does lime by the ___ ___ on a Friday night to hear the band practise.",
  },

  {
    word: "FANCY MAS",
    hint: "Carnival Term",
    emoji: "🪆",
    sentence:
      "She always play ___ ___ with feathers and rhinestones — she doh like getting dirty.",
  },

  {
    word: "BLUE DEVIL",
    hint: "Carnival Term",
    emoji: "😈",
    sentence:
      "The children run when the ___ ___ cover in blue paint start chasing people down the road.",
  },

  {
    word: "MOKO JUMBIE",
    hint: "Carnival Term",
    emoji: "🦺",
    sentence:
      "The ___ ___ on dem tall stilts was dancing right through the crowd on the savannah stage.",
  },

  {
    word: "MIDNIGHT ROBBER",
    hint: "Carnival Term",
    emoji: "🤠",
    sentence:
      "The ___ ___ stop in the middle of the road to deliver his long dramatic speech.",
  },

  {
    word: "DAME LORRAINE",
    hint: "Carnival Term",
    emoji: "👗",
    sentence:
      "The man dress up as ___ ___ with big padding and a bonnet and had everybody laughing.",
  },

  {
    word: "JAB JABS",
    hint: "Carnival Term",
    emoji: "😈",
    sentence:
      "The ___ ___ rattling their chains and horns scared the children on the Jouvert morning.",
  },

  // ── Music ──────────────────────────────────────────────────────────────────
  {
    word: "SOCA",
    hint: "Music Genre",
    emoji: "🎵",
    sentence:
      "The ___ music was blasting so loud from the truck you could hear it three streets away.",
  },

  {
    word: "CALYPSO",
    hint: "Music Genre",
    emoji: "🎶",
    sentence:
      "The ___ singer use his song to talk about the government and make the whole crowd laugh.",
  },

  {
    word: "PARANG",
    hint: "Music Genre",
    emoji: "🎸",
    sentence:
      "The ___ band went from house to house singing Spanish songs on Christmas eve.",
  },

  {
    word: "CHUTNEY",
    hint: "Music Genre",
    emoji: "🎤",
    sentence:
      "The ___ soca song had everybody at the Hindu wedding up on their feet wining.",
  },

  {
    word: "RAPSO",
    hint: "Music Genre",
    emoji: "🎙️",
    sentence:
      "The ___ artist use his lyrics to speak out about the social problems in the community.",
  },

  {
    word: "STEELPAN",
    hint: "Cultural Item",
    emoji: "🥁",
    sentence:
      "The ___ was invented right here in Trinidad and is recognised as our national instrument.",
  },

  {
    word: "TASSA",
    hint: "Cultural Item",
    emoji: "🪘",
    sentence:
      "The ___ drummers led the procession through the village making a noise you could feel in yuh chest.",
  },

  {
    word: "MACHEL",
    hint: "Soca Artist",
    emoji: "🎤",
    sentence:
      "___ is the undisputed king of Soca and has been performing for over three decades.",
  },

  {
    word: "BUNJI GARLIN",
    hint: "Soca Artist",
    emoji: "🎤",
    sentence:
      "___ ___ released a song that had the whole Caribbean singing along that Carnival season.",
  },

  {
    word: "FAYE ANN",
    hint: "Soca Artist",
    emoji: "🎤",
    sentence:
      "___ ___ is known as the Queen of Soca and has won the title multiple times.",
  },

  {
    word: "SUPER BLUE",
    hint: "Soca Artist",
    emoji: "🎤",
    sentence:
      "___ ___ is a Soca legend who has won the Roadmarch title more times than anyone else.",
  },

  {
    word: "DESTRA",
    hint: "Soca Artist",
    emoji: "🎤",
    sentence:
      "___ is one of the most energetic female Soca performers Trinidad has ever produced.",
  },

  {
    word: "SHADOW",
    hint: "Calypso Artist",
    emoji: "🎤",
    sentence:
      "___ was a calypso legend whose deep voice and mysterious style made him stand out.",
  },

  {
    word: "SPARROW",
    hint: "Calypso Artist",
    emoji: "🐦",
    sentence:
      "The Mighty ___ is considered one of the greatest calypsonians who ever lived.",
  },

  {
    word: "KITCHENER",
    hint: "Calypso Artist",
    emoji: "🎶",
    sentence:
      "Lord ___ was a calypso master who won the Roadmarch title a record number of times.",
  },

  {
    word: "BARON",
    hint: "Soca Artist",
    emoji: "🎤",
    sentence:
      "___ is a veteran Soca artist known for his powerful voice and stage presence.",
  },

  {
    word: "IWER GEORGE",
    hint: "Soca Artist",
    emoji: "🎤",
    sentence:
      "___ ___ is famous for his high energy performances and his loyal fanbase in Trinidad.",
  },

  {
    word: "RIKKI JAI",
    hint: "Chutney Artist",
    emoji: "🎤",
    sentence:
      "___ ___ is a Chutney Soca legend who has been entertaining crowds for decades.",
  },

  {
    word: "DRUPATEE",
    hint: "Chutney Artist",
    emoji: "🎤",
    sentence:
      "___ was one of the first female Chutney Soca artists to gain widespread popularity.",
  },

  // ── Trinidad Locations ─────────────────────────────────────────────────────
  {
    word: "SAVANNAH",
    hint: "Trinidad Location",
    emoji: "🌿",
    sentence:
      "Every evening people does walk laps and eat corn soup by the ___.",
  },

  {
    word: "MAYARO",
    hint: "Trinidad Location",
    emoji: "🏖️",
    sentence:
      "They drive down to ___ for the Easter weekend to lime on the long quiet beach.",
  },

  {
    word: "MARACAS",
    hint: "Trinidad Location",
    emoji: "🌊",
    sentence:
      "We pack the cooler and head to ___ beach for a lime on Easter Monday.",
  },

  {
    word: "CHAGUANAS",
    hint: "Trinidad Location",
    emoji: "📍",
    sentence:
      "She go by ___ to do her shopping because the market there cheaper than Port of Spain.",
  },

  {
    word: "LAVENTILLE",
    hint: "Trinidad Location",
    emoji: "🏘️",
    sentence:
      "___ is a community on the hill overlooking Port of Spain with a strong cultural history.",
  },

  {
    word: "SAN FERNANDO",
    hint: "Trinidad Location",
    emoji: "🏙️",
    sentence:
      "___ ___ is the second largest city in Trinidad and the heart of the south.",
  },

  {
    word: "ARIMA",
    hint: "Trinidad Location",
    emoji: "📍",
    sentence:
      "___ is an old borough in the east known for its Carib heritage and the Velodrome.",
  },

  {
    word: "SANGRE GRANDE",
    hint: "Trinidad Location",
    emoji: "📍",
    sentence:
      "They drove through ___ ___ on the way to Toco beach early Easter morning.",
  },

  {
    word: "COUVA",
    hint: "Trinidad Location",
    emoji: "📍",
    sentence:
      "The refinery and the National Football Training Centre are both located in ___.",
  },

  {
    word: "ICACOS",
    hint: "Trinidad Location",
    emoji: "⛵",
    sentence:
      "___ is at the far southwest tip of Trinidad where you can almost see Venezuela.",
  },

  {
    word: "TOCO",
    hint: "Trinidad Location",
    emoji: "🏖️",
    sentence:
      "The drive to ___ is long but the beach at the end of it is worth every minute.",
  },

  {
    word: "BLANCHISSEUSE",
    hint: "Trinidad Location",
    emoji: "🌊",
    sentence:
      "The road to ___ along the north coast is winding but the scenery is breathtaking.",
  },

  {
    word: "LOPINOT",
    hint: "Trinidad Location",
    emoji: "🌿",
    sentence:
      "The cocoa estate at ___ is one of the oldest historical sites in Trinidad.",
  },

  {
    word: "FYZABAD",
    hint: "Trinidad Location",
    emoji: "📍",
    sentence:
      "___ in south Trinidad is where Uriah Butler led the 1937 oilfield workers uprising.",
  },

  {
    word: "PENAL",
    hint: "Trinidad Location",
    emoji: "📍",
    sentence:
      "She from ___ and does drive to San Fernando every morning for work.",
  },

  {
    word: "PRINCES TOWN",
    hint: "Trinidad Location",
    emoji: "📍",
    sentence:
      "___ ___ in south Trinidad is known for its paddy fields and Hindu heritage.",
  },

  {
    word: "MORUGA",
    hint: "Trinidad Location",
    emoji: "🌶️",
    sentence:
      "___ is famous for producing the Moruga Scorpion pepper — one of the hottest in the world.",
  },

  {
    word: "POINTE A PIERRE",
    hint: "Trinidad Location",
    emoji: "⚓",
    sentence:
      "The oil refinery at ___ ___ ___ was once one of the largest in the western hemisphere.",
  },

  {
    word: "CEDROS",
    hint: "Trinidad Location",
    emoji: "⛵",
    sentence:
      "Fishermen from ___ does go out in their pirogues before the sun rise every morning.",
  },

  {
    word: "GASPAREE",
    hint: "Trinidad Location",
    emoji: "🏝️",
    sentence:
      "They took a boat out to ___ island to explore the limestone caves and swim in the clear water.",
  },

  {
    word: "PORT OF SPAIN",
    hint: "Trinidad Location",
    emoji: "🏙️",
    sentence:
      "___ ___ ___ is the capital city and the heart of Carnival every year.",
  },

  // ── Tobago Locations ───────────────────────────────────────────────────────
  {
    word: "TOBAGO",
    hint: "Tobago",
    emoji: "🏝️",
    sentence:
      "She take the ferry to ___ for the long weekend to reach Pigeon Point beach.",
  },

  {
    word: "SCARBOROUGH",
    hint: "Tobago Location",
    emoji: "🏖️",
    sentence:
      "___ is the capital town of Tobago and the centre of commerce on the island.",
  },

  {
    word: "PIGEON POINT",
    hint: "Tobago Location",
    emoji: "🏖️",
    sentence:
      "The calm turquoise water at ___ ___ is the most photographed beach in all of Tobago.",
  },

  {
    word: "CROWN POINT",
    hint: "Tobago Location",
    emoji: "✈️",
    sentence:
      "The flight lands at ___ ___ airport and from there it only take twenty minutes to the hotel.",
  },

  {
    word: "BUCCOO REEF",
    hint: "Tobago Location",
    emoji: "🐠",
    sentence:
      "They take the glass bottom boat out to see the coral and fish at ___ ___.",
  },

  {
    word: "NYLON POOL",
    hint: "Tobago Location",
    emoji: "🏊",
    sentence:
      "Legend say if you bathe in the ___ ___ in Tobago you will feel ten years younger.",
  },

  {
    word: "SPEYSIDE",
    hint: "Tobago Location",
    emoji: "🤿",
    sentence:
      "___ on the northeast coast of Tobago is one of the best diving spots in the Caribbean.",
  },

  {
    word: "CHARLOTTEVILLE",
    hint: "Tobago Location",
    emoji: "🏘️",
    sentence:
      "___ is a quiet fishing village at the tip of Tobago that tourists always fall in love with.",
  },

  // ── Culture and History ────────────────────────────────────────────────────
  {
    word: "OBEAH",
    hint: "Cultural Item",
    emoji: "🔮",
    sentence:
      "He swear somebody put ___ on him because nothing going right in his life lately.",
  },

  {
    word: "HOSAY",
    hint: "Cultural Event",
    emoji: "🕌",
    sentence:
      "The ___ festival in St James draws huge crowds every year to watch the tadjahs and moons.",
  },

  {
    word: "DIVALI",
    hint: "Cultural Event",
    emoji: "🪔",
    sentence:
      "The whole neighbourhood light up with deyas on the night of ___ — it was beautiful.",
  },

  {
    word: "EMANCIPATION",
    hint: "Cultural Event",
    emoji: "✊",
    sentence:
      "___ Day on August 1st is a national holiday that marks the end of slavery in Trinidad.",
  },

  {
    word: "PHAGWA",
    hint: "Cultural Event",
    emoji: "🎨",
    sentence:
      "She wear old clothes to ___ because everybody pelting abeer and getting stained all over.",
  },

  {
    word: "TRINBAGO",
    hint: "Cultural Term",
    emoji: "🇹🇹",
    sentence:
      "People does say ___ when they talking about both Trinidad and Tobago together as one nation.",
  },

  {
    word: "HUMMING BIRD",
    hint: "National Symbol",
    emoji: "🐦",
    sentence:
      "The ___ ___ is the national bird of Trinidad and Tobago and appears on the coat of arms.",
  },

  {
    word: "CHACONIA",
    hint: "National Symbol",
    emoji: "🌺",
    sentence:
      "The wild ___ flower growing deep red in the forest is the national flower of Trinidad and Tobago.",
  },

  {
    word: "PITCH LAKE",
    hint: "Trinidad Landmark",
    emoji: "🖤",
    sentence:
      "The ___ ___ in La Brea is one of the largest natural deposits of asphalt in the world.",
  },

  {
    word: "ASA WRIGHT",
    hint: "Trinidad Landmark",
    emoji: "🦜",
    sentence:
      "The ___ ___ Nature Centre in the Arima Valley is world famous for birdwatching.",
  },

  {
    word: "NAPARIMA BOWL",
    hint: "Trinidad Landmark",
    emoji: "🎭",
    sentence:
      "The ___ ___ in San Fernando is the premier concert venue for the south of Trinidad.",
  },

  {
    word: "QUEENS PARK OVAL",
    hint: "Trinidad Landmark",
    emoji: "🏏",
    sentence:
      "The West Indies played a historic Test match at ___ ___ ___ in front of a packed crowd.",
  },

  {
    word: "TRINIDAD AND TOBAGO",
    hint: "National Identity",
    emoji: "🇹🇹",
    sentence:
      "___ ___ ___ gained independence from Britain on August 31st 1962.",
  },

  // ── Trini Legends ──────────────────────────────────────────────────────────
  {
    word: "BRIAN LARA",
    hint: "Trini Legend",
    emoji: "🏏",
    sentence:
      "___ ___ hold the world record for the highest individual score in Test cricket history.",
  },

  {
    word: "HASELY CRAWFORD",
    hint: "Trini Legend",
    emoji: "🏃",
    sentence:
      "___ ___ was the first athlete from Trinidad and Tobago to win an Olympic gold medal.",
  },

  {
    word: "WENDY FITZWILLIAM",
    hint: "Trini Legend",
    emoji: "👑",
    sentence:
      "___ ___ won the Miss Universe title in 1998 and became a national icon.",
  },

  {
    word: "NICKI MINAJ",
    hint: "Trini Legend",
    emoji: "🎤",
    sentence:
      "___ ___ was born in Trinidad before moving to New York and becoming a global rap superstar.",
  },

  // ── More Trini Legends ─────────────────────────────────────────────────────
  {
    word: "DWIGHT YORKE",
    hint: "Trini Legend",
    emoji: "⚽",
    sentence:
      "___ ___ was one of the greatest footballers Trinidad ever produced and played for Manchester United.",
  },

  {
    word: "ANGELA BASSETT",
    hint: "Trini Legend",
    emoji: "🎬",
    sentence:
      "___ ___ has Trinidadian roots and is one of the most celebrated actresses in Hollywood.",
  },

  {
    word: "EARL LOVELACE",
    hint: "Trini Legend",
    emoji: "📚",
    sentence:
      "___ ___ is a celebrated Trinidadian novelist best known for The Dragon Can't Dance.",
  },

  {
    word: "CLR JAMES",
    hint: "Trini Legend",
    emoji: "✊",
    sentence:
      "___ ___ was a Trinidadian intellectual, historian and cricket writer of world renown.",
  },

  {
    word: "CAZABON",
    hint: "Trini Legend",
    emoji: "🎨",
    sentence:
      "___ was a famous 19th century Trinidadian painter celebrated for his landscapes of the island.",
  },

  // ── More Music Genres ──────────────────────────────────────────────────────
  {
    word: "STEEL BAND",
    hint: "Music Genre",
    emoji: "🥁",
    sentence:
      "Every Panorama season, the ___ ___ does practise late into the night in the pan yard.",
  },

  {
    word: "EXTEMPO",
    hint: "Music Genre",
    emoji: "🎙️",
    sentence:
      "The ___ competition requires calypsonians to make up lyrics on the spot without any preparation.",
  },

  {
    word: "PICHAKAREE",
    hint: "Music Genre",
    emoji: "🎶",
    sentence:
      "The ___ singing at the Phagwa celebration was beautiful and lifted everybody spirit.",
  },

  {
    word: "LAVWAY",
    hint: "Music Genre",
    emoji: "🎵",
    sentence:
      "The crowd joined in on the ___ chorus as the band passed slowly through the street.",
  },

  {
    word: "ORISHA",
    hint: "Music Genre",
    emoji: "🥁",
    sentence:
      "The ___ drumming at the ceremony was hypnotic and went on well past midnight.",
  },

  // ── More Calypso and Soca Artists ─────────────────────────────────────────
  {
    word: "SINGING SANDRA",
    hint: "Calypso Artist",
    emoji: "🎤",
    sentence:
      "___ ___ was one of the most powerful female calypsonians Trinidad ever produced.",
  },

  {
    word: "DAVID RUDDER",
    hint: "Calypso Artist",
    emoji: "🎤",
    sentence:
      "___ ___ is a legendary Trinidadian musician known for the iconic song Haiti.",
  },

  {
    word: "CYNTHIA MORGAN",
    hint: "Calypso Artist",
    emoji: "🎤",
    sentence:
      "___ ___ was a pioneering female calypsonian who broke barriers in the art form.",
  },

  {
    word: "PATRICE ROBERTS",
    hint: "Soca Artist",
    emoji: "🎤",
    sentence:
      "___ ___ is one of the most consistent female Soca artists in the Caribbean.",
  },

  {
    word: "KERWIN DU BOIS",
    hint: "Soca Artist",
    emoji: "🎤",
    sentence:
      "___ ___ ___ is known for his smooth delivery and has won multiple Soca Monarch titles.",
  },

  {
    word: "VOICE",
    hint: "Soca Artist",
    emoji: "🎤",
    sentence:
      "___ is a Trinidadian Soca artist known for his conscious and soulful storytelling style.",
  },

  {
    word: "FARMER NAPPY",
    hint: "Soca Artist",
    emoji: "🎤",
    sentence:
      "___ ___ became a household name with his feel-good road anthems every Carnival season.",
  },

  {
    word: "NAILAH BLACKMAN",
    hint: "Soca Artist",
    emoji: "🎤",
    sentence:
      "___ ___ is a young Trinidadian Soca star and the granddaughter of Rikki Jai.",
  },

  // ── More Cultural Events ───────────────────────────────────────────────────
  {
    word: "PANORAMA",
    hint: "Cultural Event",
    emoji: "🥁",
    sentence:
      "Every Carnival season, the steel bands compete at ___ for the title of national champions.",
  },

  {
    word: "DIMANCHE GRAS",
    hint: "Cultural Event",
    emoji: "🎭",
    sentence:
      "The ___ ___ show on Carnival Sunday night features the Calypso Monarch and King and Queen competition.",
  },

  {
    word: "SOCA MONARCH",
    hint: "Cultural Event",
    emoji: "🎤",
    sentence:
      "Winning the ___ ___ title is one of the biggest honours a Soca artist can achieve in Trinidad.",
  },

  {
    word: "CALYPSO TENT",
    hint: "Cultural Event",
    emoji: "🎶",
    sentence:
      "Every Carnival season he does go to the ___ ___ to hear the new songs before they hit the road.",
  },

  {
    word: "INDEPENDENCE",
    hint: "Cultural Event",
    emoji: "🇹🇹",
    sentence:
      "___ Day on August 31st is celebrated with a parade and fireworks all across the country.",
  },

  {
    word: "TOBAGO HERITAGE",
    hint: "Cultural Event",
    emoji: "🏝️",
    sentence:
      "The ___ ___ Festival showcases traditional Tobagonian culture, food and music every July.",
  },

  {
    word: "PARANG FESTIVAL",
    hint: "Cultural Event",
    emoji: "🎸",
    sentence:
      "The ___ ___ in Lopinot draws big crowds every December to celebrate the Christmas tradition.",
  },

  {
    word: "EASTER REGATTA",
    hint: "Cultural Event",
    emoji: "⛵",
    sentence:
      "The ___ ___ in Tobago is one of the oldest sailing races in the entire Caribbean.",
  },

  // ── More Cultural Items ────────────────────────────────────────────────────
  {
    word: "DEYA",
    hint: "Cultural Item",
    emoji: "🪔",
    sentence:
      "They light the small clay ___ and place it outside the house for Divali night.",
  },

  {
    word: "CUTLASS",
    hint: "Cultural Item",
    emoji: "🔪",
    sentence:
      "He sharpen the ___ and head into the garden to cut back the overgrown bush.",
  },

  {
    word: "PIROGUE",
    hint: "Cultural Item",
    emoji: "⛵",
    sentence:
      "The fisherman launch his ___ before sunrise to go and pull his nets in the gulf.",
  },

  {
    word: "JUMBIES",
    hint: "Cultural Item",
    emoji: "👻",
    sentence:
      "Granny used to warn the children about ___ coming out at night if they misbehaved.",
  },

  {
    word: "SOUCOUYANT",
    hint: "Cultural Item",
    emoji: "🔥",
    sentence:
      "She say she see a ___ turn into a ball of fire and fly over the rooftop in the dark.",
  },

  {
    word: "LA DIABLESSE",
    hint: "Cultural Item",
    emoji: "👠",
    sentence:
      "The story say ___ ___ would lure men off the road at night with her one hidden cloven hoof.",
  },

  {
    word: "LAGAHOO",
    hint: "Cultural Item",
    emoji: "🐺",
    sentence:
      "The old people in the village used to talk about seeing a ___ near the cemetery at midnight.",
  },

  {
    word: "BALISIER",
    hint: "Cultural Item",
    emoji: "🌺",
    sentence:
      "The ___ flower is the symbol of the PNM political party in Trinidad and Tobago.",
  },

  {
    word: "COCOA POD",
    hint: "Cultural Item",
    emoji: "🍫",
    sentence:
      "She break open the ___ ___ and suck the sweet white pulp right off the seed.",
  },

  // ── More National Symbols ──────────────────────────────────────────────────
  {
    word: "SCARLET IBIS",
    hint: "National Symbol",
    emoji: "🦩",
    sentence:
      "Hundreds of ___ ___ does come to roost in the Caroni swamp at sunset in a blaze of red.",
  },

  {
    word: "LEATHERBACK",
    hint: "National Symbol",
    emoji: "🐢",
    sentence:
      "The ___ turtle comes ashore on the beaches of Trinidad every year to lay her eggs in the sand.",
  },

  {
    word: "TRINITY CROSS",
    hint: "National Symbol",
    emoji: "✝️",
    sentence:
      "The ___ ___ was the highest national award in Trinidad and Tobago for many decades.",
  },

  {
    word: "COAT OF ARMS",
    hint: "National Symbol",
    emoji: "🛡️",
    sentence:
      "The ___ ___ ___ of Trinidad and Tobago features two hummingbirds and three ships.",
  },

  {
    word: "NATIONAL ANTHEM",
    hint: "National Symbol",
    emoji: "🎵",
    sentence:
      "The whole crowd stood up and sang the ___ ___ with pride before the cricket match started.",
  },

  // ── More Tobago Food ───────────────────────────────────────────────────────
  {
    word: "CURRY CRAB",
    hint: "Tobago Food",
    emoji: "🦀",
    sentence:
      "She make a pot of ___ ___ with coconut milk that had everybody licking their fingers.",
  },

  {
    word: "CRAB BACKS",
    hint: "Tobago Food",
    emoji: "🦀",
    sentence:
      "The restaurant serve ___ ___ stuffed with seasoned crabmeat as a starter on the menu.",
  },

  {
    word: "STEWED FISH",
    hint: "Tobago Food",
    emoji: "🐟",
    sentence:
      "The ___ ___ in coconut milk with provision is a classic Tobago Sunday morning breakfast.",
  },

  {
    word: "BLUE FOOD",
    hint: "Tobago Food",
    emoji: "💙",
    sentence:
      "In Tobago they does call dasheen and other ground provisions ___ ___ at Sunday lunch.",
  },

  // ── More Trini Food ────────────────────────────────────────────────────────
  {
    word: "SHADOW BENI",
    hint: "Trini Food",
    emoji: "🌿",
    sentence:
      "She chop up fresh ___ ___ and add it to the pepper sauce to give it that real Trini flavour.",
  },

  {
    word: "CHADON BENI",
    hint: "Trini Food",
    emoji: "🌿",
    sentence:
      "Without fresh ___ ___ the seasoning green just does not taste the same at all.",
  },

  {
    word: "SADA ROTI",
    hint: "Trini Food",
    emoji: "🫓",
    sentence:
      "She bake ___ ___ on the tawa and serve it hot with choka and fried ochro.",
  },

  {
    word: "DHAL PURI",
    hint: "Trini Food",
    emoji: "🫔",
    sentence:
      "The ___ ___ from that little shop in Debe is considered the best in all of south Trinidad.",
  },

  {
    word: "SALARA",
    hint: "Trini Food",
    emoji: "🌀",
    sentence:
      "She cut a thick slice of the red coconut ___ and pour a cup of cocoa tea to go with it.",
  },

  {
    word: "PINE TART",
    hint: "Trini Food",
    emoji: "🥧",
    sentence:
      "The bakery on the corner does sell fresh ___ ___ every morning while they still warm.",
  },

  {
    word: "CASSAVA PONE",
    hint: "Trini Food",
    emoji: "🍮",
    sentence:
      "Granny grate the cassava fine and bake a ___ ___ that smell up the whole house.",
  },

  {
    word: "COCONUT BAKE",
    hint: "Trini Food",
    emoji: "🥥",
    sentence:
      "The ___ ___ from the lady in Maracas was fluffy and tasted of real fresh coconut inside.",
  },

  {
    word: "FARINE",
    hint: "Trini Food",
    emoji: "🌾",
    sentence:
      "She cook the ___ with coconut milk and sugar for a simple but satisfying breakfast.",
  },

  {
    word: "CURRANTS ROLL",
    hint: "Trini Food",
    emoji: "🌀",
    sentence:
      "The children always ask for a ___ ___ from the bakery after school on a Friday afternoon.",
  },

  // ── More Trini Drinks ──────────────────────────────────────────────────────
  {
    word: "PEANUT PUNCH",
    hint: "Trini Drink",
    emoji: "🥜",
    sentence:
      "He buy a cold ___ ___ from the man by the market and drink it down in one go.",
  },

  {
    word: "CREAM SODA",
    hint: "Trini Drink",
    emoji: "🥤",
    sentence:
      "At every Trini birthday party growing up there was always a bottle of ___ ___ on the table.",
  },

  {
    word: "SOLO",
    hint: "Trini Drink",
    emoji: "🧃",
    sentence:
      "He grab a cold ___ from the parlour to wash down his doubles on the way to work.",
  },

  {
    word: "COCOA TEA",
    hint: "Trini Drink",
    emoji: "☕",
    sentence:
      "Nothing warms you up on a cool morning in the hills like a hot cup of ___ ___.",
  },

  // ── More Trini Slang ───────────────────────────────────────────────────────
  {
    word: "WAJANG",
    hint: "Trini Slang",
    emoji: "😤",
    sentence:
      "He behave like a real ___ at the party — loud, rude and making a scene in front everybody.",
  },

  {
    word: "BAMSEE",
    hint: "Trini Slang",
    emoji: "🍑",
    sentence:
      "She fall flat on she ___ when she slip on the wet floor coming out the fete.",
  },

  {
    word: "BACCOO",
    hint: "Trini Slang",
    emoji: "👺",
    sentence:
      "She say somebody must have a ___ working for them because everything always going their way.",
  },

  {
    word: "OLE MASK",
    hint: "Trini Slang",
    emoji: "🎭",
    sentence:
      "Stop playing ___ ___ — everybody already know the truth about what you did.",
  },

  {
    word: "PARANG LIME",
    hint: "Trini Slang",
    emoji: "🎸",
    sentence:
      "Every December the family does have a ___ ___ where they sing and eat pastelles all night.",
  },

  // ── More Trinidad Locations ────────────────────────────────────────────────
  {
    word: "CHAGUARAMAS",
    hint: "Trinidad Location",
    emoji: "⚓",
    sentence:
      "They went to ___ for the long weekend to rent a boat and lime on the water.",
  },

  {
    word: "CARONI SWAMP",
    hint: "Trinidad Location",
    emoji: "🦩",
    sentence:
      "Every evening at sunset people take the boat tour through the ___ ___ to see the scarlet ibis come home.",
  },

  {
    word: "MANZANILLA",
    hint: "Trinidad Location",
    emoji: "🏖️",
    sentence:
      "The long coconut-lined beach at ___ stretches for miles along the quiet east coast.",
  },

  {
    word: "DEBE",
    hint: "Trinidad Location",
    emoji: "🫔",
    sentence:
      "People drive from all over Trinidad to ___ just to eat the best dhal puri on the island.",
  },

  {
    word: "TUNAPUNA",
    hint: "Trinidad Location",
    emoji: "📍",
    sentence:
      "___ is a busy town in the east-west corridor known for its market and strong community vibe.",
  },

  {
    word: "CUREPE",
    hint: "Trinidad Location",
    emoji: "📍",
    sentence:
      "The busy junction at ___ is one of the most recognised intersections in all of Trinidad.",
  },

  {
    word: "SANTA CRUZ",
    hint: "Trinidad Location",
    emoji: "🌿",
    sentence:
      "The drive through ___ ___ valley is one of the most scenic and peaceful routes in Trinidad.",
  },

  {
    word: "DIEGO MARTIN",
    hint: "Trinidad Location",
    emoji: "📍",
    sentence:
      "___ ___ is a residential area in northwest Trinidad nestled between the hills and the sea.",
  },

  {
    word: "CARAPICHAIMA",
    hint: "Trinidad Location",
    emoji: "📍",
    sentence:
      "The Temple in the Sea near ___ was built by a determined man who carried stones into the water.",
  },

  {
    word: "NARIVA SWAMP",
    hint: "Trinidad Location",
    emoji: "🌿",
    sentence:
      "The ___ ___ on the east coast of Trinidad is home to anacondas, manatees and rare birds.",
  },
];

const MAX_WRONG = 6;
const START_DATE = new Date("2024-01-01");

function getDailyWord() {
  const now = new Date();
  const diff = Math.floor((now - START_DATE) / (1000 * 60 * 60 * 24));
  return WORDS[diff % WORDS.length];
}

function loadStats() {
  try {
    const s = localStorage.getItem("trini_hangman_stats");
    return s
      ? JSON.parse(s)
      : { played: 0, wins: 0, losses: 0, streak: 0, best: 0 };
  } catch {
    return { played: 0, wins: 0, losses: 0, streak: 0, best: 0 };
  }
}
function saveStats(s) {
  try {
    localStorage.setItem("trini_hangman_stats", JSON.stringify(s));
  } catch {}
}
function loadDailyState() {
  try {
    const s = localStorage.getItem("trini_hangman_daily");
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}
function saveDailyState(s) {
  try {
    localStorage.setItem("trini_hangman_daily", JSON.stringify(s));
  } catch {}
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function HangmanSVG({ wrong }) {
  const bc = wrong >= 6 ? "#ff8c42" : "#FF2400";
  return (
    <svg
      viewBox="0 0 200 230"
      style={{ width: "100%", maxWidth: 220, overflow: "visible" }}
    >
      {/* Gallows - bright warm amber wood, thick & visible */}
      <line
        x1="20"
        y1="222"
        x2="180"
        y2="222"
        stroke="#d4924a"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <line
        x1="60"
        y1="222"
        x2="60"
        y2="14"
        stroke="#d4924a"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <line
        x1="58"
        y1="14"
        x2="136"
        y2="14"
        stroke="#d4924a"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <line
        x1="136"
        y1="14"
        x2="136"
        y2="42"
        stroke="#d4924a"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Diagonal brace for realism */}
      <line
        x1="60"
        y1="55"
        x2="94"
        y2="14"
        stroke="#d4924a"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
      {/* Stickman — bright red/orange, thick, glowing */}
      {wrong >= 1 && (
        <circle
          cx="136"
          cy="58"
          r="19"
          stroke={bc}
          strokeWidth="5"
          fill="rgba(255,36,0,0.12)"
          style={{
            filter: `drop-shadow(0 0 6px ${bc}) drop-shadow(0 0 12px rgba(255,36,0,0.4))`,
          }}
        />
      )}
      {wrong >= 2 && (
        <line
          x1="136"
          y1="77"
          x2="136"
          y2="140"
          stroke={bc}
          strokeWidth="5"
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 5px ${bc})` }}
        />
      )}
      {wrong >= 3 && (
        <line
          x1="136"
          y1="96"
          x2="107"
          y2="124"
          stroke={bc}
          strokeWidth="5"
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 5px ${bc})` }}
        />
      )}
      {wrong >= 4 && (
        <line
          x1="136"
          y1="96"
          x2="165"
          y2="124"
          stroke={bc}
          strokeWidth="5"
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 5px ${bc})` }}
        />
      )}
      {wrong >= 5 && (
        <line
          x1="136"
          y1="140"
          x2="111"
          y2="176"
          stroke={bc}
          strokeWidth="5"
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 5px ${bc})` }}
        />
      )}
      {wrong >= 6 && (
        <line
          x1="136"
          y1="140"
          x2="161"
          y2="176"
          stroke={bc}
          strokeWidth="5"
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 5px ${bc})` }}
        />
      )}
    </svg>
  );
}

export default function TriniHangman() {
  const [mode, setMode] = useState("menu");
  // ALL volatile game state in one object — word, guessed, gameOver, celebration.
  // Every transition (new game, guess, win/lose) is a single setGame() call so
  // React never renders a frame where these fields are out of sync with each other.
  // This eliminates the "letters flash visible" bug on new word load.
  const [game, setGame] = useState(null);
  const [stats, setStats] = useState(loadStats);
  const [shake, setShake] = useState(false);

  const wordObj = game?.wordObj ?? null;
  const guessed = game?.guessed ?? new Set();
  const gameOver = game?.gameOver ?? false;
  const celebration = game?.celebration ?? false;
  const gameId = game?.gameId ?? 0;

  const wrongGuesses = wordObj
    ? [...guessed].filter((l) => !wordObj.word.replace(/ /g, "").includes(l))
        .length
    : 0;
  const isWon = wordObj
    ? wordObj.word.split("").every((l) => l === " " || guessed.has(l))
    : false;
  const isLost = wrongGuesses >= MAX_WRONG;

  const startGame = useCallback((type) => {
    if (type === "daily") {
      const daily = getDailyWord();
      const saved = loadDailyState();
      const todayStr = new Date().toDateString();
      if (saved && saved.date === todayStr) {
        // Restore full saved state atomically
        setGame((prev) => ({
          wordObj: daily,
          guessed: new Set(saved.guessed),
          gameOver: saved.gameOver,
          celebration: saved.gameOver === "win",
          gameId: (prev?.gameId ?? 0) + 1,
        }));
      } else {
        setGame((prev) => ({
          wordObj: daily,
          guessed: new Set(),
          gameOver: false,
          celebration: false,
          gameId: (prev?.gameId ?? 0) + 1,
        }));
      }
      setMode("daily");
    } else {
      const r = WORDS[Math.floor(Math.random() * WORDS.length)];
      // One atomic update — new word, empty guesses, no gameOver, no celebration
      setGame((prev) => ({
        wordObj: r,
        guessed: new Set(),
        gameOver: false,
        celebration: false,
        gameId: (prev?.gameId ?? 0) + 1,
      }));
      setMode("random");
    }
  }, []);

  useEffect(() => {
    if (wordObj && (isWon || isLost) && !gameOver) {
      const result = isWon ? "win" : "lose";
      // Update gameOver + celebration inside the same game object — still atomic
      setGame((prev) => ({ ...prev, gameOver: result, celebration: isWon }));
      const ns = { ...stats };
      ns.played += 1;
      if (result === "win") {
        ns.wins += 1;
        ns.streak += 1;
        if (ns.streak > ns.best) ns.best = ns.streak;
      } else {
        ns.losses += 1;
        ns.streak = 0;
      }
      setStats(ns);
      saveStats(ns);
      if (mode === "daily")
        saveDailyState({
          date: new Date().toDateString(),
          guessed: [...guessed],
          gameOver: result,
        });
    }
  }, [isWon, isLost]);

  const guess = useCallback(
    (letter) => {
      if (gameOver || !game || game.guessed.has(letter)) return;
      const newGuessed = new Set(game.guessed);
      newGuessed.add(letter);
      setGame((prev) => ({ ...prev, guessed: newGuessed }));
      if (!wordObj.word.includes(letter)) {
        setShake(true);
        setTimeout(() => setShake(false), 400);
      }
    },
    [gameOver, game, wordObj],
  );

  useEffect(() => {
    const handler = (e) => {
      const key = e.key.toUpperCase();
      if (ALPHABET.includes(key) && (mode === "daily" || mode === "random"))
        guess(key);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [guess, mode]);

  // ── Daily share — builds a spoiler-free emoji result card ─────────────
  const generateShareText = useCallback(() => {
    if (!wordObj || mode !== "daily") return "";
    const today = new Date();
    const dayNum = Math.floor((today - START_DATE) / (1000 * 60 * 60 * 24)) + 1;
    const won = gameOver === "win";
    const wrong = [...guessed].filter(
      (l) => !wordObj.word.replace(/ /g, "").includes(l),
    );
    const correct = [...guessed].filter((l) =>
      wordObj.word.replace(/ /g, "").includes(l),
    );
    // Build a row per wrong guess showing ❌, and a final row showing result
    const wrongRows = wrong.map(() => "❌").join(" ");
    const result = won
      ? `🟩 ${wrong.length}/6 wrong guesses`
      : `💀 Failed in 6`;
    const lines = [
      `🇹🇹 Trini Hangman — Day #${dayNum}`,
      `${wordObj.emoji} ${wordObj.hint}`,
      ``,
      won
        ? `${"🟩".repeat(correct.length > 0 ? 1 : 0)} Solved with ${wrong.length} wrong guess${wrong.length !== 1 ? "es" : ""}!`
        : `💀 Could not get it today`,
      wrong.length > 0
        ? `Wrong letters: ${wrongRows}`
        : `No wrong guesses — perfect!`,
      ``,
      `Play at trinihangman.com`,
    ];
    return lines.join("\n");
  }, [wordObj, guessed, gameOver, mode]);

  const [copied, setCopied] = useState(false);
  const handleShare = useCallback(async () => {
    const text = generateShareText();
    if (!text) return;
    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {}
    }
  }, [generateShareText]);

  const winRate =
    stats.played > 0 ? Math.round((stats.wins / stats.played) * 100) : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(145deg,#0d0600 0%,#1a0800 40%,#2d0f00 70%,#0d0600 100%)",
        fontFamily: "'Georgia','Times New Roman',serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 12px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: -80,
          left: -80,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(255,36,0,0.12) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(255,180,0,0.08) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          paddingTop: 20,
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo — clickable from anywhere, goes home */}
        <button
          onClick={() => setMode("menu")}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: mode === "menu" ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          {/* SVG Logo inline — no external file needed */}
          <svg
            viewBox="0 0 64 64"
            width="48"
            height="48"
            style={{
              flexShrink: 0,
              filter:
                mode !== "menu"
                  ? "drop-shadow(0 0 6px rgba(255,36,0,0.5))"
                  : "none",
              transition: "filter 0.2s",
            }}
          >
            {/* Background circle */}
            <circle cx="32" cy="32" r="31" fill="#140300" />
            {/* Gold ring */}
            <circle
              cx="32"
              cy="32"
              r="29.5"
              fill="none"
              stroke="#c8843a"
              strokeWidth="2.2"
            />
            <circle
              cx="32"
              cy="32"
              r="27"
              fill="none"
              stroke="rgba(200,132,58,0.3)"
              strokeWidth="1"
            />
            {/* Gallows */}
            <line
              x1="8"
              y1="50"
              x2="56"
              y2="50"
              stroke="#c8843a"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <line
              x1="15"
              y1="50"
              x2="15"
              y2="9"
              stroke="#c8843a"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <line
              x1="14"
              y1="9"
              x2="40"
              y2="9"
              stroke="#c8843a"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <line
              x1="40"
              y1="9"
              x2="40"
              y2="16"
              stroke="#c8843a"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <line
              x1="15"
              y1="19"
              x2="24"
              y2="9"
              stroke="#c8843a"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeOpacity="0.7"
            />
            {/* Stickman */}
            <circle
              cx="40"
              cy="21"
              r="5"
              fill="#140300"
              stroke="#FF2400"
              strokeWidth="2.2"
            />
            <line
              x1="40"
              y1="26"
              x2="40"
              y2="39"
              stroke="#FF2400"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <line
              x1="40"
              y1="31"
              x2="33"
              y2="36"
              stroke="#FF2400"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <line
              x1="40"
              y1="31"
              x2="47"
              y2="36"
              stroke="#FF2400"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <line
              x1="40"
              y1="39"
              x2="35"
              y2="47"
              stroke="#FF2400"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <line
              x1="40"
              y1="39"
              x2="45"
              y2="47"
              stroke="#FF2400"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* TT flag dots */}
            <circle cx="27" cy="56" r="1.5" fill="#FF2400" />
            <circle cx="32" cy="56" r="1.5" fill="#cccccc" />
            <circle cx="37" cy="56" r="1.5" fill="#111111" />
          </svg>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1.1,
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: 2,
                color: "#FF2400",
                textShadow:
                  mode !== "menu" ? "0 0 14px rgba(255,36,0,0.45)" : "none",
                transition: "text-shadow 0.2s",
              }}
            >
              TRINI
            </span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: 2,
                color: "#FFD700",
                textShadow:
                  mode !== "menu" ? "0 0 14px rgba(255,210,0,0.35)" : "none",
                transition: "text-shadow 0.2s",
              }}
            >
              HANGMAN
            </span>
          </div>
        </button>
        <button
          onClick={() => setMode("stats")}
          style={{
            background: "rgba(255,180,0,0.15)",
            border: "1px solid rgba(255,180,0,0.4)",
            color: "#FFB400",
            padding: "6px 14px",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          STATS
        </button>
      </div>

      {/* MENU */}
      {mode === "menu" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            marginTop: 40,
            width: "100%",
            maxWidth: 380,
          }}
        >
          <div
            style={{
              color: "rgba(255,220,180,0.7)",
              fontSize: 15,
              textAlign: "center",
              lineHeight: 1.6,
              marginBottom: 8,
            }}
          >
            Guess the Trini word before de man hang!
            <br />
            Every wrong letter builds de gallows. 🇹🇹
          </div>
          <MenuBtn
            onClick={() => startGame("daily")}
            color="#FF2400"
            label="☀️ Daily Challenge"
            sub="Same word for everyone today"
          />
          <MenuBtn
            onClick={() => startGame("random")}
            color="#FFB400"
            label="🎲 Random Word"
            sub={`${WORDS.length} Trini words to guess`}
          />
          <div
            style={{
              marginTop: 16,
              padding: "14px 20px",
              background: "rgba(255,255,255,0.04)",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.1)",
              width: "100%",
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: "#FFB400",
                fontSize: 13,
                marginBottom: 8,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              YOUR STATS
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Stat label="Played" val={stats.played} />
              <Stat label="Win %" val={`${winRate}%`} />
              <Stat label="Streak" val={stats.streak} />
              <Stat label="Best" val={stats.best} />
            </div>
          </div>
        </div>
      )}

      {/* STATS */}
      {mode === "stats" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            marginTop: 32,
            width: "100%",
            maxWidth: 380,
          }}
        >
          <div
            style={{
              color: "#FFB400",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
            }}
          >
            📊 YOUR STATS
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              width: "100%",
            }}
          >
            {[
              ["Games Played", stats.played],
              ["Wins", stats.wins],
              ["Losses", stats.losses],
              ["Win Rate", `${winRate}%`],
              ["Current Streak", stats.streak],
              ["Best Streak", stats.best],
            ].map(([label, val]) => (
              <div
                key={label}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,180,0,0.2)",
                  borderRadius: 12,
                  padding: "14px 10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{ color: "#FFB400", fontSize: 26, fontWeight: 900 }}
                >
                  {val}
                </div>
                <div
                  style={{
                    color: "rgba(255,220,180,0.6)",
                    fontSize: 11,
                    marginTop: 4,
                    letterSpacing: 0.5,
                  }}
                >
                  {label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setMode("menu")}
            style={{
              marginTop: 12,
              background: "rgba(255,36,0,0.2)",
              border: "1px solid #FF2400",
              color: "#FF2400",
              padding: "10px 32px",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            ← BACK
          </button>
        </div>
      )}

      {/* GAME */}
      {(mode === "daily" || mode === "random") && wordObj && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: 480,
            gap: 12,
            marginTop: 8,
          }}
        >
          <span
            style={{
              background:
                mode === "daily"
                  ? "rgba(255,36,0,0.2)"
                  : "rgba(255,180,0,0.15)",
              border: `1px solid ${mode === "daily" ? "#FF2400" : "#FFB400"}`,
              color: mode === "daily" ? "#FF2400" : "#FFB400",
              padding: "3px 12px",
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            {mode === "daily" ? "☀️ DAILY CHALLENGE" : "🎲 RANDOM"}
          </span>

          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(255,180,0,0.22) 0%, rgba(255,100,0,0.18) 100%)",
              border: "2px solid rgba(255,180,0,0.7)",
              borderRadius: 14,
              padding: "12px 24px",
              width: "100%",
              textAlign: "center",
              boxShadow:
                "0 0 18px rgba(255,180,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                color: "rgba(255,220,150,0.7)",
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 3,
                marginBottom: 4,
              }}
            >
              CATEGORY
            </div>
            <div
              style={{
                color: "#FFD700",
                fontSize: 20,
                fontWeight: 900,
                letterSpacing: 2,
                textShadow:
                  "0 0 14px rgba(255,210,0,0.6), 0 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              {wordObj.emoji}&nbsp;&nbsp;{wordObj.hint.toUpperCase()}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 24,
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: 140,
                animation: shake ? "shake 0.4s ease" : "none",
              }}
            >
              <HangmanSVG wrong={wrongGuesses} />
            </div>
            <div
              style={{
                flex: 1,
                minWidth: 160,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  color: "rgba(255,100,80,0.8)",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                {wrongGuesses}/{MAX_WRONG} WRONG
              </div>
              <div style={{ display: "flex", gap: 5 }}>
                {Array.from({ length: MAX_WRONG }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background:
                        i < wrongGuesses ? "#FF2400" : "rgba(255,255,255,0.15)",
                      transition: "background 0.3s",
                      boxShadow: i < wrongGuesses ? "0 0 6px #FF2400" : "none",
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  color: "rgba(255,100,80,0.7)",
                  fontSize: 13,
                  letterSpacing: 2,
                  minHeight: 20,
                }}
              >
                {[...guessed]
                  .filter((l) => !wordObj.word.replace(/ /g, "").includes(l))
                  .join(" ")}
              </div>
            </div>
          </div>

          {/* Sentence hint — revealed at 4 wrong guesses (2 chances left).
               Each ___ maps 1-to-1 with one word of the answer, shown as a
               fixed-width blank underline — purely static, no live tile updates. */}
          {wordObj.sentence &&
            wrongGuesses >= 5 &&
            !gameOver &&
            (() => {
              const answerWords = wordObj.word.split(" "); // e.g. ["CRAB","AND","DUMPLING"]
              let wordIndex = 0; // tracks which answer-word this ___ is for
              const parts = wordObj.sentence.split("___");
              return (
                <div
                  style={{
                    width: "100%",
                    borderRadius: 12,
                    padding: "12px 16px",
                    background: "rgba(255,36,0,0.1)",
                    border: "1.5px solid rgba(255,36,0,0.45)",
                    animation: "fadeInUp 0.4s ease",
                  }}
                >
                  <div
                    style={{
                      color: "rgba(255,150,120,0.8)",
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 3,
                      marginBottom: 6,
                    }}
                  >
                    🚨 LAST CHANCE HINT
                  </div>
                  <div
                    style={{
                      color: "rgba(255,220,180,0.9)",
                      fontSize: 14,
                      lineHeight: 2,
                      fontStyle: "italic",
                    }}
                  >
                    {parts.map((part, i) => {
                      const blankWord = answerWords[wordIndex];
                      if (i < parts.length - 1) wordIndex++;
                      return (
                        <span key={i}>
                          {part}
                          {blankWord && (
                            <span
                              style={{
                                display: "inline-flex",
                                gap: 2,
                                verticalAlign: "middle",
                                margin: "0 3px",
                              }}
                            >
                              {blankWord.split("").map((_, li) => (
                                <span
                                  key={li}
                                  style={{
                                    display: "inline-block",
                                    width: 13,
                                    height: 18,
                                    borderBottom: "2.5px solid #FF2400",
                                  }}
                                />
                              ))}
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

          {/* Word tiles — keyed by gameId+position so React fully remounts them on
               every new game, preventing any style bleed-over from the previous round */}
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: 4,
            }}
          >
            {wordObj.word.split(" ").map((word, wi) => (
              <div
                key={`${gameId}-${wi}`}
                style={{ display: "flex", gap: 6, flexShrink: 0 }}
              >
                {word.split("").map((letter, li) => {
                  const revealed = guessed.has(letter);
                  return (
                    <div
                      key={`${gameId}-${wi}-${li}`}
                      style={{
                        width: 32,
                        height: 44,
                        borderBottom: "3px solid #FFB400",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: revealed ? "#fff" : "transparent",
                        fontSize: 20,
                        fontWeight: 900,
                        textShadow: revealed
                          ? "0 0 10px rgba(255,180,0,0.5)"
                          : "none",
                        background: revealed
                          ? "rgba(255,180,0,0.08)"
                          : "transparent",
                        borderRadius: "4px 4px 0 0",
                      }}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {gameOver && (
            <div
              style={{
                position: "relative",
                width: "100%",
                borderRadius: 16,
                padding: "20px 24px",
                background:
                  gameOver === "win"
                    ? "rgba(0,180,80,0.15)"
                    : "rgba(255,36,0,0.15)",
                border: `2px solid ${gameOver === "win" ? "#00B450" : "#FF2400"}`,
                textAlign: "center",
                animation: "fadeInUp 0.4s ease",
              }}
            >
              {celebration && (
                <div style={{ fontSize: 32, marginBottom: 8 }}>🎉🇹🇹🎉</div>
              )}
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: gameOver === "win" ? "#00B450" : "#FF2400",
                  letterSpacing: 2,
                }}
              >
                {gameOver === "win" ? "YOU WIN, TRINI!" : "GAME OVER!"}
              </div>
              <div
                style={{
                  color: "rgba(255,220,180,0.7)",
                  marginTop: 6,
                  fontSize: 14,
                }}
              >
                The word was:{" "}
                <span style={{ color: "#FFB400", fontWeight: 900 }}>
                  {wordObj.word}
                </span>{" "}
                {wordObj.emoji}
              </div>

              {/* Daily share card */}
              {mode === "daily" &&
                (() => {
                  const today = new Date();
                  const dayNum =
                    Math.floor((today - START_DATE) / (1000 * 60 * 60 * 24)) +
                    1;
                  const wrongList = [...guessed].filter(
                    (l) => !wordObj.word.replace(/ /g, "").includes(l),
                  );
                  const squares = Array.from({ length: MAX_WRONG }, (_, i) => (
                    <span key={i} style={{ fontSize: 20 }}>
                      {i < wrongList.length
                        ? "🟥"
                        : gameOver === "win" && i === wrongList.length
                          ? "🟩"
                          : "⬛"}
                    </span>
                  ));
                  return (
                    <div
                      style={{
                        margin: "14px 0 4px",
                        background: "rgba(0,0,0,0.25)",
                        borderRadius: 10,
                        padding: "12px 16px",
                      }}
                    >
                      <div
                        style={{
                          color: "rgba(255,220,180,0.5)",
                          fontSize: 10,
                          letterSpacing: 2,
                          fontWeight: 700,
                          marginBottom: 8,
                        }}
                      >
                        DAY #{dayNum} RESULT
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 4,
                          marginBottom: 8,
                        }}
                      >
                        {squares}
                      </div>
                      <div
                        style={{ color: "rgba(255,220,180,0.7)", fontSize: 12 }}
                      >
                        {gameOver === "win"
                          ? `Solved with ${wrongList.length} wrong guess${wrongList.length !== 1 ? "es" : ""}${wrongList.length === 0 ? " — perfect! 🌟" : ""}`
                          : `Better luck tomorrow 😅`}
                      </div>
                    </div>
                  );
                })()}

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  justifyContent: "center",
                  marginTop: 16,
                  flexWrap: "wrap",
                }}
              >
                {/* Share button — daily only */}
                {mode === "daily" && (
                  <button
                    onClick={handleShare}
                    style={{
                      background: copied
                        ? "rgba(0,180,80,0.25)"
                        : "rgba(255,36,0,0.2)",
                      border: `1px solid ${copied ? "#00B450" : "#FF2400"}`,
                      color: copied ? "#00B450" : "#FF6040",
                      padding: "8px 20px",
                      borderRadius: 10,
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 700,
                      transition: "all 0.2s",
                    }}
                  >
                    {copied ? "✅ Copied!" : "📤 Share Result"}
                  </button>
                )}
                <button
                  onClick={() => startGame("random")}
                  style={{
                    background: "rgba(255,180,0,0.2)",
                    border: "1px solid #FFB400",
                    color: "#FFB400",
                    padding: "8px 20px",
                    borderRadius: 10,
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  🎲 Random Word
                </button>
                <button
                  onClick={() => setMode("menu")}
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "rgba(255,220,180,0.8)",
                    padding: "8px 20px",
                    borderRadius: 10,
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  Menu
                </button>
              </div>
            </div>
          )}

          {!gameOver && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 6,
                width: "100%",
                marginTop: 8,
              }}
            >
              {ALPHABET.map((letter) => {
                const isGuessed = guessed.has(letter);
                const isWrong = isGuessed && !wordObj.word.includes(letter);
                const isCorrect = isGuessed && wordObj.word.includes(letter);
                return (
                  <button
                    key={letter}
                    onClick={() => guess(letter)}
                    disabled={isGuessed}
                    style={{
                      width: 38,
                      height: 42,
                      borderRadius: 8,
                      border: isWrong
                        ? "1px solid rgba(255,36,0,0.3)"
                        : isCorrect
                          ? "1px solid rgba(0,180,80,0.4)"
                          : "1px solid rgba(255,180,0,0.35)",
                      background: isWrong
                        ? "rgba(255,36,0,0.12)"
                        : isCorrect
                          ? "rgba(0,180,80,0.15)"
                          : "rgba(255,180,0,0.08)",
                      color: isWrong
                        ? "rgba(255,100,80,0.4)"
                        : isCorrect
                          ? "#00B450"
                          : "#fff",
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: isGuessed ? "default" : "pointer",
                      transition: "all 0.15s ease",
                      opacity: isGuessed ? 0.5 : 1,
                      transform: isGuessed ? "scale(0.92)" : "scale(1)",
                    }}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          )}

          <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
            <button
              onClick={() => setMode("menu")}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,220,180,0.6)",
                padding: "6px 16px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              ← Menu
            </button>
            {!gameOver && (
              <button
                onClick={() => startGame("random")}
                style={{
                  background: "rgba(255,180,0,0.1)",
                  border: "1px solid rgba(255,180,0,0.3)",
                  color: "rgba(255,180,0,0.8)",
                  padding: "6px 16px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 12,
                }}
              >
                New Word
              </button>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        button:hover:not(:disabled) { opacity:0.85; transform:scale(1.04); }
      `}</style>
    </div>
  );
}

function MenuBtn({ onClick, color, label, sub }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "18px 24px",
        borderRadius: 14,
        background: `rgba(${color === "#FF2400" ? "255,36,0" : "255,180,0"},0.1)`,
        border: `1.5px solid ${color}`,
        color: "#fff",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.2s ease",
      }}
    >
      <div style={{ fontSize: 17, fontWeight: 900, color, letterSpacing: 0.5 }}>
        {label}
      </div>
      <div
        style={{ fontSize: 12, color: "rgba(255,220,180,0.55)", marginTop: 3 }}
      >
        {sub}
      </div>
    </button>
  );
}

function Stat({ label, val }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ color: "#fff", fontSize: 22, fontWeight: 900 }}>{val}</div>
      <div
        style={{
          color: "rgba(255,220,180,0.5)",
          fontSize: 10,
          letterSpacing: 0.5,
          marginTop: 2,
        }}
      >
        {label.toUpperCase()}
      </div>
    </div>
  );
}
