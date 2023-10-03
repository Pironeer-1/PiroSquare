import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const AnnouncementCard = ({ id, title, username, created_at, sort }) => {
  const navigate = useNavigate();

  const onClickDetailButton = () => {
    navigate(`/announce-detail/${id}`);
  };

  return (
    <Container onClick={onClickDetailButton}>
      <CardTitle>
        <CardSort>[{sort}]</CardSort>
        {title}
      </CardTitle>
      <CardBottom>
        <CardAuthor>{username}</CardAuthor>
        <CardDate>{created_at}</CardDate>
      </CardBottom>
    </Container>
  );
};

export default AnnouncementCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin-top: 1rem;
  background-color: ${props => props.theme.colors.grayDark};
  border-radius: 10px;
  width: 50rem;
  height: 5rem;

  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.colors.black};
  }
`;

const CardSort = styled.span`
  margin-right: 0.5rem;
  font-family: 'InteropSemiBold';
  color: ${props => props.theme.colors.grayLight};
`;

const CardTitle = styled.div`
  font-size: 18px;
  font-family: 'InteropLight';
  margin-left: 2rem;
`;

const CardBottom = styled.div`
  display: flex;
  margin-left: 2rem;
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
