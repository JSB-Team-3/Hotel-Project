import { Box, Button, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { HeaderProps } from '../../Interfaces/props.interface';
import { useTranslation } from 'react-i18next';

export default function Header({ title, route, onAddClick }: HeaderProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Box>
        <Typography variant='h6' sx={{ mb: '0',  color: theme.palette.text.primary }}>
          {title} {t('header.tableDetails')}
        </Typography>
        <Box component='span' sx={{ mt: '0', color: theme.palette.text.secondary, fontSize: '14px' }}>
          {t('header.checkAllDetails')}
        </Box>
      </Box>
      {title === t('ads.title') && (
        <Button  
          variant='contained' 
          sx={{ backgroundColor: "#203FC7", color: 'white', fontWeight: 'bold', paddingInline: '30px' }}
        >
          {t('header.addNewAd')}
        </Button>
      )}
      {title === t('facilities.title') ? (
        <Button
          onClick={onAddClick}
          variant='contained'
          sx={{ backgroundColor: "#203FC7", color: 'white', fontWeight: 'bold', paddingInline: '30px' }}
        >
          {t('header.addNewFacility')}
        </Button>
      ) : route && (
        <Button 
          component={Link} 
          to={route} 
          variant='contained' 
          sx={{ backgroundColor: "#203FC7", color: 'white', fontWeight: 'bold', paddingInline: '30px' }}
        >
          {t('header.addNewRoom')}
        </Button>
      )}
    </Box>
  );
}