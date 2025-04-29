import { styled } from '@mui/material/styles';
import { AppBar } from '@mui/material';
import { SIDEBAR_WIDTH_CLOSED, SIDEBAR_WIDTH_OPEN } from '../../constants/sidebar.constant';

export const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => {
  const isRTL = theme.direction === 'rtl';
  const width = open ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED;

  return {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[0],
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      [isRTL ? 'marginRight' : 'marginLeft']: width,
      width: `calc(100% - ${width}px)`,
    }),
    ...(!open && {
      [isRTL ? 'marginRight' : 'marginLeft']: width,
      width: `calc(100% - ${width}px)`,
    }),
  };
});
