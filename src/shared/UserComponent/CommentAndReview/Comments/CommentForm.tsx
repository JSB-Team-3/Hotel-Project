import React, { memo, useCallback } from 'react';
import {
  Box, Typography, CircularProgress, Fade, useTheme
} from '@mui/material';
import { Send as SendIcon, ErrorOutline as ErrorIcon } from '@mui/icons-material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { CommentFormInputs } from '../../../../Interfaces/CommentAndReview.interface';
import { ErrorMessage, StyledTextField, SubmitButton } from '../Style';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/auth/AuthConfig';

interface CommentFormProps {
  onSubmit: SubmitHandler<CommentFormInputs>;
  isSubmitting?: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, isSubmitting = false }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const role = useSelector((state: RootState) => state.auth.user?.role);
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<CommentFormInputs>({
    defaultValues: {
      comment: ''
    },
    mode: 'onChange'
  });

  const handleFormSubmit = useCallback<SubmitHandler<CommentFormInputs>>(
    async (data) => {
      if (role !== 'user') {
        enqueueSnackbar(t('booking.user_only'), { variant: 'error' });
        return;
      }
      await onSubmit(data);
      reset({ comment: '' });
    },
    [onSubmit, reset]
  );

  return (
    <Fade in={true}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Typography
          variant="h6"
          sx={{
            mb: 8,
            fontWeight: 600,
            fontSize: '1.1rem',
            color: theme.palette.commentFormTitle?.main || theme.palette.primary.main
          }}
        >
          {t('comment_form.title')}
        </Typography>

        <Controller
          name="comment"
          control={control}
          rules={{
            required: t('comment_form.comment_required') as string,
            minLength: {
              value: 3,
              message: t('comment_form.comment_min_length')
            }
          }}
          render={({ field }) => (
            <StyledTextField
              {...field}
              fullWidth
              multiline
              rows={3}
              placeholder={t('comment_form.placeholder')}
              variant="outlined"
              error={!!errors.comment}
              disabled={isSubmitting}
              style={{ resize: 'none', padding: '10px' }}
              sx={{
                minHeight: '100px',
                mb: 1,
                transition: 'all 0.3s ease',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  boxShadow: 'none',
                  '&:focus': {
                    boxShadow: 'none',
                    outline: 'none',
                    border: 'none'
                  }
                },
                '& .MuiInputBase-inputMultiline':{
                  padding: '10px',
                  minHeight: '20px',
                  resize: 'none',
                  border:'1px solid #ccc',
                  '&:focus': {
                    boxShadow: 'none',
                    outline: 'none',
                    borderColor: '#3f51b5'
                  }


                }
              }}
            />
          )}
        />

        {errors.comment && (
          <ErrorMessage sx={{ mb: 1 }}>
            <ErrorIcon fontSize="small" />
            {errors.comment.message}
          </ErrorMessage>
        )}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            transition: 'all 0.3s ease',
            overflow: 'hidden'
          }}
        >
          <SubmitButton
            type="submit"
            variant="contained"
            color="primary"
            endIcon={
              isSubmitting ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <SendIcon />
              )
            }
            disabled={isSubmitting || !isValid}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '8px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              '&:hover': {
                boxShadow: `0 6px 15px ${theme.palette.sendButtonHover?.main || 'rgba(63, 81, 181, 0.4)'}`
              }
            }}
          >
            {t('comment_form.send')}
          </SubmitButton>
        </Box>
      </form>
    </Fade>
  );
};

export default memo(CommentForm);
