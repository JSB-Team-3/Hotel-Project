import { Typography, useTheme } from '@mui/material';
import React from 'react'
import RoomBreadcrumbs from '../UserComponent/Breadcrumb/Breadcrumb';

export default function PortalHeader({title,subTitle,links}:{title:string,subTitle:string,links:{label:string,to:string}[]}) {
         const theme = useTheme();
    
  return (
    <>
         <Typography variant="h2" sx={{fontSize:'36px',
          color:theme.custom.darkblue,
          textAlign:'center'}} >
          {title}
          </Typography>
           <RoomBreadcrumbs links={links} />
          <Typography variant="h3" sx={{fontSize:'18px','my':2,
          color:theme.custom.darkblue,}} >
          {subTitle}
          </Typography>
    </>
  )
}
