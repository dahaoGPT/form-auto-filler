import React from 'react';
import { Box, Button } from '@mui/material';
import { AutoFixHigh, Refresh } from '@mui/icons-material';

interface ActionPanelProps {
  onFill: () => void;
  onRefresh: () => void;
  disabled?: boolean;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({
  onFill,
  onRefresh,
  disabled = false
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button
        variant="contained"
        startIcon={<AutoFixHigh />}
        onClick={onFill}
        disabled={disabled}
        fullWidth
      >
        Auto Fill
      </Button>
      <Button
        variant="outlined"
        startIcon={<Refresh />}
        onClick={onRefresh}
        disabled={disabled}
      >
        Refresh
      </Button>
    </Box>
  );
};
