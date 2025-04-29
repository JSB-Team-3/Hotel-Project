import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { toggleMode } from '../store/slices/themeSlice';

const ThemeToggle = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <Tooltip title="Toggle Mode">
      <IconButton onClick={() => dispatch(toggleMode())} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
