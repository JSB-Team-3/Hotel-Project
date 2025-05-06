import { Skeleton } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React from "react";

const RoomCardSkeleton = React.memo(({ height }: { height: string | number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number; } }) => {
  const theme = useTheme();
  const isRtl = theme.direction === "rtl";

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height,
        borderRadius: "15px",
        overflow: "hidden",
        bgcolor: 'rgba(0, 0, 0, 0.04)',
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          animation: "shimmer 1.5s infinite ease-in-out",
        },
        "@keyframes shimmer": {
          "0%": { transform: "translateX(-150%)" },
          "100%": { transform: "translateX(150%)" }
        }
      }}
    >
      {/* Price tag skeleton - More vibrant */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          [isRtl ? "left" : "right"]: 0,
          width: "180px",
          height: "40px",
          borderStartStartRadius: isRtl ? 0 : "15px",
          borderEndStartRadius: isRtl ? "15px" : 0,
          bgcolor: 'rgba(255, 75, 139, 0.4)',
        }}
      >
        <Skeleton 
          variant="text" 
          width="60%" 
          height="60%" 
          animation="wave"
          sx={{ 
            mx: "auto", 
            my: "10px",
            bgcolor: 'rgba(255, 255, 255, 0.5)' 
          }}
        />
      </Box>

      {/* Image skeleton with wave animation */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        animation="wave"
      />

      {/* Title skeleton with wave animation */}
      <Box
        sx={{
          position: "absolute",
          bottom: "12px",
          [isRtl ? "right" : "left"]: "12px",
          width: "70%",
          zIndex: 2,
        }}
      >
        <Skeleton
          variant="text"
          width="100%"
          height={24}
          animation="wave"
          sx={{ bgcolor: 'rgba(255, 255, 255, 0.7)' }}
        />
      </Box>
    </Box>
  );
});

export default RoomCardSkeleton;