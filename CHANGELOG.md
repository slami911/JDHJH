# Changelog

## [3.0.0] — 2026-07-05

### Added
- Complete PWA support with Service Worker v2.0
- Offline-first architecture with full asset caching
- 11 properly sized PNG icons (48px to 512px)
- Smart Insights dashboard with 15+ financial metrics
- Interactive charts (Doughnut, Line, Bar, Area)
- Multi-language support (Arabic, English, French)
- Dark/Light theme with CSS custom properties
- Firebase Authentication (Email/Password + Google)
- Firestore cloud sync
- Export to PDF, Excel (CSV), JSON
- Keyboard shortcuts (Ctrl+1..5, Ctrl+N, Ctrl+F)
- Real-time clock and date display
- Financial health score calculator
- Spending trend analysis with month-over-month comparison

### Fixed
- XSS vulnerability — all user inputs sanitized
- Deprecated `substr()` replaced with `substring()`
- Missing PNG icons — all sizes now available
- Service worker cache manifest — now complete
- Manifest icon paths — all point to proper files
- F.png oversized (1.2MB → 298KB)
- Global error handlers for uncaught exceptions
- localStorage safety check for private browsing
- Accessibility: aria-labels, keyboard navigation, roles
- Performance: debounced search, deferred scripts, non-blocking CSS

### Security
- Input sanitization for all user-generated content
- CSP-ready architecture
- Secure Firebase configuration pattern

## [2.0.0] — 2026-06-01

### Added
- Single-page application architecture
- Dashboard with summary cards
- Expense CRUD operations
- Category management with icons and colors
- Basic reporting
- localStorage persistence
- RTL support for Arabic

## [1.0.0] — 2026-05-01

### Added
- Initial release
- Basic expense tracking
- Salary management
- Simple UI
