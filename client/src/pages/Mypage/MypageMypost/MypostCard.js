import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MypostCard = ({ id, title, created_at, thumbnail, board_name }) => {
  const boardNameString =
    board_name === 1
      ? '자유게시판'
      : board_name === 4
      ? '질문게시판'
      : board_name === 3
      ? '채용/모집'
      : '';

  const dateString = created_at;
  const datePart = dateString?.split('T')[0];
  const thumbnailSrc = thumbnail ? thumbnail : '/images/Nav/piro_logo.png';
  const navigate = useNavigate();
  const onClickDetailButton = () => {
    let detailUrl;

    if (board_name === 1) {
      detailUrl = `/free-detail/${id}`;
    } else if (board_name === 2) {
      detailUrl = `/question-detail/${id}`;
    }
    navigate(detailUrl);
  };

  return (
    <MypostBox onClick={onClickDetailButton}>
      <MypostIcon>
        <MypostImg src={thumbnailSrc} />
      </MypostIcon>
      <Container>
        <CardTitle>
          <CardSpan>[{boardNameString}]</CardSpan>
          {title}
        </CardTitle>
        <CardBottom>
          <CardDate>{datePart}</CardDate>
        </CardBottom>
      </Container>
    </MypostBox>
  );
};

export default MypostCard;

const MypostBox = styled.div`
  display: grid;
  grid-template-columns: 5rem 43rem 7rem;
  margin-top: 1rem;
  background-color: ${props => props.theme.colors.grayDark};
  border-radius: 10px;
  width: 55rem;
  height: 5rem;
`;

const MypostIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MypostImg = styled.img`
  width: 40px;
  height: 40px;
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

const CardSpan = styled.span`
  margin-right: 5px;
`;

const CardBottom = styled.div`
  display: flex;
  padding-top: 0.5rem;
  font-size: 14px;
  font-family: 'InteropExtraLight';
`;

const CardDate = styled.div`
  color: ${props => props.theme.colors.grayLight};
`;
