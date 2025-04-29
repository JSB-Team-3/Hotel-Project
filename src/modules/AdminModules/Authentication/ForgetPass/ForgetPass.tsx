import { useForm } from "react-hook-form";
import { Alert, Box, Typography, Button, CircularProgress, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/auth/AuthConfig";
import { forgot } from "../../../../store/auth/AuthThunks";
import { useValidation } from "../../../../hooks/useValidation";
import { ForgotPasswordData } from "../../../../store/auth/interfaces/authType";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSnackbar } from "notistack";
import TextInput from "../../../../shared/Form/TextInput";
import { useTranslation } from "react-i18next";

const ForgetPass: React.FC = () => {

  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);


  const {
    EMAIL_VALIDATION,
  } = useValidation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordData>();



  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

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
    <Box height="100vh" display="flex" justifyContent="center" maxHeight="85vh" marginTop="5rem">
      <Box width="90%" maxWidth="400px">
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="500"
          marginBottom="2rem"
        >
          {t("form.forgot_heading")}
        </Typography>

        <Typography variant="body1" sx={{ maxWidth: 300, mb: 10 }}>
          {t("register.already_have_account")}{" "}
          <Link
            component={RouterLink}
            to="/login"
            underline="hover"
            color="red"
          >
            {t("register.login_here")}
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
          <TextInput
            name="email"
            label={t("form.email")}
            id="email"
            type="text"
            register={register}
            validation={EMAIL_VALIDATION}
            errors={errors}
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
            {loading ? <CircularProgress size={24} /> : t("form.sign_up")}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ForgetPass;
