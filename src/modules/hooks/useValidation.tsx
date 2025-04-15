import { useTranslation } from "react-i18next";

export const useValidation = () => {
  const { t } = useTranslation();

  return {
    EMAIL_VALIDATION: {
      required: t('validation.email_required'),
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: t('validation.email_invalid'),
      },
    },

    PASSWORD_VALIDATION: {
      required: t('validation.password_required'),
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        message: t('validation.password_pattern'),
      },
    },

    OTP_VALIDATION: {
      required: t('validation.otp_required'),
    },

    CONFIRM_PASS_VALIDATION: (password: string) => ({
      required: t('validation.confirm_password_required'),
      validate: (value: string) =>
        value === password || t('validation.passwords_do_not_match'),
    }),

    REQUIRED_VALIDATION: (input: string) => ({
      required: t('validation.generic_required', { field: input }),
    }),

    USERNAME_VALIDATION: {
      required: t('validation.username_required'),
      pattern: {
        value: /^(?=.*[A-Za-z])[A-Za-z0-9]{3,7}[0-9]$/,
        message: t('validation.username_pattern'),
      },
    },

    COUNTRY_VALIDATION: {
      required: t('validation.country_required'),
      pattern: {
        value: /^[a-zA-Z]{2,}$/,
        message: t('validation.country_invalid'),
      },
    },

    PHONE_VALIDATION: {
      required: t('validation.phone_required'),
      pattern: {
        value: /^[0-9]{11}$/,
        message: t('validation.phone_invalid'),
      },
    },
  };
};
