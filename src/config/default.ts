export const DEFAULT_CONFIG = {
  dataSource: {
    type: 'api' as const,
    endpoint: '',
    authToken: '',
  },
  autoFill: false,
  refreshInterval: 3600000, // 1 hour in milliseconds
  maxCacheAge: 86400000, // 24 hours in milliseconds
};

export const FIELD_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  NUMBER: 'number',
  TEL: 'tel',
  DATE: 'date',
  URL: 'url',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  SELECT: 'select',
  TEXTAREA: 'textarea',
} as const;

export const COMMON_FIELD_PATTERNS = {
  EMAIL: {
    pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
    message: 'Invalid email address',
  },
  PHONE: {
    pattern: /^\+?[\d\s-()]{8,}$/,
    message: 'Invalid phone number',
  },
  URL: {
    pattern: /^https?:\/\/.+\..+/,
    message: 'Invalid URL',
  },
  DATE: {
    pattern: /^\d{4}-\d{2}-\d{2}$/,
    message: 'Invalid date format (YYYY-MM-DD)',
  },
};

export const STORAGE_KEYS = {
  DATA_SOURCE: 'dataSource',
  FIELD_MAPPINGS: 'fieldMappings',
  AUTO_FILL: 'autoFill',
  LAST_UPDATE: 'lastUpdate',
  CACHED_DATA: 'cachedData',
} as const;

export const API_CONFIG = {
  timeout: 5000, // 5 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
};

export const UI_CONSTANTS = {
  POPUP_WIDTH: 400,
  POPUP_HEIGHT: 600,
  TOAST_DURATION: 3000,
  ANIMATION_DURATION: 300,
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Unable to connect to the server. Please check your internet connection.',
  AUTH_ERROR: 'Authentication failed. Please check your API token.',
  INVALID_DATA: 'Invalid data format received from the server.',
  STORAGE_ERROR: 'Error accessing browser storage.',
  PERMISSION_ERROR: 'Required permissions are not granted.',
} as const;
