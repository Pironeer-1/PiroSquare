import React, { useState } from 'react';
import styled from 'styled-components';
import { fetchPOST } from '../../../utils/utils';
import { useParams } from 'react-router-dom';

const LikeBtn = ({ initialLike, likeAmount, post_id }) => {
  const [isLike, setIsLike] = useState(initialLike);
  const [currentLikeAmount, setCurrentLikeAmount] = useState(likeAmount || 0);
  let { id } = useParams();

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

    const url = `http://192.168.0.22:8000/like/post/${id}`;
    const body = {
      userId: 3,
      isLike: isLike,
      post_id: post_id,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
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

export default LikeBtn;

const Container = styled.div`
  cursor: pointer;
`;

const LikeImg = styled.img`
  margin-right: 10px;
  width: 25px;
`;

const LikeAmount = styled.span`
  font-family: 'InteropBold';
  &.greenWord {
    color: ${props => props.theme.colors.green};
  }

  &.grayWord {
    color: ${props => props.theme.colors.grayLight};
  }
`;
