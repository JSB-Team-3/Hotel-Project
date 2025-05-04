import React, { memo } from "react";
import { Container, Skeleton, Grid } from "@mui/material";

const RoomDetialsSkeleton: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Skeleton variant="rectangular" sx={{ mb: 1, width: "200px", height: "30px", mx: "auto", borderRadius:"8px" }}
      />
      <Skeleton variant="text" sx={{ mb: 2, width: "180px", height: "15px", mx: "auto", borderRadius: "8px" }}
      />
      <Grid container spacing={2} sx={{ flexDirection: { md: "row", xs: "column" } }}>
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
          <Skeleton variant="rectangular" sx={{ width: "100%", height: 420, borderRadius: "8px" }}/>
        </Grid>
        <Grid size={{ xs: 12, md: 5, lg: 4 }} sx={{ display: "flex", flexDirection: { md: "column", xs:"row" }, gap: 2 }}
        >
          <Skeleton variant="rectangular" sx={{ width: "100%", height: 200, borderRadius: "8px" }} />
          <Skeleton variant="rectangular" sx={{ width: "100%", height: 200, borderRadius: "8px" }} />
        </Grid>
      </Grid>
      <Skeleton variant="rectangular" sx={{ my: 1, width: "100%", height: "30px", mx: "auto", borderRadius:"8px" }}
      />
      <Skeleton variant="rectangular" sx={{ my: 1, width: "100%", height: "30px", mx: "auto", borderRadius:"8px" }}
      />
    </Container>
  );
};

export default memo(RoomDetialsSkeleton);
