import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import WriteTopSection from '../WriteTopSection/WriteTopSection';
import Register from '../Register';
import Quil from '../Quil';
import { fetchPOST } from '../../../utils/utils';
import { useNavigate, useLocation } from 'react-router-dom';

const WriteFree = () => {
  const [title, setTitle] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [content, setContent] = useState('');
  const [btnAble, setBtnAble] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLocation = () => {
    const currentPathname = location.pathname;
    let nextUrl = '';

    if (currentPathname === '/write/free') {
      nextUrl = `/free`;
    } else if (currentPathname === '/write/question') {
      nextUrl = `/question`;
    } else if (currentPathname === '/write/recruit/study') {
      nextUrl = `/recruit-study`;
    } else if (currentPathname === '/write/recruit/project') {
      nextUrl = `/recruit-project`;
    } else if (currentPathname === '/write/recruit/company') {
      nextUrl = `/recruit-company`;
    }
    navigate(nextUrl);
  };

  useEffect(() => {
    if (title.length >= 2 && content.length >= 10) {
      setBtnAble(true);
    } else {
      setBtnAble(false);
    }
  }, [title, content]);

  // const onSubmit = () => {
  //   const body = {
  //     title: title,
  //     content: content,
  //     selectedBoard: selectedBoard,
  //   };
  //   console.log(body);
  //   handleLocation();
  // };

  const onSubmit = async event => {
    event.preventDefault();

    const url = `http://192.168.0.22:8000/post/create`;
    const body = {
      title: title,
      content: content,
    };

    try {
      const result = await fetchPOST(url, body);
      console.log(result);

      if (result.success) {
        handleLocation();
      } else {
        alert('게시글 등록 실패! 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('게시글 등록 실패! 다시 시도해주세요.');
    }
  };

  return (
    <Container>
      <Title>자유 게시판 글쓰기</Title>
      <WriteTopSection
        title={title}
        selectedBoard={selectedBoard}
        setTitle={setTitle}
        setSelectedBoard={setSelectedBoard}
      />
      <QuilContainer>
        <Quil content={content} setContent={setContent} />
      </QuilContainer>
      <Register onSubmit={onSubmit} btnAble={btnAble} />
    </Container>
  );
};

export default WriteFree;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 55rem;
  min-height: 50rem;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-family: 'InteropLight';
  font-size: 34px;
`;

const QuilContainer = styled.div`
  margin-top: 2rem;
`;
