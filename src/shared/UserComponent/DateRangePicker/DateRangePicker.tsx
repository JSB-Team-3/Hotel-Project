import React, { memo, useCallback } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import { DateRange, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useTranslation } from 'react-i18next';
import { getDateRangePickerStyles } from './DateRangePickerStyles';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  setDates: React.Dispatch<React.SetStateAction<{ startDate: Date | null; endDate: Date | null }>>;
  handleConfirmDates: () => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  setDates,
  handleConfirmDates,
}) => {
  const { t } = useTranslation();
  const theme = useTheme(); // Access the MUI theme
  const isDarkMode = theme.palette.mode === 'dark';
  const styles = getDateRangePickerStyles(theme);
  const handleSelectDateRange = useCallback(
    (ranges: RangeKeyDict) => {
      const { startDate, endDate } = ranges.selection;
      setDates({ startDate: startDate ?? null, endDate: endDate ?? null });
    },
    [setDates]
  );


  return (
    <Box sx={styles.wrapper} >
      <DateRange
        ranges={[{ startDate: startDate ?? new Date(), endDate: endDate ?? new Date(), key: 'selection' }]}
        onChange={handleSelectDateRange}
        minDate={new Date()}
      />
      <Button
        onClick={handleConfirmDates}
        fullWidth
        sx={{
          mt: 2,
          backgroundColor: isDarkMode ? '#4361ee' : theme.palette.primary.main,
          color: '#ffffff',
          fontWeight: 'bold',
          padding: '10px 0',
          borderRadius: '8px',
          boxShadow: isDarkMode ? '0 4px 14px rgba(67, 97, 238, 0.5)' : 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: isDarkMode ? '#3b56d9' : theme.palette.primary.dark,
            boxShadow: isDarkMode ? '0 6px 18px rgba(67, 97, 238, 0.6)' : 'none',
          },
        }}
        variant="contained"
      >
        {t('date_paker.confirm_dates')}
      </Button>
    </Box>
  );
};

export default memo(DateRangePicker);
