import React, { useCallback } from 'react';
import { Box, Typography, Rating, CircularProgress, useTheme } from '@mui/material';
import { ErrorOutline as ErrorIcon, Send as SendIcon } from '@mui/icons-material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ReviewFormInputs } from '../../../../Interfaces/CommentAndReview.interface';
import { ErrorMessage, StyledTextField, SubmitButton } from '../Style';
import { RootState } from '../../../../store/auth/AuthConfig';
import { useSnackbar } from 'notistack';

interface ReviewFormProps {
  onSubmit: SubmitHandler<ReviewFormInputs>;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { loading } = useSelector((state: RootState) => state.reviews);
    const role = useSelector((state: RootState) => state.auth.user?.role);
    const { enqueueSnackbar } = useSnackbar();
  

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<ReviewFormInputs>({
    defaultValues: { rating: 4, review: '' },
    mode: 'onChange',
  });

  const handleFormSubmit = useCallback<SubmitHandler<ReviewFormInputs>>(
    async (data) => {
      if (role !== 'user') {
        enqueueSnackbar(t('booking.user_only'), { variant: 'error' });
        return;
      }
      await onSubmit(data);
      reset({ rating: 4, review: '' });
    },
    [onSubmit, reset]
  );

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 500,
          color: theme.palette?.commentFormTitle?.main || theme.palette.primary.main,
        }}
      >
        {t('reviewForm.title', 'Share Your Experience')}
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Controller
          name="rating"
          control={control}
          rules={{ required: t('reviewForm.ratingRequired', 'Rating is required') }}
          render={({ field }) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ mr: 2, minWidth: '80px' }}>
                {t('reviewForm.yourRating', 'Your Rating')}
              </Typography>
              <Rating
                {...field}
                precision={1}
                size="large"
                onChange={(_, value) => field.onChange(value)}
                sx={{ mb: 1 }}
              />
            </Box>
          )}
        />
        {errors.rating && (
          <ErrorMessage>
            <ErrorIcon fontSize="small" />
            {errors.rating.message}
          </ErrorMessage>
        )}
      </Box>

      <Typography variant="body2" sx={{ mb: 1 }}>
        {t('reviewForm.yourReview', 'Your Review')}
      </Typography>

      <Controller
        name="review"
        control={control}
        rules={{
          required: t('reviewForm.reviewRequired', 'Review message is required'),
          minLength: {
            value: 5,
            message: t('reviewForm.reviewMinLength', 'Review must be at least 5 characters'),
          },
        }}
        render={({ field }) => (
          <StyledTextField
            {...field}
            fullWidth
            multiline
            rows={3}
            placeholder={t('reviewForm.placeholder', 'Share your thoughts about this place...')}
            variant="outlined"
            error={!!errors.review}
            disabled={loading}
            sx={{
              minHeight: '100px',
              mb: 1,
              transition: 'all 0.3s ease',
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                boxShadow: 'none',
              },
              '& .MuiInputBase-inputMultiline': {
                padding: '10px',
                resize: 'none',
                minHeight: '20px',
                border: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                '&:focus': {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />
        )}
      />

      {errors.review && (
        <ErrorMessage sx={{ mb: 1 }}>
          <ErrorIcon fontSize="small" />
          {errors.review.message}
        </ErrorMessage>
      )}

      <SubmitButton
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading || !isValid}
        endIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : <SendIcon />}
        sx={{
          mt: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          '&:hover': {
            backgroundColor:
              theme.palette?.sendButtonHover?.main || theme.palette.primary.light,
          },
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {t('reviewForm.submitting', 'Submitting...')}
            <CircularProgress size={20} />
          </Box>
        ) : (
          t('reviewForm.submit', 'Submit Review')
        )}
      </SubmitButton>
    </form>
  );
};

export default React.memo(ReviewForm);
