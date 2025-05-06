import React from 'react';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/auth/AuthConfig';
import { enqueueSnackbar } from 'notistack';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
  isPublic?: boolean;
}

export default function ProtectedRoute({ children, allowedRoles = [] , isPublic = false}: ProtectedRouteProps) {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const role = user?.role;

  if (isPublic){
    return <>{children}</>
  }  

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Check if user role is allowed for this route
  if (allowedRoles.length > 0 && !allowedRoles.includes(role || '')) {
    if (role === 'admin') {
      enqueueSnackbar('You are not authorized to access this page', { variant: 'error' });
      return <Navigate to="/dashboard" />;
    } 
  }

  return <>{children}</>;
}