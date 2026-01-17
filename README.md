# Cheese Ipsum 🧀

The world's cheesiest placeholder text generator! A cheese-themed Lorem Ipsum generator that creates delightful filler text using cheese-related words while maintaining a similar look and feel to traditional Lorem Ipsum.

## Features

- 🧀 **Cheese-themed text generation** - Uses real cheese names, textures, flavors, and terminology
- 📝 **Customizable paragraph count** - Generate 1-20 paragraphs of cheesy goodness
- 🎨 **Modern, fresh UI** - Beautiful gradient design with smooth animations
- 📱 **Fully responsive** - Works perfectly on desktop, tablet, and mobile devices
- 📋 **Copy to clipboard** - One-click copying with visual feedback
- 🚀 **Static files only** - No database or backend required (HTML, CSS, JS, JSON)
- ⚡ **Fast and lightweight** - Instant generation, no server calls needed

## Usage

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/byteben/CheeseIpsum.git
cd CheeseIpsum
```

2. Open `index.html` in your web browser, or serve with any static web server:
```bash
# Using Python
python3 -m http.server 8080

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8080
```

3. Navigate to `http://localhost:8080` in your browser

### Azure Static Web Apps

This project is designed to work seamlessly with Azure Static Web Apps:

1. Deploy to Azure Static Web Apps through the Azure Portal or GitHub Actions
2. Set the app location to `/` (root directory)
3. No API or build configuration needed

### Using Other Hosting Providers

Since this is a static site, you can host it on:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any basic web hosting service

Simply upload the files to your hosting provider's web directory.

## How It Works

1. **Word Database**: `cheese-words.json` contains arrays of cheese types, adjectives, verbs, nouns, and connectors
2. **Pattern Generation**: JavaScript combines words using various sentence patterns to create natural-sounding text
3. **Randomization**: Each sentence uses random words and patterns for variety
4. **Paragraph Assembly**: Multiple sentences are combined into paragraphs based on user input

## API Development (Future)

The current implementation is client-side only. To add API functionality later:
- The core generation logic can be extracted into a serverless function
- Endpoints could be created for `/api/generate?paragraphs=3`
- The existing static site can remain as the frontend

## Files

- `index.html` - Main application with embedded CSS and JavaScript
- `cheese-words.json` - Database of cheese-related terminology
- `README.md` - This file

## License

Feel free to use and modify for your own projects!

## Made with ❤️ and 🧀

Perfect for designers, developers, and cheese lovers!