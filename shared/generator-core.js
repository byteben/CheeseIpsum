// shared/generator-core.js
export function generateText(words, { mode = "cheeselatin", count = 25 } = {}) {
  const m = String(mode).toLowerCase();
  const c = clampInt(count, 1, 50);

  if (m === "song") return generatePopSong(words, 50);

  const includeLatin = (m === "cheeselatin" || m === "latin" || m === "para-latin");
  const paragraphs = [];
  for (let i = 0; i < c; i++) {
    const isFirstLatin = includeLatin && i === 0;
    paragraphs.push(generateParagraph(words, includeLatin, isFirstLatin));
  }
  return paragraphs.join("\n\n");
}

function clampInt(v, min, max) {
  const n = parseInt(v, 10);
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, n));
}

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function getToken(words, type, includeLatin) {
  // boost cheese nouns even in Latin mode so it stays “cheese-first”
  if (type === "cheeses") {
    if (includeLatin && Math.random() < 0.35) return rand(words.latin);
    return rand(words.cheeses);
  }
  if (type === "connectors") {
    if (includeLatin && Math.random() < 0.6) return rand(words.latinConnectors);
    return rand(words.connectors);
  }
  if (type === "verbs") {
    if (includeLatin && Math.random() < 0.7) return rand(words.latinVerbs);
    return rand(words.verbs);
  }
  if (type === "phrases") {
    if (includeLatin && Math.random() < 0.8) return rand(words.latinPhrases);
    return rand(words.phrases);
  }

  if (includeLatin && Math.random() < 0.45) return rand(words.latin);
  return rand(words[type]);
}

const paragraphTemplates = [
  ["adjectives","cheeses","verbs","phrases"],
  ["The","adjectives","cheeses","verbs","beautifully","phrases"],
  ["cheeses","is","adjectives","connectors","cheeses"],
  ["adjectives","and","adjectives","cheeses","verbs","phrases"],
  ["Experience the","adjectives","texture of","cheeses","phrases"]
];

const longListTemplates = [
  ["cheeses","cheeses","cheeses","cheeses","cheeses","cheeses","cheeses"],
  ["cheeses","connectors","cheeses","connectors","cheeses","connectors","cheeses","phrases"]
];

function makeSentence(words, includeLatin) {
  const t = rand(paragraphTemplates);
  const parts = t.map(tok => (
    ["adjectives","cheeses","verbs","phrases","connectors"].includes(tok)
      ? getToken(words, tok, includeLatin)
      : tok
  ));
  parts[0] = cap(parts[0]);
  return parts.join(" ") + ".";
}

function makeListSentence(words, includeLatin) {
  const t = rand(longListTemplates);
  const parts = t.map(tok => (
    ["adjectives","cheeses","verbs","phrases","connectors"].includes(tok)
      ? getToken(words, tok, includeLatin)
      : tok
  ));
  const cleaned = parts.map(p => String(p).replace(/\.$/, ""));
  const last = cleaned.pop();
  return cap(`${cleaned.join(", ")}, ${last}.`);
}

function cheeseIpsumStarter(words) {
  const tail = makeListSentence(words, true).replace(/\.$/, "");
  return `Cheese ipsum ${tail.charAt(0).toLowerCase()}${tail.slice(1)}.`;
}

function generateParagraph(words, includeLatin, isFirstLatin) {
  const sentenceCount = Math.floor(Math.random() * 5) + 5; // 5–9
  const sentences = [];

  if (isFirstLatin) sentences.push(cheeseIpsumStarter(words));

  while (sentences.length < sentenceCount) {
    sentences.push(Math.random() < 0.4 ? makeListSentence(words, includeLatin) : makeSentence(words, includeLatin));
  }
  return sentences.join(" ");
}

function generatePopSong(words, linesCount = 50) {
  const pool = words.popLines.slice();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const chosen = pool.slice(0, Math.min(linesCount, pool.length));
  const stanzas = [];
  for (let i = 0; i < chosen.length; i += 4) stanzas.push(chosen.slice(i, i + 4).join("\n"));
  return stanzas.join("\n\n");
}