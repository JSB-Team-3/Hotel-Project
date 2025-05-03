import React, { useState, useCallback } from 'react';
import {Box,Container,Grid,CardContent,useMediaQuery,Theme,Tab,useTheme,
} from '@mui/material';
import { StyledCard, StyledTabs } from './Style';
import Comment from './Comments/Comments';
import Review from './Reviews/Review';
import { useTranslation } from 'react-i18next';

interface ReviewAndCommentsProps {
  roomId: string;
}

const ReviewAndComments: React.FC<ReviewAndCommentsProps> = ({ roomId }) => {
  const theme = useTheme(); // Access the current theme (light/dark)
  const { t } = useTranslation(); // Use translation hook
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  }, []);

  // Common Tab Content
  const tabContent = [
    <Review key="reviews" roomId={roomId} />,
    <Comment key="comments" roomId={roomId} />,
  ];

  return (
    <Container>
      <Box sx={{ py: 3 }}>
        {isMobile ? (
          <StyledCard sx={{ backgroundColor: theme.palette.background.paper }}>
            <CardContent sx={{ p: 2, flexGrow: 1 }}>
              <StyledTabs
                value={activeTab}
                onChange={handleTabChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                sx={{
                  backgroundColor: theme.palette.background.default, // Use background color from theme
                  color: theme.palette.text.primary, // Text color from theme
                }}
              >
                <Tab label={t('comment_tab.reviews')} /> {/* Use translation */}
                <Tab label={t('comment_tab.comments')} /> {/* Use translation */}
              </StyledTabs>

              {tabContent[activeTab]}
            </CardContent>
          </StyledCard>
        ) : (
          <>
            <Grid container spacing={0}>
              <Grid size={{xs:5}}>
                <Review key="reviews" roomId={roomId} />
              </Grid>
              <Grid size={{xs:1}}>
                <Box sx={{ width: '1px', height: '100%', backgroundColor: '#203FC7', mx: 'auto' }} />
              </Grid>
              <Grid size={{xs:5}}>
                <Comment key="comments" roomId={roomId} />
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Container>
  );
};

export default ReviewAndComments;
