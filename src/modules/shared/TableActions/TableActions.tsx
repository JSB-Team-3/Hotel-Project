import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import React from 'react'
import { TableActionProps } from '../../../Interfaces/props.interface';

export default function TableActions({handleDeleteItem,item,route}:TableActionProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box component={'div'}  >
            <IconButton onClick={handleClick}>
                <MoreHorizIcon />
            </IconButton>
            <Menu
                sx={{width:200}}
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
                        borderRadius:'20px'
                      },
                    },
                  }}
            >
                <MenuItem onClick={handleClose} sx={{'&:hover':{'backgroundColor':'#F8F9FB'}}} >
                    <ListItemIcon>
                        <VisibilityIcon sx={{'color':'#203FC7'}} />
                    </ListItemIcon>
                    <ListItemText primary="View" />
                </MenuItem>
                {route && <MenuItem component={Link} to={route} onClick={handleClose} sx={{'&:hover':{'backgroundColor':'#F8F9FB'}}}>
                    <ListItemIcon>
                        <EditIcon sx={{'color':'#203FC7'}} />
                    </ListItemIcon>
                    <ListItemText primary="Edit" />
                </MenuItem>}
                <MenuItem onClick={() => { 
                    handleClose(); 
                    if ('roomNumber' in item) {
                        handleDeleteItem(item._id, item.roomNumber);
                    } else if ('user' in item) {
                        handleDeleteItem(item._id, item.user.userName);
                    }
                }} sx={{'&:hover':{'backgroundColor':'#F8F9FB'}}}>
                    <ListItemIcon>
                        <DeleteIcon sx={{'color':'#203FC7'}} />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                </MenuItem>
            </Menu>
        </Box>
    )
}

