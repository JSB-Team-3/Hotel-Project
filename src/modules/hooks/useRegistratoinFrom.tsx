import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../store/auth/AuthConfig';
import { useValidation } from './useValidation';
import { RegisterFormInputs } from '../../Interfaces/AuthInterfaces';
import { registerThunk } from '../store/auth/AuthThunks'; 
import { enqueueSnackbar } from 'notistack';

export const useRegisterForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
    if (!selectedFile) return toast.error(t('form.image_required'));

    try {
     const response= await dispatch(registerThunk({
        ...data,
        role: 'user',
        profileImage: selectedFile,
      })).unwrap();
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
    selectedFile,
    setSelectedFile,
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
