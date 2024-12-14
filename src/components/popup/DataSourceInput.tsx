import React, { useState, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Paper,
} from '@mui/material';
import type { DataSource } from '../../types';

interface DataSourceInputProps {
  onSubmit: (source: DataSource) => void;
}

export const DataSourceInput: React.FC<DataSourceInputProps> = ({ onSubmit }) => {
  const [sourceType, setSourceType] = useState<DataSource['type']>('api');
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [textContent, setTextContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (sourceType === 'api') {
      onSubmit({
        type: 'api',
        endpoint: apiEndpoint,
        authToken: apiKey,
      });
    } else if (sourceType === 'text') {
      onSubmit({
        type: 'text',
        content: textContent,
      });
    } else if (fileInputRef.current?.files?.[0]) {
      const file = fileInputRef.current.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result instanceof ArrayBuffer) {
          onSubmit({
            type: file.type.includes('pdf') ? 'pdf' : 'file',
            fileName: file.name,
            fileData: e.target.result,
            mimeType: file.type,
          });
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Data Source Type</InputLabel>
          <Select
            value={sourceType}
            label="Data Source Type"
            onChange={(e) => setSourceType(e.target.value as DataSource['type'])}
          >
            <MenuItem value="api">API</MenuItem>
            <MenuItem value="file">File Upload</MenuItem>
            <MenuItem value="text">Text Input</MenuItem>
            <MenuItem value="pdf">PDF Document</MenuItem>
          </Select>
        </FormControl>

        {sourceType === 'api' ? (
          <>
            <TextField
              fullWidth
              label="API Endpoint"
              value={apiEndpoint}
              onChange={(e) => setApiEndpoint(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="API Key (Optional)"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              type="password"
              sx={{ mb: 2 }}
            />
          </>
        ) : sourceType === 'text' ? (
          <TextField
            fullWidth
            label="Data Content"
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            multiline
            rows={4}
            sx={{ mb: 2 }}
            required
          />
        ) : (
          <Box sx={{ mb: 2 }}>
            <input
              type="file"
              ref={fileInputRef}
              accept={sourceType === 'pdf' ? '.pdf' : '.json,.csv'}
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    if (e.target?.result instanceof ArrayBuffer) {
                      onSubmit({
                        type: file.type.includes('pdf') ? 'pdf' : 'file',
                        fileName: file.name,
                        fileData: e.target.result,
                        mimeType: file.type,
                      });
                    }
                  };
                  reader.readAsArrayBuffer(file);
                }
              }}
            />
            <Button
              variant="outlined"
              onClick={() => fileInputRef.current?.click()}
              fullWidth
            >
              Choose {sourceType === 'pdf' ? 'PDF' : 'File'}
            </Button>
            {fileInputRef.current?.files?.[0] && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected file: {fileInputRef.current.files[0].name}
              </Typography>
            )}
          </Box>
        )}

        {(sourceType === 'api' || sourceType === 'text') && (
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        )}
      </form>
    </Paper>
  );
};

export default DataSourceInput;
