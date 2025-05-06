import React, { useEffect, useCallback, useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  Fade,
  Button,
  useTheme,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { CommentFormInputs, CommentResponse } from '../../../../Interfaces/CommentAndReview.interface';
import CommentForm from './CommentForm';
import { RootState } from '../../../../store/auth/AuthConfig';
import { createComment, getUserComments, updateComment, deleteComment } from '../../../../store/comments/commentsThunk';
import { useAppDispatch } from '../../../../hooks/Hook';
import CommentItem from './CommentItem';
import { enqueueSnackbar } from 'notistack';
import { setUpdateLoading } from '../../../../store/comments/commentSlice';
import CommentSkeleton from '../../Skelletons/CommentSkeleton';
import { useTranslation } from 'react-i18next';
import NoContent from '../NoContent';

interface CommentProps {
  roomId: string;
}

const Comment: React.FC<CommentProps> = ({ roomId }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { t } = useTranslation();
  const { comments, updateLoading, loading } = useSelector((state: RootState) => state.comments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(3); // Start with 3 visible comments
  const [commentLoading, setCommentLoading] = useState(false);
  const {user} = useSelector((state: RootState) => state.auth);
  const fetchComments = useCallback(async () => {
    if (!roomId) return;
    setCommentLoading(true);
    try {
      await dispatch(getUserComments(roomId)).unwrap();
    } catch (err) {
      console.error(err);
      enqueueSnackbar(t('commentSection.loadFailed'), { variant: 'error' });
    } finally {
      setCommentLoading(false);
    }
  }, [dispatch, roomId, t]);

  useEffect(() => {
    if(user){
      fetchComments();
    }
  }, [fetchComments, user]);

  const handleSubmit = useCallback(
    async (data: CommentFormInputs) => {
      if (!roomId) return;
      const commentData = { roomId, comment: data.comment };
      setIsSubmitting(true);
      try {
        await dispatch(createComment(commentData)).unwrap();
        enqueueSnackbar(t('commentSection.addSuccess'), { variant: 'success' });
        fetchComments();
      } catch (err) {
        console.error(err);
        enqueueSnackbar(t('commentSection.addFailed'), { variant: 'error' });
      } finally {
        setIsSubmitting(false);
      }
    },
    [dispatch, roomId, fetchComments, t]
  );

  const handleUpdateComment = useCallback(
    async (id: string, updatedComment: string) => {
      if (!id) return;
      dispatch(setUpdateLoading({ id, loading: true }));
      try {
        await dispatch(updateComment({ id, data: { comment: updatedComment } })).unwrap();
        enqueueSnackbar(t('commentSection.updateSuccess'), { variant: 'success' });
        fetchComments();
      } catch (err) {
        console.error(err);
        enqueueSnackbar(t('commentSection.updateFailed'), { variant: 'error' });
      } finally {
        dispatch(setUpdateLoading({ id, loading: false }));
      }
    },
    [dispatch, fetchComments, t]
  );

  const handleDeleteComment = useCallback(
    async (id: string) => {
      if (!id) return;
      setDeletingId(id);
      try {
        await dispatch(deleteComment(id)).unwrap();
        fetchComments();
        enqueueSnackbar(t('commentSection.deleteSuccess'), { variant: 'success' });
      } catch (err) {
        console.error(err);
        enqueueSnackbar(t('commentSection.deleteFailed'), { variant: 'error' });
      } finally {
        setDeletingId(null);
      }
    },
    [dispatch, fetchComments, t]
  );

  const updateLoadingId = Object.entries(updateLoading).find(([, isLoading]) => isLoading)?.[0];

  // Show more comments by increasing display count by 3
  const handleShowMore = () => setDisplayCount(prevCount => prevCount + 3);
  // Show less comments by resetting display count to 3
  const handleShowLess = () => setDisplayCount(3);

  const visibleComments = comments.slice(0, displayCount);
  const hasMoreComments = comments.length > displayCount;

 

  return (
    <Box sx={{ mt: 3 }}>
      <CommentForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

      {isSubmitting && <CommentSkeleton isAdding />}

      <Divider sx={{ my: 4 }} />

      {commentLoading && (
        <Box sx={{ mt: 3, width: '100%' }}>
          {[...Array(4)].map((_, index) => (
            <ListItem key={`skeleton-${index}`} disableGutters sx={{ px: 0, py: 1, width: '100%' }}>
              <CommentSkeleton />
            </ListItem>
          ))}
        </Box>
      )}

      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {t('commentSection.title')}
        {comments.length > 0 && (
          <Box
            component="span"
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
            {comments.length}
          </Box>
        )}
      </Typography>

      {user ? (
  comments.length > 0 ? (
    <Fade in timeout={500}>
      <Box>
        <List disablePadding sx={{ width: '100%' }}>
          {visibleComments.map((comment: CommentResponse) => (
            <ListItem key={comment._id} disableGutters sx={{ px: 0, py: 1 }}>
              <Box sx={{ width: '100%' }}>
                <CommentItem
                  comment={comment}
                  onUpdate={handleUpdateComment}
                  onDelete={handleDeleteComment}
                  isDeleting={deletingId === comment._id}
                  updateLoadingId={updateLoadingId}
                  loading={loading}
                />
              </Box>
            </ListItem>
          ))}
        </List>

        {comments.length > 3 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            {hasMoreComments ? (
              <Button
                variant="outlined"
                color="primary"
                onClick={handleShowMore}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  '&:hover': { backgroundColor: theme.palette.action.hover },
                }}
              >
                {t('commentSection.showMore', { count: comments.length - displayCount })}
              </Button>
            ) : (
              <Button
                variant="text"
                color="primary"
                onClick={handleShowLess}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  '&:hover': { backgroundColor: theme.palette.action.hover },
                }}
              >
                {t('commentSection.showLess')}
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Fade>
  ) : (
    <Box
    sx={{
      textAlign: 'center',
      py: 4,
      color: theme.palette.text.secondary,
      bgcolor: theme.palette.background.paper,
      borderRadius: 2,
      p: 4,
      width: '100%',
    }}
  >
    <Typography variant="body1">{t('commentSection.noComments')}</Typography>
  </Box>
  )
) : (
  <NoContent 
    type="comments" 
    message={t('auth.loginRequired')}
    subMessage={t('auth.loginToViewComments')}
    variant="card"
  />
)}
    </Box>
  );
};

export default React.memo(Comment);
