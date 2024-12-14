import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { DataSource } from '../../types';

interface StatusPanelProps {
  loading: boolean;
  lastUpdate: Date | null;
  dataSource: DataSource | null;
}

export const StatusPanel: React.FC<StatusPanelProps> = ({
  loading,
  lastUpdate,
  dataSource,
}) => {
  const getDataSourceDescription = (source: DataSource): string => {
    switch (source.type) {
      case 'api':
        return `API: ${source.endpoint}`;
      case 'file':
        return `File: ${source.fileName}`;
      case 'text':
        return 'Text Input';
      case 'pdf':
        return `PDF: ${source.fileName}`;
      default:
        return 'Unknown Source';
    }
  };

  return (
    <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
      {loading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CircularProgress size={20} />
          <Typography variant="body2">Loading...</Typography>
        </Box>
      ) : (
        <>
          {dataSource && (
            <Typography variant="body2" gutterBottom>
              Source: {getDataSourceDescription(dataSource)}
            </Typography>
          )}
          {lastUpdate && (
            <Typography variant="body2" color="text.secondary">
              Last updated: {lastUpdate.toLocaleString()}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default StatusPanel;
