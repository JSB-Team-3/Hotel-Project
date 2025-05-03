// ReviewComponent.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Avatar,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
  Container,
  List,
  ListItem,
  Tabs,
  Tab,
  useMediaQuery,
  Theme
} from '@mui/material';
import { Send as SendIcon, ErrorOutline as ErrorIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

// Types
interface CommentResponse {
  success: boolean;
  message: string;
  data: {
    roomComments: Comment[];
    totalCount: number;
  };
}

interface ReviewResponse {
  success: boolean;
  message: string;
  data: {
    roomReviews: Review[];
    totalCount: number;
  };
}

interface Comment {
  id?: string;
  roomId?: string;
  userId?: string;
  userName?: string;
  userAvatar?: string;
  comment: string;
  createdAt?: string;
}

interface Review {
  id?: string;
  roomId?: string;
  userId?: string;
  userName?: string;
  userAvatar?: string;
  rating: number;
  review: string;
  createdAt?: string;
}

interface CommentRequest {
  roomId: string;
  comment: string;
}

interface ReviewRequest {
  roomId: string;
  rating: number;
  review: string;
}

interface ReviewFormInputs {
  rating: number;
  review: string;
}

interface CommentFormInputs {
  comment: string;
}

// Styled components

// API service functions
const api = {
  fetchComments: async (roomId: string): Promise<CommentResponse> => {
    // Replace with your actual API call
    try {
      // Mock response
      return {
        success: true,
        message: "success",
        data: {
          roomComments: [
            {
              id: '1',
              roomId: roomId,
              userId: 'user1',
              userName: 'John Doe',
              userAvatar: '/api/placeholder/40/40',
              comment: 'Is this place close to public transportation?',
              createdAt: new Date().toISOString()
            },
            {
              id: '2',
              roomId: roomId,
              userId: 'user2',
              userName: 'Jane Smith',
              userAvatar: '/api/placeholder/40/40',
              comment: 'Hows the neighborhood at night?',
              createdAt: new Date(Date.now() - 86400000).toISOString()
            }
          ],
          totalCount: 2
        }
      };
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  },
  
  fetchReviews: async (roomId: string): Promise<ReviewResponse> => {
    // Replace with your actual API call
    try {
      // Mock response
      return {
        success: true,
        message: "success",
        data: {
          roomReviews: [
            {
              id: '1',
              roomId: roomId,
              userId: 'user1',
              userName: 'Alice Cooper',
              userAvatar: '/api/placeholder/40/40',
              rating: 4,
              review: 'Great location, very clean and comfortable.',
              createdAt: new Date().toISOString()
            },
            {
              id: '2',
              roomId: roomId,
              userId: 'user2',
              userName: 'Bob Dylan',
              userAvatar: '/api/placeholder/40/40',
              rating: 5,
              review: 'Amazing place! Highly recommended for anyone visiting the area.',
              createdAt: new Date(Date.now() - 86400000).toISOString()
            }
          ],
          totalCount: 2
        }
      };
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },
  
  submitComment: async (commentData: CommentRequest): Promise<Comment> => {
    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate random error for testing
    if (Math.random() > 0.9) {
      throw new Error('Failed to submit comment');
    }
    
    // Mock response
    return {
      id: Math.random().toString(36).substr(2, 9),
      roomId: commentData.roomId,
      userId: 'current-user-id',
      userName: 'You',
      userAvatar: '/api/placeholder/40/40',
      comment: commentData.comment,
      createdAt: new Date().toISOString()
    };
  },
  
  submitReview: async (reviewData: ReviewRequest): Promise<Review> => {
    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate random error for testing
    if (Math.random() > 0.9) {
      throw new Error('Failed to submit review');
    }
    
    // Mock response
    return {
      id: Math.random().toString(36).substr(2, 9),
      roomId: reviewData.roomId,
      userId: 'current-user-id',
      userName: 'You',
      userAvatar: '/api/placeholder/40/40',
      rating: reviewData.rating,
      review: reviewData.review,
      createdAt: new Date().toISOString()
    };
  }
};

// Main component
interface ReviewAndCommentsComponentProps {
  roomId: string;
}

const ReviewAndCommentsComponent: React.FC<ReviewAndCommentsComponentProps> = ({ roomId }) => {
  // Responsive check
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  
  // Tab state
  const [activeTab, setActiveTab] = useState(0);
  
  // Content states
  const [reviews, setReviews] = useState<Review[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState({ reviews: false, comments: false });
  const [submitting, setSubmitting] = useState({ review: false, comment: false });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // React Hook Form for reviews
  const reviewForm = useForm<ReviewFormInputs>({
    defaultValues: {
      rating: 4,
      review: ''
    },
    mode: 'onChange'
  });
  
  // React Hook Form for comments
  const commentForm = useForm<CommentFormInputs>({
    defaultValues: {
      comment: ''
    },
    mode: 'onChange'
  });

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading({ reviews: true, comments: true });
      try {
        const reviewsResponse = await api.fetchReviews(roomId);
        const commentsResponse = await api.fetchComments(roomId);
        
        if (reviewsResponse.success) {
          setReviews(reviewsResponse.data.roomReviews);
        }
        
        if (commentsResponse.success) {
          setComments(commentsResponse.data.roomComments);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setSnackbar({
          open: true,
          message: 'Failed to load data. Please try again later.',
          severity: 'error'
        });
      } finally {
        setLoading({ reviews: false, comments: false });
      }
    };

    if (roomId) {
      loadData();
    }
  }, [roomId]);

  // Handle form submissions
  const onReviewSubmit: SubmitHandler<ReviewFormInputs> = async (data) => {
    setSubmitting({ ...submitting, review: true });
    try {
      const reviewData: ReviewRequest = {
        roomId,
        rating: data.rating,
        review: data.review
      };
      
      const newReview = await api.submitReview(reviewData);
      setReviews(prev => [newReview, ...prev]);
      reviewForm.reset({
        rating: 4,
        review: ''
      });
      
      setSnackbar({
        open: true,
        message: 'Your review has been submitted successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Failed to submit review:', error);
      setSnackbar({
        open: true,
        message: 'Failed to submit review. Please try again.',
        severity: 'error'
      });
    } finally {
      setSubmitting({ ...submitting, review: false });
    }
  };

  const onCommentSubmit: SubmitHandler<CommentFormInputs> = async (data) => {
    setSubmitting({ ...submitting, comment: true });
    try {
      const commentData: CommentRequest = {
        roomId,
        comment: data.comment
      };
      
      const newComment = await api.submitComment(commentData);
      setComments(prev => [newComment, ...prev]);
      commentForm.reset({
        comment: ''
      });
      
      setSnackbar({
        open: true,
        message: 'Your comment has been submitted successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Failed to submit comment:', error);
      setSnackbar({
        open: true,
        message: 'Failed to submit comment. Please try again.',
        severity: 'error'
      });
    } finally {
      setSubmitting({ ...submitting, comment: false });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Format date function
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Review Form Component
  const ReviewForm = () => (
    <form onSubmit={reviewForm.handleSubmit(onReviewSubmit)}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
        Rate
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Controller
          name="rating"
          control={reviewForm.control}
          rules={{ required: 'Rating is required' }}
          render={({ field }) => (
            <Rating
              {...field}
              precision={1}
              size="large"
              onChange={(_, value) => field.onChange(value)}
              sx={{ mb: 1 }}
            />
          )}
        />
        {reviewForm.formState.errors.rating && (
          <ErrorMessage>
            <ErrorIcon fontSize="small" />
            {reviewForm.formState.errors.rating.message}
          </ErrorMessage>
        )}
      </Box>
      
      <Typography variant="body2" sx={{ mb: 1 }}>
        Message
      </Typography>
      
      <Controller
        name="review"
        control={reviewForm.control}
        rules={{ 
          required: 'Review message is required',
          minLength: {
            value: 5,
            message: 'Review must be at least 5 characters'
          }
        }}
        render={({ field }) => (
          <StyledTextField
            {...field}
            fullWidth
            multiline
            rows={3}
            placeholder="Write your review here..."
            variant="outlined"
            error={!!reviewForm.formState.errors.review}
            disabled={submitting.review}
            sx={{ mb: 1 }}
          />
        )}
      />
      
      {reviewForm.formState.errors.review && (
        <ErrorMessage sx={{ mb: 1 }}>
          <ErrorIcon fontSize="small" />
          {reviewForm.formState.errors.review.message}
        </ErrorMessage>
      )}
      
      <SubmitButton
        type="submit"
        variant="contained"
        color="primary"
        disabled={submitting.review || !reviewForm.formState.isValid}
        sx={{ mt: 1 }}
      >
        {submitting.review ? <CircularProgress size={24} /> : 'Rate'}
      </SubmitButton>

      {reviews.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
            Recent Reviews
          </Typography>
          
          {loading.reviews ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            <List disablePadding>
              {reviews.map((review, index) => (
                <ListItem key={review.id || index} disableGutters sx={{ px: 0, py: 1 }}>
                  <ReviewCard sx={{ width: '100%' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Avatar 
                          src={review.userAvatar || '/api/placeholder/40/40'} 
                          alt={review.userName || 'User'}
                          sx={{ width: 32, height: 32 }}
                        />
                        <Box sx={{ ml: 1.5 }}>
                          <Typography variant="subtitle2" fontWeight="medium">
                            {review.userName || 'Anonymous'}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Rating value={review.rating} readOnly size="small" />
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                              {formatDate(review.createdAt)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ mt: 1 }}>{review.review}</Typography>
                    </CardContent>
                  </ReviewCard>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      )}
    </form>
  );

  // Comment Form Component
  const CommentForm = () => (
    <form onSubmit={commentForm.handleSubmit(onCommentSubmit)}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
        Add Your Comment
      </Typography>

      <Controller
        name="comment"
        control={commentForm.control}
        rules={{ 
          required: 'Comment is required',
          minLength: {
            value: 3,
            message: 'Comment must be at least 3 characters'
          }
        }}
        render={({ field }) => (
          <StyledTextField
            {...field}
            fullWidth
            multiline
            rows={3}
            placeholder="Ask a question or share your thoughts..."
            variant="outlined"
            error={!!commentForm.formState.errors.comment}
            disabled={submitting.comment}
            sx={{ mb: 1 }}
          />
        )}
      />
      
      {commentForm.formState.errors.comment && (
        <ErrorMessage sx={{ mb: 1 }}>
          <ErrorIcon fontSize="small" />
          {commentForm.formState.errors.comment.message}
        </ErrorMessage>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <SubmitButton
          type="submit"
          variant="contained"
          color="primary"
          endIcon={submitting.comment ? <CircularProgress size={16} /> : <SendIcon />}
          disabled={submitting.comment || !commentForm.formState.isValid}
        >
          Send
        </SubmitButton>
      </Box>

      {comments.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
            Questions & Comments
          </Typography>
          
          {loading.comments ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            <List disablePadding>
              {comments.map((comment, index) => (
                <ListItem key={comment.id || index} disableGutters sx={{ px: 0, py: 1 }}>
                  <ReviewCard sx={{ width: '100%' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Avatar 
                          src={comment.userAvatar || '/api/placeholder/40/40'} 
                          alt={comment.userName || 'User'}
                          sx={{ width: 32, height: 32 }}
                        />
                        <Box sx={{ ml: 1.5 }}>
                          <Typography variant="subtitle2" fontWeight="medium">
                            {comment.userName || 'Anonymous'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(comment.createdAt)}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ mt: 1 }}>{comment.comment}</Typography>
                    </CardContent>
                  </ReviewCard>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      )}
    </form>
  );

  // Desktop layout
  const DesktopLayout = () => (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <StyledCard>
          <CardContent sx={{ p: 3, flexGrow: 1 }}>
            <ReviewForm />
          </CardContent>
        </StyledCard>
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledCard>
          <CardContent sx={{ p: 3, flexGrow: 1 }}>
            <CommentForm />
          </CardContent>
        </StyledCard>
      </Grid>
    </Grid>
  );

  // Mobile layout with tabs
  const MobileLayout = () => (
    <StyledCard>
      <CardContent sx={{ p: 2, flexGrow: 1 }}>
        <StyledTabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Reviews" />
          <Tab label="Comments" />
        </StyledTabs>
        
        {activeTab === 0 && <ReviewForm />}
        {activeTab === 1 && <CommentForm />}
      </CardContent>
    </StyledCard>
  );

  return (
    <Container>
      <Box sx={{ py: 3 }}>
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
        
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default ReviewAndCommentsComponent;