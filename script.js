/**
 * CheeseIpsum
 * - Modes:
 *   1) Latin cheese paragraphs (mixed ~60% Latin tokens)
 *   2) Pure cheese paragraphs (no Latin)
 *   3) Cheese song (fixed 50 lines)
 * - Slider:
 *   - 1..50 paragraph count (disabled in song mode)
 */

/* ----------------------------- DATA DICTIONARY ----------------------------- */

const cheeseWords = {
  cheeses: [
    'cheddar','brie','gouda','parmesan','mozzarella','swiss','provolone',
    'feta','blue cheese','camembert','roquefort','gruyere','manchego',
    'havarti','ricotta','mascarpone','pecorino','asiago','fontina',
    'muenster','monterey jack','colby','pepper jack','gorgonzola',
    'boursin','halloumi','paneer','queso','stilton','emmental'
  ],
  adjectives: [
    'aged','sharp','creamy','tangy','melted','crumbly','smelly',
    'delicious','pungent','mild','rich','smooth','nutty','buttery',
    'savory','aromatic','firm','soft','hard','fresh','artisan',
    'handcrafted','imported','local','organic','premium','gourmet'
  ],
  verbs: [
    'melts','crumbles','spreads','pairs','ages','ferments','matures',
    'blends','grates','slices','complements','enhances','enriches',
    'transforms','elevates','combines','mingles','infuses'
  ],
  phrases: [
    'from the alps','cave-aged to perfection','with a hint of truffle',
    'served at room temperature','on a wooden board','with crusty bread',
    'paired with wine','in the fondue pot','on the cheese plate',
    'with fig jam','wrapped in wax','from local dairies',
    'with wine notes','in artisan style','with herbal notes',
    'perfectly ripened','traditionally crafted','award-winning',
    "farmer's favorite","chef's choice"
  ],
  connectors: [
    'and','with','alongside','featuring','including','combined with',
    'topped with','garnished with','served with','paired with'
  ],

  // Latin “mix-ins”
  latin: [
    'lorem','ipsum','dolor','sit','amet','consectetur','adipiscing',
    'elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et'
  ],
  latinConnectors: ['et','cum','etiam','quoque','sed','autem','nam','si'],
  latinVerbs: [
    'incididunt','labore','dolore','veniam','exercitation','ullamco',
    'laboris','velit','quis','excepteur','sint','occaecat','minim',
    'reprehenderit','consequat'
  ],
  latinPhrases: [
    'lorem ipsum dolor sit amet',
    'consectetur adipiscing elit',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    'ut enim ad minim veniam',
    'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    'duis aute irure dolor in reprehenderit',
    'in voluptate velit esse cillum dolore eu fugiat nulla pariatur'
  ],

  // Song lines (up to 30 unique)
  popLines: [
    "We got the cheddar on repeat, buttery beats beneath our feet",
    "Melt it slow, then take a bite, mozzarella moonlights in the night",
    "Dancing on a fondue floor, spin the wheel and dip once more",
    "Brie and beats and neon glow, groove until the cheeses flow",
    "Parmesan falling like a shower, sprinkle love every single hour",
    "Cheddar kisses, creamy swirls, you melt my heart, you melt my world",
    "Gouda grooves and funky bass, hold me close in your warm embrace",
    "Feta flickers, candlelight, slow dance with me through the night",
    "Smothered in a melty trance, cheddar leads the midnight dance",
    "Ricotta rhythm, heartbeats sync, pass the plate and share a wink",
    "Swiss holes beating like my heart, every chorus a new start",
    "Havarti hums a mellow tune, under the soft and silver moon",
    "Monterey mood in hazy haze, turn it up and lose the days",
    "Colby cadence, sugar sweet, finger-lickin' lovers meet",
    "Pepper jack with spicy rhyme, dance with me one more time",
    "Creamy whispers in the air, melt my worries, show you care",
    "Blue cheese blue in velvet skies, sing the chorus, close your eyes",
    "Grana gleams like city lights, serenade our summer nights",
    "Stilton sway and slow guitar, reach the chorus, raise the bar",
    "Mascarpone in satin coats, whisper secrets, trade our notes",
    "Paneer pulse and barefoot stomp, heartbeat thumps and dancers romp",
    "Queso quiver, spotlight spin, let the crazy jam begin",
    "Emmental echoes through the hall, lovers gather, one and all",
    "Fontina fire, burning bright, keep me warm until the light",
    "Provolone promises on repeat, lay me down and play the beat",
    "Muenster moves the evening slow, take a breath and let it go",
    "Gorgonzola lullaby, hush the crowd and dim the sky",
    "Tomato tang and cheesy rhyme, squeeze the moment out of time",
    "Wrapped in wax, a secret song, cheesy chorus all night long",
    "Dawn will come but not tonight, we'll keep dancing in the light"
  ]
};

