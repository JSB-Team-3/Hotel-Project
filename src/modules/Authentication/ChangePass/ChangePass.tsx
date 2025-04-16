import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useTogglePassword, { ChangePassPayload, maodalStyles } from './ChangePasswordUtilities';
import { CONFIRM_PASS_VALIDATION, PASSWORD_VALIDATION } from '../../services/validation/validation';
import { useSnackbar } from 'notistack';
import { USER_URLS } from '../../services/api/apiConfig';
import { privateAxiosInstance } from '../../services/api/apiInstance';
import axios from 'axios';


const ChangePass = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { enqueueSnackbar } = useSnackbar();
  
  const {
    showPass,
    showConfirmPass,
    showOldPass,
    handleShowPass,
    handleConfirmPass,
    handleOldPass
  } = useTogglePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch
  } = useForm<ChangePassPayload>({ mode: "onChange" });

  const watchNewPassword = watch("newPassword");
  
  const onSubmit = async (data: ChangePassPayload) => {
    try {
      const response = await privateAxiosInstance.put(USER_URLS.CHANGE_PASS, data);
      enqueueSnackbar(response?.data?.message || 'Password Updated successfully!', { variant: 'success' });
      reset();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        enqueueSnackbar(error.response?.data?.message || '🦄 Something went wrong!', { variant: 'error' });
      } else {
        enqueueSnackbar('An unexpected error occurred!', { variant: 'error' });
      }
    }
    handleClose();
  };
  
  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="primary">Change Password</Button>
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
              Change Password
            </Typography>
            <Typography id="transition-modal-description" sx={{ mb: 3 }}>
              Ready to set a new password?
            </Typography>

            <Box
              onSubmit={handleSubmit(onSubmit)}
              component="form"
              noValidate
              autoComplete="off"
            >
              <TextField
              {...register('oldPassword',PASSWORD_VALIDATION)}
                id="oldPassword"
                error={!!errors.oldPassword}
                label="Current Password"
                type={showOldPass?'text':'password'}
                helperText={errors.oldPassword?.message}
                margin='normal'
                slotProps={{
                  input:{
                    endAdornment: (
                     <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleOldPass}
                        edge="end"
                      >
                        {showOldPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
                }}
                fullWidth
                autoComplete="current-password"
              />
              <TextField
              {...register('newPassword',PASSWORD_VALIDATION)}
                id="newPassword"
                error={!!errors.newPassword}
                label="New Password"
                type={showPass?'text':'password'}
                helperText={errors.newPassword?.message}
                margin='normal'
                slotProps={{
                  input:{
                    endAdornment: (
                     <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPass}
                        edge="end"
                      >
                        {showPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
                }}
                fullWidth
                autoComplete="current-password"
              />
              <TextField
              {...register('confirmNewPassword',CONFIRM_PASS_VALIDATION(watchNewPassword))}
                id="confirmNewPassword"
                error={!!errors.confirmNewPassword}
                label="Current Password"
                type={showConfirmPass?'text':'password'}
                helperText={errors.confirmNewPassword?.message}
                margin='normal'
                slotProps={{
                  input:{
                    endAdornment: (
                     <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleConfirmPass}
                        edge="end"
                      >
                        {showConfirmPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
                }}
                fullWidth
                autoComplete="current-password"
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Change Password
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