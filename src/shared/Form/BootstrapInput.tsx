import { InputBase, styled, alpha } from '@mui/material';
import { margin } from '@mui/system';

const BootstrapInput = styled(InputBase)(({ theme, error }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    border: '1px solid',
    borderColor: error ? theme.palette.error.main : theme.palette.divider, // Use theme colors for border
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    margin:"10px 0px",
    transition: theme.transitions.create([
      'border-color',
      'box-shadow',
    ]),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&::placeholder': {
      color: theme.palette.text.primary, // Placeholder color for error
      opacity: 1, // Important for visibility
    },
    // Change box-shadow when focused and error occurs
    '&:focus': {
      boxShadow: error
        ? `0 0 0 0.2rem rgba(244, 67, 54, 0.25)` // Red box-shadow for error
        : `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`, // Primary color focus
      borderColor: error ? theme.palette.error.main : theme.palette.primary.main, // Border color based on theme
    },
  },
}));

export default BootstrapInput;
