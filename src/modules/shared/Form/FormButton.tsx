import React from 'react';
import { CircularProgress, Stack, Button } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';

interface FormButtonProps {
  isSubmitting: boolean;
  color?: ButtonProps['color'];
  name?: string;
}

const FormButton: React.FC<FormButtonProps> = ({ isSubmitting, color = 'primary', name = "Submit" }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      color={color}
      disabled={isSubmitting}
      fullWidth
      sx={{ mt: 2 }}
      startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
    >
      {isSubmitting ? 'Submitting...' : name}
    </Button>
  );
};

export default FormButton;
