import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import { Grid } from '@mui/material';
import { DonutChartProps } from '../../../interfaces/Charts.Interfaces';

const COLORS: Record<string, string> = {
  pending: '#5368F0',   
  completed: '#9D57D5', 
};

const DonutChart: React.FC<DonutChartProps> = ({ data, height = 300, width = 400 }) => {
  const formattedData = React.useMemo(() => {
    return Object.entries(data).map(([key, value]) => ({
      label: key[0].toUpperCase() + key.slice(1),
      value,
      color: COLORS[key.toLowerCase()] || '#ccc',
    }));
  }, [data]);

  return (
    <Grid container sx={{justifyContent:"center" ,alignItems:"center",mx:"auto"}} spacing={2}>
    <Grid size={{ xs: 12, sm: 8 }}>  
    <PieChart
        height={height}
        width={width}
        series={[
          {
            data: formattedData,
            innerRadius: 60,
            outerRadius: 130,
            arcLabel: () => '',
          },
        ]}
        slots={{
          legend: () => null,
        }}
        skipAnimation={false}
      />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }} >
      <Stack direction="column" spacing={0.5} sx={{mx:"auto", width:"fit-content"}}> 
        {formattedData.map((item) => (
          <Stack key={item.label} direction="row"  alignItems="center" spacing={0.5}>
            <Box sx={{ width: 14, height: 14, backgroundColor: item.color, borderRadius: '4px' }} />
            <Typography variant="body2">{item.label}</Typography>
          </Stack>
        ))}
      </Stack>    
      </Grid>
    
    </Grid>
  );
};

export default DonutChart;
