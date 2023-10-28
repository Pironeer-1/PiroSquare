import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../../../context/AuthContext';

const SubInfoSection = ({ user_id, is_solved, answers_amount, created_at }) => {
  const { userData } = useContext(AuthContext);
  const user = userData.data.user_id;
  const convertToBoolean = is_solved => {
    return is_solved === 1 ? true : false;
  };

  const [solved, setSolved] = useState(convertToBoolean(is_solved));

  const toggleSolved = () => {
    const confirmSubmit = window.confirm('문제 해결이 되었나요?');
    if (confirmSubmit) {
      setSolved(!solved);
    }
  };

  const availibilityImg = solved
    ? '/images/Question/solved_g.png'
    : '/images/Question/unsolved.png';

  const solvedText = solved ? 'Solved' : 'Unsolved';

  const renderMakeSolved = () => {
    if (user_id === user && answers_amount > 0 && !solved) {
      return (
        <MakeSolved>
          궁금증 해결이 되었나요?
          <ChangeSolved onClick={toggleSolved}>Yes</ChangeSolved>
        </MakeSolved>
      );
    }
    return null;
  };

  return (
    <>
      <Container>
        <SolvedSection>
          <SolvedImg>
            <QuestionImg src={availibilityImg} />
          </SolvedImg>
          <SolvedWord>{solvedText}</SolvedWord>
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
      {renderMakeSolved()}
    </>
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

const MakeSolved = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  width: 18rem;
  height: 2rem;
  color: ${props => props.theme.colors.grayLight};
  background-color: ${props => props.theme.colors.black};
`;
const ChangeSolved = styled.div`
  margin-left: 1rem;
  font-family: 'Hubballi';

  &:hover {
    cursor: pointer;
    color: ${props => props.theme.colors.green};
  }
`;
