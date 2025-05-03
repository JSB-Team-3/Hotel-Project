// CommentItem.tsx
import React, { memo, useState, useRef, useEffect } from 'react';
import { Avatar, Box, Typography, CardContent, IconButton, 
  Menu, MenuItem, Skeleton, Fade, Collapse, Tooltip } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, MoreVert as MoreVertIcon,
  Save as SaveIcon, Cancel as CancelIcon, ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon, AccessTime as TimeIcon } from '@mui/icons-material';
import { CommentResponse } from '../../../../Interfaces/CommentAndReview.interface';
import { ActionButton, ActionsButton, ExpandButton, StyledCommentCard, StyledTextField, TimeDisplay } from '../Style';
import { formatDateUser } from '../../../../utilities/formaterHelper';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

interface CommentItemProps {
  comment: CommentResponse;
  onUpdate: (id: string, updatedComment: string) => void;
  onDelete: (id: string) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
  updateLoadingId?: string;
  loading?: boolean;
}

const CommentItem: React.FC<CommentItemProps> = ({ 
  comment, 
  onUpdate, 
  onDelete,
  isDeleting = false,
  updateLoadingId,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);
  const commentRef = useRef<HTMLDivElement | null>(null);
  const [shouldShowMore, setShouldShowMore] = useState(false);
  const menuOpen = Boolean(anchorEl);
  const isCurrentlyUpdating = updateLoadingId === comment._id;

  useEffect(() => {
    // Check if comment is long enough to need "See more"
    if (commentRef.current) {
      const lineHeight = parseInt(window.getComputedStyle(commentRef.current).lineHeight);
      const height = commentRef.current.scrollHeight;
      const lines = height / lineHeight;
      setShouldShowMore(lines > 4);
    }
  }, [comment.comment]);
  
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setIsEditing(true);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    localStorage.setItem('deleteCommentId', comment._id);
    onDelete(comment._id);
    handleMenuClose();
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedComment(comment.comment);
  };

  const handleSave = () => {
    onUpdate(comment._id, editedComment);
    setIsEditing(false);
  };
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  if (isDeleting) {
    return (
      <Fade in={true} timeout={500}>
        <StyledCommentCard sx={{ opacity: 0.5 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ ml: 1.5 }}>
                <Skeleton variant="text" width={120} height={20} />
                <Skeleton variant="text" width={80} height={16} />
              </Box>
            </Box>
            <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 1 }} />
          </CardContent>
        </StyledCommentCard>
      </Fade>
    );
  }

  return (
    <StyledCommentCard sx={{ width: '100%' }}>
      <CardContent sx={{ position: 'relative', paddingInlineStart: 5, py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
          <Avatar
            src={comment.user.profileImage || '/api/placeholder/40/40'}
            alt={comment.user.userName || 'User'}
            sx={{
              width: 40,
              height: 40,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          />
          <Box sx={{ marginInlineEnd: 5 }}>
            <Typography variant="subtitle1" fontWeight="600">
              {comment.user.userName || 'Anonymous'}
            </Typography>
            <TimeDisplay sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TimeIcon />
              {formatDateUser(comment.createdAt)}
            </TimeDisplay>
          </Box>
        </Box>

        {!isEditing && (
          <Tooltip title={t('comment_item.actions')}>
            <ActionsButton onClick={handleMenuClick} size="small">
              <MoreVertIcon fontSize="small" />
            </ActionsButton>
          </Tooltip>
        )}

        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          elevation={3}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            },
          }}
        >
          <MenuItem onClick={handleEdit} dense sx={{ '&:hover': { backgroundColor: theme.palette.action.hover } }}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            {t('comment_item.edit')}
          </MenuItem>
          <MenuItem onClick={handleDeleteClick} dense sx={{ '&:hover': { backgroundColor: theme.palette.action.hover } }}>
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} color="error" />
            {t('comment_item.delete')}
          </MenuItem>
        </Menu>

        {isEditing || isCurrentlyUpdating ? (
          <>
            {isCurrentlyUpdating ? (
              <>
                <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 1, mb: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Skeleton variant="rounded" width={70} height={36} sx={{ mr: 1 }} />
                  <Skeleton variant="circular" width={36} height={36} />
                </Box>
              </>
            ) : (
              <>
                <StyledTextField
                  fullWidth
                  variant="outlined"
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                  multiline
                  rows={3}
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <ActionButton
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon sx={{ ms: 1 }} />}
                    onClick={handleSave}
                    sx={{ ms: 1 }}
                  >
                    {t('comment_item.save')}
                  </ActionButton>
                  <IconButton
                    onClick={handleCancel}
                    size="small"
                    sx={{
                      border: '1px solid #e0e0e0',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    }}
                  >
                    <CancelIcon fontSize="small" />
                  </IconButton>
                </Box>
              </>
            )}
          </>
        ) : (
          <>
            <Collapse in={expanded || !shouldShowMore} collapsedSize={shouldShowMore ? '80px' : 'auto'}>
              <Typography
                ref={commentRef}
                variant="body1"
                sx={{
                  mt: 1.5,
                  lineHeight: 1.6,
                  color: 'text.primary',
                  px: 0.5,
                }}
              >
                {comment.comment}
              </Typography>
            </Collapse>

            {shouldShowMore && (
              <ExpandButton
                onClick={toggleExpanded}
                startIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                size="small"
              >
                {expanded ? t('comment_item.seeLess') : t('comment_item.seeMore')}
              </ExpandButton>
            )}
          </>
        )}
      </CardContent>
    </StyledCommentCard>
  );
};

export default memo(CommentItem);
