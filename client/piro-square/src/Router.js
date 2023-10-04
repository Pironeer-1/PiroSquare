import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RouteWithNavFooter from './RouteWithNavFooter';
import Login from './pages/Login/Login';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/userdata`, {
        withCredentials: true,
      });
      const userData = response.data;

      if (response.data.message !== 'ok') {
        setIsLoggedIn(false);
      } else {
        setUserData(userData);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error during fetchUserData:', error);
    }
  };

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
      value={{
        userData: userData,
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
      }}
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
