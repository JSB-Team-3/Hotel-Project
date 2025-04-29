import { Box, Typography } from "@mui/material";
import { memo } from "react";

type EmptyContentProps = {};

const EmptyContent = memo(({}: EmptyContentProps) => (
  <Box display="flex" justifyContent="center" alignItems="center" height={200} p={3}>
    <Typography variant="body1" color="text.secondary" align="center">
      No data available
    </Typography>
  </Box>
));

export default EmptyContent;