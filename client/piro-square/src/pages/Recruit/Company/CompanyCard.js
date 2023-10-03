import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CompanyCard = ({ id, title, username, created_at, activate }) => {
  const availabilityClassName = activate ? 'greenWord' : 'grayWord';
  const availibilityImg = activate
    ? '/images/Main/Vector_g.png'
    : '/images/Main/Vector.png';

  const navigate = useNavigate();

  const onClickDetailButton = () => {
    navigate(`/company-detail/${id}`);
  };

  return (
    <CardBox onClick={onClickDetailButton}>
      <CompanyIcon>
        <CompanyImg src={availibilityImg} />
      </CompanyIcon>
      <Container>
        <CardTitle>{title}</CardTitle>
        <CardBottom>
          <CardAuthor>{username}</CardAuthor>
          <CardDate>{created_at}</CardDate>
        </CardBottom>
      </Container>
      <CompanyAvailable className={availabilityClassName}>
        {activate ? '채용중' : '마감'}
      </CompanyAvailable>
    </CardBox>
  );
};

export default CompanyCard;

const CardBox = styled.div`
  display: grid;
  grid-template-columns: 5rem 44rem 5rem;
  margin-top: 1rem;
  background-color: ${props => props.theme.colors.grayDark};
  border-radius: 10px;
  width: 55rem;
  height: 5rem;
  &:hover {
    cursor: pointer;
  }
`;

const CompanyIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CompanyImg = styled.img`
  width: 35px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
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

const CardDate = styled.div`
  margin-left: 0.5rem;
  color: ${props => props.theme.colors.grayLight};
`;

const CompanyAvailable = styled.div`
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
