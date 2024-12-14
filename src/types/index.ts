export interface FieldMapping {
  selector: string;
  value: string;
  type?: string;
  required?: boolean;
}

export interface DataSource {
  type: 'api' | 'file' | 'text' | 'pdf' | 'storage';
  endpoint?: string;
  authToken?: string;
  content?: string;
  fileData?: ArrayBuffer;
  fileName?: string;
  mimeType?: string;
}

export interface FormData {
  [key: string]: string | number | boolean;
}

export interface DataSourceConfig {
  source: DataSource;
  mappings: Record<string, FieldMapping>;
  lastUpdate?: number;
}

export interface StorageData {
  dataSource?: DataSource;
  lastUpdate?: number;
}