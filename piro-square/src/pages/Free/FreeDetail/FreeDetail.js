import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Paginator from '../../../components/Paginator/Paginator';
import Comment from '../../../components/Comment/Comment';
import LikeBtn from '../../../components/Button/LikeBtn/LikeBtn';

const FreeDetail = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [detail, setDetail] = useState([]);
  const navigate = useNavigate();
  const onClickListButton = () => {
    navigate(`/free`);
  };

  useEffect(() => {
    fetch('/data/freeDetail.json')
      .then(response => response.json())
      .then(result => {
        setDetail(result);
      });
  }, []);

  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetch('/data/comments.json')
      .then(response => response.json())
      .then(result => {
        setComments(result);
      });
  }, []);

  useEffect(() => {
    if (detail.like_amount !== undefined && detail.is_user_like !== undefined) {
      setDataLoaded(true);
    }
  }, [detail.like_amount, detail.is_user_like]);

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container>
        <ListBtn onClick={onClickListButton}>
          <ListImg src="/images/Question/toList.png" />
          <ListSpan>목록으로</ListSpan>
        </ListBtn>
        <TopSection>
          <Title>{detail.title}</Title>
          <LikeBtn
            initialLike={detail.is_user_like}
            likeAmount={detail.like_amount}
          />
        </TopSection>
        <ContentBox>
          <ContentInfo>
            <UserSection>
              <UserImg src={detail.profile} />
              <UserName>{detail.username}</UserName>
            </UserSection>
            <Created>{detail.created_at}</Created>
          </ContentInfo>
          <ContentSection>{detail.content}</ContentSection>
        </ContentBox>
        <Comment comments={comments} />
      </Container>
      <Paginator />
    </>
  );
};

export default FreeDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50rem;
  margin: 0 auto;
`;

const TopSection = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-family: 'InteropExtraLight';
`;

const ContentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
`;

const UserImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.h2`
  font-size: 20px;
`;

const Created = styled.h2`
  color: ${props => props.theme.colors.grayLight};
`;

const ContentBox = styled.div`
  border-radius: 10px;
  margin-top: 2rem;
  background-color: ${props => props.theme.colors.grayDark};
`;

const ContentSection = styled.div`
  font-size: 18px;
  line-height: 1.6;
  word-break: break-all;
  padding: 0 2rem 2rem 2rem;
`;

const ListImg = styled.img`
  width: 12px;
`;

const ListSpan = styled.span`
  margin-left: 10px;
  padding-top: 3px;
  color: ${props => props.theme.colors.grayLight};
  &:hover {
    color: white;
  }
`;

const ListBtn = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  font-size: 18px;
  color: ${props => props.theme.colors.grayLight};
  cursor: pointer;
`;
