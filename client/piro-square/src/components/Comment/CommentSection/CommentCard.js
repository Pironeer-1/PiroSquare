import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import CommentLikeBtn from '../../Button/LikeBtn/CommentLikeBtn';
import { AuthContext } from '../../../context/AuthContext';

const CommentCard = ({
  id,
  user_id,
  post_id,
  username,
  created_at,
  content,
  like_amount,
  is_user_like,
  profile_img,
}) => {
  const { userData } = useContext(AuthContext);
  const realUserId = userData.data.user_id;
  const dateString = created_at;
  const datePart = dateString?.split('T')[0];
  const canDelete = realUserId === user_id;
  const thumbnailSrc = profile_img ? profile_img : '/images/Nav/piro_logo.png';

  const handleDelete = async event => {
    event.preventDefault();

    const confirmDelete = window.confirm('정말로 댓글을 삭제하겠습니까?');

    if (confirmDelete) {
      const url = `http://localhost:8000/comment/delete/${id}`;
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

          window.location.reload();
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
    }
  };
  if (canDelete) {
    return (
      <Container2>
        {canDelete && content !== '삭제된 댓글입니다.' && (
          <CommentDelete src="/images/Button/del.png" onClick={handleDelete} />
        )}
        <CommentBox2>
          <CommentInfo2>
            <CommentUser2>{username}</CommentUser2>
            <CommentSub2>
              <CommentDate2>{datePart}</CommentDate2>
            </CommentSub2>
          </CommentInfo2>
          <CommentContent2>{content}</CommentContent2>
        </CommentBox2>

        <CommentPerson2>
          <PersonImg2 src={thumbnailSrc} />
        </CommentPerson2>
      </Container2>
    );
  } else {
    return (
      <Container>
        <CommentPerson>
          <PersonImg src={thumbnailSrc} />
          {content !== '삭제된 댓글입니다.' && (
            <CommentLikeBtn
              likeAmount={like_amount}
              initialLike={is_user_like}
              post_id={post_id}
              id={id}
            />
          )}
        </CommentPerson>
        <CommentBox>
          <CommentInfo>
            <CommentUser>{username}</CommentUser>
            <CommentSub>
              <CommentDate>{datePart}</CommentDate>
            </CommentSub>
          </CommentInfo>
          <CommentContent>{content}</CommentContent>
        </CommentBox>
        {canDelete && content !== '삭제된 댓글입니다.' && (
          <CommentDelete src="/images/Button/del.png" onClick={handleDelete} />
        )}
      </Container>
    );
  }
};
export default CommentCard;

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
`;

const CommentPerson = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 2rem;
`;

const PersonImg = styled.img`
  border-radius: 50%;
  border: 1px solid #a3a3a3;
  width: 50px;
  height: 50px;
  margin-bottom: auto;
  margin-top: 1rem;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.black};
  border-radius: 10px;
  padding: 1.5rem;
  max-width: 45rem;
`;

const CommentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  width: 16rem;
`;

const CommentSub = styled.div`
  display: flex;
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

const CommentDelete = styled.img`
  width: 22px;
  height: 22px;
  margin-top: auto;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
  &:hover {
    cursor: pointer;
  }
`;

const Container2 = styled.div`
  margin-left: auto;
  margin-top: 2rem;
  display: flex;
`;

const CommentPerson2 = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  align-items: center;
  justify-content: center;
`;

const PersonImg2 = styled.img`
  border-radius: 50%;
  border: 1px solid #a3a3a3;
  width: 50px;
  height: 50px;
  margin-bottom: auto;
  margin-top: 1rem;
`;

const CommentBox2 = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.grayDark};
  border-radius: 10px;
  padding: 1.5rem;
  max-width: 45rem;
`;

const CommentInfo2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  width: 16rem;
`;

const CommentSub2 = styled.div`
  display: flex;
`;

const CommentDate2 = styled.div`
  color: ${props => props.theme.colors.grayLight};
  white-space: nowrap;
`;

const CommentUser2 = styled.div`
  font-family: 'InteropSemiBold';
`;

const CommentContent2 = styled.div`
  line-height: 1.3;
`;

const CommentDelete2 = styled.img`
  width: 22px;
  height: 22px;
  margin-top: auto;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
  &:hover {
    cursor: pointer;
  }
`;
