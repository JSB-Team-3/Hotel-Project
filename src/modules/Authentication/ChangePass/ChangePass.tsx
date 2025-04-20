import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { maodalStyles } from './ChangePasswordUtilities';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/auth/AuthConfig';
import { changePassword } from '../../store/auth/authThunks';
import { ChangePasswordData } from '../../store/auth/interfaces/authType';
import { CircularProgress } from '@mui/material';
import { useValidation } from '../../hooks/useValidation';
import { useTranslation } from 'react-i18next';
import TextInput from '../../shared/Form/TextInput';

const ChangePass = () => {
  const { t } = useTranslation();  // Translation hook
  const { PASSWORD_VALIDATION, CONFIRM_PASS_VALIDATION } = useValidation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>()
  const { loading } = useSelector((state: RootState) => ({
    loading: state.auth.loading,
  }));

 const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm<ChangePasswordData>({ mode: "onChange" });
  
  const onSubmit = async (data: ChangePasswordData) => {
    try {
      const response = await dispatch(changePassword(data)).unwrap();
      enqueueSnackbar(response?.message || t('password.successMessage'), { variant: 'success' });
      reset();
      handleClose()
    } catch (err) {
      enqueueSnackbar(err as string, { variant: 'error' });
    }
  };
  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');
  useEffect(() => {
    if (confirmPassword) {
      trigger('confirmPassword');
    }
  }, [newPassword, confirmPassword, trigger]);
  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="primary">
        {t('password.changeButton')}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={maodalStyles}>
            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
              {t('password.modalTitle')}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mb: 3 }}>
              {t('password.modalDescription')}
            </Typography>

            <Box
              onSubmit={handleSubmit(onSubmit)}
              component="form"
              noValidate
              autoComplete="off"
            >
              <TextInput<ChangePasswordData>
                name="oldPassword"
                id="oldPassword"
                label={t('form.oldPassword')}
                register={register}
                validation={PASSWORD_VALIDATION}
                type="password"
                errors={errors}
              />
              <TextInput<ChangePasswordData>
                name="newPassword"
                id="newPassword"
                label={t('form.newPassword')}
                register={register}
                validation={PASSWORD_VALIDATION}
                type="password"
                errors={errors}
              />

              <TextInput<ChangePasswordData>
                name="confirmPassword"
                id="confirmPassword"
                label={t('form.confirmPassword')}
                register={register}
                validation={CONFIRM_PASS_VALIDATION((newPassword))}
                type="password"
                errors={errors}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
                <Button variant="outlined" onClick={handleClose}>
                  {t('common.cancel')}
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  {loading ? <CircularProgress color="inherit" size={24} sx={{ color: 'white' }} /> : t('password.changeButton')}
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ChangePass;