import React from 'react';
import styled from 'styled-components';

const StudyCard = ({
  id,
  title,
  username,
  created_at,
  activate,
  personnel,
}) => {
  const availabilityClassName = activate ? 'greenWord' : 'grayWord';
  const availibilityImg = activate
    ? '/images/Main/book_g.png'
    : '/images/Main/book.png';

  return (
    <CardBox>
      <StudyIcon>
        <StudyImg src={availibilityImg} />
      </StudyIcon>
      <Container>
        <CardTitle>{title}</CardTitle>
        <CardBottom>
          <CardAuthor>{username}</CardAuthor>
          <CardPersonnel>
            <PersonnelSpan>모집 인원</PersonnelSpan>
            {personnel}
          </CardPersonnel>
          <CardDate>{created_at}</CardDate>
        </CardBottom>
      </Container>
      <StudyAvailable className={availabilityClassName}>
        {activate ? '모집중' : '모집 완료'}
      </StudyAvailable>
    </CardBox>
  );
};

export default StudyCard;

const CardBox = styled.div`
  display: grid;
  grid-template-columns: 5rem 44rem 5rem;
  margin-top: 1rem;
  background-color: ${props => props.theme.colors.grayDark};
  border-radius: 10px;
  width: 55rem;
  height: 5rem;
`;

const StudyIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StudyImg = styled.img`
  width: 35px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;

const CardTitle = styled.div`
  font-size: 18px;
  font-family: 'InteropLight';
`;

const CardBottom = styled.div`
  display: flex;

  padding-top: 0.5rem;
  font-size: 14px;
  font-family: 'InteropExtraLight';
`;

const CardAuthor = styled.div`
  color: ${props => props.theme.colors.grayLight};
`;

const CardPersonnel = styled.div`
  margin-left: 10px;
`;

const PersonnelSpan = styled.span`
  margin-right: 5px;
`;

const CardDate = styled.div`
  margin-left: 0.5rem;
  color: ${props => props.theme.colors.grayLight};
`;

const StudyAvailable = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.green};

  &.greenWord {
    color: ${props => props.theme.colors.green};
  }

  &.grayWord {
    color: ${props => props.theme.colors.grayLight};
  }
`;
