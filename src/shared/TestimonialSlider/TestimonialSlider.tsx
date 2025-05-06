// TestimonialSlider.tsx
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Box, Grid, Typography, useTheme, Skeleton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GradeIcon from "@mui/icons-material/Grade";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";

// Correctly typed image imports
import img2 from "../../assets/images/image 3 (1).png";
import img3 from "../../assets/images/Family Photos in Rob Wallace Park.jpeg";
import img4 from "../../assets/images/men outfit ideas friends pic.jpeg";

interface Review {
  id: number;
  name: string;
  text: string;
  rating: number;
  img: string;
}

const SlideContainer = styled(Grid)(({ theme }) => ({
  width: "100%",
  maxWidth: "1200px",
  margin: "auto",
  marginTop: theme.spacing(10),
}));

const ReviewImage = styled('img', {
  shouldForwardProp: (prop) => prop !== "isLoaded",
})<{ isLoaded?: boolean }>(({ theme, isLoaded }) => ({
  width: "100%",
  maxWidth: 500,
  objectFit: "cover",
  height: "600px",
  borderRadius: "1rem 1rem 5rem 1rem",
  border: `5px solid ${theme.palette.mode === "dark" ? theme.palette.primary.dark : "#152C5B"}`,
  marginBottom: "2rem",
  boxSizing: "border-box",
  display: isLoaded ? "block" : "none",
  padding: "10px",
  marginTop: "8rem",
}));

const ReviewContent = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "animate",
})<{ animate: boolean }>(({ animate }) => ({
  minWidth: "300px",
  maxWidth: "500px",
  opacity: animate ? 1 : 0,
  transform: animate ? "translateY(0)" : "translateY(20px)",
  transition: "opacity 0.6s ease-in-out, transform 0.6s ease-in-out",
}));

const NavigationButton = styled(Box)(({ theme }) => ({
  fontSize: "2rem",
  width: "3rem",
  height: "3rem",
  border: `4px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  borderRadius: "50%",
  cursor: "pointer",
  transition: "transform 0.2s ease-in-out",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: theme.spacing(0, 1),
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

const TestimonialSlider: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const [current, setCurrent] = useState(0);
  const [animate, setAnimate] = useState(true);
  const intervalRef = useRef<number | null>(null);
  const isRtl = theme.direction === "rtl";
  const primaryColor = theme.palette.mode === "dark" ? theme.palette.grey[100] : "#152C5B";

  // Memoize reviews to prevent unnecessary re-renders
  const reviews: Review[] = useMemo(
    () => [
      {
        id: 1,
        name: t("landing_page.Angga, Product Designer"),
        text: t("landing_page.What a great trip with my family and I should try again next time soon ..."),
        rating: 5,
        img: img2,
      },
      {
        id: 2,
        name: t("landing_page.Salma, Software Engineer"),
        text: t("landing_page.Amazing service and comfortable rooms!"),
        rating: 4,
        img: img3,
      },
      {
        id: 3,
        name: t("landing_page.Mohamed, Frontend Dev"),
        text: t("landing_page.Unforgettable experience, really worth it."),
        rating: 5,
        img: img4,
      },
    ],
    [t]
  );

  // Load images on mount using Intersection Observer API for better performance
  useEffect(() => {
    // Preload images and track their loading status
    const imageCache: Record<string, boolean> = {};
    
    // Use Promise.all for concurrent loading
    const imagePromises = reviews.map((review) => {
      return new Promise<void>((resolve) => {
        if (imageCache[review.img]) {
          resolve();
          return;
        }
        
        const img = new Image();
        img.src = review.img;
        img.onload = () => {
          imageCache[review.img] = true;
          resolve();
        };
        img.onerror = () => resolve();
      });
    });

    Promise.all(imagePromises).then(() => {
      setImagesLoaded(imageCache);
    });

    // Cleanup
    return () => {
      // Cancel any pending image loads if component unmounts
    };
  }, [reviews]);

  const nextReview = useCallback(() => {
    setAnimate(false);
    const timeoutId = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [reviews.length]);

  const prevReview = useCallback(() => {
    setAnimate(false);
    const timeoutId = setTimeout(() => {
      setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [reviews.length]);

  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(() => {
      nextReview();
    }, 5000);
  }, [nextReview]);

  const handleNextClick = useCallback(() => {
    nextReview();
    resetInterval();
  }, [nextReview, resetInterval]);

  const handlePrevClick = useCallback(() => {
    prevReview();
    resetInterval();
  }, [prevReview, resetInterval]);

  // Set up auto-rotation effect
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      nextReview();
    }, 5000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [nextReview]);

  const { name, text, rating, img } = reviews[current];
  const isImageLoaded = imagesLoaded[img];

  return (
    <SlideContainer container alignItems="center" spacing={10} direction={{ xs: "column", md: "row" }} justifyContent="center">
      <Grid size={{ xs: 12, md: 6 }}>
        {!isImageLoaded ? (
          <Skeleton
            variant="rectangular"
            sx={{
              width: "100%",
              maxWidth: 500,
              height: "600px",
              borderRadius: "1rem 1rem 5rem 1rem",
              marginBottom: "2rem",
              display: "block",
              marginTop: "8rem",
            }}
            animation="wave"
          />
        ) : (
          <ReviewImage 
            src={img} 
            alt="Room Booking" 
            isLoaded={isImageLoaded} 
            loading="lazy"
          />
        )}
      </Grid>

      <ReviewContent size={{ xs: 12, md: 6 }}  animate={animate}>
        <Typography variant="h5" gutterBottom color={primaryColor} letterSpacing={1} fontWeight="600" mb={3}>
          {t("landing_page.Happy Family")}
        </Typography>

        <Grid container alignItems="center" spacing={1} mb={2}>
          {Array.from({ length: rating }).map((_, i) => (
            <Grid key={i}>
              <GradeIcon sx={{ color: "orange", fontSize: "2rem" }} />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" mb={1} color={primaryColor}>
          {text}
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          {name}
        </Typography>

        <Box display="flex" mb={2}>
          {isRtl ? (
            <>
              <NavigationButton onClick={handleNextClick} role="button" aria-label="Next review">
                <ArrowForwardIcon />
              </NavigationButton>
              <NavigationButton onClick={handlePrevClick} role="button" aria-label="Previous review">
                <ArrowBackIcon />
              </NavigationButton>
            </>
          ) : (
            <>
              <NavigationButton onClick={handlePrevClick} role="button" aria-label="Previous review">
                <ArrowBackIcon />
              </NavigationButton>
              <NavigationButton onClick={handleNextClick} role="button" aria-label="Next review">
                <ArrowForwardIcon />
              </NavigationButton>
            </>
          )}
        </Box>
      </ReviewContent>
    </SlideContainer>
  );
};

export default React.memo(TestimonialSlider);