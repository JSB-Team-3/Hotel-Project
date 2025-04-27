import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'; // Import useTheme
import { HeaderProps } from '../../../Interfaces/props.interface';

export default function Header({ title, route }: HeaderProps) {
  const theme = useTheme(); // Get the current theme

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Box>
        <Typography
          variant='h6'
          sx={{ mb: '0', color: theme.palette.text.primary }} // Use theme text color
        >
          {title} Table Details
        </Typography>
        <Box component='span' sx={{ mt: '0', color: theme.palette.text.secondary, fontSize: '14px' }}>
          You can check all details
        </Box>
      </Box>
      {route && (
           <Button
           component={Link}
           to={route}
           variant="contained"
           sx={{
             backgroundColor: '#203FC7', 
             color: 'white', 
             fontWeight: 'bold',
             paddingInline: '30px',
             '&:hover': {
               backgroundColor: '#1A31A2', 
             },
           }}
         >
           Add New Room
         </Button>
      )}
    </Box>
  );
}
