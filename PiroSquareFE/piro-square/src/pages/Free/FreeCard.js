import React from 'react';
import styled from 'styled-components';
import LikeBtn from '../../components/Button/LikeBtn/LikeBtn';
import { useNavigate } from 'react-router-dom';

const FreeCard = ({
  post_id,
  title,
  user_name,
  created_at,
  is_user_like,
  like_amount,
  thumbnail,
  comment_count,
}) => {
  const navigate = useNavigate();
  const onClickDetailButton = () => {
    navigate(`/free-detail/${post_id}`);
  };
  return (
    <FreeBox>
      <FreeIcon onClick={onClickDetailButton}>
        <FreeImg src={thumbnail} />
      </FreeIcon>
      <Container onClick={onClickDetailButton}>
        <CardTitle>{title}</CardTitle>
        <CardBottom>
          <CardAuthor>{user_name}</CardAuthor>
          <CardDate>{created_at}</CardDate>
          <CardComment>
            <CommentImg src="/images/Mypage/chat_g.png" />
            {comment_count}
          </CardComment>
        </CardBottom>
      </Container>
      <RightSection>
        <LikeBtn
          initialLike={is_user_like}
          likeAmount={like_amount}
          post_id={post_id}
        />
      </RightSection>
    </FreeBox>
  );
};

export default FreeCard;

const FreeBox = styled.div`
  display: grid;
  grid-template-columns: 5rem 43rem 7rem;
  margin-top: 1rem;
  background-color: ${props => props.theme.colors.grayDark};
  border-radius: 10px;
  width: 55rem;
  height: 5rem;
`;

const FreeIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FreeImg = styled.img`
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

const CardBottom = styled.div`
  display: flex;

  padding-top: 0.5rem;
  font-size: 14px;
  font-family: 'InteropExtraLight';
`;

const CardAuthor = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.grayLight};
`;

const CardDate = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  color: ${props => props.theme.colors.grayLight};
`;

const RightSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardComment = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  color: ${props => props.theme.colors.grayLight};
`;

const CommentImg = styled.img`
  width: 15px;
  margin-bottom: 2px;
  margin-right: 3px;
`;
