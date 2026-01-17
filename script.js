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
        if (includeLatin && Math.random() < 0.5) {
            return random(cheeseWords.latinConnectors);
        }
        return random(cheeseWords.connectors);
    }

    // For verbs, prefer Latin verbs when enabled (higher visibility)
    if (type === 'verbs') {
        if (includeLatin && Math.random() < 0.6) {
            return random(cheeseWords.latinVerbs);
        }
        return random(cheeseWords.verbs);
    }

    // For phrases, allow full Latin phrases when enabled
    if (type === 'phrases') {
        if (includeLatin && Math.random() < 0.6) {
            return random(cheeseWords.latinPhrases);
        }
        return random(cheeseWords.phrases);
    }

    // For other types, occasionally return a Latin word when enabled
    if (includeLatin && Math.random() < 0.25) {
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
function generateParagraph() {
    const sentenceCount = Math.floor(Math.random() * 4) + 3; // 3-6 sentences
    const sentences = [];
    
    // Preserve existing behavior but allow optional Latin mixing
    const includeLatin = document.getElementById('includeLatin') ? document.getElementById('includeLatin').checked : true;

    for (let i = 0; i < sentenceCount; i++) {
        sentences.push(generateSentence(includeLatin));
    }
    
    return sentences.join(' ');
}

// Generate words
function generateWords(count) {
    const words = [];
    for (let i = 0; i < count; i++) {
        const includeLatin = document.getElementById('includeLatin') ? document.getElementById('includeLatin').checked : true;
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
function generateSentences(count) {
    const sentences = [];
    const includeLatin = document.getElementById('includeLatin') ? document.getElementById('includeLatin').checked : true;
    for (let i = 0; i < count; i++) {
        sentences.push(generateSentence(includeLatin));
    }
    return sentences.join(' ');
}

// Generate paragraphs
function generateParagraphs(count) {
    const paragraphs = [];
    for (let i = 0; i < count; i++) {
        paragraphs.push(generateParagraph());
    }
    return paragraphs.join('\n\n');
}

// Main generate function
function generate() {
    const format = document.getElementById('format').value;
    const count = parseInt(document.getElementById('count').value);
    const outputBox = document.getElementById('output');
    const includeLatin = document.getElementById('includeLatin') ? document.getElementById('includeLatin').checked : true;
    
    let result = '';
    
    switch(format) {
        case 'words':
            result = generateWords(count);
            break;
        case 'sentences':
            result = generateSentences(count);
            break;
        case 'paragraphs':
        default:
            result = generateParagraphs(count);
            break;
    }
    
    outputBox.textContent = result;
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
    
    // Generate initial content
    generate();
});
