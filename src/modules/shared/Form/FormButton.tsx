import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from '@mui/material';
import { LoadingButtonProps } from '@mui/lab/LoadingButton';

interface FormButtonProps {
  isSubmitting: boolean;
  color?: LoadingButtonProps['color'];
  name?: string;
}

const FormButton: React.FC<FormButtonProps> = ({ isSubmitting, color = 'primary' ,name="Submit" }) => {
  return (
    <LoadingButton
      type="submit"
      variant="contained"
      color={color}
      loading={isSubmitting}
      disabled={isSubmitting}
      fullWidth
      sx={{ mt: 2 }}
    >
      {isSubmitting ? (
        <Stack direction="row" alignItems="center" spacing={1}>
          <CircularProgress size={20} color="inherit" />
          <span>Submitting...</span>
        </Stack>
      ) : (
            name
      )}
    </LoadingButton>
  );
};

export default FormButton;
