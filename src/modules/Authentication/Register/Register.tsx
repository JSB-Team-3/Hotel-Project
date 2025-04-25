import React from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography, Link} from '@mui/material';
import TextInput from '../../shared/Form/TextInput';
import FormButton from '../../shared/Form/FormButton';
import { Link as RouterLink} from 'react-router-dom';
import { RegisterFormInputs } from '../../../Interfaces/AuthInterfaces';
import FileUpload from '../../shared/Form/FileUpload';
import { useRegisterForm } from '../../hooks/useRegistratoinFrom';

const Register = () => {
 const {
  t, register, handleSubmit, errors, getValues, loading,
  selectedFiles, setSelectedFiles, onSubmit, validations
} = useRegisterForm();

  return (
    <Box component="section" >
      <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
        {t('register.heading')}
      </Typography>

      <Typography variant="body1" sx={{ maxWidth: 300, mb: 2 }}>
        {t('register.already_have_account')}{' '}
        <Link component={RouterLink} to="/login" underline="hover" color="red">
          {t('register.login_here')}
        </Link>
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <TextInput<RegisterFormInputs>
            name="userName"
            id="username"
            label={t('form.username')}
            register={register}
            validation={validations.USERNAME_VALIDATION}
            type="text"
            errors={errors}
          />

          <Grid size={{ xs: 12, sm: 6 }} >
            <TextInput<RegisterFormInputs>
              name="phoneNumber"
              id="phone"
              label={t('form.phonenumber')}
              register={register}
              validation={validations.PHONE_VALIDATION}
              type="text"
              errors={errors}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} >
            <TextInput<RegisterFormInputs>
              name="country"
              id="country"
              label={t('form.country')}
              register={register}
              validation={validations.COUNTRY_VALIDATION}
              type="text"
              errors={errors}
            />
          </Grid>

          <TextInput<RegisterFormInputs>
            name="email"
            id="email"
            label={t('form.email')}
            register={register}
            validation={validations.EMAIL_VALIDATION}
            type="text"
            errors={errors}
          />

          {/* File Upload Component */}
          <FileUpload
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            register={register}
            errors={errors}
          />

          <TextInput<RegisterFormInputs>
            name="password"
            id="password"
            label={t('form.password')}
            register={register}
            validation={validations.PASSWORD_VALIDATION}
            type="password"
            errors={errors}
          />

          <TextInput<RegisterFormInputs>
            name="confirmPassword"
            id="confirmPassword"
            label={t('form.confirmpassword')}
            register={register}
            validation={validations.CONFIRM_PASS_VALIDATION(getValues('password'))}
            type="password"
            errors={errors}
          />
        </Grid>

        <FormButton isSubmitting={loading} color="primary" name={t('form.sign_up')} />
      </form>
    </Box>
  );
};

export default Register;
