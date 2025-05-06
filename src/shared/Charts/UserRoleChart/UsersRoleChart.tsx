import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography, Stack, useTheme } from "@mui/material";
import { UserRingChartProps } from "../../../Interfaces/Charts.Interfaces";
import { useTranslation } from "react-i18next";

const UserRoleChart: React.FC<UserRingChartProps> = ({ title, data }) => {
  const theme = useTheme();
  const { t } = useTranslation();


  const chartData = [
    { label: t('roles.user'), value: data?.user ?? 0, color: "#54D14D" },
    { label: t('roles.admin'), value: data?.admin ?? 0, color: "#35C2FD" },
  ];

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Box
      width="100%"
      maxWidth={250}
      mx="auto"
      p={2}
      borderRadius={2}
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: "0px 2px 48px 0px #0000000F",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Box position="relative" display="flex" justifyContent="center">
        <PieChart
          series={[
            {
              data: chartData,
              innerRadius: 70,
              outerRadius: 80,
              cornerRadius: 5,
              paddingAngle: 2,
            },
          ]}
          width={200}
          height={200}
          slots={{
            legend: () => null,
          }}
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{
            transform: "translate(-50%, -50%)",
            color: theme.palette.text.primary,
          }}
        >
          <Typography variant="h6" align="center">
          {t(`roles.${title.toLowerCase()}`)}
          </Typography>
        </Box>
      </Box>

      <Stack direction="column" spacing={1} mt={1} pl={1}>
        {chartData.map((item, idx) => (
          <Stack key={idx} direction="row" alignItems="center" spacing={1}>
            <Box
              width={10}
              height={10}
              borderRadius="50%"
              sx={{ backgroundColor: item.color }}
            />
            <Typography variant="body2" color="text.primary">
              {item.label}
            </Typography>
            <Box flexGrow={1} />
            <Typography variant="body2" color="text.secondary">
              {item.value}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Typography variant="body1" align="center" mt={2} color="text.primary">
      {t("totalUsers")}: {total}
      </Typography>
    </Box>
  );
};

export default UserRoleChart;
