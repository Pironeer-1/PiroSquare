import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const Paginator = ({ previous, next }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentId = parseInt(location.pathname.split('/').pop(), 10);

  const handlePreviousClick = () => {
    if (currentId > 1) {
      const previousId = currentId - 1;
      navigate(`${location.pathname.replace(currentId, previousId)}`);
    }
  };

  const handleNextClick = () => {
    const nextId = currentId + 1;
    navigate(`${location.pathname.replace(currentId, nextId)}`);
  };

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
      <GridBox>
        <LeftSection onClick={handlePreviousClick}>
          <LeftImg src="/images/Button/left_polygon.png" />
          <Previous>
            <Prev>이전글</Prev>
            <PrevTitle>{previous?.title}</PrevTitle>
          </Previous>
        </LeftSection>
        <ListBtn onClick={handleListButtonClick}>목록으로</ListBtn>
        <RightSection onClick={handleNextClick}>
          <Next>
            <Nex>다음글</Nex>
            <NexTitle>{next?.title}</NexTitle>
          </Next>
          <RightImg src="/images/Button/right_polygon.png" />
        </RightSection>
      </GridBox>
    </Container>
  );
};
export default Paginator;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 50rem;
  margin: 2rem auto;
`;

const GridBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 50rem;
`;

const ListBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
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
  &:hover {
    cursor: pointer;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  &:hover {
    cursor: pointer;
  }
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
