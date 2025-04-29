import { Box, CircularProgress } from "@mui/material";
import { memo } from "react";

type SpinnerProps = {
  size?: number; 
  height?:string 
};
const Spiner = memo(({ size = 40,height="auto" }: SpinnerProps) => (
  <Box display="flex" justifyContent="center" alignItems="center" height={height} >
    <CircularProgress size={size} />
  </Box>
));
export default Spiner;