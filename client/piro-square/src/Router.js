import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';
import RouteWithNavFooter from './RouteWithNavFooter';
import Login from './pages/Login/Login';
import { AuthContext } from './context/auth-context';
import axios from 'axios';

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log('isLoggedIn', isLoggedIn);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/userdata`, {
        withCredentials: true,
      });
      const userData = response.data;
      setUserData(userData);
      setIsLoggedIn(!!userData);
    } catch (error) {
      console.error(error);
    }
  };

  console.log('유저데이터', userData);
  useEffect(() => {
    fetchUserData();
  }, []);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <BrowserRouter>
        <Routes>
          {isLoggedIn ? (
            <Route path="/*" element={<RouteWithNavFooter />} />
          ) : (
            <Route path="/" element={<Login />} />
          )}
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default Router;
