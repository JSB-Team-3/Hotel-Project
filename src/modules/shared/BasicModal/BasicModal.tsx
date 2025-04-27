
import * as React from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/Hook";
import { createRoomFacility } from "../../store/facilities/facilitiesThunk";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "1rem",
  p: 4,
};

interface BasicModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function BasicModal({ open, handleClose }: BasicModalProps) {
  const dispatch = useAppDispatch();
  const [facilityName, setFacilityName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarError, setSnackbarError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (facilityName.trim()) {
      try {
        await dispatch(createRoomFacility({ name: facilityName })).unwrap();
        setSnackbarOpen(true);
        setSnackbarError("");
        setFacilityName("");
        handleClose();
      } catch (err: any) {
        setSnackbarError(err?.message || "failed to delete facility");
      }
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
          },
        }}
      >
        <Box sx={style}>
          {/* Title & Close Icon */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={8}
          >
            <Typography variant="h6">Add New Facility</Typography>
            <IconButton style={{width:"2.5rem", height:"2.5rem", border:"1px solid red", borderRadius:"50%"}} onClick={handleClose}>
              <CloseIcon style={{color:"red"}}/>
            </IconButton>
          </Box>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Facility Name"
              fullWidth
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
              variant="outlined"
              sx={{
                mb: 10,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "0.5rem",
                },
                "& label": {
                  backgroundColor: "#fff",
                  px: "4px",
                },
              }}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#203FC7",
                  textTransform: "none",
                  px: 4,
                  "&:hover": {
                    backgroundColor: "#1a34a8",
                  },
                }}
              >
                save
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Facility added successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={!!snackbarError}
        autoHideDuration={4000}
        onClose={() => setSnackbarError("")}
      >
        <Alert
          onClose={() => setSnackbarError("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarError}
        </Alert>
      </Snackbar>
    </>
  );
}
