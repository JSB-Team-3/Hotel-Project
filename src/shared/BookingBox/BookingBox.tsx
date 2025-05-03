import {
  Box,
  TextField,
  Typography,
  IconButton,
  Button,
  InputAdornment,
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

  const calendarAdornment = (
    <Box
      sx={{
        backgroundColor: "#152C5B",
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
    navigate("/home/explore", {
      state: { capacity },
    });
  };

  const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: "100%",
        margin: 0,
        marginTop: "3rem",
      }}
    >
      <Box
        sx={{
          borderRadius: "16px",
          backgroundColor: "#fff",
          width: "100%",
          padding: 0,
          margin: 0,
          boxSizing: "border-box",
        }}
      >
        {/* Date Inputs */}
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
          {/* Start Date */}
          <Box flex={1}>
            <Typography mb={1} fontWeight="600" color="#152C5B">
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
                height: "56px",
              }}
            />
          </Box>

          {/* End Date */}
          <Box flex={1}>
            <Typography mb={1} fontWeight="600" color="#152C5B">
              {t("landing_page.End Date")}
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {calendarAdornment}
                  </InputAdornment>
                ),
              }}
              sx={{
                height: "56px",
              }}
            />
          </Box>
        </Box>

        {/* Capacity */}
        <Box mt={4} width="100%">
          <Typography variant="subtitle1" mb={1}>
            {t("landing_page.Capacity")}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            width="100%"
            sx={{
              backgroundColor: "#f5f5f5",
              overflow: "hidden",
              height: "40px",
            }}
          >
            <IconButton
              sx={{
                backgroundColor: "#f44336",
                color: "#fff",
                borderRadius: "5px",
                height: "100%",
                px: 3,
                "&:hover": { backgroundColor: "#d32f2f" },
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
                backgroundColor: "#4CAF50",
                color: "#fff",
                borderRadius: "5px",
                height: "100%",
                px: 3,
                "&:hover": { backgroundColor: "#388e3c" },
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
            variant="contained"
            fullWidth
            disabled={!isFormValid}
            sx={{
              backgroundColor: "#152C5B",
              "&:hover": { backgroundColor: "#0f1e3e" },
            }}
            onClick={handleExploreClick}
          >
            Explore
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingBox;
