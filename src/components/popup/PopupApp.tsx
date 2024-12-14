import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Alert, Button, CircularProgress } from '@mui/material';
import { DataSourceInput } from './DataSourceInput';
import { ActionPanel } from './ActionPanel';
import { StatusPanel } from './StatusPanel';
import { DataPreview } from './DataPreview';
import { StorageManager } from '../../lib/storageManager';
import { DataFetcher } from '../../lib/dataFetcher';
import type { StorageData, DataSource, FormData } from '../../types';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

interface PopupState {
  loading: boolean;
  error: string | null;
  data: FormData | null;
  dataSource: DataSource | null;
  lastUpdate: Date | null;
}

const PopupApp: React.FC = () => {
  const [state, setState] = useState<PopupState>({
    loading: false,
    error: null,
    data: null,
    dataSource: null,
    lastUpdate: null,
  });

  const handleDataSourceSubmit = async (source: DataSource) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await DataFetcher.getInstance().fetchData(source);
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        data,
        dataSource: source,
        lastUpdate: new Date(),
      }));
      await StorageManager.getInstance().saveData({
        dataSource: source,
        lastUpdate: Date.now(),
        formData: data,
        settings: {
          autoFill: true,
          fillDelay: 500,
        },
        mappings: [],
      } satisfies Partial<StorageData>);
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }));
    }
  };

  const handleFillForm = async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      // Send message to content script
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab.id && state.data) {
        await chrome.tabs.sendMessage(tab.id, { 
          type: 'FILL_FORM', 
          data: state.data.fields 
        });
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fill form'
      }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleRefresh = async () => {
    if (state.dataSource) {
      await handleDataSourceSubmit(state.dataSource);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Box sx={{ mb: 2 }}>
          <h2>Form Auto Filler</h2>
        </Box>

        {state.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {state.error}
          </Alert>
        )}

        {state.loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <DataSourceInput onSubmit={handleDataSourceSubmit} />
            
            {state.data && (
              <>
                <DataPreview data={state.data} />
                <ActionPanel 
                  onFill={handleFillForm} 
                  onRefresh={handleRefresh}
                  disabled={state.loading}
                />
              </>
            )}
            
            <StatusPanel 
              loading={state.loading}
              lastUpdate={state.lastUpdate}
              dataSource={state.dataSource}
            />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default PopupApp;
