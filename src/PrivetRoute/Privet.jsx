import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

export default function Privet({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation(); // Correct usage of useLocation()

  // Show a loader when authentication is still in progress
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // If the user is logged in, render the children components
  if (user) {
    return children;
  }

  // Redirect to the login page if the user is not logged in
  return <Navigate to="/login" state={{ from: location }} replace />;
}
