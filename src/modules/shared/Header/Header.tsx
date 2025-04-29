import { Box, Button, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { HeaderProps } from '../../../Interfaces/props.interface';

export default function Header({ title, route, onAddClick }: HeaderProps) {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Box>
        <Typography variant='h6' sx={{ mb: '0',  color: theme.palette.text.primary }}>{title} Table Details</Typography>
        <Box component='span' sx={{ mt: '0', color: theme.palette.text.secondary, fontSize: '14px' }}>You can check all details</Box>
      </Box>
      {title==='Ads' && <Button  variant='contained' sx={{ backgroundColor: "#203FC7", color: 'white', fontWeight: 'bold', paddingInline: '30px' }}>Add New Ad</Button>}
      {title === "Room Facilities" ? (
        <Button
          onClick={onAddClick}
          variant='contained'
          sx={{ backgroundColor: "#203FC7", color: 'white', fontWeight: 'bold', paddingInline: '30px' }}
        >
          Add New Facility
        </Button>
      ) : route && (
        <Button component={Link} to={route} variant='contained' sx={{ backgroundColor: "#203FC7", color: 'white', fontWeight: 'bold', paddingInline: '30px' }}>
          Add New Room
        </Button>
      )}
    </Box>
  );
}