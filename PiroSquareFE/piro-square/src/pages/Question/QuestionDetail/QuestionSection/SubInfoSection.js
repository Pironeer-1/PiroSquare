import React from 'react';
import styled from 'styled-components';

const SubInfoSection = ({ is_solved, answers_amount, created_at }) => {
  const availibilityImg = is_solved
    ? '/images/Question/solved_g.png'
    : '/images/Question/unsolved.png';

  return (
    <Container>
      <SolvedSection>
        <SolvedImg>
          <QuestionImg src={availibilityImg} />
        </SolvedImg>
        <SolvedWord>{is_solved ? 'Solved' : 'Unsolved'}</SolvedWord>
      </SolvedSection>
      <AnswersSection>
        {answers_amount !== 0 && answers_amount !== null ? (
          <>
            <AnswersNumber>{answers_amount}</AnswersNumber>
            <AnswersWord>answers</AnswersWord>
          </>
        ) : (
          <>
            <AnswersNumber>no</AnswersNumber>
            <AnswersWord>answers</AnswersWord>
          </>
        )}
      </AnswersSection>
      <DateSection>{created_at}</DateSection>
    </Container>
  );
};
export default SubInfoSection;

const Container = styled.div`
  margin-top: 1rem;
  font-family: 'Hubballi';
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 20rem;
  font-size: 18px;
`;

const QuestionImg = styled.img`
  width: 35px;
`;

const SolvedSection = styled.div`
  display: flex;
  color: ${props => props.theme.colors.grayLight};
`;

const SolvedImg = styled.div`
  margin-right: 5px;
`;
const SolvedWord = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AnswersSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AnswersNumber = styled.span`
  color: ${props => props.theme.colors.grayLight};
`;

const AnswersWord = styled.span`
  color: ${props => props.theme.colors.grayLight};
  margin-left: 5px;
`;

const DateSection = styled.div`
  color: ${props => props.theme.colors.grayLight};
  display: flex;
  justify-content: center;
  align-items: center;
`;
