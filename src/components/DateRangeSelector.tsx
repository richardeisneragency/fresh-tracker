import React from 'react';
import { Box, TextField } from '@mui/material';

interface Props {
  startDate?: string;
  endDate?: string;
  onDateChange: (start: string, end: string) => void;
}

const DateRangeSelector: React.FC<Props> = ({ startDate: initialStartDate, endDate: initialEndDate, onDateChange }) => {
  const [startDate, setStartDate] = React.useState(
    initialStartDate || new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = React.useState(
    initialEndDate || new Date().toISOString().split('T')[0]
  );

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = event.target.value;
    setStartDate(newStartDate);
    onDateChange(newStartDate, endDate);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = event.target.value;
    setEndDate(newEndDate);
    onDateChange(startDate, newEndDate);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <TextField
        type="date"
        label="Start Date"
        value={startDate}
        onChange={handleStartDateChange}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        type="date"
        label="End Date"
        value={endDate}
        onChange={handleEndDateChange}
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  );
};

export default DateRangeSelector;
