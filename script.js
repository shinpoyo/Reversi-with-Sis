/* =========================================================
   High-Quality Multi-Layer Web Audio Synthesizer
   ========================================================= */
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playSound(type, stepIndex = 0) {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;

  const now = audioCtx.currentTime;

  if (type === 'place') {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(65, now + 0.065);
    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.075);

    const clickOsc = audioCtx.createOscillator();
    const clickGain = audioCtx.createGain();
    clickOsc.type = 'sine';
    clickOsc.frequency.setValueAtTime(1600, now);
    clickOsc.frequency.exponentialRampToValueAtTime(400, now + 0.02);
    clickGain.gain.setValueAtTime(0.2, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);
    clickOsc.connect(clickGain);
    clickGain.connect(audioCtx.destination);
    clickOsc.start(now);
    clickOsc.stop(now + 0.025);

  } else if (type === 'flip') {
    const baseFreq = 420 + Math.min(stepIndex, 10) * 45;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, now + 0.055);
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.065);

  } else if (type === 'corner') {
    const sub = audioCtx.createOscillator();
    const subGain = audioCtx.createGain();
    sub.type = 'sawtooth';
    sub.frequency.setValueAtTime(180, now);
    sub.frequency.exponentialRampToValueAtTime(38, now + 0.38);
    subGain.gain.setValueAtTime(0.55, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    sub.connect(subGain);
    subGain.connect(audioCtx.destination);
    sub.start(now);
    sub.stop(now + 0.42);

    [220, 277.18, 329.63].forEach(freq => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'triangle';
      o.frequency.setValueAtTime(freq, now);
      g.gain.setValueAtTime(0.2, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      o.connect(g);
      g.connect(audioCtx.destination);
      o.start(now);
      o.stop(now + 0.36);
    });

  } else if (type === 'cutin') {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.14);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.28);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.32);

  } else if (type === 'anger_spike') {
    [311.13, 329.63, 466.16].forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + i * 0.04);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.85, now + i * 0.04 + 0.22);
      gain.gain.setValueAtTime(0.22, now + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.24);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.25);
    });

  } else if (type === 'heartbeat') {
    [0, 0.16].forEach((offset, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(idx === 0 ? 75 : 65, now + offset);
      osc.frequency.exponentialRampToValueAtTime(28, now + offset + 0.14);
      gain.gain.setValueAtTime(idx === 0 ? 0.45 : 0.35, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.16);
    });

  } else if (type === 'tea') {
    [523.25, 659.25, 783.99, 987.77, 1046.50].forEach((f, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + i * 0.065);
      gain.gain.setValueAtTime(0.22, now + i * 0.065);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.065 + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + i * 0.065);
      osc.stop(now + i * 0.065 + 0.38);
    });

  } else if (type === 'crash') {
    const bufferSize = audioCtx.sampleRate * 1.1;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (audioCtx.sampleRate * 0.32));
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.frequency.exponentialRampToValueAtTime(220, now + 1.0);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.95, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 1.05);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    noise.start(now);

    const boom = audioCtx.createOscillator();
    const boomGain = audioCtx.createGain();
    boom.type = 'sawtooth';
    boom.frequency.setValueAtTime(140, now);
    boom.frequency.exponentialRampToValueAtTime(25, now + 0.7);
    boomGain.gain.setValueAtTime(0.8, now);
    boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
    boom.connect(boomGain);
    boomGain.connect(audioCtx.destination);
    boom.start(now);
    boom.stop(now + 0.78);

    for (let k = 0; k < 10; k++) {
      const delay = 0.15 + Math.random() * 0.75;
      const clack = audioCtx.createOscillator();
      const cGain = audioCtx.createGain();
      clack.type = 'triangle';
      clack.frequency.setValueAtTime(600 + Math.random() * 900, now + delay);
      clack.frequency.exponentialRampToValueAtTime(180, now + delay + 0.04);
      cGain.gain.setValueAtTime(0.18, now + delay);
      cGain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.045);
      clack.connect(cGain);
      cGain.connect(audioCtx.destination);
      clack.start(now + delay);
      clack.stop(now + delay + 0.05);
    }

  } else if (type === 'fanfare') {
    const notes = [
      { f: 523.25, t: 0.0, d: 0.14 },
      { f: 523.25, t: 0.15, d: 0.14 },
      { f: 523.25, t: 0.30, d: 0.14 },
      { f: 659.25, t: 0.45, d: 0.35 },
      { f: 587.33, t: 0.82, d: 0.18 },
      { f: 659.25, t: 1.02, d: 0.18 },
      { f: 783.99, t: 1.22, d: 0.65 }
    ];
    notes.forEach(n => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'triangle';
      o.frequency.setValueAtTime(n.f, now + n.t);
      g.gain.setValueAtTime(0.3, now + n.t);
      g.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
      o.connect(g);
      g.connect(audioCtx.destination);
      o.start(now + n.t);
      o.stop(now + n.t + n.d + 0.02);
    });
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  document.getElementById('soundBtn').textContent = soundEnabled ? '🔊 音: ON' : '🔈 音: OFF';
}

