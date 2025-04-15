import React from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography, Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import TextInput from '../../shared/Form/TextInput';
import FormButton from '../../shared/Form/FormButton';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useValidation } from '../../hooks/useValidation';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';
import { puplicAxiosInstance } from '../../services/api/apiInstance';
const Register = () => {
  const { t } = useTranslation();
  const { CONFIRM_PASS_VALIDATION,COUNTRY_VALIDATION,EMAIL_VALIDATION,PASSWORD_VALIDATION,PHONE_VALIDATION,
    USERNAME_VALIDATION,
  } = useValidation();
  const navigate = useNavigate();

  const {register,handleSubmit,formState: { errors, isSubmitting },getValues,
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data: any) => {
    try {
      const res = await puplicAxiosInstance.post("/register", data);
      toast.success(res?.data?.message || '🦄 User Registered!');
      navigate('/login', { state: { email: data.email } });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || '🦄 Something went wrong!');
      } else {
        toast.error('An unexpected error occurred!');
      }
    }
  };

  return (
    <Box component="section"  sx={{ p: { xs: 0, sm: 10 } }} >
      <Typography variant="h4" component="h2" gutterBottom sx={{mb: 2}}>
        {t('register.heading')}
      </Typography>

      <Typography variant="body1"  color="#000000" sx={{ maxWidth: 300 ,mb: 2}}>
        {t('register.already_have_account')}
        <Typography component="span" variant="body2" color="red">
          {' '}
          <Link component={RouterLink} to="/login" underline="hover" color="red">
            {t('register.login_here')}
          </Link>
        </Typography>
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} >
        <Grid container spacing={2}>
          <TextInput
            name="userName"
            id="username"
            label={t('form.username')}
            register={register}
            validation={USERNAME_VALIDATION}
            type="text"
            errors={errors}
          />

          <Grid  size={{xs: 12, sm: 6}} >
            <TextInput
              name="phone"
              id="phone"
              label={t('form.phone')}
              register={register}
              validation={PHONE_VALIDATION}
              type="text"
              errors={errors}
            />
          </Grid>

          <Grid size={{xs: 12, sm: 6}}>
            <TextInput
              name="country"
              id="country"
              label={t('form.country')}
              register={register}
              validation={COUNTRY_VALIDATION}
              type="text"
              errors={errors}
            />
          </Grid>

          <TextInput
            name="email"
            id="email"
            label={t('form.email')}
            register={register}
            validation={EMAIL_VALIDATION}
            type="text"
            errors={errors}
          />

          <TextInput
            name="password"
            id="password"
            label={t('form.password')}
            register={register}
            validation={PASSWORD_VALIDATION}
            type="password"
            errors={errors}
          />

          <TextInput
            name="confirmPassword"
            id="confirmPassword"
            label={t('form.confirmpassword')}
            register={register}
            validation={CONFIRM_PASS_VALIDATION(getValues('password'))}
            type="password"
            errors={errors}
          />
        </Grid>

        <FormButton isSubmitting={isSubmitting} color="primary" name={t('form.sign_up')}/>
      </form>
    </Box>
  );
};

export default Register;
