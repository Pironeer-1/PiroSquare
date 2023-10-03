import React, { useState } from 'react';
import styled from 'styled-components';
import CommentSection from './CommentSection/CommentSection';
import CommentRegister from './CommentRegister/CommentRegister';
import CommentCard from './CommentSection/CommentCard';

const Comment = ({ comments }) => {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const timeString = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const user = '김피로';
  const [newcomments, setNewcomments] = useState([]);

  const addComment = newComment => {
    setNewcomments([...newcomments, newComment]);
  };

  return (
    <>
      <CommentSection comments={comments} />
      <Container>
        {newcomments.map((comment, index) => (
          <CommentCard
            key={index}
            id={index}
            username={user}
            created_at={timeString}
            content={comment}
            profile_img={comment.profile_img}
            like_amount={0}
          />
        ))}
      </Container>
      <CommentRegister onCommentSubmit={addComment} />
    </>
  );
};

export default Comment;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  display: flex;
`;