/* =========================================================
   8x8 Full Othello Game State & Stages
   ========================================================= */
const EMPTY = 0;
const BLACK = 1; // 弟
const WHITE = 2; // 姉

const DIRS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1]
];

const STAGES = {
  easy: {
    initAnger: 10,
    angerMult: 0.8,
    openingSpeech: "「おやつ前のオセロね！ふふん、余裕で勝っちゃうわよ〜♪」",
    openingThought: "「おやつ前で姉ちゃんはご機嫌だ。焦らず丁寧に接待すれば勝てるぞ！」"
  },
  normal: {
    initAnger: 20,
    angerMult: 1.0,
    openingSpeech: "「手加減なしよ！コテンパンにしてあげる！」",
    openingThought: "「勝つのは簡単だ……だが怒らせたら盤が飛ぶ。ギリギリの接戦を演出するんだ！」"
  },
  hard: {
    initAnger: 50,
    angerMult: 1.25,
    openingSpeech: "「テスト勉強でイライラしてんだから、変な打ち方したら承知しないわよ！」",
    openingThought: "「最初からイライラ度50%！？お茶と褒め言葉をフル活用しないと即座に盤が飛ぶぞ……！」"
  }
};

let currentStage = 'normal';
let board = [];
let currentTurn = BLACK;
let angerLevel = 20;
let isGameOver = false;
let isAiThinking = false;
let commandLimits = { tea: 2, praise: 2, hesitate: 3 };

function changeStage() {
  currentStage = document.getElementById('stageSelect').value;
  resetGame();
}

function initGame() {
  const st = STAGES[currentStage];
  board = Array(8).fill(null).map(() => Array(8).fill(EMPTY));
  board[3][3] = WHITE;
  board[3][4] = BLACK;
  board[4][3] = BLACK;
  board[4][4] = WHITE;

  currentTurn = BLACK;
  angerLevel = st.initAnger;
  isGameOver = false;
  isAiThinking = false;

  commandLimits = { tea: 2, praise: 2, hesitate: 3 };

  updateCommandUI();
  renderBoard();
  updateScores();
  updateAngerUI();
  updateTurnIndicator();

  setSisterSpeech(st.openingSpeech);
  setBrotherThought(st.openingThought);
  document.getElementById('movePreviewBar').textContent = IS_TOUCH
    ? '💡 光っているマスを1回タップすると「返る枚数と怒り予測」が出ます。もう1回タップで打ちます'
    : '💡 光っているマスにカーソルを合わせると「返る枚数と怒り予測」が表示されます';
}

function resetGame() {
  document.getElementById('boardContainer').classList.remove('table-flip-active');
  document.getElementById('mangaModal').style.display = 'none';
  initGame();
}

function closeModalAndReset() {
  document.getElementById('mangaModal').style.display = 'none';
  resetGame();
}

function isValidCoord(r, c) {
  return r >= 0 && r < 8 && c >= 0 && c < 8;
}

function isCorner(r, c) {
  return (r === 0 || r === 7) && (c === 0 || c === 7);
}

