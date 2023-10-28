import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const DueDate = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const handleStartDateChange = date => {
    setStartDate(date);
  };

  const handleEndDateChange = date => {
    setEndDate(date);
  };

  return (
    <Container>
      <RecruitDate>모집기간</RecruitDate>
      <DateSelector>
        <Label>모집시작</Label>
        <DatePicker selected={startDate} onChange={handleStartDateChange} />
      </DateSelector>
      <DateSelector>
        <Label>모집마감</Label>
        <DatePicker selected={endDate} onChange={handleEndDateChange} />
      </DateSelector>
    </Container>
  );
};
export default DueDate;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.black};
  width: 38rem;
  height: 3rem;
  border-radius: 30px;
`;

const RecruitDate = styled.div`
  font-size: 18px;
  margin-right: 2rem;
`;

const DateSelector = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  & input {
    background-color: ${props => props.theme.colors.grayDark};
    border: none;
    font-size: 16px;
    width: 8rem;
    text-align: center;
  }
`;

const Label = styled.label`
  margin-right: 10px;
  color: ${props => props.theme.colors.grayLight};
`;
