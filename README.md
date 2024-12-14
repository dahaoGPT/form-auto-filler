# Form Auto Filler Browser Extension

A powerful browser extension built with Next.js for automatic form filling with support for multiple data sources.

## Features

- Multiple data source support (External APIs, Local files)
- Secure data handling and storage
- Configurable form field mapping
- Real-time data synchronization
- User-friendly configuration interface

## Project Structure

```
/form-auto-filler
├── /src
│   ├── /app                 # Next.js app directory
│   ├── /components         # Reusable React components
│   ├── /lib                # Core functionality
│   ├── /hooks             # Custom React hooks
│   ├── /styles            # Global styles
│   └── /utils             # Utility functions
├── /public               # Static assets
├── /chrome              # Chrome extension specific files
├── /config              # Configuration files
└── manifest.json        # Extension manifest
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Build extension:
   ```bash
   npm run build:extension
   ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the extension build directory

## Configuration

The extension can be configured through the options page:
- Data source selection (API/Local file)
- API endpoint configuration
- Authentication settings
- Form field mapping rules

## Security

- All sensitive data is encrypted before storage
- Secure token management
- HTTPS/CORS validation
- Error handling and fallback mechanisms

## License

MIT License