function getFlips(r, c, player) {
  if (board[r][c] !== EMPTY) return [];
  const opponent = player === BLACK ? WHITE : BLACK;
  const flips = [];

  for (const [dr, dc] of DIRS) {
    let nr = r + dr;
    let nc = c + dc;
    const line = [];

    while (isValidCoord(nr, nc) && board[nr][nc] === opponent) {
      line.push([nr, nc]);
      nr += dr;
      nc += dc;
    }

    if (line.length > 0 && isValidCoord(nr, nc) && board[nr][nc] === player) {
      flips.push(...line);
    }
  }

  return flips;
}

function getValidMoves(player) {
  const moves = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const flips = getFlips(r, c, player);
      if (flips.length > 0) moves.push({ r, c, flips });
    }
  }
  return moves;
}

function getCounts() {
  let b = 0, w = 0;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c] === BLACK) b++;
      if (board[r][c] === WHITE) w++;
    }
  }
  return { b, w, total: b + w };
}

/* =========================================================
   Anger Calculation with Endgame Losing Multiplier
   ========================================================= */
function calculateMoveAngerDelta(r, c, flipCount) {
  const mult = STAGES[currentStage].angerMult;
  const { b, w, total } = getCounts();
  const afterB = b + 1 + flipCount;
  const afterW = w - flipCount;
  const lead = afterB - afterW;

  let base = flipCount <= 2 ? 3 : (flipCount <= 4 ? 8 : 16);
  if (isCorner(r, c)) {
    base += 25;
  }

  let endgameFactor = 1.0;
  let leadPenalty = 0;

  if (total >= 44 && lead > 0) {
    endgameFactor = 1.6;
    if (lead >= 6) leadPenalty = 6;
    if (lead >= 14) leadPenalty = 11;
  } else if (total >= 32 && lead > 4) {
    endgameFactor = 1.3;
    if (lead >= 10) leadPenalty = 5;
  }

  return Math.round((base * endgameFactor + leadPenalty) * mult);
}

function isSisterInEndgameCrisis() {
  const { b, w, total } = getCounts();
  return total >= 38 && b > w;
}

/* =========================================================
   Rendering & Manga Visuals
   ========================================================= */
// タッチ端末にはマウスを乗せる操作がないので、1回目のタップで「返る枚数と怒り予測」を出し、
// 同じマスをもう一度タップしたときに打つ（マウスはこれまでどおり1クリックで打つ）
const IS_TOUCH = window.matchMedia('(hover: none)').matches;
let pendingKey = null;

function onCellTap(cell, r, c, flipCount) {
  if (!IS_TOUCH) { handlePlayerMove(r, c); return; }
  const key = `${r},${c}`;
  if (pendingKey === key) { pendingKey = null; handlePlayerMove(r, c); return; }
  pendingKey = key;
  document.querySelectorAll('.cell.pending').forEach(el => el.classList.remove('pending'));
  cell.classList.add('pending');
  showMovePreview(r, c, flipCount);
}

function renderBoard() {
  pendingKey = null;
  const grid = document.getElementById('othelloGrid');
  grid.innerHTML = '';

  const validMoves = (currentTurn === BLACK && !isGameOver && !isAiThinking) ? getValidMoves(BLACK) : [];
  const validMap = new Map(validMoves.map(m => [`${m.r},${m.c}`, m.flips]));

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.r = r;
      cell.dataset.c = c;

      const key = `${r},${c}`;
      if (validMap.has(key)) {
        const flips = validMap.get(key);
        cell.classList.add('valid-move');
        cell.onmouseenter = () => showMovePreview(r, c, flips.length);
        cell.onclick = () => onCellTap(cell, r, c, flips.length);
      }

      if (board[r][c] !== EMPTY) {
        const disc = document.createElement('div');
        disc.className = `disc ${board[r][c] === BLACK ? 'black' : 'white'}`;
        cell.appendChild(disc);
      }

      grid.appendChild(cell);
    }
  }
}

function showMovePreview(r, c, flipCount) {
  if (isGameOver || isAiThinking || currentTurn !== BLACK) return;
  const estDelta = calculateMoveAngerDelta(r, c, flipCount);
  const nextAnger = Math.min(100, angerLevel + estDelta);
  const colName = 'ABCDEFGH'[c] + (r + 1);
  const cornerWarn = isCorner(r, c) ? ' 【⚠️角取り！】' : '';
  const crisisWarn = isSisterInEndgameCrisis() ? ' (🔥終盤劣勢ブースト中)' : '';
  const fatalWarn = nextAnger >= 100 ? ' 💀ちゃぶ台返し確定！！' : '';

  document.getElementById('movePreviewBar').textContent =
    `📍 [${colName}] ${flipCount}枚反転 → 予想イライラ +${estDelta}% (計${nextAnger}%)${cornerWarn}${crisisWarn}${fatalWarn}`;
}

