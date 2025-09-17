// src/Component/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Component/AuthContex';

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/dashboard" />;
};

export default ProtectedRoute;
