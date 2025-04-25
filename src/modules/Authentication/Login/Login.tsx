import React from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography, Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import TextInput from '../../shared/Form/TextInput';
import FormButton from '../../shared/Form/FormButton';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useValidation } from '../../hooks/useValidation';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/auth/AuthConfig';
import { login as loginThunk } from '../../store/auth/AuthThunks';
import { LoginFormInputs } from '../../interfaces/AuthInterfaces';
import { toast } from 'react-toastify';


const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const { EMAIL_VALIDATION, PASSWORD_VALIDATION } = useValidation();
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ mode: 'onChange' });
 

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await dispatch(loginThunk(data)).unwrap();
      navigate('/dashboard'); // \
    } catch (error) {
      toast.error(t('login.error_message'));
    }
  };

  return (
    <Box component="section">
      <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
        {t('login.title')}
      </Typography>

      <Typography variant="body1" sx={{ maxWidth: 300, mb: 2 }}>
        {t('login.no_account')}{' '}
        <Link component={RouterLink} to="/register" underline="hover" color="red">
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

        <FormButton isSubmitting={loading} color="primary" name={t('login.login')} />
      </form>
    </Box>
  );
};

export default Login;
