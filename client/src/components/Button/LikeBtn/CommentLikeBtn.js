import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../../context/AuthContext';

const CommentLikeBtn = ({ initialLike, likeAmount, post_id, id }) => {
  const [isLike, setIsLike] = useState(initialLike === 1);
  const [currentLikeAmount, setCurrentLikeAmount] = useState(likeAmount);
  const { userData } = useContext(AuthContext);
  const realUserId = userData.data.user_id;

  const handleLikeToggle = newLikeStatus => {
    if (newLikeStatus) {
      setCurrentLikeAmount(currentLikeAmount + 1);
    } else {
      setCurrentLikeAmount(currentLikeAmount - 1);
    }
    setIsLike(newLikeStatus);
  };

  const fehandleLike = () => {
    const newLikeStatus = !isLike;
    handleLikeToggle(newLikeStatus);
  };

  const handleLike = async event => {
    event.preventDefault();

    fehandleLike();

    const url = `http://localhost:8000/like/comment/${id}`;
    const body = {
      user_id: realUserId,
      post_id: post_id,
      comment_id: id,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.error(
          'POST request failed:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const isLikeImg = isLike
    ? '/images/Question/arrow_g.png'
    : '/images/Question/arrow.png';

  return (
    <Container onClick={handleLike}>
      <LikeImg src={isLikeImg} alt={isLike ? 'Liked' : 'Not Liked'} />
      <LikeAmount className={isLike ? 'greenWord' : 'grayWord'}>
        {currentLikeAmount}
      </LikeAmount>
    </Container>
  );
};

export default CommentLikeBtn;

const Container = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-top: 1rem;
  margin-bottom: auto;
`;

const LikeImg = styled.img`
  margin-right: 2px;
  width: 15px;
  height: 10px;
`;

const LikeAmount = styled.span`
  font-family: 'InteropBold';
  font-size: 12px;
  &.greenWord {
    color: ${props => props.theme.colors.green};
  }

  &.grayWord {
    color: ${props => props.theme.colors.grayLight};
  }
`;
