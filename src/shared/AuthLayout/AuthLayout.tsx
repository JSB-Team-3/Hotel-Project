import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography} from '@mui/material';
import RightAuthLayout from '../RightAuthLayout/RightAuthLayout';
import ThemeToggle from '../ThemeToggle';
import LanguageSwitcher from '../LanguageSwithcer';
import { Logo } from '../UserComponent/Logo/Logo';
const AuthLayout = () => {
  return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{display:'flex', alignItems:"center",gap:1}} >
                <Logo/>
              <Typography variant="h1" sx={{ fontSize: 26, fontWeight: 'medium', paddingInlineStart:  '20px',marginInlineEnd:5 }}>
              <ThemeToggle color='primary' />
              <LanguageSwitcher color={"primary"} />
              </Typography>

            </Box>
            <Box  sx={{ paddingBlockStart: {xs:"40px",sm:"50px"}, paddingBlockEnd:"50px",paddingInline:{xs:"50px",md:"0px"}, paddingInlineStart:{sm:"40px",md:"74px"}}}>
              <Outlet />
            </Box>
          </Grid>
          <Grid size={{md:6}} sx={{display: {xs:'none', md:'block'}}} >
           <RightAuthLayout/>
          </Grid>
        </Grid>
      </Box>
  )
}

export default AuthLayout