function spawnOnomatopoeia(x, y, text) {
  const elem = document.createElement('div');
  elem.className = 'onomato-popup';
  elem.textContent = text;
  elem.style.left = `${x}px`;
  elem.style.top = `${y}px`;
  elem.style.setProperty('--rot', `${(Math.random() * 30 - 15)}deg`);
  document.body.appendChild(elem);
  setTimeout(() => elem.remove(), 850);
}

function showAnimeCutin(faceKey, text) {
  playSound('cutin');
  const banner = document.getElementById('animeCutinBanner');
  const sprite = document.getElementById('cutinBannerSprite');
  const txt = document.getElementById('cutinBannerText');

  sprite.className = `sister-sprite ${faceKey} cutin-banner-sprite`;
  txt.textContent = text;
  banner.style.display = 'none';
  void banner.offsetWidth;
  banner.style.display = 'flex';
  setTimeout(() => {
    banner.style.display = 'none';
  }, 1050);
}

/* =========================================================
   Move Execution
   ========================================================= */
function executeMove(r, c, player, flips, callback) {
  board[r][c] = player;
  playSound(isCorner(r, c) ? 'corner' : 'place');

  const cellIdx = r * 8 + c;
  const cell = document.getElementById('othelloGrid').children[cellIdx];
  cell.innerHTML = '';
  const newDisc = document.createElement('div');
  newDisc.className = `disc ${player === BLACK ? 'black' : 'white'}`;
  cell.appendChild(newDisc);

  const rect = cell.getBoundingClientRect();
  const sounds = player === BLACK ? ['バシィッ！', 'ズバァッ！', 'ドォン！'] : ['パシッ！', 'フフッ！', 'カチャッ！'];
  spawnOnomatopoeia(
    rect.left + rect.width / 2,
    rect.top + rect.height / 2,
    isCorner(r, c) ? 'ドゴォォォン！！' : sounds[Math.floor(Math.random() * sounds.length)]
  );

  flips.forEach(([fr, fc], i) => {
    board[fr][fc] = player;
    setTimeout(() => {
      const fCell = document.getElementById('othelloGrid').children[fr * 8 + fc];
      const d = fCell.querySelector('.disc');
      if (d) {
        d.className = `disc ${player === BLACK ? 'black' : 'white'} flip-anim`;
        playSound('flip', i);
      }
    }, (i + 1) * 65);
  });

  const delay = (flips.length + 1) * 65 + 120;
  setTimeout(() => {
    updateScores();
    updateAngerUI();
    if (callback) callback();
  }, delay);
}

/* =========================================================
   Player & Sister AI Turn Flow
   ========================================================= */