/* ------------------------------ SMALL HELPERS ------------------------------ */

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function getToken(type, includeLatin, forceLatin = false) {
  // Force Latin for a slot (used to guarantee a % mix in paragraph mode)
  if (forceLatin) {
    if (type === 'phrases') return random(cheeseWords.latinPhrases);
    if (type === 'verbs') return random(cheeseWords.latinVerbs);
    if (type === 'connectors') return random(cheeseWords.latinConnectors);
    return random(cheeseWords.latin);
  }

  // Probabilistic mixing when includeLatin = true
  if (type === 'connectors') {
    if (includeLatin && Math.random() < 0.7) return random(cheeseWords.latinConnectors);
    return random(cheeseWords.connectors);
  }
  if (type === 'verbs') {
    if (includeLatin && Math.random() < 0.8) return random(cheeseWords.latinVerbs);
    return random(cheeseWords.verbs);
  }
  if (type === 'phrases') {
    if (includeLatin && Math.random() < 0.9) return random(cheeseWords.latinPhrases);
    return random(cheeseWords.phrases);
  }
  if (includeLatin && Math.random() < 0.6) return random(cheeseWords.latin);

  return random(cheeseWords[type]);
}

/* --------------------------- TEXT GENERATION CORE -------------------------- */

let currentIncludeLatin = true;

const sentenceTemplates = [
  ['adjectives','cheeses','verbs','phrases'],
  ['The','adjectives','cheeses','verbs','beautifully','phrases'],
  ['cheeses','is','adjectives','connectors','cheeses'],
  ['adjectives','and','adjectives','cheeses','verbs','phrases'],
  ['cheeses','connectors','cheeses','creates a','adjectives','combination'],
  ['Experience the','adjectives','texture of','cheeses','phrases'],
  ['This','adjectives','cheeses','verbs','wonderfully','phrases']
];

function generateSentence(includeLatin) {
  const t = random(sentenceTemplates);
  const out = [];

  for (const token of t) {
    if (['adjectives','cheeses','verbs','phrases','connectors'].includes(token)) {
      out.push(getToken(token, includeLatin));
    } else {
      out.push(token);
    }
  }

  out[0] = cap(out[0]);
  return out.join(' ') + '.';
}

function generateParagraph(includeLatin) {
  const sentenceCount = Math.floor(Math.random() * 4) + 3; // 3–6

  // Pre-pick templates so we can “force” ~60% Latin token slots deterministically
  const chosen = Array.from({ length: sentenceCount }, () => random(sentenceTemplates));

  const variableTypes = new Set(['adjectives','cheeses','verbs','phrases','connectors']);
  let totalSlots = 0;
  for (const t of chosen) for (const token of t) if (variableTypes.has(token)) totalSlots++;

  const requiredLatin = includeLatin ? Math.round(totalSlots * 0.6) : 0;

  const forcedSlots = new Set();
  while (forcedSlots.size < requiredLatin) forcedSlots.add(Math.floor(Math.random() * totalSlots));

  const sentences = [];
  let slotIndex = 0;

  for (const t of chosen) {
    const parts = [];
    for (const token of t) {
      if (variableTypes.has(token)) {
        const forceLatin = forcedSlots.has(slotIndex);
        parts.push(getToken(token, includeLatin, forceLatin));
        slotIndex++;
      } else {
        parts.push(token);
      }
    }
    parts[0] = cap(parts[0]);
    sentences.push(parts.join(' ') + '.');
  }

  return sentences.join(' ');
}

