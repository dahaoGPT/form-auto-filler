# Form Auto Filler - API Reference

## Core Libraries

### DataFetcher

```typescript
interface DataSource {
  type: 'api' | 'file';
  endpoint?: string;
  authToken?: string;
}

class DataFetcher {
  static getInstance(): DataFetcher;
  
  async fetchFromApi(
    endpoint: string, 
    authToken?: string
  ): Promise<FormData>;
  
  async parseFile(file: File): Promise<FormData>;
  
  async getData(source: DataSource): Promise<FormData>;
  
  clearCache(): void;
}
```

### StorageManager

```typescript
interface StorageData {
  dataSource: DataSource;
  fieldMappings: Record<string, string>;
  lastUpdate?: number;
}

class StorageManager {
  static getInstance(): StorageManager;
  
  async saveData(data: Partial<StorageData>): Promise<void>;
  
  async getData<T extends keyof StorageData>(
    key: T
  ): Promise<StorageData[T] | null>;
  
  async clearData(): Promise<void>;
  
  async removeData(keys: string[]): Promise<void>;
}
```

### FormMapper

```typescript
interface FieldMapping {
  selector: string;
  value: string;
  type?: string;
}

class FormMapper {
  static getInstance(): FormMapper;
  
  fillForm(
    mappings: Record<string, FieldMapping>,
    data: Record<string, any>
  ): void;
  
  detectFormFields(): Record<string, FieldMapping>;
}
```

## Utilities

### Field Detection

```typescript
interface FieldInfo {
  name: string;
  type: string;
  selector: string;
  label?: string;
  required?: boolean;
}

function detectFormFields(form: HTMLFormElement): FieldInfo[];

function inferFieldType(
  fieldName: string,
  value: string
): string;

function validateFieldValue(
  value: string,
  type: string
): boolean;

function suggestFieldMapping(
  sourceFields: Record<string, any>,
  formFields: FieldInfo[]
): Record<string, string>;
```

### Data Transformation

```typescript
interface TransformRule {
  type: 'format' | 'replace' | 'split' | 'join' | 'custom';
  params?: any;
  customFn?: (value: any) => any;
}

class DataTransformer {
  static getInstance(): DataTransformer;
  
  transform(value: any, rules: TransformRule[]): any;
}

// Helper functions
const transformers = {
  capitalize: (value: string) => string;
  titleCase: (value: string) => string;
  trim: (value: string) => string;
  normalizeEmail: (value: string) => string;
  normalizePhone: (value: string) => string;
};
```

### Messaging Service

```typescript
type MessageHandler = (
  message: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) => void | boolean | Promise<void>;

class MessagingService {
  static getInstance(): MessagingService;
  
  addHandler(type: string, handler: MessageHandler): void;
  
  removeHandler(type: string, handler: MessageHandler): void;
  
  async sendMessage(type: string, data?: any): Promise<any>;
  
  async sendToContentScript(
    tabId: number,
    type: string,
    data?: any
  ): Promise<any>;
  
  async broadcastToAllTabs(
    type: string,
    data?: any
  ): Promise<void>;
}

const MESSAGE_TYPES = {
  FILL_FORM: 'FILL_FORM',
  DETECT_FIELDS: 'DETECT_FIELDS',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  FETCH_DATA: 'FETCH_DATA',
  DATA_UPDATED: 'DATA_UPDATED',
  ERROR: 'ERROR',
};
```

## React Components

### PopupApp

```typescript
const PopupApp: React.FC = () => {
  // Main popup container
};
```

### Options

```typescript
const Options: React.FC = () => {
  // Extension options page
};
```

### Form Components

```typescript
interface ActionPanelProps {
  loading: boolean;
  disabled: boolean;
  onFill: () => void;
  onRefresh: () => void;
}

const ActionPanel: React.FC<ActionPanelProps>;

interface StatusPanelProps {
  dataSource: DataSource | null;
  lastUpdate: Date | null;
  formFieldsCount: number;
  error: string | null;
}

const StatusPanel: React.FC<StatusPanelProps>;

interface HeaderProps {
  onOpenOptions: () => void;
}

const Header: React.FC<HeaderProps>;

const DataPreview: React.FC;
```

## Hooks

### useFormState

```typescript
interface FormField {
  name: string;
  type: string;
  value: any;
  error?: string;
  required?: boolean;
}

interface UseFormStateProps {
  initialFields: FormField[];
  onSubmit?: (values: Record<string, any>) => void;
}

function useFormState({
  initialFields,
  onSubmit
}: UseFormStateProps): {
  fields: FormField[];
  isSubmitting: boolean;
  submitError: string | null;
  handleChange: (name: string, value: any) => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  resetForm: () => void;
  setFieldValue: (name: string, value: any) => void;
  setFieldError: (name: string, error: string) => void;
  validateForm: () => boolean;
};
```

## Configuration

### Default Config

```typescript
const DEFAULT_CONFIG = {
  dataSource: {
    type: 'api' as const,
    endpoint: '',
    authToken: '',
  },
  autoFill: false,
  refreshInterval: 3600000, // 1 hour
  maxCacheAge: 86400000,    // 24 hours
};

const FIELD_TYPES = {
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

const STORAGE_KEYS = {
  DATA_SOURCE: 'dataSource',
  FIELD_MAPPINGS: 'fieldMappings',
  AUTO_FILL: 'autoFill',
  LAST_UPDATE: 'lastUpdate',
  CACHED_DATA: 'cachedData',
} as const;
```

## Testing Utilities

### Chrome API Mocks

```typescript
export const createMockChromeAPI = () => ({
  runtime: {
    sendMessage: jest.fn(),
    onMessage: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
    lastError: null,
    getManifest: jest.fn(() => ({ version: '1.0.0' })),
  },
  storage: {
    local: {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
      clear: jest.fn(),
    },
  },
  tabs: {
    query: jest.fn(),
    sendMessage: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
});
```
