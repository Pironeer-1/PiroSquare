import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import WriteTopSection from '../WriteTopSection/WriteTopSection';
import Register from '../Register';
import Quil from '../Quil';
import DueDate from './DueDate';
import { fetchPOST } from '../../../utils/utils';
import { useNavigate, useLocation } from 'react-router-dom';

const WriteCompany = () => {
  const [title, setTitle] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [content, setContent] = useState('');
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(null);
  const [btnAble, setBtnAble] = useState(false);

  useEffect(() => {
    if (title.length >= 2 && content.length >= 10) {
      setBtnAble(true);
    } else {
      setBtnAble(false);
    }
  }, [title, content]);

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

  const inputStartDate = new Date(startDate);

  const formattedStartDate =
    inputStartDate.getFullYear() +
    '-' +
    ('0' + (inputStartDate.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + inputStartDate.getDate()).slice(-2);

  const inputFinishDate = new Date(endDate);

  const formattedFinishDate =
    inputFinishDate.getFullYear() +
    '-' +
    ('0' + (inputFinishDate.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + inputFinishDate.getDate()).slice(-2);

  const onSubmit = async event => {
    event.preventDefault();
    const confirmSubmit = window.confirm('게시글을 등록하시겠습니까?');
    const url = `http://localhost:8000/recruit/create`;
    const body = {
      title: title,
      content: content,
      board_type_id: 4,
      selectedBoard: selectedBoard,
      startDate: formattedStartDate,
      category: 'recruit',
      endDate: formattedFinishDate,
    };

    if (confirmSubmit) {
      try {
        const result = await fetchPOST(url, body);

        if (result.success) {
          handleLocation();
        } else {
          handleLocation();
        }
      } catch (error) {
        console.error('Error:', error);
        alert('게시글 등록 실패! 다시 시도해주세요.');
      }
    }
  };
  return (
    <Container>
      <Title>채용 / 공고</Title>
      <WriteTopSection
        title={title}
        selectedBoard={selectedBoard}
        setTitle={setTitle}
        setSelectedBoard={setSelectedBoard}
      />
      <SubInfoSection>
        <DueDate
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </SubInfoSection>
      <QuilContainer>
        <Quil content={content} setContent={setContent} />
      </QuilContainer>
      <Register onSubmit={onSubmit} btnAble={btnAble} />
    </Container>
  );
};

export default WriteCompany;

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

const SubInfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  width: 55rem;
`;
