import React, { memo } from 'react';
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface UserMenuItemProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}

const UserMenuItem: React.FC<UserMenuItemProps> = memo(({ icon, text, onClick }) => {
  const theme = useTheme();  // Get the theme here

  return (
    <MenuItem
      onClick={onClick}
      sx={{
        minWidth: 200,
        '&:hover': {
          backgroundColor: theme.palette.action.hover, // Hover color from theme
        },
      }}
    >
      <ListItemIcon sx={{ color: theme.palette.text.primary }}> {/* Ensure icon color is based on theme */}
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} sx={{ color: theme.palette.text.primary }} /> {/* Text color based on theme */}
    </MenuItem>
  );
});

export default UserMenuItem;
