# Contributing to Finova

First off, thank you for considering contributing! We appreciate your time and effort.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/slami911/JDHJH/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and OS information
   - Screenshots if applicable

### Suggesting Features

1. Open a [new issue](https://github.com/slami911/JDHJH/issues/new)
2. Describe the feature in detail
3. Explain why it would be useful
4. If possible, include mockups or examples

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Guidelines

- **Code Style**: Follow the existing patterns (vanilla JS, single-file architecture)
- **Security**: Never trust user input — always sanitize
- **Accessibility**: Ensure new features work with keyboard navigation
- **RTL Support**: All UI elements must support both LTR and RTL
- **Performance**: Avoid blocking the main thread; use debouncing where appropriate
- **Offline**: New features should work without internet connection

### Project Structure

```
JDHJH/
├── Personal Salary Manager.html   # Main application (SPA)
├── service-worker.js              # PWA service worker
├── manifest.json                  # Web app manifest
├── icons/                         # App icons (PNG + SVG)
│   ├── icon-48.png
│   ├── icon-192.png
│   └── ...
├── F.png                          # Primary logo
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
└── ...
```

### Testing

- Test in Chrome, Firefox, and Edge
- Test offline mode (airplane mode or DevTools)
- Test with screen readers (NVDA, VoiceOver)
- Test RTL mode with Arabic language
- Test on mobile viewports (360px, 768px, 1024px)

## Questions?

Open an issue or reach out via GitHub. We're happy to help!
