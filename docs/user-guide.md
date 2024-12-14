# Form Auto Filler - User Guide

## Introduction

Form Auto Filler is a powerful browser extension that helps you automatically fill out web forms using data from various sources. This guide will help you get started and make the most of the extension's features.

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Features](#features)
4. [Configuration](#configuration)
5. [Troubleshooting](#troubleshooting)
6. [FAQ](#faq)

## Installation

1. Download the extension from the Chrome Web Store (or load unpacked for development)
2. Click the extension icon in your browser toolbar to verify installation
3. Click "Settings" to configure the extension

## Quick Start

### Basic Usage

1. Click the Form Auto Filler icon in your toolbar
2. Configure your data source in Settings
3. Navigate to any web form
4. Click "Auto Fill" to automatically fill the form

### First-Time Setup

1. Open extension settings
2. Choose your data source:
   - API endpoint
   - Local file
3. Configure authentication if needed
4. Test the connection
5. Start using auto-fill!

## Features

### 1. Smart Form Detection

- Automatically detects form fields
- Supports various input types:
  - Text inputs
  - Checkboxes
  - Radio buttons
  - Dropdowns
  - Text areas

### 2. Multiple Data Sources

#### API Integration
- Connect to REST APIs
- Secure authentication
- Automatic data refresh

#### Local File Support
- JSON file format
- Secure local storage
- Easy data updates

### 3. Field Mapping

- Automatic field detection
- Custom field mapping
- Smart type inference
- Value transformation

### 4. Auto-Fill Options

- One-click form filling
- Automatic fill on page load
- Field validation
- Error handling

## Configuration

### Data Source Settings

1. Open extension options
2. Select "Data Source" tab
3. Choose source type:
   ```
   API Endpoint:
   - Enter API URL
   - Add authentication token
   - Test connection

   Local File:
   - Upload JSON file
   - Verify data format
   - Save configuration
   ```

### Field Mapping

1. Navigate to "Field Mapping" tab
2. Review detected fields
3. Customize mappings:
   ```
   Form Field -> Data Field
   First Name -> firstName
   Last Name  -> lastName
   Email      -> emailAddress
   ```

### Auto-Fill Settings

Configure auto-fill behavior:
- [ ] Auto-fill on page load
- [ ] Prompt before filling
- [ ] Skip certain fields
- [ ] Transform values

## Troubleshooting

### Common Issues

1. **Forms Not Detected**
   - Refresh the page
   - Check if form is dynamically loaded
   - Verify field selectors

2. **Data Not Loading**
   - Check internet connection
   - Verify API endpoint
   - Check authentication token
   - Validate file format

3. **Incorrect Field Mapping**
   - Review field mappings
   - Check data format
   - Update field selectors

### Error Messages

| Error | Solution |
|-------|----------|
| "Failed to load data" | Check data source configuration |
| "Invalid field mapping" | Review field mappings |
| "Network error" | Check internet connection |
| "Authentication failed" | Verify API token |

## FAQ

### General Questions

**Q: How does the extension detect form fields?**
A: The extension uses smart field detection algorithms to identify form fields based on their attributes, labels, and context.

**Q: Can I use multiple data sources?**
A: Currently, you can configure one data source at a time, but you can easily switch between different sources.

**Q: Is my data secure?**
A: Yes, all data is stored locally in your browser and is never sent to external servers unless you configure an API endpoint.

### Data Sources

**Q: What file formats are supported?**
A: Currently, the extension supports JSON files. Support for CSV and other formats is planned.

**Q: Can I use a REST API?**
A: Yes, you can configure any REST API that returns JSON data.

### Field Mapping

**Q: How does automatic field mapping work?**
A: The extension uses field names, labels, and common patterns to suggest mappings automatically.

**Q: Can I customize field mappings?**
A: Yes, you can fully customize how form fields map to your data fields.

## Tips & Tricks

1. **Keyboard Shortcuts**
   - `Ctrl+Shift+F`: Quick fill
   - `Ctrl+Shift+R`: Refresh data
   - `Ctrl+Shift+O`: Open options

2. **Data Format**
   ```json
   {
     "firstName": "John",
     "lastName": "Doe",
     "email": "john@example.com"
   }
   ```

3. **Field Selection**
   - Use specific selectors
   - Test on different forms
   - Save common mappings

## Support

Need help? Contact us:
- GitHub Issues
- Email Support
- Documentation

## Updates

Check for updates:
1. Chrome Extensions page
2. Extension options
3. Release notes

Stay updated with new features and improvements!