function generateParagraphs(count) {
  const paragraphs = [];
  for (let i = 0; i < count; i++) {
    paragraphs.push(generateParagraph(currentIncludeLatin));
  }
  return paragraphs.join('\n\n');
}

function generatePopSong(linesCount = 50) {
  const pool = cheeseWords.popLines.slice();

  // Fisher–Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const chosen = pool.slice(0, Math.min(linesCount, pool.length));

  // 4-line stanzas
  const stanzas = [];
  for (let i = 0; i < chosen.length; i += 4) {
    stanzas.push(chosen.slice(i, i + 4).join('\n'));
  }
  return stanzas.join('\n\n');
}

/* ------------------------------- UI HELPERS ------------------------------- */

function getSelectedFormat() {
  const modes = document.getElementsByName('modeOption');
  for (const m of modes) if (m.checked) return m.value;
  return 'para-latin';
}

function getSelectedCount() {
  const slider = document.getElementById('countSlider');
  return slider ? parseInt(slider.value, 10) : 25;
}

function updateSliderUI() {
  const slider = document.getElementById('countSlider');
  const value = document.getElementById('countValue');
  if (!slider || !value) return;
  value.textContent = slider.value;
}

function updateCountOptionsVisibility() {
  const format = getSelectedFormat();
  const slider = document.getElementById('countSlider');
  const value = document.getElementById('countValue');
  if (!slider || !value) return;

  const disabled = (format === 'pop-song');
  slider.disabled = disabled;
  slider.style.opacity = disabled ? '0.5' : '1';
  value.style.opacity = disabled ? '0.5' : '1';
}

function generate() {
  const format = getSelectedFormat();
  const count = getSelectedCount();
  const outputBox = document.getElementById('output');
  if (!outputBox) return;

  currentIncludeLatin = (format === 'para-latin');

  let result = '';
  if (format === 'para-latin') result = generateParagraphs(count);
  else if (format === 'para-cheese') {
    const prev = currentIncludeLatin;
    currentIncludeLatin = false;
    result = generateParagraphs(count);
    currentIncludeLatin = prev;
  } else if (format === 'pop-song') result = generatePopSong(50);
  else result = generateParagraphs(count);

  outputBox.textContent = result;
}

/* ------------------------------- CLIPBOARD ------------------------------- */

async function copyToClipboard() {
  const outputBox = document.getElementById('output');
  if (!outputBox) return;
  const text = outputBox.textContent;

  try {
    await navigator.clipboard.writeText(text);
    showToast();
  } catch {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      if (document.execCommand('copy')) showToast();
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

function showToast() {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

/* --------------------------------- WIRES --------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  const genBtn = document.getElementById('generate');
  const copyBtn = document.getElementById('copy');
  const slider = document.getElementById('countSlider');

  if (genBtn) genBtn.addEventListener('click', generate);
  if (copyBtn) copyBtn.addEventListener('click', copyToClipboard);

  // Mode changes
  const modeRadios = document.getElementsByName('modeOption');
  for (const r of modeRadios) {
    r.addEventListener('change', () => {
      updateCountOptionsVisibility();
      generate();
    });
  }

  // Slider changes
  if (slider) {
    slider.addEventListener('input', updateSliderUI);
    slider.addEventListener('change', () => {
      updateSliderUI();
      generate();
    });
  }

  updateSliderUI();
  updateCountOptionsVisibility();
  generate();
});