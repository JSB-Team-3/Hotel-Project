import React, { memo, useState, useCallback, useMemo } from 'react';
import {
  Avatar,
  Box,
  Rating,
  Typography,
  CardContent,
  Collapse,
  Chip,
  useTheme,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { ReviewResponse } from '../../../../Interfaces/review.interface';
import { ReviewCard, ExpandButton, TimeDisplay } from '../Style';
import { formatDateUser } from '../../../../utilities/formaterHelper';

interface ReviewItemProps {
  review: ReviewResponse;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();

  const isLongReview = review.review.length > 150;
  const isHighRated = review.rating > 4;

  const toggleExpand = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const displayText = useMemo(() => {
    return isLongReview && !expanded
      ? `${review.review.substring(0, 150)}...`
      : review.review;
  }, [expanded, review.review, isLongReview]);

  return (
    <ReviewCard
      sx={{
        position: 'relative',
        transition: 'all 0.3s ease',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
          <Avatar
            src={review.user.profileImage || '/api/placeholder/40/40'}
            alt={review.user.userName || t('reviewItem.anonymous', 'Anonymous')}
            sx={{
              width: 40,
              height: 40,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          />
          <Box sx={{ ml: 1.5, flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1" fontWeight="600">
                {review.user.userName || t('reviewItem.anonymous', 'Anonymous')}
              </Typography>
              {isHighRated && (
                <Chip
                  label={t('reviewItem.topReview', 'Top Review')}
                  size="small"
                  color="primary"
                  sx={{
                    height: 24,
                    fontSize: '0.7rem',
                    fontWeight: 500,
                  }}
                />
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Rating
                value={review.rating}
                readOnly
                precision={0.5}
                sx={{
                  color: isHighRated
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
                }}
              />
              <TimeDisplay sx={{ ml: 1 }}>
                {formatDateUser(review.createdAt)}
              </TimeDisplay>
            </Box>
          </Box>
        </Box>

        <Typography
          variant="body1"
          sx={{
            mt: 1.5,
            lineHeight: 1.6,
            color: theme.palette.text.primary,
            fontStyle: isHighRated ? 'italic' : 'normal',
          }}
        >
          {displayText}
        </Typography>

        {isLongReview && (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography
              variant="body1"
              sx={{
                mt: 1,
                lineHeight: 1.6,
                color: theme.palette.text.primary,
              }}
            >
              {review.review.substring(150)}
            </Typography>
          </Collapse>
        )}

        {isLongReview && (
          <ExpandButton
            onClick={toggleExpand}
            endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{
              color: theme.palette.primary.main,
              mt: 1,
              '&:hover': {
                color: theme.palette.primary.dark,
              },
            }}
          >
            {expanded
              ? t('reviewItem.showLess', 'Show Less')
              : t('reviewItem.readMore', 'Read More')}
          </ExpandButton>
        )}
      </CardContent>
    </ReviewCard>
  );
};

export default memo(ReviewItem);
