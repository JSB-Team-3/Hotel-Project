import { Typography, useTheme } from '@mui/material';
import React from 'react'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

export default function PortalHeader({title,subTitle}:{title:string,subTitle:string}) {
         const theme = useTheme();
    
  return (
    <>
         <Typography variant="h2" sx={{fontSize:'36px',
          color:theme.custom.darkblue,
          textAlign:'center'}} >
          {title}
          </Typography>
          <Breadcrumbs/>
          <Typography variant="h3" sx={{fontSize:'18px','my':2,
          color:theme.custom.darkblue,}} >
          {subTitle}
          </Typography>
    </>
  )
}
