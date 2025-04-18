export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" ;
}

export interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  phone: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  seed: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordData {
  currentPass: string;
  newPass: string;
  confirmNewPass: string;
}
