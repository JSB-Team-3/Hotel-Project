import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/auth/AuthConfig';
import { getChart } from '../store/chart/chartThunk';
import { ChartData } from '../../Interfaces/chart.interface';

export const useDashboardData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { chartData, loading, error } = useSelector((state: RootState) => state.chart);

  const [dashboardData, setDashboardData] = useState<ChartData | null>(null);

  useEffect(() => {
    dispatch(getChart());
  }, [dispatch]);

  useEffect(() => {
    if (chartData) {
      setDashboardData(chartData);
    }
  }, [chartData]);

  return { dashboardData, loading, error };
};
