import { DataFetcher } from '../dataFetcher';
import axios from 'axios';
import { DataSource } from '../../types';

jest.mock('axios');
jest.mock('pdfjs-dist', () => ({
  getDocument: jest.fn().mockResolvedValue({
    getPage: jest.fn().mockResolvedValue({
      getTextContent: jest.fn().mockResolvedValue({
        items: [{ str: 'Test Content' }]
      })
    }),
    numPages: 1
  }),
  GlobalWorkerOptions: { workerSrc: '' }
}));

describe('DataFetcher', () => {
  const mockAxios = axios as jest.Mocked<typeof axios>;
  let dataFetcher: DataFetcher;

  beforeEach(() => {
    dataFetcher = DataFetcher.getInstance();
    jest.clearAllMocks();
  });

  describe('fetchData', () => {
    it('fetches data from API', async () => {
      const mockData = { fields: [{ id: '1', name: 'test', value: 'value', type: 'text' }] };
      mockAxios.get.mockResolvedValueOnce({ data: mockData });

      const source: DataSource = {
        type: 'api',
        endpoint: 'https://api.example.com',
        authToken: 'token123'
      };

      const result = await dataFetcher.fetchData(source);
      expect(result).toEqual(mockData);
      expect(mockAxios.get).toHaveBeenCalledWith(
        'https://api.example.com',
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer token123'
          })
        })
      );
    });

    it('processes text content', async () => {
      const source: DataSource = {
        type: 'text',
        content: '{"fields":[{"id":"1","name":"test","value":"value","type":"text"}]}'
      };

      const result = await dataFetcher.fetchData(source);
      expect(result).toEqual({
        fields: [{ id: '1', name: 'test', value: 'value', type: 'text' }]
      });
    });

    it('processes PDF file', async () => {
      const source: DataSource = {
        type: 'pdf',
        fileName: 'test.pdf',
        fileData: new ArrayBuffer(0),
        mimeType: 'application/pdf'
      };

      const result = await dataFetcher.fetchData(source);
      expect(result).toEqual({
        fields: expect.arrayContaining([
          expect.objectContaining({
            type: 'text',
            value: expect.any(String)
          })
        ])
      });
    });

    it('processes JSON file', async () => {
      const mockData = { fields: [{ id: '1', name: 'test', value: 'value', type: 'text' }] };
      const encoder = new TextEncoder();
      const source: DataSource = {
        type: 'file',
        fileName: 'test.json',
        fileData: encoder.encode(JSON.stringify(mockData)).buffer as ArrayBuffer,
        mimeType: 'application/json'
      };

      const result = await dataFetcher.fetchData(source);
      expect(result).toEqual(mockData);
    });

    it('throws error for invalid API endpoint', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Network error'));

      const source: DataSource = {
        type: 'api',
        endpoint: 'invalid-url'
      };

      await expect(dataFetcher.fetchData(source))
        .rejects.toThrow('Failed to fetch data from API');
    });

    it('throws error for invalid JSON content', async () => {
      const source: DataSource = {
        type: 'text',
        content: 'invalid json'
      };

      await expect(dataFetcher.fetchData(source))
        .rejects.toThrow('Invalid JSON format');
    });

    it('throws error for missing file data', async () => {
      const source: DataSource = {
        type: 'file',
        fileName: 'test.json',
        fileData: new ArrayBuffer(0),
        mimeType: 'application/json'
      };

      await expect(dataFetcher.fetchData(source))
        .rejects.toThrow('Empty file data');
    });

    it('throws error for missing text content', async () => {
      const source: DataSource = {
        type: 'text',
        content: ''
      };

      await expect(dataFetcher.fetchData(source))
        .rejects.toThrow('No text content provided');
    });

    it('throws error for missing PDF data', async () => {
      const source: DataSource = {
        type: 'pdf',
        fileName: 'test.pdf',
        fileData: new ArrayBuffer(0),
        mimeType: 'application/pdf'
      };

      await expect(dataFetcher.fetchData(source))
        .rejects.toThrow('Empty PDF file');
    });

    it('throws error for unsupported file type', async () => {
      const source: DataSource = {
        type: 'file',
        fileName: 'test.jpg',
        fileData: new ArrayBuffer(0),
        mimeType: 'image/jpeg'
      };

      await expect(dataFetcher.fetchData(source))
        .rejects.toThrow('Unsupported file type');
    });
  });

  describe('getInstance', () => {
    it('returns the same instance', () => {
      const instance1 = DataFetcher.getInstance();
      const instance2 = DataFetcher.getInstance();
      expect(instance1).toBe(instance2);
    });
  });
});
