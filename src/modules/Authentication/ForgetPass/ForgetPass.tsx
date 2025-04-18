import { useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/auth/AuthConfig";
import { forgot } from "../../store/auth/AuthThunks";
import { EMAIL_VALIDATION } from "../../services/validation/validation";
import { ForgotPasswordData } from "../../store/auth/interfaces/authType";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSnackbar } from "notistack";

const ForgotPass: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordData>();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();


  const navigate = useNavigate()

  const onSubmit = async (data: ForgotPasswordData) => {
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const response = await dispatch(forgot(data)).unwrap();
      enqueueSnackbar(response?.message || "Password updated successfully!", {
        variant: "success",
      });
      reset();
      setTimeout(() => {
        navigate("/reset-password");
      });
    } catch (err) {
      enqueueSnackbar(err as string, { variant: "error" });
    }
  };

  return (
    <Box height="100vh" display="flex" justifyContent="center" marginTop="4rem">
      <Box width="90%" maxWidth="400px">
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="500"
          marginBottom="2rem"
        >
          Forgot Password
        </Typography>
        <Typography gutterBottom marginBottom="6rem">
          If you already have an account register You can <br />
          <Link
            to="/login"
            style={{ color: "red", textDecoration: "none" }}
          >
            Login here !
          </Link>
        </Typography>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            {...register("email", EMAIL_VALIDATION)}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <Button
            type="submit"
            fullWidth
            color="primary"
            disabled={loading}
            sx={{
              mt: "3rem",
              backgroundColor: "#3252DF",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#2b47c4",
              },
            }}
          >
            {loading ? <CircularProgress size={24} /> : "send email"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ForgotPass;
