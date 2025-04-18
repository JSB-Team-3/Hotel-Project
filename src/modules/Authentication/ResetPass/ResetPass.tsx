import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/auth/AuthConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  EMAIL_VALIDATION,
  OTP_VALIDATION,
  PASSWORD_VALIDATION,
  CONFIRM_PASS_VALIDATION,
} from "../../services/validation/validation";
import { resetPass } from "../../store/auth/AuthThunks";
import { ResetPasswordData } from "../../store/auth/interfaces/authType";
import {useSnackbar} from 'notistack'
import { Link } from "react-router-dom";

const ResetPass: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordData>();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const password = watch("password");

    const onSubmit = async (data: ResetPasswordData) => {
      setSuccessMessage("");
      setErrorMessage("");

      try {
        const response = await dispatch(resetPass(data)).unwrap();
        enqueueSnackbar(response?.message || "Password updated successfully!", {
          variant: "success",
        });
        reset();
        setTimeout(()=>{
          navigate('/login')
        })
      } catch (err) {
        enqueueSnackbar(err as string, { variant: "error" });
      }
    };

  return (
    <Box height="100vh" display="flex" justifyContent="center">
      <Box width="90%" maxWidth="400px">
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="500"
          marginBottom="2rem"
        >
          Reset Password
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
          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            {...register("email", EMAIL_VALIDATION)}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          {/* OTP */}
          <TextField
            fullWidth
            label="OTP"
            variant="outlined"
            margin="normal"
            {...register("seed", OTP_VALIDATION)}
            error={!!errors.seed}
            helperText={errors.seed?.message}
          />

          {/* Password */}
          <TextField
            fullWidth
            label="New Password"
            variant="outlined"
            margin="normal"
            type={showPassword ? "text" : "password"}
            {...register("password", PASSWORD_VALIDATION)}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Confirm Password */}
          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            type={showPassword ? "text" : "password"}
            {...register("confirmPassword", CONFIRM_PASS_VALIDATION(password))}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            fullWidth
            color="primary"
            disabled={loading}
            sx={{
              mt: "2.5rem",
              backgroundColor: "#3252DF",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#2b47c4",
              },
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Reset Password"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ResetPass;
