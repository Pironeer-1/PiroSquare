import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const Paginator = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleListButtonClick = () => {
    if (location.pathname.startsWith('/free-detail')) {
      navigate('/free');
    } else if (location.pathname.startsWith('/question-detail')) {
      navigate('/question');
    } else if (location.pathname.startsWith('/announce-detail')) {
      navigate('/announce');
    } else if (location.pathname.startsWith('/study-detail')) {
      navigate('/recruit-study');
    } else if (location.pathname.startsWith('/project-detail')) {
      navigate('/recruit-project');
    } else if (location.pathname.startsWith('/company-detail')) {
      navigate('/recruit-company');
    }
  };

  return (
    <Container>
      <LeftSection>
        <LeftImg src="/images/Button/left_polygon.png" />
        <Previous>
          <Prev>이전글</Prev>
          <PrevTitle>보고싶은 친구들에게..</PrevTitle>
        </Previous>
      </LeftSection>
      <ListBtn onClick={handleListButtonClick}>목록으로</ListBtn>
      <RightSection>
        <Next>
          <Nex>다음글</Nex>
          <NexTitle>등산 가실 분?</NexTitle>
        </Next>
        <RightImg src="/images/Button/right_polygon.png" />
      </RightSection>
    </Container>
  );
};
export default Paginator;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50rem;
  margin: 2rem auto;
`;

const ListBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: #0bec12 solid 2px;
  color: ${props => props.theme.colors.green};
  padding: 5px;
  font-size: 18px;
  width: 7rem;
  height: 3rem;
  border-radius: 30px;
  background-color: black;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.green};
    color: black;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;
const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const LeftImg = styled.img`
  width: 35px;
`;
const RightImg = styled.img`
  width: 35px;
`;

const Previous = styled.div`
  margin-left: 10px;
`;

const Prev = styled.div`
  margin-bottom: 5px;
`;

const PrevTitle = styled.div``;

const Next = styled.div`
  margin-right: 10px;
`;

const Nex = styled.div`
  text-align: right;
  margin-bottom: 5px;
`;
const NexTitle = styled.div``;
