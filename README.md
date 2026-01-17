# 🧀 CheeseIpsum

A modern, cheese-themed Lorem Ipsum generator with a sleek UI design. Perfect for creating placeholder text with a deliciously cheesy twist!

## Features

- 🎨 Modern, responsive UI with dark theme
- 🧀 Cheese-themed placeholder text generation
- 📝 Multiple generation formats: Paragraphs, Sentences, or Words
- 📋 One-click copy to clipboard
- ⚡ Fast and lightweight - pure HTML, CSS, and JavaScript
- 🌐 Ready for Azure Static Web Apps deployment

## Live Demo

Once deployed to Azure Static Web Apps, your CheeseIpsum generator will be accessible at your Azure Static Web Apps URL.

## Local Development

Simply open `index.html` in your browser - no build process required!

```bash
# Option 1: Open directly in browser
open index.html

# Option 2: Use a local server
python -m http.server 8000
# or
npx serve
```

Then navigate to `http://localhost:8000`

## Deployment to Azure Static Web Apps

This repository is configured for automatic deployment to Azure Static Web Apps via GitHub Actions.

### Setup Steps:

1. Create an Azure Static Web App in the Azure Portal
2. Connect it to this GitHub repository
3. Azure will automatically create a deployment token
4. Add the token as a secret named `AZURE_STATIC_WEB_APPS_API_TOKEN` in your GitHub repository settings
5. Push to the `main` branch to trigger automatic deployment

The workflow file is located at `.github/workflows/azure-static-web-apps.yml`

## How It Works

CheeseIpsum generates random cheese-themed text using:
- 30+ different cheese types (Cheddar, Brie, Gouda, etc.)
- Various cheese-related adjectives and descriptors
- Cheese-themed phrases and expressions
- Smart sentence construction for natural-sounding text

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid, Flexbox, and animations
- **Vanilla JavaScript** - No frameworks needed!
- **Azure Static Web Apps** - Serverless hosting and deployment

## Project Structure

```
CheeseIpsum/
├── index.html                          # Main HTML file
├── styles.css                          # Modern CSS styling
├── script.js                           # Cheese ipsum generation logic
├── staticwebapp.config.json           # Azure Static Web Apps configuration
├── .github/
│   └── workflows/
│       └── azure-static-web-apps.yml  # CI/CD workflow
└── README.md                           # This file
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project however you'd like!

---

Made with 🧀 and ❤️