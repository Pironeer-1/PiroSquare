import React, { useState } from 'react';
import styled from 'styled-components';

const CommentLikeBtn = ({ initialLike, likeAmount }) => {
  const [isLike, setIsLike] = useState(initialLike);
  const [currentLikeAmount, setCurrentLikeAmount] = useState(likeAmount);

  const handleLikeToggle = newLikeStatus => {
    if (newLikeStatus) {
      setCurrentLikeAmount(currentLikeAmount + 1);
    } else {
      setCurrentLikeAmount(currentLikeAmount - 1);
    }
    setIsLike(newLikeStatus);
  };

  const handleLike = () => {
    const newLikeStatus = !isLike;
    handleLikeToggle(newLikeStatus);
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
  cursor: pointer;
  margin-left: 0.5rem;
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
