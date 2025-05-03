import React from 'react';
import { Card, CardContent, Box, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCommentCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
  marginBottom: theme.spacing(2),
  overflow: 'visible',
  background: theme.palette.mode === 'dark' ? 
    'linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 100%)' : 
    'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)'
}));

interface CommentSkeletonProps {
  isAdding?: boolean;
}

const CommentSkeleton: React.FC<CommentSkeletonProps> = ({ isAdding = false }) => {
  return (
    <StyledCommentCard sx={isAdding ? { mt: 2, opacity: 0.7 } : {width: '100%'}}>
      <CardContent  sx={{ width: '100%' }} >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, width: '100%' }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box sx={{ ml: 1.5 }}>
            <Skeleton variant="text" width={120} height={20} />
            <Skeleton variant="text" width={80} height={16} />
          </Box>
        </Box>
        <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 1, mb: isAdding ? 2 : 0 }} />
        
        {isAdding && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Skeleton variant="rounded" width={70} height={36} />
          </Box>
        )}
      </CardContent>
    </StyledCommentCard>
  );
};

export default CommentSkeleton;