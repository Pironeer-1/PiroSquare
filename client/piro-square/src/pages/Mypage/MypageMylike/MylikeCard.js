import React from 'react';
import styled from 'styled-components';
import LikeBtn from '../../../components/Button/LikeBtn/LikeBtn';

const MylikeCard = ({
  id,
  title,
  username,
  created_at,
  is_user_like,
  like_amount,
  thumbnail,
  board_name,
}) => {
  return (
    <MylikeBox>
      <MylikeIcon>
        <MylikeImg src={thumbnail} />
      </MylikeIcon>
      <Container>
        <CardTitle>
          <CardSpan>[{board_name}]</CardSpan>
          {title}
        </CardTitle>
        <CardBottom>
          <CardAuthor>{username}</CardAuthor>
          <CardDate>{created_at}</CardDate>
        </CardBottom>
      </Container>
      <RightSection>
        <LikeBtn initialLike={is_user_like} likeAmount={like_amount} />
      </RightSection>
    </MylikeBox>
  );
};

export default MylikeCard;

const MylikeBox = styled.div`
  display: grid;
  grid-template-columns: 5rem 43rem 7rem;
  margin-top: 1rem;
  background-color: ${props => props.theme.colors.grayDark};
  border-radius: 10px;
  width: 55rem;
  height: 5rem;
`;

const MylikeIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MylikeImg = styled.img`
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

const CardAuthor = styled.div`
  color: ${props => props.theme.colors.grayLight};
`;

const CardDate = styled.div`
  margin-left: 0.5rem;
  color: ${props => props.theme.colors.grayLight};
`;

const RightSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