function handlePlayerMove(r, c) {
  if (isGameOver || isAiThinking || currentTurn !== BLACK) return;

  const flips = getFlips(r, c, BLACK);
  if (flips.length === 0) return;

  isAiThinking = true;

  const prevAnger = angerLevel;
  const delta = calculateMoveAngerDelta(r, c, flips.length);
  const inCrisis = isSisterInEndgameCrisis();

  if (isCorner(r, c)) {
    setSisterSpeech("「あーーーっ！！そこ角じゃん！！ズルい！！！」");
    setBrotherThought("「うわっ、角を取ってしまった！姉ちゃんの殺気がヤバい……！」");
    showAnimeCutin('face_furious', '「そこ私の角だったのにーーっ！！」');
  } else if (angerLevel + delta >= 90 && prevAnger < 90) {
    setSisterSpeech("「……次取ったら、どうなるか分かってるわよね？」");
    setBrotherThought("「手が震えている……あと1回でも刺激したらちゃぶ台が飛ぶぞ！！」");
    showAnimeCutin('face_furious', '「次取ったら許さないからね……！！」');
  } else if (inCrisis && delta >= 10) {
    playSound('anger_spike');
    setSisterSpeech("「ちょっと待ってよ……！このままじゃ私、負けるじゃん！！ムカつく！！」");
    setBrotherThought("「終盤で負けそうになってるから、1手ごとのイライラ上昇が激しいぞ……！」");
    if (angerLevel + delta >= 70 && prevAnger < 70) {
      showAnimeCutin('face_annoyed', '「このまま負けるとか絶対ヤダ！！」');
    }
  } else if (angerLevel + delta >= 70 && prevAnger < 70) {
    setSisterSpeech("「……ねえ、それ本気で打ったの？怒るよ？」");
    setBrotherThought("「まずい、青筋が立った！そろそろお茶か褒め言葉でなだめよう。」");
    showAnimeCutin('face_annoyed', '「ちょっと！調子乗ってない！？」');
  } else {
    setSisterSpeech("「むっ……やるじゃない。でも負けないわよ！」");
    setBrotherThought("「よし、このペースなら機嫌を保ちつつ接戦に持ち込める！」");
  }

  changeAnger(delta);

  if (angerLevel >= 100) {
    executeMove(r, c, BLACK, flips, () => {
      triggerTableFlip();
    });
    return;
  }

  executeMove(r, c, BLACK, flips, () => {
    currentTurn = WHITE;
    updateTurnIndicator();
    renderBoard();

    const aiMoves = getValidMoves(WHITE);
    if (aiMoves.length === 0) {
      if (getValidMoves(BLACK).length === 0) {
        isAiThinking = false;
        endGame();
        return;
      }

      setTimeout(() => {
        const passAnger = Math.round(18 * STAGES[currentStage].angerMult);
        playSound('anger_spike');
        changeAnger(passAnger);

        const boardRect = document.getElementById('boardContainer').getBoundingClientRect();
        spawnOnomatopoeia(boardRect.left + boardRect.width / 2, boardRect.top + boardRect.height / 2, 'ピキィィッ！！');

        setSisterSpeech(`「むきーーっ！！置ける場所がないじゃない！！アンタわざと封じたでしょ！？（怒り+${passAnger}%）」`);
        setBrotherThought("「うわっ、姉ちゃんをパスさせてしまった！打てる場所がないとめちゃくちゃ機嫌が悪くなるぞ！」");
        showAnimeCutin(angerLevel >= 85 ? 'face_furious' : 'face_annoyed', '「置ける場所ないじゃん！ズルい！！」');

        if (angerLevel >= 100) {
          setTimeout(triggerTableFlip, 650);
          return;
        }

        currentTurn = BLACK;
        isAiThinking = false;
        updateTurnIndicator();
        renderBoard();
      }, 850);
    } else {
      setTimeout(handleSisterTurn, 700);
    }
  });
}

