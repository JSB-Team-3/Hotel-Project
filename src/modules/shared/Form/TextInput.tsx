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
  FieldValues,
} from 'react-hook-form';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useTogglePassword from '../../hooks/useTogglePassword';
import BootstrapInput from './BootstrapInput';
import { useTranslation } from 'react-i18next';
import { RegisterFormInputs } from '../../interfaces/AuthInterfaces';

type ExtendedFieldErrors = FieldErrors<RegisterFormInputs> & {
  oldPassword?: { message?: string };
  newPassword?: { message?: string };
};

interface TextInputProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  id?: string;
  register: UseFormRegister<T>;
  validation?: RegisterOptions<T, Path<T>>;
  type: string;
  errors?: any;
}

const TextInput = <T extends FieldValues>({
  name,
  label,
  id,
  placeholder,
  register,
  validation,
  type,
  errors = {},
}: TextInputProps<T>) => {
  const { t } = useTranslation();
  const {
    showPass,
    handleShowPass,
    showConfirmPass,
    handleConfirmPass,
    showOldPass,
    handleOldPass,
    showNewPass,
    handleNewPass,
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
    } else if (name === 'newPassword') {
      isVisible = showNewPass;
      handleToggle = handleNewPass;
    }

    // Get current document direction to determine RTL or LTR
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';

    // Adjust position of the icon for RTL or LTR
    const iconPosition = isRtl ? 'left' : 'right';

    return (
      <InputAdornment sx={{ position: 'absolute', [iconPosition]: 15 }} position="end">
        <IconButton onClick={handleToggle} edge="end" size="small">
          {isVisible ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    );
  };

  // Determine the input type based on the field name and visibility state
  const getInputType = () => {
    if (type !== 'password') return type;
    
    switch (name) {
      case 'password':
        return showPass ? 'text' : 'password';
      case 'confirmPassword':
        return showConfirmPass ? 'text' : 'password';
      case 'oldPassword':
        return showOldPass ? 'text' : 'password';
      case 'newPassword':
        return showNewPass ? 'text' : 'password';
      default:
        return 'password';
    }
  };

  return (
    <FormControl variant="standard" fullWidth error={hasError}>
      <InputLabel
        shrink
        htmlFor={id || name}
        sx={{ color: theme => theme.palette.text.primary, fontSize: '16px', fontWeight: 400 }}
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
        type={getInputType()}
        {...register(name, validation)}
        endAdornment={
          type === 'password' ? getPasswordToggle() : undefined
        }
        error={hasError}
      />

      {hasError && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default TextInput;