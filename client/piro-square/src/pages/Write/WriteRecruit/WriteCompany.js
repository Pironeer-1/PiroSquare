import React, { useState } from 'react';
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

  const onSubmit = () => {
    const body = {
      title: title,
      content: content,
      selectedBoard: selectedBoard,
      startDate: startDate,
      endDate: endDate,
    };
    console.log(body);
    handleLocation();
  };

  // const onSubmit = async event => {
  //   event.preventDefault();
  //   const url = 'http://localhost:3333/post/create';
  //   const body = {
  //    title: title,
  //    content: content,
  //    selectedBoard: selectedBoard,
  //    startDate: startDate,
  //    endDate: endDate,
  // };
  //   const result = await fetchPOST(url, body);
  //   console.log(result);
  //   setTitle('');
  //   setContent('');
  //   handleLocation();
  // };

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
      <Register onSubmit={onSubmit} />
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
