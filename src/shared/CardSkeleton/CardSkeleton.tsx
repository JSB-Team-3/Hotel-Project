import { Grid, Box, Skeleton } from '@mui/material';

export default function CardSkeleton() {
  return (
    <Grid size={{ xs: 12, md: 4, lg: 3 }}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '215px',
          borderRadius: '15px',
          overflow: 'hidden',
        }}
      >
        {/* Main image skeleton */}
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height="215px" 
          sx={{ borderRadius: '15px' }}
        />
        
        {/* Price tag skeleton */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '180px',
            height: '40px',
            borderEndStartRadius: '15px',
          }}
        >
          <Skeleton 
            variant="rectangular" 
            width="100%" 
            height="100%" 
            sx={{ 
              borderEndStartRadius: '15px',
              backgroundColor: 'rgba(29, 26, 27, 0.03)' // Lighter version of #FF498B
            }}
          />
        </Box>
        
        {/* Room number skeleton */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            width: '100px',
          }}
        >
          <Skeleton 
            variant="text" 
            width="100%" 
            height={24}
            sx={{ 
              backgroundColor: 'rgba(29, 26, 27, 0.03)',  // Darker than default
            }}
          />
        </Box>
      </Box>
    </Grid>
  );
}