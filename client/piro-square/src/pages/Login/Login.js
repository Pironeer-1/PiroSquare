import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../context/auth-context';

const LOGIN_MENT = [
  {
    id: 1,
    content: '피로그래머들을 위한 단 하나의 커뮤니티',
  },
  { id: 2, content: 'Community for every Pirogrammers' },
  { id: 3, content: '피로스퀘어에 오신걸 환영합니다!' },
  { id: 4, content: 'Welcome to PIROSQUARE' },
];

const Login = () => {
  const Naver = () => {
    const popup = window.open(
      'http://localhost:8000/naver',
      '_blank',
      'width=400,height=400',
    );
    const handleLoginComplete = () => {
      popup.close();

      window.postMessage('loginComplete', window.origin);
    };
    window.addEventListener('message', event => {
      if (
        event.origin === `http://localhost:8000/` &&
        event.data === 'loginComplete'
      ) {
        handleLoginComplete();
      }
    });
  };
  const [currentMentIndex, setCurrentMentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMentIndex(prevIndex =>
        prevIndex === LOGIN_MENT.length - 1 ? 0 : prevIndex + 1,
      );
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMentIndex(prevIndex =>
        prevIndex === LOGIN_MENT.length - 1 ? 0 : prevIndex + 1,
      );
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container>
      <LoginMent>{LOGIN_MENT[currentMentIndex].content}</LoginMent>
      <LoginImg src="images/Nav/piro_logo.png" />
      <LoginTitle>PIROSQUARE</LoginTitle>
      <LoginBtn>
        <BtnImg src="images/Login/btnD.png" onClick={Naver} />
      </LoginBtn>

      <LoginBottom>
        <LoginInfo>아직 회원이 아니라면?</LoginInfo>
        <Contact>문의하기</Contact>
      </LoginBottom>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15vh;
`;

const LoginMent = styled.div`
  animation: fadeInOut 3s ease infinite;
  transition: opacity 1s;
  opacity: 1;
  font-size: 24px;
  text-align: center;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.green};
  font-family: 'InteropLight';

  @keyframes fadeInOut {
    0% {
      opacity: 1;
    }
    33% {
      opacity: 0.1;
    }
    66% {
      opacity: 0.1;
    }
    100% {
      opacity: 1;
    }
  }
`;

const LoginImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 220px;
`;

const LoginTitle = styled.h1`
  font-size: 36px;
  margin-top: 2rem;
  font-family: 'Hubballi';
`;

const LoginBtn = styled.div`
  margin-top: 2rem;
`;

const BtnImg = styled.img`
  width: 15rem;
  cursor: pointer;
`;

const LoginBottom = styled.div`
  margin-top: 1rem;
  display: flex;
`;

const LoginInfo = styled.div`
  color: ${props => props.theme.colors.grayLight};
`;

const Contact = styled.div`
  margin-left: 5px;
  color: ${props => props.theme.colors.green};
  cursor: pointer;
`;
