import React from 'react';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/auth/AuthConfig';
import { enqueueSnackbar } from 'notistack';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles = [] }: ProtectedRouteProps) {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const role = user?.role;

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Check if user role is allowed for this route
  if (allowedRoles.length > 0 && !allowedRoles.includes(role || '')) {
    // Redirect to appropriate home based on role
    if (role === 'admin') {
      enqueueSnackbar('You are not authorized to access this page', { variant: 'error' });
      return <Navigate to="/dashboard" />;
    } else {
      enqueueSnackbar('You are not authorized to access this page', { variant: 'error' });
      return <Navigate to="/home" />;
    }
  }

  return <>{children}</>;
}