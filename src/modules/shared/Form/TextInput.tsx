import React from 'react';
import {
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';
import {
  UseFormRegister,
  RegisterOptions,
  FieldErrors,
  Path,
} from 'react-hook-form';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useTogglePassword from '../../hooks/useTogglePassword';
import BootstrapInput from './BootstrapInput';
import { useTranslation } from 'react-i18next';
import { RegisterFormInputs } from '../../interfaces/AuthInterfaces';

// 👇 Extend errors to include oldPassword explicitly
type ExtendedFieldErrors = FieldErrors<RegisterFormInputs> & {
  oldPassword?: { message?: string };
};
interface TextInputProps {
  name: Path<RegisterFormInputs> | 'oldPassword'; // support both form keys and custom keys
  label?: string;
  placeholder?: string;
  id?: string;
  register: UseFormRegister<RegisterFormInputs>;
  validation?: RegisterOptions<RegisterFormInputs, Path<RegisterFormInputs>>;
  type: string;
  errors?: any;
}


const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  id,
  placeholder,
  register,
  validation,
  type,
  errors = {},
}) => {
  const { t } = useTranslation();

  const {
    showPass,
    handleShowPass,
    showConfirmPass,
    handleConfirmPass,
    showOldPass,
    handleOldPass,
  } = useTogglePassword();

  const hasError = !!errors[name];
  const errorMessage = errors[name]?.message as string;

  const getPasswordToggle = () => {
    let isVisible = false;
    let handleToggle = () => {};

    if (name === 'password') {
      isVisible = showPass;
      handleToggle = handleShowPass;
    } else if (name === 'confirmPassword') {
      isVisible = showConfirmPass;
      handleToggle = handleConfirmPass;
    } else if (name === 'oldPassword') {
      isVisible = showOldPass;
      handleToggle = handleOldPass;
    }

    return (
      <InputAdornment sx={{ position: 'absolute', right: 15 }} position="end">
        <IconButton onClick={handleToggle} edge="end" size="small">
          {isVisible ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    );
  };

  return (
    <FormControl variant="standard" fullWidth error={hasError}>
      <InputLabel
        shrink
        htmlFor={id || name}
        sx={{ color: '#152C5B', fontSize: '16px', fontWeight: 400 }}
      >
        {label || t(`form.${name.toLocaleLowerCase()}`, name)}
      </InputLabel>

      <BootstrapInput
        id={id || name}
        placeholder={
          placeholder ||
          t('form.placeholder', {
            field: t(`form.${name.toLocaleLowerCase()}`, name),
          })
        }
        type={
          type === 'password' && name === 'password' && !showPass
            ? 'password'
            : type === 'password' && name === 'confirmPassword' && !showConfirmPass
            ? 'password'
            : type === 'password' && name === 'oldPassword' && !showOldPass
            ? 'password'
            : 'text'
        }
        {...register(name as keyof RegisterFormInputs, validation)}
        endAdornment={
          name === 'password' || name === 'confirmPassword' || name === 'oldPassword'
            ? getPasswordToggle()
            : undefined
        }
        error={hasError}
      />

      {hasError && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default TextInput;
