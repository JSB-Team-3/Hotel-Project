import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { HeaderProps } from '../../../Interfaces/props.interface';
export default function Header({title,route}:HeaderProps) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
                <Typography variant='h6' sx={{ mb: '0', color: '#1F263E' }}>{title} Table Details</Typography>
                <Box component='span' sx={{ mt: '0', color: '#323C47', fontSize: '14px' }}>You can check all details</Box>
            </Box>
            <Button component={Link} to={route} variant='contained' sx={{ backgroundColor: "#203FC7", color: 'white', fontWeight: 'bold', paddingInline: '30px' }}>Add New Room</Button>
        </Box>
    )

}
