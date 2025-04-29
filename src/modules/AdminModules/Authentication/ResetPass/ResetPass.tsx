import {
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/auth/AuthConfig";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useValidation } from "../../../../hooks/useValidation";
import { resetPass } from "../../../../store/auth/AuthThunks";
import { ResetPasswordData } from "../../../../store/auth/interfaces/authType";
import { useSnackbar } from "notistack";
import TextInput from "../../../../shared/Form/TextInput";
import { useTranslation } from "react-i18next";

const ResetPass: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const {
    EMAIL_VALIDATION,
    OTP_VALIDATION,
    PASSWORD_VALIDATION,
    CONFIRM_PASS_VALIDATION,
  } = useValidation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordData>();

    const { t } = useTranslation();


  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
      setTimeout(() => {
        navigate("/login");
      });
    } catch (err) {
      enqueueSnackbar(err as string, { variant: "error" });
    }
  };

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      maxHeight="85vh"
      mb={4}
      marginTop="5rem"
    >
      <Box width="90%" maxWidth="400px">
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="500"
          marginBottom="2rem"
        >
          Reset Password
        </Typography>

        <Typography variant="body1" sx={{ maxWidth: 300, mb: 2 }}>
          {t("register.already_have_account")}{" "}
          <RouterLink
            component={RouterLink}
            to="/login"
            underline="hover"
            color="red"
          >
            {t("register.login_here")}
          </RouterLink>
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
          <Box mb={4}>
            <TextInput
              name="email"
              label={t("form.email")}
              id="email"
              type="text"
              register={register}
              validation={EMAIL_VALIDATION}
              errors={errors}
            />
          </Box>

          {/* OTP */}
          <Box mb={4}>
            <TextInput
              name="seed"
              label={t("form.otp")}
              id="otp"
              type="text"
              register={register}
              validation={OTP_VALIDATION}
              errors={errors}
            />
          </Box>

          {/* Password */}
          <Box mb={4}>
            <TextInput
              name="password"
              label={t("form.password")}
              id="password"
              type="password"
              register={register}
              validation={PASSWORD_VALIDATION}
              errors={errors}
            />
          </Box>

          {/* Confirm Password */}
          <Box mb={4}>
            <TextInput
              name="confirmPassword"
              label={t("form.confirmpassword")}
              id="confirmPassword"
              type="password"
              register={register}
              validation={CONFIRM_PASS_VALIDATION(password)}
              errors={errors}
            />
          </Box>

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
