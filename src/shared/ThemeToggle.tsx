import { IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { toggleMode } from '../store/slices/themeSlice';
import { useTranslation } from 'react-i18next';

interface ThemeToggleProps {
  color?: 'inherit' | 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ color = 'inherit' }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleToggle = () => {
    dispatch(toggleMode());
  };

  return (
    <Tooltip
      title={
        theme.palette.mode === 'dark'
          ? t('theme.lightMode')
          : t('theme.darkMode')
      }
    >
      <IconButton
        onClick={handleToggle}
        color={color}
        aria-label={t('theme.toggleLabel')}
        size={isMobile ? 'small' : 'medium'}
        sx={{
          ml: isMobile ? 0 : 1,
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
      >
        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
