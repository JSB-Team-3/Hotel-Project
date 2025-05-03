import { Link , useLocation } from 'react-router-dom';
import BreadcrumbsMui from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import {Box } from '@mui/material';
export default function Breadcrumbs () {
const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  return (
       <BreadcrumbsMui aria-label="breadcrumb">
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography key={to} sx={{textTransform: 'capitalize' }}>
            {value}
          </Typography>
        ) : (
          <Box
            key={to}
            component={Link}
            to={to}
            color="inherit"
            sx={{ textTransform: 'capitalize' ,textDecoration:'none' } }
          >
            {value}
          </Box>
        );
      })}
    </BreadcrumbsMui>
  )
}
