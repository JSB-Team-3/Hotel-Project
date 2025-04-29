import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../store/auth/AuthConfig';
import { useValidation } from './useValidation';
import { RegisterFormInputs } from '../Interfaces/AuthInterfaces';
import { registerThunk } from '../store/auth/AuthThunks'; 
import { enqueueSnackbar } from 'notistack';

export const useRegisterForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { loading } = useSelector((state: RootState) => state.auth);

  const {
    CONFIRM_PASS_VALIDATION,
    COUNTRY_VALIDATION,
    EMAIL_VALIDATION,
    PASSWORD_VALIDATION,
    PHONE_VALIDATION,
    USERNAME_VALIDATION,
  } = useValidation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterFormInputs>({ mode: 'onChange' });

  const onSubmit = async (data: RegisterFormInputs) => {
    if (!selectedFiles) return toast.error(t('form.image_required'));
    if (!selectedFiles || selectedFiles.length === 0) {
      return toast.error(t('form.image_required')); // Error message
    }
    const formData = new FormData();
    formData.append('userName', data.userName);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('country', data.country);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('confirmPassword', data.confirmPassword);
    formData.append('role', 'user');
    selectedFiles.forEach((file) => {
      formData.append(`profileImage`, file);
    });

    try {
      const response = await dispatch(registerThunk(formData)).unwrap();
      enqueueSnackbar(response?.message || 'User Created successfully!', { variant: 'success' });
      navigate('/login');
    } catch (error) {
      enqueueSnackbar(error as string , { variant: 'error' });
    }
  };

  return {
    t,
    register,
    handleSubmit,
    errors,
    getValues,
    loading,
    selectedFiles,
    setSelectedFiles,
    onSubmit,
    validations: {
      CONFIRM_PASS_VALIDATION,
      COUNTRY_VALIDATION,
      EMAIL_VALIDATION,
      PASSWORD_VALIDATION,
      PHONE_VALIDATION,
      USERNAME_VALIDATION,
    }
  };
};
