import React from 'react';
import styled from 'styled-components';
import CommentCard from './CommentCard';

const CommentSection = ({ comments }) => {
  return (
    <Container>
      {comments?.map(Reply => {
        return (
          <CommentCard
            key={Reply.id}
            id={Reply.id}
            username={Reply.username}
            created_at={Reply.created_at}
            content={Reply.content}
            like_amount={Reply.like_amount}
            profile_img={Reply.profile_img}
            is_user_like={Reply.is_user_like}
          />
        );
      })}
    </Container>
  );
};
export default CommentSection;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
