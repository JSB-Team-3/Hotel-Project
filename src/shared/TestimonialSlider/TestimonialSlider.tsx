/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Grid, Typography } from "@mui/material";
import img2 from "../../assets/images/image 3 (1).png";
import img3 from "../../assets/images/Family Photos in Rob Wallace Park.jpeg";
import img4 from "../../assets/images/men outfit ideas friends pic.jpeg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GradeIcon from "@mui/icons-material/Grade";
import { useTranslation } from "react-i18next";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ReviewSlider = () => {
  const { t } = useTranslation();

  const reviews = useMemo(
    () => [
      {
        id: 1,
        name: t("Angga, Product Designer"),
        text: t(
          "What a great trip with my family and I should try again next time soon ..."
        ),
        rating: 5,
        img: img2,
      },
      {
        id: 2,
        name: t("Salma, Software Engineer"),
        text: t("Amazing service and comfortable rooms!"),
        rating: 4,
        img: img3,
      },
      {
        id: 3,
        name: t("Mohamed, Frontend Dev"),
        text: t("Unforgettable experience, really worth it."),
        rating: 5,
        img: img4,
      },
    ],
    [t]
  );

  const [current, setCurrent] = useState(0);
  const [animate, setAnimate] = useState(true);

  const nextReview = useCallback(() => {
    setAnimate(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
      setAnimate(true);
    }, 100);
  }, [reviews.length]);

  const prevReview = useCallback(() => {
    setAnimate(false);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
      setAnimate(true);
    }, 100);
  }, [reviews.length]);

  useEffect(() => {
    const interval = setInterval(nextReview, 5000);
    return () => clearInterval(interval);
  }, [nextReview]);

  const { name, text, rating, img } = reviews[current];

  return (
    <Grid
      container
      alignItems="center"
      spacing={10}
      direction={{ xs: "column", md: "row" }}
      justifyContent="center"
      mt={10}
      sx={{ width: "100%", maxWidth: "1200px", margin: "auto" }}
    >
      <Grid item xs={12} md={6}>
        <Box
          component="img"
          src={img}
          alt="Room Booking"
          sx={{
            width: "100%",
            maxWidth: 500,
            objectFit: "cover",
            height: "600px",
            borderRadius: "1rem 1rem 5rem 1rem",
            border: "5px solid #152C5B",
            marginBottom: "2rem",
            boxSizing: "border-box",
            display: "block",
            padding: "10px",
            marginTop: "8rem",
          }}
        />
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        css={
          animate &&
          css`
            animation: ${fadeIn} 0.6s ease-in-out;
          `
        }
        sx={{
          minWidth: "300px",
          maxWidth: "500px",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          color="#152C5B"
          letterSpacing={1}
          fontWeight="600"
          mb={3}
        >
          {t("Happy Family")}
        </Typography>

        <Grid container alignItems="center" spacing={1} mb={2}>
          {Array.from({ length: rating }).map((_, i) => (
            <GradeIcon key={i} sx={{ color: "orange", fontSize: "2rem" }} />
          ))}
        </Grid>

        <Typography variant="h6" mb={1} color="#152C5B">
          {text}
        </Typography>
        <Typography variant="body1" color="gray" mb={3}>
          {name}
        </Typography>

        <Grid container alignItems="center" spacing={2} mb={2}>
          <ArrowBackIcon
            onClick={prevReview}
            sx={{
              fontSize: "2rem",
              width: "3rem",
              height: "3rem",
              border: "4px solid blue",
              color: "blue",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
          <ArrowForwardIcon
            onClick={nextReview}
            sx={{
              fontSize: "2rem",
              width: "3rem",
              height: "3rem",
              border: "4px solid blue",
              color: "blue",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReviewSlider;
