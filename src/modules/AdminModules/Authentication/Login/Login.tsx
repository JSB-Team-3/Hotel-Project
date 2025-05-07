import React from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography, Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import TextInput from '../../../../shared/Form/TextInput';
import FormButton from '../../../../shared/Form/FormButton';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useValidation } from '../../../../hooks/useValidation';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/auth/AuthConfig';
import { getUserProfile, login as loginThunk } from '../../../../store/auth/AuthThunks';
import { LoginFormInputs } from '../../../../Interfaces/AuthInterfaces';
import { enqueueSnackbar } from 'notistack';

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { EMAIL_VALIDATION, PASSWORD_VALIDATION } = useValidation();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || '/';
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>({ mode: 'onChange' });

  const onSubmit = async (formData: LoginFormInputs) => {
    try {
      // First, login and get the user data
      const loginResult = await dispatch(loginThunk(formData)).unwrap();
      
      if (!loginResult?.data?.user?._id) {
        throw new Error(t('login.user_not_found'));
      }
      
      // Then fetch the user profile with the user ID
      const userId = loginResult.data.user._id;
      const profileResult = await dispatch(getUserProfile(userId)).unwrap();
      
      if (!profileResult?.data?.user) {
        console.warn('User profile data structure unexpected:', profileResult);
      }
      
      enqueueSnackbar(t('login.success_message'), { variant: 'success' });
      
      // Navigate based on user role
      const userRole = profileResult?.data?.user?.role || loginResult.data.user.role;
      
      if (userRole === 'admin') {
        navigate('/dashboard');
      } else if (userRole === 'user') {
        navigate(redirectPath);
      }
    } catch (error) {
      console.error('Login error:', error);
      enqueueSnackbar(error as string || t('login.error_message'), { variant: 'error' });
    }
  };

  return (
    <Box component="section">
      <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
        {t('login.title')}
      </Typography>

      <Typography variant="body1" sx={{ maxWidth: 300, mb: 2 }}>
        {t('login.no_account')}{' '}
        <Link component={RouterLink} to="/auth/register" underline="hover" color="red">
          {t('signup.title')}
        </Link>
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <TextInput<LoginFormInputs>
            name="email"
            id="email"
            label={t('form.email')}
            register={register}
            validation={EMAIL_VALIDATION}
            type="text"
            errors={errors}
          />

          <TextInput<LoginFormInputs>
            name="password"
            id="password"
            label={t('form.password')}
            register={register}
            validation={PASSWORD_VALIDATION}
            type="password"
            errors={errors}
          />
        </Grid>
        <Box sx={{textAlign:'end'}}>
          <Link component={RouterLink} to="/auth/forget-password" underline="hover" color="#4D4D4D">
            {t('forget_password.title')}
          </Link>
        </Box>

        <FormButton isSubmitting={isSubmitting} color="primary" name={t('login.login')} />
      </form>
    </Box>
  );
};

export default Login;