function handleSisterTurn() {
  if (isGameOver) return;

  const validMoves = getValidMoves(WHITE);
  if (validMoves.length === 0) {
    currentTurn = BLACK;
    isAiThinking = false;
    updateTurnIndicator();
    renderBoard();
    return;
  }

  let best = null;
  const isDangerSquare = (r, c) => (r <= 1 || r >= 6) && (c <= 1 || c >= 6) && !isCorner(r, c);

  if (Math.random() < 0.35) {
    best = validMoves[Math.floor(Math.random() * validMoves.length)];
  } else {
    let maxFlips = -1;
    for (const m of validMoves) {
      const score = m.flips.length + Math.random() * 0.9;
      if (score > maxFlips) {
        maxFlips = score;
        best = m;
      }
    }
  }

  let delta = 0;
  if (isCorner(best.r, best.c)) {
    delta -= 22;
    setSisterSpeech("「あ、なんか角空いてたからラッキー♪ 私の勝ち確定ね！」");
    setBrotherThought("「わざと空けておいた角に飛びついた！これで姉ちゃんの機嫌はバッチリだ！」");
    showAnimeCutin('face_happy', '「ラッキー♪ 角もらっちゃった！」');
  } else if (best.flips.length >= 3) {
    delta -= 10;
    setSisterSpeech(`「キャハハ！一気に${best.flips.length}枚も取れた！私って天才かも♪」`);
    setBrotherThought("「目先の枚数に飛びついて大喜びしている……定石無視だけど機嫌が直ったからヨシ！」");
  } else if (isDangerSquare(best.r, best.c)) {
    delta -= 4;
    setSisterSpeech("「んー、よく分かんないけどなんとなくココでいっか！」");
    setBrotherThought("「うわっ、そこは角を取られちゃう大悪手なのに……でも僕が角を取ったら絶対キレるぞ、どうする！？」");
  } else {
    delta -= 3;
    setSisterSpeech("「んー、とりあえずココね！どう？参った？」");
    setBrotherThought("「かなり適当に打っている……普通に打てば圧勝しちゃうから手加減しないと！」");
  }

  changeAnger(delta);

  executeMove(best.r, best.c, WHITE, best.flips, () => {
    const pMoves = getValidMoves(BLACK);
    if (pMoves.length === 0) {
      const nextAi = getValidMoves(WHITE);
      if (nextAi.length === 0) {
        isAiThinking = false;
        endGame();
        return;
      }
      currentTurn = WHITE;
      isAiThinking = true;
      changeAnger(-10);
      updateTurnIndicator();
      renderBoard();
      setTimeout(() => {
        setSisterSpeech("「アハハ！アンタ置ける場所ないのー？じゃあ私の連続ターンね♪」");
        setBrotherThought("「僕がパスになってしまった！でも姉ちゃんは連続で打ててご機嫌だ……！」");
        setTimeout(handleSisterTurn, 850);
      }, 700);
    } else {
      currentTurn = BLACK;
      isAiThinking = false;
      updateTurnIndicator();
      renderBoard();
      if (angerLevel >= 85) {
        playSound('heartbeat');
      }
    }
  });
}

/* =========================================================
   Hospitality Commands
   ========================================================= */
function useCommand(type) {
  if (isGameOver || isAiThinking || currentTurn !== BLACK) return;
  if (commandLimits[type] <= 0) return;

  commandLimits[type]--;
  updateCommandUI();

  if (type === 'tea') {
    playSound('tea');
    changeAnger(-25);
    setSisterSpeech("「お茶？……冷たくて美味しいじゃない。気が利くわね。」");
    setBrotherThought("「冷たい麦茶でクールダウン成功！だが僕のターンはスキップだ。」");
    showAnimeCutin('face_happy', '「ま、まあ許してあげるわ♪」');

    isAiThinking = true;
    currentTurn = WHITE;
    updateTurnIndicator();
    renderBoard();

    setTimeout(() => {
      const moves = getValidMoves(WHITE);
      if (moves.length > 0) {
        handleSisterTurn();
      } else {
        isAiThinking = false;
        currentTurn = BLACK;
        updateTurnIndicator();
        renderBoard();
      }
    }, 1000);

  } else if (type === 'praise') {
    playSound('tea');
    changeAnger(-15);
    setSisterSpeech("「え？私強い？……当たり前でしょ、お姉ちゃんなんだから！」");
    setBrotherThought("「ベタ褒め作戦成功！鼻が高くなってご機嫌になったぞ。」");
    showAnimeCutin('face_happy', '「ふふん、もっと褒めなさい♪」');
  } else if (type === 'hesitate') {
    playSound('place');
    changeAnger(-8);
    setSisterSpeech("「ふふっ、悩んでる悩んでる！どう打っても私の勝ちよ！」");
    setBrotherThought("「悩むフリをして油断させた……姉ちゃんの優越感をくすぐるんだ。」");
  }
}

function updateCommandUI() {
  document.getElementById('teaCount').textContent = commandLimits.tea;
  document.getElementById('btnTea').disabled = commandLimits.tea <= 0 || currentTurn !== BLACK || isAiThinking || isGameOver;

  document.getElementById('praiseCount').textContent = commandLimits.praise;
  document.getElementById('btnPraise').disabled = commandLimits.praise <= 0 || currentTurn !== BLACK || isAiThinking || isGameOver;

  document.getElementById('hesitateCount').textContent = commandLimits.hesitate;
  document.getElementById('btnHesitate').disabled = commandLimits.hesitate <= 0 || currentTurn !== BLACK || isAiThinking || isGameOver;
}

/* =========================================================
   Anger & External Sprite Switching
   ========================================================= */
