import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../../context/AuthContext';

const LikeBtn = ({ initialLike, likeAmount, post_id }) => {
  const [isLike, setIsLike] = useState(initialLike);
  const [currentLikeAmount, setCurrentLikeAmount] = useState(likeAmount || 0);
  const { userData } = useContext(AuthContext);
  const realUserId = userData.data.user_id;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // 데이터 로드 후 로딩 상태 변경
  }, []);

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

    const url = `http://localhost:8000/like/post/${post_id}`;
    const body = {
      user_id: realUserId,
      post_id: post_id,
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

  if (loading) {
    return <div>loading</div>;
  }
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
