import * as React from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/Hook";
import { updateRoomFacility } from "../../store/facilities/facilitiesThunk"; 

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

interface EditModalProps {
  open: boolean;
  handleClose: () => void;
  item: { id: string; name: string }; 
}

export default function EditModal({ open, handleClose, item }: EditModalProps) {
  const dispatch = useAppDispatch();
  const [facilityName, setFacilityName] = useState(item.name);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarError, setSnackbarError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (facilityName.trim()) {
      try {
        await dispatch(
          updateRoomFacility({ id: item.id, data: { name: facilityName } })
        ).unwrap();
        setSnackbarOpen(true);
        setSnackbarError("");
        handleClose(); 
      } catch (err: any) {
        setSnackbarError(err?.message || "Failed to update facility");
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.56)",
          },
        },
      }}
    >
      <Box sx={style}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={8}
        >
          <Typography variant="h6">Edit Facility</Typography>
          <IconButton style={{width:"2.5rem", height:"2.5rem", border:"1px solid red", borderRadius:"50%"}} onClick={handleClose}>
            <CloseIcon style={{color:"red"}} />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Facility Name"
            fullWidth
            value={facilityName}
            onChange={(e) => setFacilityName(e.target.value)}
            variant="outlined"
            sx={{
              mb: 8,
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
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}