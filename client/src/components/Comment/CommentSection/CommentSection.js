import React from 'react';
import styled from 'styled-components';
import CommentCard from './CommentCard';

const CommentSection = ({ comments }) => {
  return (
    <Container>
      {comments?.map(Reply => {
        return (
          <CommentCard
            key={Reply.comment_id}
            id={Reply.comment_id}
            post_id={Reply.post_id}
            user_id={Reply.user_id}
            username={Reply.nickname}
            created_at={Reply.created_at}
            content={Reply.content}
            like_amount={Reply.likes_count}
            profile_img={Reply.image}
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
