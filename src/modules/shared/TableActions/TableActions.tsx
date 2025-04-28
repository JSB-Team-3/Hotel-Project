
import React, { useState, useCallback } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import ViewDataModal from '../ViewDataModal/ViewDataModal'; // Assuming this is a lazy-loaded modal
import { TableActionProps } from '../../../Interfaces/props.interface';

export default function TableActions({ handleDeleteItem, item, route }: TableActionProps) {
  const theme = useTheme();
  
  // Memoize state variables to avoid unnecessary renders
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openviewModal, setViewOpen] = useState(false);
  
  const open = Boolean(anchorEl);

  // Memoize functions to avoid creating new function instances on every render
  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);
  const handleCloseViewModal = useCallback(() => {
    setViewOpen(false);
    handleClose();
  }, []);


  const handleView = useCallback(() => {
    setViewOpen(true);
  }, []);

  const handleDelete = useCallback(() => {
    handleClose();
    if ('roomNumber' in item) {
      if(item.roomNumber)handleDeleteItem(item._id, item.roomNumber);
    } else if ('user' in item) {
      if(item.user)handleDeleteItem(item._id, item.user.userName);
    }
  }, [handleClose, item, handleDeleteItem]);


  return (
    <>
      <Box component={'div'}>
        <IconButton onClick={handleClick} sx={{ color: 'inherit' }}>
          <MoreHorizIcon />
        </IconButton>
        <Menu
          sx={{ width: 200 }}
          id="table-actions-menu"
          aria-labelledby="table-actions-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          slotProps={{
            paper: {
              sx: {
                width: '174px',
                borderRadius: '20px',
                backgroundColor: theme.palette.background.paper,
              },
            },
          }}
        >
          <MenuItem
            onClick={handleView}
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon>
              <VisibilityIcon sx={{ color: '#203FC7' }} />
            </ListItemIcon>
            <ListItemText primary="View" />
          </MenuItem>
          {route && (
            <MenuItem
              component={Link}
              to={route}
              onClick={handleClose}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon>
                <EditIcon sx={{ color: '#203FC7' }} />
              </ListItemIcon>
              <ListItemText primary="Edit" />
            </MenuItem>
          )}
       
          {'email' in item || (
            <MenuItem
              onClick={handleDelete}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon>
                <DeleteIcon sx={{ color: '#203FC7' }} />
              </ListItemIcon>
              <ListItemText primary="Delete" />
            </MenuItem>
          )}
        </Menu>
      </Box>
      <ViewDataModal open={openviewModal} handleClose={handleCloseViewModal} data={item} />
    </>
  );
}
