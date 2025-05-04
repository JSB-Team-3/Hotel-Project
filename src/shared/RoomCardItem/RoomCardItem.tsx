// RoomCardItem.tsx
import { Grid, Box, Typography, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Visibility from "@mui/icons-material/Visibility";

type RoomCardItemProps = {
  image: string;
  title: string;
  price: number;
  width?: string | number;
  height?: string | number;
};

export default function RoomCardItem({
  image,
  title,
  price,
  width,
  height,
}: RoomCardItemProps) {

    console.log(title);
    

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Box
        sx={{
          position: "relative",
          width,
          height,
          cursor:"pointer",
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
            right: 0,
            width: "180px",
            height: "40px",
            borderEndStartRadius: "15px",
            backgroundColor: "#FF498B",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" sx={{ color: "white" }}>
            <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
              ${price}
            </Box>
            <Box component="span" sx={{ fontWeight: "bold" }}>
              per night
            </Box>
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
            aria-label="add to favorites"
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
            aria-label="show details"
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
            left: "12px",
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
