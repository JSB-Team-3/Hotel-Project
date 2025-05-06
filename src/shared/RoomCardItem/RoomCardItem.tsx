import React, { useState, useCallback } from "react";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Visibility from "@mui/icons-material/Visibility";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useAddToFavorite from "../../hooks/useAddToFavorite";

type ResponsiveSize = {
  xs?: number | string;
  sm?: number | string;
  md?: number | string;
  lg?: number | string;
  xl?: number | string;
};

type HeightProp = string | number | ResponsiveSize;

interface RoomCardItemProps {
  image: string;
  title: string;
  price: number;
  width?: string | number;
  height?: HeightProp;
  id?: string;
}

const RoomCardItem: React.FC<RoomCardItemProps> = ({
  image,
  title,
  price,
  width = "100%",
  height = 215,
  id,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isRtl = theme.direction === "rtl";
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const addToFav = useAddToFavorite();

  // Memoize handlers to prevent unnecessary re-renders
  const handleAddToFav = useCallback(() => {
    if (id) {
      addToFav(id);
    }
  }, [id, addToFav]);

  // Memoized navigation function
  const goToRoomDetails = useCallback(() => {
    if (id) {
      navigate(`rooms/${id}`);
    }
  }, [navigate, id]);

  // Fallback image handler
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/placeholder-image.jpg";
  }, []);

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          width,
          height,
          cursor: "pointer",
          borderRadius: "15px",
          overflow: "hidden",
          transition: "transform 0.3s ease",
          transform: isHovered ? "scale(1.02)" : "scale(1)",
          "&:hover": {
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          },
          "&:hover .hover-overlay": {
            opacity: 1,
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        aria-label={title}
      >
        {/* Dark gradient overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)",
            zIndex: 1,
          }}
        />

        {/* Image with loading optimization */}
        <Box
          component="img"
          src={image || "/placeholder-image.jpg"} // Fallback for empty image
          alt={title}
          loading="lazy"
          onError={handleImageError}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "15px",
            transition: "transform 0.5s ease",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        
        {/* Price tag with animation */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            [isRtl ? "left" : "right"]: 0,
            width: "180px",
            height: "40px",
            borderStartStartRadius: isRtl ? 0 : "15px",
            borderEndStartRadius: isRtl ? "15px" : 0,
            backgroundColor: "#FF498B",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            transition: "transform 0.3s ease",
            transform: isHovered ? `translateY(${isRtl ? '-' : ''}5px)` : "translateY(0)",
          }}
        >
          <Typography variant="body1" sx={{ color: "white" }}>
            {theme.direction === "ltr" && 
              <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
                ${price}
              </Box>
            }
            <Box component="span" sx={{ fontWeight: "bold" }}>
              {t("room.per_night")}
            </Box>
            {theme.direction === "rtl" && 
              <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
                ${price}
              </Box>
            }
          </Typography>
        </Box>

        {/* Hover overlay with actions */}
        <Box
          className="hover-overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            backgroundColor: "rgba(32, 63, 199, 0.21)",
            opacity: 0,
            transition: "opacity 0.3s ease",
            zIndex: 3,
          }}
        >
          <IconButton
            aria-label={t("room.add_to_favorites")}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToFav();
            }}
            sx={{
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              transform: "translateY(20px)",
              opacity: 0,
              transition: "all 0.3s ease",
              ...(isHovered && {
                transform: "translateY(0)",
                opacity: 1,
              }),
              "&:hover": {
                color: "red",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                transform: "scale(1.1)",
              },
            }}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton
            aria-label={t("room.show_details")}
            onClick={(e) => {
              e.stopPropagation();
              goToRoomDetails();
            }}
            sx={{
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              transform: "translateY(20px)",
              opacity: 0,
              transition: "all 0.3s ease 0.1s",
              ...(isHovered && {
                transform: "translateY(0)",
                opacity: 1,
              }),
              "&:hover": {
                color: "blue",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                transform: "scale(1.1)",
              },
            }}
          >
            <Visibility />
          </IconButton>
        </Box>

        {/* Title with animated entrance */}
        <Typography
          variant="body1"
          sx={{
            position: "absolute",
            bottom: "12px",
            [isRtl ? "right" : "left"]: "12px",
            color: "white",
            fontWeight: "bold",
            textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
            zIndex: 2,
            transition: "transform 0.3s ease",
            transform: isHovered ? "translateY(-5px)" : "translateY(0)",
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default React.memo(RoomCardItem);