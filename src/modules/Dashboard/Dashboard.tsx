import React from 'react'
import DonutChart from '../shared/Charts/DonutChart/DonutChart'
import UserRoleChart from '../shared/Charts/UserRoleChart/UsersRoleChart'
import DashboardCard from '../shared/Card/DashboardCard';
import { Hotel } from '@mui/icons-material';
import { useDashboardData } from '../hooks/useDashboardData';
import { Box } from '@mui/material';
import ChaletIcon from '@mui/icons-material/Chalet';
import DiscountIcon from '@mui/icons-material/Discount';
import LoadingScreen from '../shared/LoadingScreen/LoadingScreen'; 
import { useTranslation } from 'react-i18next';
const Dashboard = () => {
  const { t } = useTranslation();
  const { dashboardData ,loading} = useDashboardData();

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <Box component="section" >
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 2 ,justifyContent:"space-evenly"}}>
      {dashboardData?.rooms && <DashboardCard count={dashboardData?.rooms} label={t('dashboard.rooms')} icon={<Hotel sx={{ color: '#203FC7' }}  />} />}
      {dashboardData?.facilities&& <DashboardCard count={dashboardData?.facilities} label={t('dashboard.facilities')} icon={<ChaletIcon  sx={{ color: '#203FC7' }}  />} />}
      {dashboardData?.ads && <DashboardCard count={dashboardData?.ads} label={t('dashboard.ads')} icon={<DiscountIcon sx={{ color: '#203FC7' }}  />} />}
      </Box>
      <Box sx={{ display: 'flex', gap: 2,mt:2.5 ,flexWrap: 'wrap', marginBottom: 2 }}>
      {dashboardData?.bookings&&<DonutChart data={dashboardData?.bookings}  />}
      {dashboardData?.users && (<UserRoleChart title="Users" data={dashboardData.users} />)}
      </Box>
    </Box>
  )
}

export default Dashboard