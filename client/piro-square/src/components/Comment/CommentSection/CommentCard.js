import React from 'react';
import styled from 'styled-components';
import CommentLikeBtn from '../../Button/LikeBtn/CommentLikeBtn';

const CommentCard = ({
  id,
  username,
  created_at,
  content,
  like_amount,
  is_user_like,
  profile_img,
}) => {
  return (
    <Container>
      <CommentPerson>
        <PersonImg src={profile_img} />
      </CommentPerson>
      <CommentBox>
        <CommentInfo>
          <CommentUser>{username}</CommentUser>
          <CommentSub>
            <CommentDate>{created_at}</CommentDate>
            <CommentLikeBtn
              likeAmount={like_amount}
              initialLike={is_user_like}
            />
          </CommentSub>
        </CommentInfo>
        <CommentContent>{content}</CommentContent>
      </CommentBox>
    </Container>
  );
};

export default CommentCard;

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
`;

const CommentPerson = styled.div`
  margin-right: 2rem;
`;

const PersonImg = styled.img`
  border-radius: 50%;
  border: 1px solid #a3a3a3;
  width: 50px;
  height: 50px;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.black};
  border-radius: 10px;
  padding: 2rem;
  max-width: 45rem;
`;

const CommentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  width: 12rem;
`;

const CommentSub = styled.div`
  display: flex;
  width: 6rem;
`;

const CommentDate = styled.div`
  color: ${props => props.theme.colors.grayLight};
  white-space: nowrap;
`;

const CommentUser = styled.div`
  font-family: 'InteropSemiBold';
`;

const CommentContent = styled.div`
  line-height: 1.3;
`;
