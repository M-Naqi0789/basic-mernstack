import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null; 
  }

  if (isAuthenticated) {
    return element;
  }
  
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;