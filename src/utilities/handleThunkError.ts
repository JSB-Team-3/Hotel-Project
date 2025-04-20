import axios from "axios";

export const handleThunkError = (error: unknown, fallbackMessage = 'Something went wrong'): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || fallbackMessage;
  }
  return fallbackMessage;
};