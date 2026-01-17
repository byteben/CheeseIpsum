// Cheese-themed words for our ipsum generator
const cheeseWords = {
    cheeses: [
        'cheddar', 'brie', 'gouda', 'parmesan', 'mozzarella', 'swiss', 'provolone',
        'feta', 'blue cheese', 'camembert', 'roquefort', 'gruyere', 'manchego',
        'havarti', 'ricotta', 'mascarpone', 'pecorino', 'asiago', 'fontina',
        'muenster', 'monterey jack', 'colby', 'pepper jack', 'gorgonzola',
        'boursin', 'halloumi', 'paneer', 'queso', 'stilton', 'emmental'
    ],
    adjectives: [
        'aged', 'sharp', 'creamy', 'tangy', 'melted', 'crumbly', 'smelly',
        'delicious', 'pungent', 'mild', 'rich', 'smooth', 'nutty', 'buttery',
        'savory', 'aromatic', 'firm', 'soft', 'hard', 'fresh', 'artisan',
        'handcrafted', 'imported', 'local', 'organic', 'premium', 'gourmet'
    ],
    verbs: [
        'melts', 'crumbles', 'spreads', 'pairs', 'ages', 'ferments', 'matures',
        'blends', 'grates', 'slices', 'complements', 'enhances', 'enriches',
        'transforms', 'elevates', 'combines', 'mingles', 'infuses'
    ],
    phrases: [
        'from the alps', 'cave-aged to perfection', 'with a hint of truffle',
        'served at room temperature', 'on a wooden board', 'with crusty bread',
        'paired with wine', 'in the fondue pot', 'on the cheese plate',
        'with fig jam', 'wrapped in wax', 'from local dairies',
        'with wine notes', 'in artisan style', 'with herbal notes',
        'perfectly ripened', 'traditionally crafted', 'award-winning',
        'farmer\'s favorite', 'chef\'s choice'
    ],
    connectors: [
        'and', 'with', 'alongside', 'featuring', 'including', 'combined with',
        'topped with', 'garnished with', 'served with', 'paired with'
    ]
    ,
    // Optional Latin words / connectors to sprinkle in when the checkbox is enabled
    latin: [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing',
        'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et'
    ],
    latinConnectors: [
        'et', 'cum', 'etiam', 'quoque', 'sed', 'autem', 'nam', 'si'
    ],
    // Richer Latin verbs commonly seen in lorem ipsum
    latinVerbs: [
        'incididunt', 'labore', 'dolore', 'veniam', 'exercitation', 'ullamco',
        'laboris', 'velit', 'quis', 'excepteur', 'sint', 'occaecat', 'minim',
        'reprehenderit', 'consequat'
    ],
    // Common lorem ipsum phrases to make Latin visible
    latinPhrases: [
        'lorem ipsum dolor sit amet',
        'consectetur adipiscing elit',
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        'ut enim ad minim veniam',
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
        'duis aute irure dolor in reprehenderit',
        'in voluptate velit esse cillum dolore eu fugiat nulla pariatur'
    ]
    ,
    // Pure pop cheese lines (30 unique rhyming lines for assembling songs)
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

// Helper function to get random element from array
function random(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Helper function to capitalize first letter
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Helper to pick a token from cheeseWords with optional Latin inclusion
function getToken(type, includeLatin) {
    // type: 'cheeses' | 'adjectives' | 'verbs' | 'phrases' | 'connectors'
    if (type === 'connectors') {
        // make Latin connectors reasonably visible when enabled
        if (includeLatin && Math.random() < 0.7) {
            return random(cheeseWords.latinConnectors);
        }
        return random(cheeseWords.connectors);
    }

    // For verbs, prefer Latin verbs when enabled (higher visibility)
    if (type === 'verbs') {
        // prefer Latin verbs more aggressively so lorem verbs show up
        if (includeLatin && Math.random() < 0.8) {
            return random(cheeseWords.latinVerbs);
        }
        return random(cheeseWords.verbs);
    }

    // For phrases, allow full Latin phrases when enabled
    if (type === 'phrases') {
        // make Latin phrases highly likely when enabled so they're obvious
        if (includeLatin && Math.random() < 0.9) {
            return random(cheeseWords.latinPhrases);
        }
        return random(cheeseWords.phrases);
    }

    // For other types, occasionally return a Latin word when enabled
    // for adjectives/cheeses etc, use Latin occasionally but with a higher rate
    if (includeLatin && Math.random() < 0.6) {
        return random(cheeseWords.latin);
    }

    // Fallback to the requested type
    return random(cheeseWords[type]);
}

// Generate a cheese-themed sentence
function generateSentence(includeLatin) {
    const templates = [
        () => `${capitalize(getToken('adjectives', includeLatin))} ${getToken('cheeses', includeLatin)} ${getToken('verbs', includeLatin)} ${getToken('phrases', includeLatin)}.`,
        () => `The ${getToken('adjectives', includeLatin)} ${getToken('cheeses', includeLatin)} ${getToken('verbs', includeLatin)} beautifully ${getToken('phrases', includeLatin)}.`,
        () => `${capitalize(getToken('cheeses', includeLatin))} is ${getToken('adjectives', includeLatin)} ${getToken('connectors', includeLatin)} ${getToken('cheeses', includeLatin)}.`,
        () => `${capitalize(getToken('adjectives', includeLatin))} and ${getToken('adjectives', includeLatin)} ${getToken('cheeses', includeLatin)} ${getToken('verbs', includeLatin)} ${getToken('phrases', includeLatin)}.`,
        () => `${capitalize(getToken('cheeses', includeLatin))} ${getToken('connectors', includeLatin)} ${getToken('cheeses', includeLatin)} creates a ${getToken('adjectives', includeLatin)} combination.`,
        () => `Experience the ${getToken('adjectives', includeLatin)} texture of ${getToken('cheeses', includeLatin)} ${getToken('phrases', includeLatin)}.`,
        () => `This ${getToken('adjectives', includeLatin)} ${getToken('cheeses', includeLatin)} ${getToken('verbs', includeLatin)} wonderfully ${getToken('phrases', includeLatin)}.`
    ];
    
    return random(templates)();
}

// Generate a paragraph with random number of sentences
function generateParagraph(includeLatin) {
    const sentenceCount = Math.floor(Math.random() * 4) + 3; // 3-6 sentences
    const sentences = [];
    for (let i = 0; i < sentenceCount; i++) {
        sentences.push(generateSentence(includeLatin));
    }

    // If includeLatin is true but randomness produced no Latin, ensure visibility
    if (includeLatin) {
        const latinIndicators = [...cheeseWords.latin, ...cheeseWords.latinVerbs, ...cheeseWords.latinConnectors];
        const hasLatin = sentences.some(s => latinIndicators.some(token => s.toLowerCase().includes(token)) || cheeseWords.latinPhrases.some(p => s.toLowerCase().includes(p.split(' ')[0])));
        if (!hasLatin) {
            sentences[sentences.length - 1] = generateLatinSentence();
        }
    }

    return sentences.join(' ');
}

// Generate a clear Latin sentence (used when probabilistic mixing produced none)
function generateLatinSentence() {
    const phrase = random(cheeseWords.latinPhrases);
    return capitalize(phrase) + '.';
}

// Global flag used by paragraph generation to determine Latin mixing
let currentIncludeLatin = true;

// Generate words
function generateWords(count, includeLatin) {
    const words = [];
    for (let i = 0; i < count; i++) {
        const wordType = Math.random();
        if (wordType < 0.5) {
            words.push(getToken('cheeses', includeLatin));
        } else if (wordType < 0.8) {
            words.push(getToken('adjectives', includeLatin));
        } else {
            words.push(getToken('verbs', includeLatin));
        }
    }
    return words.join(' ');
}

// Generate sentences
function generateSentences(count, includeLatin) {
    const sentences = [];
    for (let i = 0; i < count; i++) {
        sentences.push(generateSentence(includeLatin));
    }
    return sentences.join(' ');
}

// Generate paragraphs
function generateParagraphs(count) {
    const paragraphs = [];
    for (let i = 0; i < count; i++) {
        // determine whether this mode should include Latin -- default to true
        // caller will set currentIncludeLatin before calling this function
        paragraphs.push(generateParagraph(currentIncludeLatin));
    }
    return paragraphs.join('\n\n');
}

// Main generate function
function generate() {
    const format = document.getElementById('format').value;
    const count = parseInt(document.getElementById('count').value);
    const outputBox = document.getElementById('output');
    const popSongVal = document.getElementById('popSong') ? document.getElementById('popSong').value : 'none';

    // determine mode
    // para-latin -> paragraphs with ~60% Latin
    // para-cheese -> paragraphs pure cheese (no Latin)
    // sentences-cheese -> sentences pure cheese (no Latin)
    let result = '';
    currentIncludeLatin = (format === 'para-latin');

    // pop song button handled separately

    switch(format) {
        case 'para-latin':
            result = generateParagraphs(count);
            break;
        case 'para-cheese':
            // paragraphs without Latin
            result = (() => {
                const prev = currentIncludeLatin;
                currentIncludeLatin = false;
                const r = generateParagraphs(count);
                currentIncludeLatin = prev;
                return r;
            })();
            break;
        case 'sentences-cheese':
            result = generateSentences(count, false);
            break;
        default:
            result = generateParagraphs(count);
            break;
    }

    outputBox.textContent = result;
}

// Generate a random pop song built from popLines. Picks `linesCount` unique lines.
function generatePopSong(linesCount = 20) {
    // shuffle copy of popLines
    const pool = cheeseWords.popLines.slice();
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const chosen = pool.slice(0, Math.min(linesCount, pool.length));
    // group into 4-line stanzas
    const stanzas = [];
    for (let i = 0; i < chosen.length; i += 4) {
        stanzas.push(chosen.slice(i, i + 4).join('\n'));
    }
    return stanzas.join('\n\n');
}

// Copy to clipboard function
async function copyToClipboard() {
    const outputBox = document.getElementById('output');
    const text = outputBox.textContent;
    
    try {
        await navigator.clipboard.writeText(text);
        showToast();
    } catch (err) {
        // Fallback for older browsers or when clipboard API is not available
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            // Try the deprecated method as last resort
            const successful = document.execCommand('copy');
            if (successful) {
                showToast();
            }
        } catch (fallbackErr) {
            console.error('Unable to copy text:', fallbackErr);
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

// Show toast notification
function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Update count input when format changes
function updateCountLabel() {
    const format = document.getElementById('format').value;
    const countInput = document.getElementById('count');
    
    switch(format) {
        case 'words':
            countInput.max = 500;
            countInput.value = Math.min(countInput.value, 500);
            break;
        case 'sentences':
            countInput.max = 50;
            countInput.value = Math.min(countInput.value, 50);
            break;
        case 'paragraphs':
        default:
            countInput.max = 100;
            countInput.value = Math.min(countInput.value, 100);
            break;
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generate').addEventListener('click', generate);
    document.getElementById('copy').addEventListener('click', copyToClipboard);
    document.getElementById('format').addEventListener('change', updateCountLabel);
    const includeLatinEl = document.getElementById('includeLatin');
    if (includeLatinEl) {
        includeLatinEl.addEventListener('change', () => {
            // regenerate immediately when the user toggles Latin inclusion
            generate();
        });
    }
    // wire the pop song generator button
    const popBtn = document.getElementById('generatePopSong');
    if (popBtn) {
        popBtn.addEventListener('click', () => {
            const outputBox = document.getElementById('output');
            outputBox.textContent = generatePopSong(20); // 20 lines (~5 stanzas)
        });
    }
    
    // Generate initial content
    generate();
});
