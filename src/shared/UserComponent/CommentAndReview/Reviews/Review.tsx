import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ReviewFormInputs } from '../../../../Interfaces/review.interface';
import ReviewForm from './ReviewForm';
import ReviewItem from './ReviewItem';
import { useSnackbar } from 'notistack';
import { AppDispatch, RootState } from '../../../../store/auth/AuthConfig';
import {
  createReview,
  getUserReviews,
} from '../../../../store/review/reviewThunk';
import { resetReviewCreated } from '../../../../store/review/reviewsSlice';
import ReviewSkeleton from '../../Skelletons/ReviewSkelleton';
import { EmptyState } from '../Style';
import { RateReview as RateReviewIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../hooks/Hook';
import NoContent from '../NoContent';

interface ReviewProps {
  roomId: string;
}

const Review: React.FC<ReviewProps> = ({ roomId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const theme = useTheme();
  const [visibleCount, setVisibleCount] = useState(3);
  const {user}=useAppSelector((state:RootState) => state.auth);

  const { reviews, loading, reviewCreated, error } = useSelector(
    (state: RootState) => state.reviews
  );

  useEffect(() => {
    if (roomId&&user) {
      dispatch(getUserReviews(roomId));
    }
  }, [dispatch, roomId, user]);

  useEffect(() => {
    if (reviewCreated) {
      enqueueSnackbar(t('review.successMessage'), {
        variant: 'success',
        autoHideDuration: 3000,
      });
      dispatch(resetReviewCreated());
      dispatch(getUserReviews(roomId));
    }
  }, [reviewCreated, dispatch, roomId, enqueueSnackbar, t]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  }, [error, enqueueSnackbar]);

  const handleSubmit = async (data: ReviewFormInputs) => {
    dispatch(
      createReview({
        roomId,
        rating: data.rating,
        review: data.review,
      })
    );
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const hasHighRatedReviews = reviews.some((review) => review.rating > 4);
  const displayedReviews = hasHighRatedReviews
    ? reviews.slice(0, visibleCount)
    : reviews;

  return (
    <>
      <ReviewForm onSubmit={handleSubmit} />

    {user ? (
  reviews.length > 0 || loading ? (
    <Box sx={{ mt: 4 }}>
      <Divider sx={{ mt: 2, mb: 4 }} />
        
      <Typography
        variant="h6"
        sx={{ mb: 3.5, mt: 2, fontWeight: 500, color: theme.palette.text.primary, display: 'flex', alignItems: 'center', gap: 1 }}
      >
        {t('review.recentReviews')}
        <Box component="span"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            borderRadius: '50%',
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            ml: 1,
            fontWeight: 700,
          }}
        >
          {reviews.length > 0 && ` ${reviews.length}`}
        </Box>
      </Typography>

      <List disablePadding>
        {loading && !reviews.length ? (
          Array.from({ length: 3 }).map((_, index) => (
            <ListItem key={`skeleton-${index}`} disableGutters sx={{ px: 0, py: 1 }}>
              <ReviewSkeleton />
            </ListItem>
          ))
        ) : reviews.length > 0 ? (
          displayedReviews.map((review) => (
            <ListItem key={review._id} disableGutters sx={{ px: 0, py: 1 }}>
              <ReviewItem review={review} />
            </ListItem>
          ))
        ) : (
          <EmptyReviewState />

        )}
      </List>

      {hasHighRatedReviews && visibleCount < reviews.length && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Typography
            variant="button"
            color="primary"
            sx={{
              cursor: 'pointer',
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' },
            }}
            onClick={handleShowMore}
          >
            {t('review.seeMore')}
          </Typography>
        </Box>
      )}
    </Box>
  ) : (
    <EmptyReviewState />

  )
) : (
  <Box >
  <Divider sx={{ mt: 4, mb: 5 }} />
  <Box sx={{ mt: 10 }}>
    <NoContent 
      type="reviews"
      message={t('auth.loginRequired')}
      subMessage={t('auth.loginToSeeReviews')}
      variant="card"
      showIcon={true}
    />
  </Box>
</Box>
)}
    </>
  );
};

export default React.memo(Review);

const EmptyReviewState: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <EmptyState>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
        <RateReviewIcon sx={{ fontSize: 48, color: theme.palette.text.secondary, mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {t('review.noReviewsTitle')}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {t('review.noReviewsSubtitle')}
        </Typography>
      </Box>
    </EmptyState>
  );
};
