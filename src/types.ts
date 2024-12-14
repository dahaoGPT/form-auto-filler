export interface ApiDataSource {
  type: 'api';
  endpoint: string;
  authToken?: string;
}

export interface FileDataSource {
  type: 'file';
  fileName: string;
  fileData: ArrayBuffer;
  mimeType: string;
}

export interface TextDataSource {
  type: 'text';
  content: string;
}

export interface PdfDataSource {
  type: 'pdf';
  fileData: ArrayBuffer;
  mimeType: string;
  fileName: string;
}

export interface StorageDataSource {
  type: 'storage';
  content: string;
}

export type DataSource = ApiDataSource | FileDataSource | TextDataSource | PdfDataSource | StorageDataSource;

export interface FormField {
  id: string;
  name: string;
  type: string;
  value: string;
  label?: string;
  required?: boolean;
  options?: string[];
}

export interface FormData {
  fields: FormField[];
}

export interface FormState {
  fields: FormField[];
  loading: boolean;
  error: string | null;
}

export interface FieldMapping {
  sourceField: string;
  selector: string;
  value: string;
  type: string;
}

export interface StorageSettings {
  autoFill: boolean;
  fillDelay: number;
  apiEndpoint?: string;
  apiKey?: string;
}

export interface StorageData {
  dataSource: DataSource | null;
  lastUpdate: number | null;
  formData: FormData | null;
  settings: StorageSettings;
  mappings: FieldMapping[];
}
