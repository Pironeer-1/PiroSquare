import React from 'react';
import styled from 'styled-components';

const SubInfo = ({ activate, start_date, recruit_date, personnel }) => {
  const availibilityImg = activate
    ? '/images/Main/Book_g.png'
    : '/images/Main/Book.png';

  return (
    <Container>
      <SolvedSection>
        <SolvedImg>
          <QuestionImg src={availibilityImg} />
        </SolvedImg>
        <SolvedWord className={`SolvedWord ${activate ? 'green' : 'gray'}`}>
          {activate ? '모집중' : '모집완료'}
        </SolvedWord>
      </SolvedSection>
      <DateSection>
        {start_date} ~ {recruit_date}
      </DateSection>
      <PersonnelSection>
        <PersonnelWord>모집인원</PersonnelWord>
        <PersonnelCount>{personnel}</PersonnelCount>
      </PersonnelSection>
    </Container>
  );
};
export default SubInfo;

const Container = styled.div`
  margin-top: 1rem;
  font-family: 'Hubballi';
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 30rem;
  font-size: 18px;
`;

const QuestionImg = styled.img`
  width: 35px;
`;

const SolvedSection = styled.div`
  display: flex;
  color: ${props => props.theme.colors.grayLight};
  width: 7rem;
`;

const SolvedImg = styled.div`
  margin-right: 5px;
`;

const SolvedWord = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  &.green {
    color: ${props => props.theme.colors.green};
  }

  &.gray {
    color: ${props => props.theme.colors.grayLight};
  }
`;

const DateSection = styled.div`
  color: ${props => props.theme.colors.grayLight};
  display: flex;
  flex-direction: row;
  width: 13rem;
  font-size: 20px;
  justify-content: center;
  align-items: center;
`;

const PersonnelSection = styled.div`
  margin-left: 1rem;
  width: 10rem;
  display: flex;
  align-items: center;
`;

const PersonnelCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  font-size: 22px;
`;

const PersonnelWord = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'InteropExtraLight';
`;
