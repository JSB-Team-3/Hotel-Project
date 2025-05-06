import React, { useEffect } from 'react';
import { Box, Typography, Paper, useTheme, alpha, SxProps } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import RateReviewIcon from '@mui/icons-material/RateReview';
import FeedbackIcon from '@mui/icons-material/Feedback';
import InfoIcon from '@mui/icons-material/Info';

/**
 * Props for the NoContent component
 */
interface NoContentProps {
  /** The type of content that is missing */
  type?: 'comments' | 'reviews' | 'feedback' | 'custom';
  /** Custom main message text */
  message?: string;
  /** Custom secondary message text */
  subMessage?: string;
  /** Whether to show the icon */
  showIcon?: boolean;
  /** Custom icon to use instead of the default for the type */
  customIcon?: React.ReactNode;
  /** Styling for the component container */
  sx?: SxProps;
  /** Visual variant of the component */
  variant?: 'simple' | 'card' | 'outlined' | 'filled';
  /** Enable console logging of impressions */
  logImpression?: boolean;
  /** Custom icon size (in pixels) */
  iconSize?: number;
  /** Animation duration for the icon (in seconds) */
  animationDuration?: number;
}

/**
 * A reusable component to display when there are no comments, reviews, or feedback
 */
const NoContent: React.FC<NoContentProps> = ({
  type = 'comments',
  message,
  subMessage,
  showIcon = true,
  customIcon,
  sx = {},
  variant = 'card',
  logImpression = true,
  iconSize = 48,
  animationDuration = 1.5,
}) => {
  const theme = useTheme();

  // Default messages based on type
  const defaultMessages = {
    comments: {
      main: 'No comments yet',
      sub: 'Be the first to leave a comment'
    },
    reviews: {
      main: 'No reviews available',
      sub: 'This item has not been reviewed yet'
    },
    feedback: {
      main: 'No feedback received',
      sub: 'Were waiting for your input'
    },
    custom: {
      main: 'No content available',
      sub: 'Check back later for updates'
    }
  };

  // Determine which message to display
  const displayMessage = message || defaultMessages[type].main;
  const displaySubMessage = subMessage || defaultMessages[type].sub;

  // Log impressions for analytics
  useEffect(() => {
    if (logImpression) {
      console.log(`NoContent component impression: ${type} at ${new Date().toISOString()}`);
    }
  }, [type, logImpression]);

  // Select the appropriate icon based on type
  const getIcon = () => {
    if (customIcon) return customIcon;
    
    const iconProps = {
      sx: {
        fontSize: iconSize,
        color: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.8) : theme.palette.primary.main,
        animation: animationDuration > 0 ? `pulse ${animationDuration}s infinite alternate ease-in-out` : 'none',
      }
    };

    switch (type) {
      case 'comments':
        return <CommentIcon {...iconProps} />;
      case 'reviews':
        return <RateReviewIcon {...iconProps} />;
      case 'feedback':
        return <FeedbackIcon {...iconProps} />;
      default:
        return <InfoIcon {...iconProps} />;
    }
  };

  // Different styling based on variant
  const getContainerStyles = () => {
    const baseStyles = {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(3),
      textAlign: 'center' as const,
      borderRadius: 1,
      minHeight: 120,
      width: '100%',
    };

    switch (variant) {
      case 'simple':
        return baseStyles;
      case 'outlined':
        return {
          ...baseStyles,
          border: `1px solid ${theme.palette.divider}`,
        };
      case 'filled':
        return {
          ...baseStyles,
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
        };
      case 'card':
      default:
        return {
          ...baseStyles,
          boxShadow: theme.shadows[1],
          backgroundColor: theme.palette.background.paper,
        };
    }
  };

  return (
    <Box
      component={variant === 'card' ? Paper : 'div'}
      elevation={variant === 'card' ? 1 : 0}
      sx={{
        ...getContainerStyles(),
        ...sx,
        '@keyframes pulse': {
          '0%': {
            opacity: 0.6,
            transform: 'scale(1)',
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      {showIcon && (
        <Box sx={{ mb: 2 }}>
          {getIcon()}
        </Box>
      )}
      
      <Typography
        variant="h6"
        color="textPrimary"
        gutterBottom
        sx={{ fontWeight: 500 }}
      >
        {displayMessage}
      </Typography>
      
      {displaySubMessage && (
        <Typography
          variant="body2"
          color="textSecondary"
        >
          {displaySubMessage}
        </Typography>
      )}
    </Box>
  );
};

export default NoContent;