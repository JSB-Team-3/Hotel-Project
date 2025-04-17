import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import RightAuthLayout from '../RightAuthLayout/RightAuthLayout';
const AuthLayout = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box >
              <Typography variant="h1" sx={{ fontSize: 26, fontWeight: 'medium', paddingInlineStart: '20px' }}>
                <Box component="span" sx={{ color: '#152C5B' }}>
                  stay
                </Box>
                <Box component="span" sx={{ color: '#3252DF' }}>
                  cation.
                </Box>
              </Typography>
            </Box>
            <Box sx={{ paddingBlockStart: '83px', paddingInlineStart: '74px' }}>
              <Outlet />
            </Box>
          </Grid>
          <Grid size={6} sx={{display: {xs:'none', sm:'block'}}} >
           <RightAuthLayout/>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default AuthLayout