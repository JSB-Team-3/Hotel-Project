import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import { SIDEBAR_WIDTH_OPEN, SIDEBAR_WIDTH_CLOSED } from '../../constants/sidebar.constant';

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  width: open ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    width: open ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED,
    backgroundColor: theme.custom.blueMain,
    color: theme.custom.liteMain,
    overflow:"hidden",
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    ...(theme.direction === 'rtl' ? { right: 0, left: 'auto' } : {}),
  },
}));

export default StyledDrawer;
