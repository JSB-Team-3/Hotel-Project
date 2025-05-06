import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useMediaQuery,
  useTheme,

} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { DashbordCardProps } from '../../Interfaces/cards.interfaces';
import { useTranslation } from 'react-i18next';

const DashboardCard: React.FC<DashbordCardProps> = ({ count, label, icon }) => {
  const { t } = useTranslation();
  const theme=useTheme();
  const isMobile=useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        width:isMobile?220: 300,
        height: 130,
        borderRadius: 2,
        bgcolor: '#121212',
        color: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <CardContent sx={{ flex: 1, p: 0 }}>
        <Typography variant="h4" component="div">
          {count}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontSize: 20 }}>
        {t(label)}

        </Typography>
      </CardContent>

      <Box
        sx={{
          ml: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(32, 63, 199, 0.2)',
          borderRadius: '50%',
          width: 50,
          height: 50,
        }}
      >
        {icon || <ShoppingCartIcon sx={{ color: '#203FC7' }} />}
      </Box>
    </Card>
  );
};

export default DashboardCard;
