# Security Policy

## Supported Versions

| Version | Supported          |
|---------|-------------------|
| 3.0.x   | :white_check_mark: |
| 2.0.x   | :x:               |
| 1.0.x   | :x:               |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

1. **Do not** disclose the vulnerability publicly
2. Email the details to [GitHub Issues](https://github.com/slami911/JDHJH/issues) with label `security`
3. Include a detailed description and steps to reproduce
4. Allow up to 48 hours for an initial response

## Security Measures in Finova

- All user inputs are sanitized before rendering (XSS prevention)
- Firebase configuration uses read-only API keys
- Data is stored locally with encryption-ready architecture
- Service worker follows strict cache policies
- No external scripts beyond CDN dependencies
- All CDN resources use Subresource Integrity (SRI) where supported

## Best Practices for Users

1. Keep your Firebase configuration private
2. Use strong passwords for authentication
3. Regularly export your data as backup
4. Update to the latest version for security patches
