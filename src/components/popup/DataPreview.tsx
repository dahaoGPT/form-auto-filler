import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import type { FormData } from '../../types';

interface DataPreviewProps {
  data: FormData;
}

export const DataPreview: React.FC<DataPreviewProps> = ({ data }) => {
  if (!data.fields || data.fields.length === 0) {
    return (
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography>No form data available</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ mb: 2 }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Field Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.fields.map((field, index) => (
              <TableRow key={field.id || index}>
                <TableCell>{field.name || field.label || 'Unnamed Field'}</TableCell>
                <TableCell>{field.type}</TableCell>
                <TableCell>
                  {field.type === 'select' && field.options ? (
                    <Box component="span" sx={{ color: 'text.secondary' }}>
                      {field.value} (Options: {field.options.join(', ')})
                    </Box>
                  ) : (
                    field.value || <Box component="span" sx={{ color: 'text.disabled' }}>Empty</Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DataPreview;
