// styles.ts
import { styled } from '@mui/material/styles';
import { 
  Card, Paper, TextField, Button, Typography,
  Tabs,
  IconButton,
  Box
} from '@mui/material';

export const StyledCard = styled(Card)(() => ({
  borderRadius: 12,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#ffffff',
}));

export const ReviewCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
  marginBottom: theme.spacing(2),
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  overflow: 'hidden',
  border: '1px solid',
  borderColor: theme.palette.divider,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.12)',
  },
}));

export const EmptyState = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
  borderRadius: 16,
  border: `1px dashed ${theme.palette.divider}`,
  margin: theme.spacing(2, 0),
}));

export const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    overflow: 'hidden',
  },
  '&  .MuiOutlinedInput-notchedOutline': {
    border: 'none',  
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  textTransform: 'none',
  padding: '12px 24px',
  fontWeight: 600,
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    background: theme.palette.primary.dark,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
  transition: 'all 0.3s ease',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
}));

export const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.75rem',
  marginTop: theme.spacing(0.5),
  gap: theme.spacing(0.5),
}));

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiTab-root': {
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '1rem',
    minWidth: 100,
  },
}));

export const StyledCommentCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
  },
  marginBottom: theme.spacing(2),
  overflow: 'visible',
  background: theme.palette.mode === 'dark' ? 
    'linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 100%)' : 
    'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)'
}));

export const ActionsButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
  '&:hover': {
    backgroundColor: theme.palette.background.default,
  },
  transition: 'all 0.2s ease',
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  borderRadius: theme.spacing(2),
  textTransform: 'none',
  padding: theme.spacing(0.5, 2),
  fontWeight: 600,
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  '&:hover': {
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
  },
}));

export const TimeDisplay = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
  '& svg': {
    fontSize: '0.875rem',
    marginRight: theme.spacing(0.5),
  },
}));

export const ExpandButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  textTransform: 'none',
  color: theme.palette.primary.main,
  padding: theme.spacing(0),
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.dark,
    textDecoration: 'underline',
  },
}));