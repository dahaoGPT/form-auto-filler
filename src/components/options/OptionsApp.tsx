import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Container,
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  Switch,
  TextField,
  Button,
  Alert,
  Paper,
} from '@mui/material';
import { StorageManager } from '../../lib/storageManager';
import type { StorageData } from '../../types';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

interface OptionsState {
  autoFill: boolean;
  apiEndpoint: string;
  apiKey: string;
  error: string | null;
  saved: boolean;
}

const OptionsApp: React.FC = () => {
  const [state, setState] = useState<OptionsState>({
    autoFill: false,
    apiEndpoint: '',
    apiKey: '',
    error: null,
    saved: false,
  });

  const handleSave = async () => {
    try {
      const storage = StorageManager.getInstance();
      await storage.saveData({
        settings: {
          autoFill: state.autoFill,
          apiEndpoint: state.apiEndpoint,
          apiKey: state.apiKey,
          fillDelay: 500,
        },
        mappings: [],
      } satisfies Partial<StorageData>);
      setState(prev => ({ ...prev, saved: true, error: null }));
      setTimeout(() => {
        setState(prev => ({ ...prev, saved: false }));
      }, 3000);
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to save settings',
      }));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Form Auto Filler Settings
        </Typography>

        <Paper sx={{ p: 3, mt: 3 }}>
          {state.error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {state.error}
            </Alert>
          )}

          {state.saved && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Settings saved successfully!
            </Alert>
          )}

          <Box component="form" noValidate autoComplete="off">
            <FormControl fullWidth sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.autoFill}
                    onChange={(e) =>
                      setState(prev => ({ ...prev, autoFill: e.target.checked }))
                    }
                  />
                }
                label="Enable Auto Fill"
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <TextField
                label="API Endpoint"
                value={state.apiEndpoint}
                onChange={(e) =>
                  setState(prev => ({ ...prev, apiEndpoint: e.target.value }))
                }
                helperText="Enter the API endpoint for data source"
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <TextField
                label="API Key"
                type="password"
                value={state.apiKey}
                onChange={(e) =>
                  setState(prev => ({ ...prev, apiKey: e.target.value }))
                }
                helperText="Enter your API key (if required)"
              />
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              fullWidth
            >
              Save Settings
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default OptionsApp;
