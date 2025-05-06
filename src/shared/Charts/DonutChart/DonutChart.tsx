import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import { Grid, useTheme, useMediaQuery } from '@mui/material';
import { DonutChartProps } from '../../../Interfaces/Charts.Interfaces';
import { useTranslation } from 'react-i18next';

const COLORS: Record<string, string> = {
  pending: '#5368F0',   
  completed: '#9D57D5', 
};

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Calculate responsive dimensions
  const getChartDimensions = () => {
    if (isMobile) {
      return { height: 220, width: 200, innerRadius: 40, outerRadius: 90 };
    } else if (isTablet) {
      return { height: 260, width: 300, innerRadius: 50, outerRadius: 110 };
    } else {
      return { height: 300, width: 400, innerRadius: 60, outerRadius: 130 };
    }
  };

  const { height, width, innerRadius, outerRadius } = getChartDimensions();

  const formattedData = React.useMemo(() => {
    return Object.entries(data).map(([key, value]) => ({
      label: t(`status.${key}`),  
      value,
      color: COLORS[key.toLowerCase()] || '#ccc',
    }));
  }, [data, t]);

  return (
    <Grid container spacing={2} alignItems="center"  marginInline={"auto"}>
      <Grid size={{ xs: 12, md: 8 }} sx={{ textAlign: 'center', mx: 'auto'}} >  
        <Box sx={{ width: '100%', height: 'auto', maxWidth: '400px', mx: '0 auto' }}>
          <PieChart
            height={height}
            width={width}
            margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
            series={[
              {
                data: formattedData,
                innerRadius: innerRadius,
                outerRadius: outerRadius,
                arcLabel: () => '',
                paddingAngle: 2,
                cornerRadius: 4,
              },
            ]}
            slots={{
              legend: () => null,
            }}
            skipAnimation={false}
            sx={{ width: '100%' }}
          />
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Stack 
          direction={isMobile ? "row" : "column"} 
          spacing={2} 
          sx={{
            mx: "auto", 
            width: "100%",
            display: 'flex',
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            justifyContent: 'center',
          }}
        > 
          {formattedData.map((item) => (
            <Stack 
              key={item.label} 
              direction="row" 
              alignItems="center" 
              justifyContent={isMobile ? "center" : "flex-start"}
              spacing={1}
              sx={{ 
                minWidth: isMobile ? '45%' : 'auto',
                mb: isMobile ? 1 : 0,
                display: 'flex',
                gap:1
              }}
            >
              <Box 
                sx={{ 
                  width: 14, 
                  height: 14, 
                  backgroundColor: item.color, 
                  borderRadius: '4px',
                  flexShrink: 0
                }} 
              />
              <Typography variant="body2" noWrap>{item.label}</Typography>
            </Stack>
          ))}
        </Stack>    
      </Grid>
    </Grid>
  );
};

export default DonutChart;