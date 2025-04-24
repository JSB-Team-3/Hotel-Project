import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography, Link} from '@mui/material';
import { useForm } from 'react-hook-form';
import TextInput from '../../shared/Form/TextInput';
import FormButton from '../../shared/Form/FormButton';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useValidation } from '../../hooks/useValidation';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../../store/auth/AuthConfig';
import { useDispatch, useSelector } from 'react-redux';
import { register as registerThunk } from '../../store/auth/AuthThunks';
import { RegisterFormInputs } from '../../interfaces/AuthInterfaces';
import FileUpload from '../../shared/Form/FileUpload';

const Register = () => {
  const { t } = useTranslation();  // Translation hook
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user } = useSelector((state: RootState) => state.auth);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    CONFIRM_PASS_VALIDATION,
    COUNTRY_VALIDATION,
    EMAIL_VALIDATION,
    PASSWORD_VALIDATION,
    PHONE_VALIDATION,
    USERNAME_VALIDATION,
  } = useValidation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterFormInputs>({ mode: 'onChange' });

  const onSubmit = async (data: RegisterFormInputs) => {
    if (!selectedFile) return toast.error(t('form.image_required'));  // Error message
    try {
      await dispatch(registerThunk({
        ...data,
        role: 'user',
        profileImage: selectedFile,
      })).unwrap();
      // enqueueSnackbar(response?.message || t('register.success_message'), { variant: 'success' });
      navigate('/login');
    } catch (error) {
      // enqueueSnackbar(error as string || t('register.error_message'), { variant: 'error' });

    }
  };

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
            validation={USERNAME_VALIDATION}
            type="text"
            errors={errors}
          />

          <Grid size={{ xs: 12, sm: 6 }} >
            <TextInput<RegisterFormInputs>
              name="phoneNumber"
              id="phone"
              label={t('form.phonenumber')}
              register={register}
              validation={PHONE_VALIDATION}
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
              validation={COUNTRY_VALIDATION}
              type="text"
              errors={errors}
            />
          </Grid>

          <TextInput<RegisterFormInputs>
            name="email"
            id="email"
            label={t('form.email')}
            register={register}
            validation={EMAIL_VALIDATION}
            type="text"
            errors={errors}
          />

          {/* File Upload Component */}
          <FileUpload
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            register={register}
            errors={errors}
            t={t}
          />

          <TextInput<RegisterFormInputs>
            name="password"
            id="password"
            label={t('form.password')}
            register={register}
            validation={PASSWORD_VALIDATION}
            type="password"
            errors={errors}
          />

          <TextInput<RegisterFormInputs>
            name="confirmPassword"
            id="confirmPassword"
            label={t('form.confirmpassword')}
            register={register}
            validation={CONFIRM_PASS_VALIDATION(getValues('password'))}
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