function changeAnger(delta) {
  angerLevel = Math.max(0, Math.min(100, angerLevel + delta));
  updateAngerUI();
}

function updateAngerUI() {
  const bar = document.getElementById('angerBar');
  const txt = document.getElementById('angerText');
  const sprite = document.getElementById('sisterSprite');
  const moodTag = document.getElementById('moodTag');
  const panel = document.getElementById('panelSister');
  const crisisBadge = document.getElementById('crisisBadge');

  bar.style.width = `${angerLevel}%`;
  txt.textContent = `${angerLevel}%`;

  const crisis = isSisterInEndgameCrisis();
  crisisBadge.style.display = crisis ? 'inline-block' : 'none';
  panel.classList.toggle('endgame-crisis', crisis);
  panel.classList.remove('danger-shake');

  if (angerLevel < 40) {
    bar.style.backgroundColor = '#4caf50';
    sprite.className = 'sister-sprite face_happy';
    moodTag.textContent = '余裕・ご機嫌';
    moodTag.style.background = 'rgba(46, 125, 50, 0.85)';
  } else if (angerLevel < 70) {
    bar.style.backgroundColor = '#ff9800';
    sprite.className = 'sister-sprite face_neutral';
    moodTag.textContent = 'ジト目・警戒';
    moodTag.style.background = 'rgba(230, 81, 0, 0.85)';
  } else if (angerLevel < 90) {
    bar.style.backgroundColor = '#f44336';
    sprite.className = 'sister-sprite face_annoyed';
    moodTag.textContent = '青筋・イライラ';
    moodTag.style.background = 'rgba(198, 40, 40, 0.9)';
  } else {
    bar.style.backgroundColor = '#b71c1c';
    sprite.className = 'sister-sprite face_furious';
    moodTag.textContent = '爆発寸前！！';
    moodTag.style.background = '#b71c1c';
    panel.classList.add('danger-shake');
  }
}

function setSisterSpeech(t) {
  document.getElementById('speechBalloon').textContent = t;
}

function setBrotherThought(t) {
  document.getElementById('thoughtText').textContent = t;
}

function updateScores() {
  const { b, w } = getCounts();
  document.getElementById('blackScore').textContent = b;
  document.getElementById('whiteScore').textContent = w;
}

function updateTurnIndicator() {
  const tag = document.getElementById('turnTag');
  if (isGameOver) {
    tag.textContent = '終局！';
    tag.className = 'turn-tag';
  } else if (currentTurn === BLACK) {
    tag.textContent = 'あなたの番 (黒)';
    tag.className = 'turn-tag';
  } else {
    tag.textContent = '姉ちゃんの番 (白)';
    tag.className = 'turn-tag sister-thinking';
  }
  updateCommandUI();
}

/* =========================================================
   Table Flip Catastrophe with External Scene Image
   ========================================================= */
function triggerTableFlip() {
  isGameOver = true;
  playSound('corner');

  setSisterSpeech("「もうやんない！！！！！！ふざけんなーーッ！！」");
  document.getElementById('sisterSprite').className = 'sister-sprite face_furious';

  const boardEl = document.getElementById('boardContainer');

  setTimeout(() => {
    playSound('crash');
    boardEl.classList.add('table-flip-active');

    const rect = boardEl.getBoundingClientRect();
    for (let i = 0; i < 24; i++) {
      const p = document.createElement('div');
      p.className = `flying-particle ${i % 2 === 0 ? 'mini-black' : 'mini-white'}`;
      p.style.left = `${rect.left + rect.width / 2}px`;
      p.style.top = `${rect.top + rect.height / 2}px`;
      const a = Math.random() * Math.PI * 2;
      const d = 300 + Math.random() * 420;
      p.style.setProperty('--tx', `${Math.cos(a) * d}px`);
      p.style.setProperty('--ty', `${Math.sin(a) * d - 200}px`);
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1200);
    }
  }, 300);

  setTimeout(() => {
    showModal({
      shout: 'ドォォォォン！！',
      isScene: true,
      faceKey: 'face_furious',
      balloon: '「もうやんない！！オセロなんて大嫌い！！」',
      score: '💥【ちゃぶ台返し発動 (GAME OVER)】',
      desc: '姉ちゃんのイライラ度が100%を突破し、オセロ盤が和室の宙へと豪快に舞い上がりました！怒らせすぎずにギリギリで勝つのが真の弟の道です……！'
    });
  }, 1500);
}

