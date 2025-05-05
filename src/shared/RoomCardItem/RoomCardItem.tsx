// RoomCardItem.tsx
import { Grid, Box, Typography, IconButton, useTheme } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Visibility from "@mui/icons-material/Visibility";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type RoomCardItemProps = {
  image: string;
  title: string;
  price: number;
  width?: string | number;
  height?: string | number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  id?: string
};

export default function RoomCardItem({
  image,
  title,
  price,
  width,
  height,
  id
}: RoomCardItemProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const isRtl = theme.direction === "rtl";
  const navigate =useNavigate();

  const goToRoomDetails = (id:string) => {
    navigate(`rooms/${id}`);
  }
  const gotToFavorites = () => {
    navigate("/home/favourites");
  }
  return (
    <Grid size={ { xs: 12 }}>
      <Box
        sx={{
          position: "relative",
          width,
          height,
          cursor: "pointer",
          borderRadius: "15px",
          overflow: "hidden",
          "&:hover .hover-overlay": {
            opacity: 1,
          },
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width,
            height,
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)",
          }}
        />

        {/* Image */}
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "15px",
          }}
        />

        {/* Price */}
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
          }}
        >
          <Typography variant="body1" sx={{ color: "white" }}>
                {theme.direction === "ltr" && <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
                  ${price}
                </Box>}
            <Box component="span" sx={{ fontWeight: "bold" }}>
              {t("room.per_night")}
            </Box>
            {theme.direction === "rtl" && <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
                  ${price}
                </Box>}
          </Typography>
        </Box>

        {/* Hover icons */}
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
            gap: 1,
            backgroundColor: "rgba(32, 63, 199, 0.21)",
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <IconButton
            aria-label={t("room.add_to_favorites")}
            onClick={gotToFavorites}
            sx={{
              color: "white",
              "&:hover": {
                color: "red",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton
            aria-label={t("room.show_details")}
            onClick={()=>id&&goToRoomDetails(id)}
            sx={{
              color: "white",
              "&:hover": {
                color: "blue",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <Visibility />
          </IconButton>
        </Box>

        {/* Title */}
        <Typography
          variant="body1"
          sx={{
            position: "absolute",
            bottom: "12px",
            [isRtl ? "right" : "left"]: "12px",
            color: "white",
            fontWeight: "bold",
            textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
          }}
        >
          {title}
        </Typography>
      </Box>
    </Grid>
  );
}
