import React, { useState } from 'react';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import WriteTopSection from '../WriteTopSection/WriteTopSection';
import Register from '../Register';
import Quil from '../Quil';
import PersonnelInput from './PersonnelInput';
import DueDate from './DueDate';
import { fetchPOST } from '../../../utils/utils';
import { useNavigate, useLocation } from 'react-router-dom';

const WriteStudy = () => {
  const [title, setTitle] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [content, setContent] = useState('');
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(null);
  const [personnel, setPersonnel] = useState(1);

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
      personnel: personnel,
    };
    console.log(body);
    handleLocation();
  };
  return (
    <Container>
      <Title>스터디 모집</Title>
      <WriteTopSection
        title={title}
        selectedBoard={selectedBoard}
        setTitle={setTitle}
        setSelectedBoard={setSelectedBoard}
      />
      <SubInfoSection>
        <PersonnelInput personnel={personnel} setPersonnel={setPersonnel} />
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

export default WriteStudy;

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
