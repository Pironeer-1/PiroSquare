import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../../../context/AuthContext';

const SubInfo = ({ user_id, activate, start_date, recruit_date }) => {
  const { userData } = useContext(AuthContext);
  const user = userData.data.user_id;

  const [available, setAvailable] = useState(activate);

  const toggleAvailability = () => {
    const confirmSubmit = window.confirm('모집 마감하시겠습니까?');
    if (confirmSubmit) {
      setAvailable(!available);
    }
  };

  const activateText = available ? '채용중' : '채용완료';

  const availibilityImg = available
    ? '/images/Main/Vector_g.png'
    : '/images/Main/Vector_w.png';

  const renderMakeFinish = () => {
    if (user_id === user && available) {
      return (
        <MakeSolved>
          조기 마감하기
          <ChangeSolved onClick={toggleAvailability}>Yes</ChangeSolved>
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
          <SolvedWord className={`SolvedWord ${available ? 'green' : 'gray'}`}>
            {activateText}
          </SolvedWord>
        </SolvedSection>
        <DateSection>
          {start_date} ~ {recruit_date}
        </DateSection>
      </Container>
      {renderMakeFinish()}
    </>
  );
};
export default SubInfo;

const Container = styled.div`
  margin-top: 1rem;
  font-family: 'Hubballi';
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 20rem;
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
  margin-left: 5px;
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

const MakeSolved = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  width: 13rem;
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
