import { Box, CircularProgress, CircularProgressProps } from "@mui/material";
import { memo } from "react";

type SpinnerProps = {
  size?: number;  // optional prop for custom size
};
const Spiner = memo(({ size = 40 }: SpinnerProps) => (
  <Box display="flex" justifyContent="center" alignItems="center" height={300}>
    <CircularProgress size={size} />
  </Box>
));
export default Spiner;