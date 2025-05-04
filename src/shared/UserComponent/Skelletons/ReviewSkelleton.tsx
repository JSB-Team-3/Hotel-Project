import React from 'react';
import { Box, Skeleton, CardContent } from '@mui/material';
import { ReviewCard } from '../CommentAndReview/Style';

const ReviewSkeleton: React.FC = () => {
  return (
    <ReviewCard>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <Skeleton 
            variant="circular" 
            width={40} 
            height={40} 
            animation="wave"
          />
          <Box sx={{ ml: 1.5, flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Skeleton variant="text" width={100} height={24} animation="wave" />
              <Skeleton variant="rectangular" width={80} height={24} animation="wave" sx={{ borderRadius: 1 }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              <Skeleton variant="rectangular" width={100} height={20} animation="wave" sx={{ borderRadius: 1 }} />
              <Skeleton variant="text" width={80} height={20} animation="wave" sx={{ ml: 1 }} />
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ mt: 1.5 }}>
          <Skeleton variant="text" height={20} animation="wave" />
          <Skeleton variant="text" height={20} animation="wave" />
          <Skeleton variant="text" width="80%" height={20} animation="wave" />
        </Box>
        
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Skeleton variant="rectangular" width={100} height={30} animation="wave" sx={{ borderRadius: 1 }} />
        </Box>
      </CardContent>
    </ReviewCard>
  );
};

export default ReviewSkeleton;