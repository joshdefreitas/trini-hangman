import { useState, useEffect, useCallback } from "react";

const WORDS = [
  // Trini Food
  { word: "DOUBLES", hint: "Trini Food", emoji: "🫓" },
  { word: "PHOLOURIE", hint: "Trini Food", emoji: "🍢" },
  { word: "PELAU", hint: "Trini Food", emoji: "🍚" },
  { word: "ROTI", hint: "Trini Food", emoji: "🫔" },
  { word: "BAKE", hint: "Trini Food", emoji: "🥖" },
  { word: "CHOKA", hint: "Trini Food", emoji: "🌶️" },
  { word: "ACCRA", hint: "Trini Food", emoji: "🐟" },
  { word: "SAHINA", hint: "Trini Food", emoji: "🌿" },
  { word: "ALOO PIE", hint: "Trini Food", emoji: "🥟" },
  { word: "KURMA", hint: "Trini Food", emoji: "🍬" },
  { word: "BAIGAN", hint: "Trini Food", emoji: "🍆" },
  { word: "BULJOL", hint: "Trini Food", emoji: "🐠" },
  { word: "SOUSE", hint: "Trini Food", emoji: "🍖" },
  { word: "CORN SOUP", hint: "Trini Food", emoji: "🌽" },
  { word: "CALLALOO", hint: "Trini Food", emoji: "🥬" },
  { word: "GEERA PORK", hint: "Trini Food", emoji: "🥩" },
  { word: "PASTELLE", hint: "Trini Food", emoji: "🫔" },
  { word: "POMMERAC", hint: "Trini Fruit", emoji: "🍎" },
  { word: "CHENETTE", hint: "Trini Fruit", emoji: "🍇" },
  { word: "JULIE MANGO", hint: "Trini Fruit", emoji: "🥭" },
  { word: "POMMECYTHERE", hint: "Trini Fruit", emoji: "🍑" },
  // Trini Drinks
  { word: "MAUBY", hint: "Trini Drink", emoji: "🥤" },
  { word: "SORREL", hint: "Trini Drink", emoji: "🌺" },
  { word: "PUNCH DE CREME", hint: "Trini Drink", emoji: "🥛" },
  { word: "PUNCHEON", hint: "Trini Drink", emoji: "🍶" },
  { word: "CARIB", hint: "Trini Drink", emoji: "🍺" },
  { word: "COCONUT WATER", hint: "Trini Drink", emoji: "🥥" },
  // Trini Slang
  { word: "BACCHANAL", hint: "Trini Slang", emoji: "😤" },
  { word: "MACCO", hint: "Trini Slang", emoji: "👀" },
  { word: "LIME", hint: "Trini Slang", emoji: "🎉" },
  { word: "STEUPS", hint: "Trini Slang", emoji: "😒" },
  { word: "TRINI", hint: "Trini Slang", emoji: "🇹🇹" },
  { word: "FETE", hint: "Trini Slang", emoji: "🎊" },
  { word: "LIMING", hint: "Trini Slang", emoji: "😎" },
  { word: "DOTISH", hint: "Trini Slang", emoji: "🤪" },
  { word: "MAMAGUY", hint: "Trini Slang", emoji: "😏" },
  { word: "FATIGUE", hint: "Trini Slang", emoji: "😜" },
  { word: "TABANCA", hint: "Trini Slang", emoji: "💔" },
  { word: "WOTLESS", hint: "Trini Slang", emoji: "😈" },
  { word: "MAUVAIS LANGUE", hint: "Trini Slang", emoji: "👅" },
  { word: "SKYLARKING", hint: "Trini Slang", emoji: "🛝" },
  { word: "VIBES", hint: "Trini Slang", emoji: "✨" },
  { word: "TANTIE", hint: "Trini Slang", emoji: "👩" },
  { word: "YAMPEE", hint: "Trini Slang", emoji: "😴" },
  { word: "HORNERMAN", hint: "Trini Slang", emoji: "🤘" },
  // Carnival
  { word: "WINING", hint: "Carnival Term", emoji: "💃" },
  { word: "JOUVERT", hint: "Carnival Term", emoji: "🥁" },
  { word: "MASMAN", hint: "Carnival Term", emoji: "🎭" },
  { word: "CARNIVAL", hint: "Cultural Event", emoji: "🎉" },
  { word: "CHIPPING", hint: "Carnival Term", emoji: "🚶" },
  { word: "MASQUERADE", hint: "Carnival Term", emoji: "🎭" },
  { word: "MUDMAS", hint: "Carnival Term", emoji: "🎨" },
  { word: "FETING", hint: "Carnival Term", emoji: "🥳" },
  { word: "ROADMARCH", hint: "Carnival Term", emoji: "🏆" },
  // Music
  { word: "SOCA", hint: "Music Genre", emoji: "🎵" },
  { word: "CALYPSO", hint: "Music Genre", emoji: "🎶" },
  { word: "PARANG", hint: "Music Genre", emoji: "🎸" },
  { word: "CHUTNEY", hint: "Music Genre", emoji: "🎤" },
  { word: "RAPSO", hint: "Music Genre", emoji: "🎙️" },
  { word: "STEELPAN", hint: "Cultural Item", emoji: "🥁" },
  { word: "TASSA", hint: "Cultural Item", emoji: "🪘" },
  { word: "MACHEL", hint: "Soca Artist", emoji: "🎤" },
  { word: "BUNJI GARLIN", hint: "Soca Artist", emoji: "🎤" },
  { word: "FAYE ANN", hint: "Soca Artist", emoji: "🎤" },
  { word: "SUPER BLUE", hint: "Soca Artist", emoji: "🎤" },
  { word: "DESTRA", hint: "Soca Artist", emoji: "🎤" },
  // Locations
  { word: "SAVANNAH", hint: "Trinidad Location", emoji: "🌿" },
  { word: "MAYARO", hint: "Trinidad Location", emoji: "🏖️" },
  { word: "MARACAS", hint: "Trinidad Location", emoji: "🌊" },
  { word: "CHAGUANAS", hint: "Trinidad Location", emoji: "📍" },
  { word: "LAVENTILLE", hint: "Trinidad Location", emoji: "🏘️" },
  { word: "TOBAGO", hint: "Trinidad Location", emoji: "🏝️" },
  { word: "SAN FERNANDO", hint: "Trinidad Location", emoji: "🏙️" },
  { word: "ARIMA", hint: "Trinidad Location", emoji: "📍" },
  { word: "SANGRE GRANDE", hint: "Trinidad Location", emoji: "📍" },
  { word: "COUVA", hint: "Trinidad Location", emoji: "📍" },
  { word: "SCARBOROUGH", hint: "Tobago Location", emoji: "🏖️" },
  { word: "PIGEON POINT", hint: "Tobago Location", emoji: "🏖️" },
  { word: "CROWN POINT", hint: "Tobago Location", emoji: "✈️" },
  { word: "GASPAREE", hint: "Trinidad Location", emoji: "🏝️" },
  { word: "CEDROS", hint: "Trinidad Location", emoji: "⛵" },
  // Culture & History
  { word: "OBEAH", hint: "Cultural Item", emoji: "🔮" },
  { word: "HOSAY", hint: "Cultural Event", emoji: "🕌" },
  { word: "DIVALI", hint: "Cultural Event", emoji: "🪔" },
  { word: "EMANCIPATION", hint: "Cultural Event", emoji: "✊" },
  { word: "PHAGWA", hint: "Cultural Event", emoji: "🎨" },
  { word: "TRINBAGO", hint: "Cultural Term", emoji: "🇹🇹" },
  { word: "HUMMING BIRD", hint: "National Symbol", emoji: "🐦" },
  { word: "CHACONIA", hint: "National Symbol", emoji: "🌺" },
  // More Trini Food
  { word: "DHAL", hint: "Trini Food", emoji: "🍲" },
  { word: "BUSS UP SHUT", hint: "Trini Food", emoji: "🫔" },
  { word: "SHARK AND BAKE", hint: "Trini Food", emoji: "🦈" },
  { word: "CRAB AND DUMPLING", hint: "Trini Food", emoji: "🦀" },
  { word: "BLACK PUDDING", hint: "Trini Food", emoji: "🩸" },
  { word: "PONE", hint: "Trini Food", emoji: "🍮" },
  { word: "TOOLUM", hint: "Trini Food", emoji: "🍬" },
  { word: "TAMARIND BALLS", hint: "Trini Food", emoji: "🍡" },
  { word: "SUGAR CAKE", hint: "Trini Food", emoji: "🍭" },
  { word: "CHIP CHIP", hint: "Trini Food", emoji: "🐚" },
  { word: "OILDOWN", hint: "Tobago Food", emoji: "🍲" },
  { word: "PROVISIONS", hint: "Trini Food", emoji: "🥔" },
  { word: "BHAJI", hint: "Trini Food", emoji: "🌿" },
  { word: "EDDOE", hint: "Trini Food", emoji: "🥔" },
  { word: "DASHEEN", hint: "Trini Food", emoji: "🌱" },
  // More Trini Fruits
  { word: "STARCHEE", hint: "Trini Fruit", emoji: "⭐" },
  { word: "FIVE FINGER", hint: "Trini Fruit", emoji: "✋" },
  { word: "GOLDEN APPLE", hint: "Trini Fruit", emoji: "🍏" },
  { word: "SAPODILLA", hint: "Trini Fruit", emoji: "🟤" },
  { word: "PAWA", hint: "Trini Fruit", emoji: "🍈" },
  { word: "COCORITE", hint: "Trini Fruit", emoji: "🌴" },
  // More Drinks
  { word: "GINGER BEER", hint: "Trini Drink", emoji: "🍺" },
  { word: "SEA MOSS", hint: "Trini Drink", emoji: "🌊" },
  { word: "BUSH TEA", hint: "Trini Drink", emoji: "🍵" },
  // More Slang
  { word: "BOLDFACE", hint: "Trini Slang", emoji: "😤" },
  { word: "SAGA BOY", hint: "Trini Slang", emoji: "🕺" },
  { word: "OLE TALK", hint: "Trini Slang", emoji: "💬" },
  { word: "SWEET MAN", hint: "Trini Slang", emoji: "😍" },
  { word: "JAMETTE", hint: "Trini Slang", emoji: "💅" },
  { word: "GYUL", hint: "Trini Slang", emoji: "👧" },
  { word: "PARDNER", hint: "Trini Slang", emoji: "🤝" },
  { word: "BREDS", hint: "Trini Slang", emoji: "👊" },
  { word: "PRESSURE", hint: "Trini Slang", emoji: "😰" },
  { word: "HORNER", hint: "Trini Slang", emoji: "🤫" },
  { word: "BLAG", hint: "Trini Slang", emoji: "🎭" },
  { word: "MAUVAISE", hint: "Trini Slang", emoji: "😠" },
  { word: "BOOF", hint: "Trini Slang", emoji: "😵" },
  { word: "FARSE", hint: "Trini Slang", emoji: "🫣" },
  { word: "GOUTI", hint: "Trini Slang", emoji: "🐀" },
  // More Carnival
  { word: "BAND LAUNCH", hint: "Carnival Term", emoji: "🎉" },
  { word: "FETE SEASON", hint: "Carnival Term", emoji: "📅" },
  { word: "KING AND QUEEN", hint: "Carnival Term", emoji: "👑" },
  { word: "PAN YARD", hint: "Carnival Term", emoji: "🥁" },
  { word: "FANCY MAS", hint: "Carnival Term", emoji: "🪆" },
  { word: "BLUE DEVIL", hint: "Carnival Term", emoji: "😈" },
  { word: "MOKO JUMBIE", hint: "Carnival Term", emoji: "🦺" },
  { word: "MIDNIGHT ROBBER", hint: "Carnival Term", emoji: "🤠" },
  { word: "DAME LORRAINE", hint: "Carnival Term", emoji: "👗" },
  { word: "JAB JABS", hint: "Carnival Term", emoji: "😈" },
  // More Music
  { word: "SHADOW", hint: "Calypso Artist", emoji: "🎤" },
  { word: "SPARROW", hint: "Calypso Artist", emoji: "🐦" },
  { word: "KITCHENER", hint: "Calypso Artist", emoji: "🎶" },
  { word: "BARON", hint: "Soca Artist", emoji: "🎤" },
  { word: "IWER GEORGE", hint: "Soca Artist", emoji: "🎤" },
  { word: "RIKKI JAI", hint: "Chutney Artist", emoji: "🎤" },
  { word: "DRUPATEE", hint: "Chutney Artist", emoji: "🎤" },
  // More Locations
  { word: "ICACOS", hint: "Trinidad Location", emoji: "⛵" },
  { word: "TOCO", hint: "Trinidad Location", emoji: "🏖️" },
  { word: "BLANCHISSEUSE", hint: "Trinidad Location", emoji: "🌊" },
  { word: "LOPINOT", hint: "Trinidad Location", emoji: "🌿" },
  { word: "POINTE A PIERRE", hint: "Trinidad Location", emoji: "⚓" },
  { word: "FYZABAD", hint: "Trinidad Location", emoji: "📍" },
  { word: "PENAL", hint: "Trinidad Location", emoji: "📍" },
  { word: "PRINCES TOWN", hint: "Trinidad Location", emoji: "📍" },
  { word: "MORUGA", hint: "Trinidad Location", emoji: "🌶️" },
  { word: "BUCCOO REEF", hint: "Tobago Location", emoji: "🐠" },
  { word: "NYLON POOL", hint: "Tobago Location", emoji: "🏊" },
  { word: "SPEYSIDE", hint: "Tobago Location", emoji: "🤿" },
  { word: "CHARLOTTEVILLE", hint: "Tobago Location", emoji: "🏘️" },
  // More Culture
  { word: "PITCH LAKE", hint: "Trinidad Landmark", emoji: "🖤" },
  { word: "ASA WRIGHT", hint: "Trinidad Landmark", emoji: "🦜" },
  { word: "NAPARIMA BOWL", hint: "Trinidad Landmark", emoji: "🎭" },
  { word: "QUEENS PARK OVAL", hint: "Trinidad Landmark", emoji: "🏏" },
  { word: "BRIAN LARA", hint: "Trini Legend", emoji: "🏏" },
  { word: "HASELY CRAWFORD", hint: "Trini Legend", emoji: "🏃" },
  { word: "WENDY FITZWILLIAM", hint: "Trini Legend", emoji: "👑" },
  { word: "NICKI MINAJ", hint: "Trini Legend", emoji: "🎤" },
  { word: "TRINIDAD AND TOBAGO", hint: "National Identity", emoji: "🇹🇹" },
  { word: "PORT OF SPAIN", hint: "Trinidad Location", emoji: "🏙️" },
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
          paddingTop: 24,
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: 2,
            color: "#FF2400",
            textShadow: "0 0 20px rgba(255,36,0,0.5),2px 2px 0 #000",
          }}
        >
          🇹🇹 TRINI HANGMAN
        </div>
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
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  justifyContent: "center",
                  marginTop: 16,
                }}
              >
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
                  🎲 New Word
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
