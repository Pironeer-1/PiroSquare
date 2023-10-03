import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';

export default function NaverLogin() {
  const location = useLocation();

  const getNaverToken = () => {
    if (!location.hash) return;
    const token = location.hash.split('=')[1].split('&')[0];
    axios
      .post(
        `${process.env.REACT_APP_SERVER_API}/naver/`,
        {
          token,
        },
        {
          withCredentials: true,
        },
      )
      .then(res => {
        window.location.replace('/');
      });
  };

  useEffect(() => {
    getNaverToken();
  }, []);

  return <div className="naverlogin-container"></div>;
}
