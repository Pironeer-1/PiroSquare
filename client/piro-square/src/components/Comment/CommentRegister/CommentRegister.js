import React, { useState } from 'react';
import styled from 'styled-components';
import { fetchPOST } from '../../../utils/utils';

const CommentRegister = ({ onCommentSubmit }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = event => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    onCommentSubmit(comment);
    setComment('');
  };

  // const handleSubmit = async event => {
  //   event.preventDefault();
  //   const url = 'http://localhost:3333/post/create';
  //   const body = {
  //     content: comment,
  //   };
  //   const result = await fetchPOST(url, body);
  //   console.log(result);
  //   setComment('');
  //   navigate('/');
  // };

  return (
    <WriteComment>
      <CommentInput
        placeholder="댓글을 작성해주세요"
        value={comment}
        onChange={handleCommentChange}
      />
      <CommentArrow onClick={handleSubmit} disabled={comment.length === 0}>
        <PostImg src="/images/Button/arrow.png" />
      </CommentArrow>
    </WriteComment>
  );
};
export default CommentRegister;

const WriteComment = styled.div`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  width: 50rem;
  height: 4rem;
  border-radius: 30px;
  background-color: ${props => props.theme.colors.grayDark};
`;

const CommentInput = styled.input`
  width: 44rem;
  margin-left: 1.5rem;
  height: 3.2rem;
  background-color: transparent;
  border: none;
  font-size: 18px;
`;

const CommentArrow = styled.button`
  margin-left: auto;
  margin-right: 0.5rem;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-color: ${props =>
    props.disabled ? props.theme.colors.grayLight : props.theme.colors.green};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const PostImg = styled.img`
  width: 35px;
`;