/* =========================================================
   Game Over Endings
   ========================================================= */
function endGame() {
  if (isGameOver) return;
  isGameOver = true;
  updateTurnIndicator();

  const { b, w } = getCounts();
  const diff = b - w;

  setTimeout(() => {
    if (b > w) {
      if (diff <= 4) {
        playSound('fanfare');
        showModal({
          shout: 'ズガァァァン！！',
          isScene: false,
          faceKey: 'face_annoyed',
          balloon: '「ぐぬぬ……！あと1手で私の勝ちだったのにぃぃ！！」',
          score: `👑【神の手接待 BEST END】 黒 ${b} - 白 ${w} (${diff}枚差僅差)`,
          desc: '計算され尽くした絶妙な僅差勝利！姉ちゃんは顔を真っ赤にして悔しがっていますが、プライドは保たれたため盤は無事です！完璧な接待オセロ達成！'
        });
      } else if (diff <= 12) {
        playSound('fanfare');
        showModal({
          shout: 'バァァァン！！',
          isScene: false,
          faceKey: 'face_neutral',
          balloon: '「むぅ……今日はちょっと調子悪かっただけだし！次は本気出すから！」',
          score: `✨【GOOD END ギリギリ勝利】 黒 ${b} - 白 ${w} (${diff}枚差)`,
          desc: '怒りゲージを耐えきって勝利しました！姉ちゃんはジト目で少し不服そうですが、ちゃぶ台返しは免れました。'
        });
      } else {
        playSound('anger_spike');
        showModal({
          shout: 'ゾワァァ……',
          isScene: false,
          faceKey: 'face_neutral',
          balloon: '「……ふーん。アンタって本当に空気読めないのね。」',
          score: `🧊【冷戦 END 空気読めない弟】 黒 ${b} - 白 ${w} (${diff}枚差大勝)`,
          desc: '勝つには勝ちましたが、大差をつけすぎて姉ちゃんが完全に拗ねてしまいました。家庭内冷戦の始まりです……。'
        });
      }
    } else if (w > b) {
      playSound('tea');
      showModal({
        shout: 'フッ……！',
        isScene: false,
        faceKey: 'face_happy',
        balloon: '「へへーーん！私の勝ち！高級アイス買ってきなさい♪」',
        score: `🍦【敗北・パシリ END】 黒 ${b} - 白 ${w} (姉ちゃんの勝ち)`,
        desc: '接待しすぎて本当に負けてしまいました！姉ちゃんは最高のドヤ顔でご機嫌ですが、今日のおやつはおごり決定です。'
      });
    } else {
      playSound('tea');
      showModal({
        shout: 'ドォォン！',
        isScene: false,
        faceKey: 'face_happy',
        balloon: '「……引き分け？ ま、まあ今日はこれくらいにしといてあげるわ。」',
        score: `🤝【引き分け END】 黒 ${b} - 白 ${w}`,
        desc: '奇跡の同点！お互い一歩も譲らない名勝負となり、姉弟の平和な日常が保たれました。'
      });
    }
  }, 600);
}

function showModal({ shout, isScene, faceKey, balloon, score, desc }) {
  document.getElementById('modalShout').textContent = shout;
  const sceneImg = document.getElementById('modalSceneImg');
  const faceSprite = document.getElementById('modalFaceSprite');
  if (isScene) {
    if (!sceneImg.getAttribute('src')) sceneImg.src = 'sister_table_flip_scene.webp';
    sceneImg.style.display = 'block';
    faceSprite.style.display = 'none';
  } else {
    sceneImg.style.display = 'none';
    faceSprite.style.display = 'block';
    faceSprite.className = `sister-sprite ${faceKey} modal-face-sprite`;
  }
  document.getElementById('modalBalloon').textContent = balloon;
  document.getElementById('modalScore').textContent = score;
  document.getElementById('modalDesc').textContent = desc;
  document.getElementById('mangaModal').style.display = 'flex';
}

window.addEventListener('DOMContentLoaded', () => {
  initGame();
});
