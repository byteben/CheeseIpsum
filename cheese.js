/**
 * CheeseIpsum
 * - Modes:
 *   1) Latin cheese paragraphs (mixed ~60% Latin tokens) — first paragraph starts "Cheese ipsum"
 *   2) Pure cheese paragraphs (no Latin)
 *   3) Cheese song (fixed 50 lines)
 * - Slider:
 *   - 1..50 paragraph count (disabled in song mode)
 */

async function loadCheeseWords() {
  // cache: 'no-store'
  const res = await fetch('./cheese.json', { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load cheese.json (${res.status})`);
  cheeseWords = await res.json();
}

/* ------------------------------ SMALL HELPERS ------------------------------ */

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function ensureWordsLoaded() {
  if (!cheeseWords) throw new Error('cheeseWords not loaded yet');
}

function getToken(type, includeLatin, forceLatin = false) {
  if (forceLatin) {
    if (type === 'phrases') return random(cheeseWords.latinPhrases);
    if (type === 'verbs') return random(cheeseWords.latinVerbs);
    if (type === 'connectors') return random(cheeseWords.latinConnectors);
    return random(cheeseWords.latin);
  }

  if (type === 'connectors') {
    if (includeLatin && Math.random() < 0.6) return random(cheeseWords.latinConnectors);
    return random(cheeseWords.connectors);
  }

  if (type === 'verbs') {
    if (includeLatin && Math.random() < 0.7) return random(cheeseWords.latinVerbs);
    return random(cheeseWords.verbs);
  }

  if (type === 'phrases') {
    if (includeLatin && Math.random() < 0.8) return random(cheeseWords.latinPhrases);
    return random(cheeseWords.phrases);
  }

  // boost cheese nouns in Latin mode so it still feels “cheese-first”
  if (type === 'cheeses') {
    if (includeLatin && Math.random() < 0.35) return random(cheeseWords.latin);
    return random(cheeseWords.cheeses);
  }

  if (includeLatin && Math.random() < 0.45) return random(cheeseWords.latin);
  return random(cheeseWords[type]);
}

/* --------------------------- TEXT GENERATION CORE -------------------------- */

let currentIncludeLatin = true;

// Paragraph sentence templates (internal — no “sentence mode” exposed)
const paragraphTemplates = [
  ['adjectives','cheeses','verbs','phrases'],
  ['The','adjectives','cheeses','verbs','beautifully','phrases'],
  ['cheeses','is','adjectives','connectors','cheeses'],
  ['adjectives','and','adjectives','cheeses','verbs','phrases'],
  ['cheeses','connectors','cheeses','creates a','adjectives','combination'],
  ['Experience the','adjectives','texture of','cheeses','phrases'],
  ['This','adjectives','cheeses','verbs','wonderfully','phrases']
];

// Bacon-ipsum-style comma-heavy list templates
const longListTemplates = [
  ['cheeses','cheeses','cheeses','cheeses','cheeses','cheeses','cheeses'],
  ['cheeses','connectors','cheeses','connectors','cheeses','connectors','cheeses','phrases'],
  ['adjectives','cheeses','adjectives','cheeses','cheeses','verbs','phrases'],
  ['cheeses','cheeses','cheeses','adjectives','cheeses','phrases']
];

function buildFromTemplate(t, includeLatin, forcedSlots = null) {
  const variableTypes = new Set(['adjectives','cheeses','verbs','phrases','connectors']);
  const parts = [];
  let slotIndex = 0;

  for (const token of t) {
    if (variableTypes.has(token)) {
      const forceLatin = forcedSlots ? forcedSlots.has(slotIndex) : false;
      parts.push(getToken(token, includeLatin, forceLatin));
      slotIndex++;
    } else {
      parts.push(token);
    }
  }

  parts[0] = cap(parts[0]);
  return parts.join(' ') + '.';
}

function generateListSentence(includeLatin) {
  const t = random(longListTemplates);
  const parts = [];

  for (const token of t) {
    if (['adjectives','cheeses','verbs','phrases','connectors'].includes(token)) {
      parts.push(getToken(token, includeLatin));
    } else {
      parts.push(token);
    }
  }

  const cleaned = parts.map(p => String(p).replace(/\.$/, ''));

  if (cleaned.length > 2) {
    const last = cleaned.pop();
    return cap(`${cleaned.join(', ')}, ${last}.`);
  }
  return cap(cleaned.join(', ') + '.');
}

// Special first sentence for Latin mode: must start with "Cheese ipsum"
function generateCheeseIpsumStarterSentence() {
  const tail = generateListSentence(true)
    .replace(/\.$/, '')               // remove trailing period
    .replace(/^[A-Z]/, c => c.toLowerCase()); // lower the first char
  return `Cheese ipsum ${tail}.`;
}

function generateParagraph(includeLatin, isFirstLatinParagraph = false) {
  const sentenceCount = Math.floor(Math.random() * 5) + 5; // 5–9 sentences
  const sentences = [];

  if (isFirstLatinParagraph) {
    sentences.push(generateCheeseIpsumStarterSentence());
  }

  while (sentences.length < sentenceCount) {
    // ~40% list sentences for “bacon-ipsum heft”
    if (Math.random() < 0.4) {
      sentences.push(generateListSentence(includeLatin));
      continue;
    }

    // For Latin paragraphs, keep the nice ~60% latin slot forcing like you had
    if (includeLatin) {
      const t = random(paragraphTemplates);

      const variableTypes = new Set(['adjectives','cheeses','verbs','phrases','connectors']);
      let totalSlots = 0;
      for (const token of t) if (variableTypes.has(token)) totalSlots++;

      const requiredLatin = Math.round(totalSlots * 0.6);
      const forcedSlots = new Set();
      while (forcedSlots.size < requiredLatin) forcedSlots.add(Math.floor(Math.random() * totalSlots));

      sentences.push(buildFromTemplate(t, true, forcedSlots));
    } else {
      const t = random(paragraphTemplates);
      sentences.push(buildFromTemplate(t, false, null));
    }
  }

  return sentences.join(' ');
}

function generateParagraphs(count, includeLatin) {
  const paragraphs = [];
  for (let i = 0; i < count; i++) {
    const isFirstLatin = includeLatin && i === 0;
    paragraphs.push(generateParagraph(includeLatin, isFirstLatin));
  }
  return paragraphs.join('\n\n');
}

function generatePopSong(linesCount = 50) {
  const pool = cheeseWords.popLines.slice();

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const chosen = pool.slice(0, Math.min(linesCount, pool.length));

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

  let result = '';
  if (format === 'para-latin') result = generateParagraphs(count, true);
  else if (format === 'para-cheese') result = generateParagraphs(count, false);
  else if (format === 'pop-song') result = generatePopSong(50);
  else result = generateParagraphs(count, true);

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

document.addEventListener('DOMContentLoaded', async () => {
  const genBtn = document.getElementById('generate');
  const copyBtn = document.getElementById('copy');
  const slider = document.getElementById('countSlider');

  try {
    await loadCheeseWords();   // ✅ wait for JSON before wiring/generating
  } catch (e) {
    console.error(e);
    const outputBox = document.getElementById('output');
    if (outputBox) outputBox.textContent = 'Failed to load cheese.json. Check file path + deployment.';
    return;
  }

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