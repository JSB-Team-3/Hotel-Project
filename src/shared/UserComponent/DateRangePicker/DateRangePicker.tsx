import React, { memo, useCallback } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import { DateRange, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useTranslation } from 'react-i18next';

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

  const handleSelectDateRange = useCallback(
    (ranges: RangeKeyDict) => {
      const { startDate, endDate } = ranges.selection;
      setDates({ startDate: startDate ?? null, endDate: endDate ?? null });
    },
    [setDates]
  );

  return (
    <Box mt={2}>
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
          backgroundColor: theme.palette.primary.main, // Use the primary color from the theme
          color: theme.palette.getContrastText(theme.palette.primary.main), // Get contrast text for the button based on the theme
          '&:hover': {
            backgroundColor: theme.palette.primary.dark, // Use darker shade on hover for better contrast
          },
        }}
        variant="outlined"
      >
        {t('date_paker.confirm_dates')}
      </Button>
    </Box>
  );
};

export default memo(DateRangePicker);
