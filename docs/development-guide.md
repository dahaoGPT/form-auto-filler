# Form Auto Filler - Development Guide

## Project Overview

Form Auto Filler is a browser extension built with Next.js and TypeScript that automates form filling using external data sources. This guide covers everything you need to know to develop and maintain the extension.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Development Workflow](#development-workflow)
5. [Testing](#testing)
6. [Building and Deployment](#building-and-deployment)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v7 or higher)
- Chrome browser for testing

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/form-auto-filler.git
   cd form-auto-filler
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
form-auto-filler/
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/         # React components
│   │   ├── popup/         # Extension popup components
│   │   └── options/       # Options page components
│   ├── lib/               # Core utilities
│   │   ├── dataFetcher.ts
│   │   ├── formMapper.ts
│   │   └── storageManager.ts
│   ├── services/          # Service layer
│   │   └── messaging.ts
│   ├── utils/             # Helper utilities
│   └── test/             # Test setup and mocks
├── docs/                 # Documentation
├── public/              # Static assets
└── chrome/              # Extension-specific files
```

## Core Components

### Data Management

#### DataFetcher (`src/lib/dataFetcher.ts`)
Handles data retrieval from various sources:
- API endpoints
- Local files
- Caching mechanism

```typescript
const dataFetcher = DataFetcher.getInstance();
await dataFetcher.getData({
  type: 'api',
  endpoint: 'https://api.example.com/data'
});
```

#### StorageManager (`src/lib/storageManager.ts`)
Manages Chrome storage operations:
- Data persistence
- Settings storage
- Cache management

```typescript
const storage = StorageManager.getInstance();
await storage.saveData({ key: 'value' });
```

### Form Handling

#### FormMapper (`src/lib/formMapper.ts`)
Handles form field detection and filling:
- Field detection
- Value mapping
- Form filling

```typescript
const mapper = FormMapper.getInstance();
const fields = mapper.detectFormFields();
```

### UI Components

#### PopupApp (`src/components/popup/PopupApp.tsx`)
Main extension popup:
- Data source status
- Form filling controls
- Settings access

#### Options (`src/components/options/Options.tsx`)
Extension configuration:
- Data source settings
- Field mappings
- Auto-fill preferences

## Development Workflow

### 1. Local Development

Start the development server:
```bash
npm run dev
```

### 2. Testing

Run tests:
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### 3. Building

Build the extension:
```bash
npm run build:extension
```

### 4. Loading in Chrome

1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable Developer mode
4. Click "Load unpacked"
5. Select the build directory

## Testing

### Unit Tests
- Located in `__tests__` directories
- Uses Jest and React Testing Library
- Mock Chrome API available in `src/test/mocks/chrome.ts`

Example test:
```typescript
import { render, screen } from '@testing-library/react';
import { PopupApp } from '../PopupApp';

describe('PopupApp', () => {
  it('renders correctly', () => {
    render(<PopupApp />);
    expect(screen.getByText('Form Auto Filler')).toBeInTheDocument();
  });
});
```

### Chrome API Mocking

```typescript
import { mockChromeAPI } from '../../test/mocks/chrome';

// Mock chrome.storage
mockChromeAPI.storage.local.get.mockResolvedValue({
  data: { key: 'value' }
});
```

## Building and Deployment

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build:extension
```

### Extension Loading

1. Build the extension
2. Open Chrome Extensions page
3. Load unpacked extension
4. Select the `out` directory

## Best Practices

1. **Code Organization**
   - Keep components small and focused
   - Use TypeScript for type safety
   - Follow React best practices

2. **State Management**
   - Use Chrome storage for persistence
   - Keep UI state in React components
   - Use context for shared state

3. **Testing**
   - Write tests for all new features
   - Maintain high coverage
   - Mock external dependencies

4. **Security**
   - Validate all input data
   - Secure storage of sensitive information
   - Follow Chrome extension security guidelines

## Troubleshooting

Common issues and solutions:

1. **Extension not updating**
   - Clear Chrome extension cache
   - Rebuild and reload extension

2. **Storage errors**
   - Check storage quota
   - Verify permissions in manifest

3. **Form detection issues**
   - Check form field selectors
   - Verify page load timing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## Resources

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com/material-ui/)
