import {
  Box,
  TextField,
  Typography,
  IconButton,
  Button,
  InputAdornment,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BookingBox: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [capacity, setCapacity] = useState(1);

  const isFormValid = startDate !== "" && endDate !== "";

  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();

  const calendarAdornment = (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.dark,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        px: 2,
      }}
    >
      <CalendarTodayIcon sx={{ color: "#fff" }} />
    </Box>
  );

  const handleExploreClick = () => {
    navigate("/explore", {
      state: { capacity },
    });
  };

  return (
    <Box sx={{ width: "100%", mt: 6 }}>
      <Box
        sx={{
          borderRadius: 2,
          bgcolor: theme.palette.background.paper,
          width: "100%",
          p: { xs: 2, sm: 3 },
          boxSizing: "border-box",
          boxShadow: theme.shadows[2],
        }}
      >
        {/* Date Inputs */}
        <Box display="flex" flexDirection={{xs:"row" ,sm: "column", lg: "row" }} gap={2}>
          {/* Start Date */}
          <Box flex={1}>
            <Typography mb={1} fontWeight="600" color="primary.main">
              {t("landing_page.Start Date")}
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {calendarAdornment}
                  </InputAdornment>
                ),
              }}
              sx={{

                "& .MuiBox-root":{
                  py:1,
                  borderRadius:1
                }
              }}    
            />
          </Box>

          {/* End Date */}
          <Box flex={1}>
            <Typography mb={1} fontWeight="600" color="primary.main">
              {t("landing_page.End Date")}
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" >
                    {calendarAdornment}
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiBox-root":{
                  py:1,
                  borderRadius:1
                }
              }}  
            />
          </Box>
        </Box>

        {/* Capacity */}
        <Box mt={4}>
          <Typography variant="subtitle1" mb={1} color="text.primary">
            {t("landing_page.Capacity")}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              bgcolor: theme.palette.action.hover,
              borderRadius: 1,
              height: 40,
              overflow: "hidden",
            }}
          >
            <IconButton
              sx={{
                bgcolor: theme.palette.error.main,
                color: "#fff",
                height: "100%",
                px: 3,
                borderRadius: 0,
                "&:hover": { bgcolor: theme.palette.error.dark },
              }}
              onClick={() => capacity > 1 && setCapacity(capacity - 1)}
            >
              <RemoveIcon />
            </IconButton>

            <Box flex={1} display="flex" justifyContent="center">
              <Typography variant="h6">{capacity}</Typography>
            </Box>

            <IconButton
              sx={{
                bgcolor: theme.palette.success.main,
                color: "#fff",
                height: "100%",
                px: 3,
                borderRadius: 0,
                "&:hover": { bgcolor: theme.palette.success.dark },
              }}
              onClick={() => setCapacity(capacity + 1)}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Explore Button */}
        <Box mt={4}>
          <Button
            fullWidth
            variant="contained"
            disabled={!isFormValid}
            sx={{
              bgcolor: theme.palette.primary.main,
              "&:hover": { bgcolor: theme.palette.primary.dark },
              py: 1.5,
            }}
            onClick={handleExploreClick}
          >
            {t("room.explore")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingBox;
