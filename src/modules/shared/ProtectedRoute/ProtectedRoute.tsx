import React from 'react';
import {  Navigate, useLocation } from 'react-router-dom'
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/auth/AuthConfig';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const {token,user}=useSelector((state: RootState) => state.auth);
    const role = user?.role;
  const { pathname } =  useLocation()
  if (!token) return <Navigate to='/login'/>
// * prevent deep link
  if ( role !== 'admin' && (pathname === '/users-layout')) {
    return <Navigate to='/users-layout'/>
  }
  return children;
  
}
