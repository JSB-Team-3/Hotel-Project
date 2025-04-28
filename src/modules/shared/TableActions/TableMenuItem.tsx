import React from 'react';
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';

// Define the prop types for MenuItemMemo
interface MenuItemMemoProps {
  onClick: () => void;
  icon: React.ReactNode; // Can be an icon component like <VisibilityIcon />
  text: string;
  children?: React.ReactNode;
  component?:React.ElementType;
  to?:string
}

const MenuItemMemo: React.FC<MenuItemMemoProps> = React.memo(({ onClick, icon, text, children }) => (
  <MenuItem onClick={onClick} sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text || children} />
  </MenuItem>
));

export default MenuItemMemo;
