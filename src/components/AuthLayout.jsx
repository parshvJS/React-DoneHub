import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IsLoading from './main/IsLoading';

export default function AuthLayout({ children, authantication = true }) {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const authstatus = useSelector((state) => state.todo.status);

  useEffect(() => {
    console.log("Auth status", authstatus);
    
    if (authantication && !authstatus) {
      // If authentication is required and user is not authenticated, redirect to login
      navigate('/login');
    } else if (!authantication && authstatus) {
      // If authentication is not required and user is authenticated, redirect to home
      navigate('/');
    }
    
    // Set loading to false after checking authentication status
    setloading(false);
  }, [authstatus, navigate, authantication]);

  return loading ? <IsLoading /> : <>{children}</>;
}
