import axios from 'axios';
import type { DataSource, FormData, FormField } from '../types';
import * as pdfjs from 'pdfjs-dist';

// Import PDF.js worker
if (typeof window !== 'undefined' && 'Worker' in window) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}

export type { DataSource, FormData, FormField };

export class DataFetcher {
  private static instance: DataFetcher;
  private cache: Map<string, FormData> = new Map();

  private constructor() {}

  static getInstance(): DataFetcher {
    if (!DataFetcher.instance) {
      DataFetcher.instance = new DataFetcher();
    }
    return DataFetcher.instance;
  }

  async fetchData(source: DataSource): Promise<FormData> {
    switch (source.type) {
      case 'api':
        return this.fetchFromApi(source.endpoint || '', source.authToken);
      case 'file':
        if (source.fileData) {
          return this.parseFile(source.fileData, source.mimeType || '');
        }
        throw new Error('No file data provided');
      case 'text':
        if (source.content) {
          return this.parseTextContent(source.content);
        }
        throw new Error('No text content provided');
      case 'pdf':
        if (source.fileData) {
          return this.parsePdfContent(source.fileData);
        }
        throw new Error('No PDF data provided');
      case 'storage':
        if (source.content) {
          return this.parseTextContent(source.content);
        }
        throw new Error('No storage data provided');
      default:
        throw new Error('Unsupported data source type');
    }
  }

  async fetchFromApi(endpoint: string, authToken?: string): Promise<FormData> {
    try {
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
      const response = await axios.get(endpoint, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data from API:', error);
      throw error;
    }
  }

  private async parseFile(fileData: ArrayBuffer, mimeType: string): Promise<FormData> {
    try {
      if (mimeType === 'application/json') {
        const text = new TextDecoder().decode(fileData);
        return JSON.parse(text);
      } else if (mimeType === 'text/csv') {
        return this.parseCsvContent(new TextDecoder().decode(fileData));
      } else if (mimeType === 'application/pdf') {
        return this.parsePdfContent(fileData);
      }
      throw new Error('Unsupported file type');
    } catch (error) {
      console.error('Error parsing file:', error);
      throw error;
    }
  }

  private parseTextContent(content: string): FormData {
    try {
      // Try parsing as JSON first
      try {
        return JSON.parse(content);
      } catch {
        // If not JSON, try parsing as CSV
        return this.parseCsvContent(content);
      }
    } catch (error) {
      console.error('Error parsing text content:', error);
      throw error;
    }
  }

  private parseCsvContent(content: string): FormData {
    const lines = content.split('\n');
    if (lines.length < 2) {
      throw new Error('Invalid CSV format');
    }

    const headers = lines[0].split(',').map(h => h.trim());
    const values = lines[1].split(',').map(v => v.trim());
    
    const fields: FormField[] = headers.map((header, index) => ({
      id: `field-${index + 1}`,
      name: header,
      type: 'text',
      value: values[index] || ''
    }));

    return { fields };
  }

  private async parsePdfContent(fileData: ArrayBuffer): Promise<FormData> {
    try {
      const pdf = await pdfjs.getDocument({ data: fileData }).promise;
      const page = await pdf.getPage(1);
      const textContent = await page.getTextContent();
      
      // Extract text content from PDF
      const text = textContent.items
        .map((item: any) => item.str)
        .join(' ');

      // Try to parse the text as structured data
      return this.parseTextContent(text);
    } catch (error) {
      console.error('Error parsing PDF:', error);
      throw error;
    }
  }

  async getData(source: DataSource): Promise<FormData> {
    const cacheKey = source.type === 'api' ? source.endpoint! : 'file';
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    let data: FormData;
    data = await this.fetchData(source);

    this.cache.set(cacheKey, data);
    return data;
  }

  clearCache() {
    this.cache.clear();
  }
}
