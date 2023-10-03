import React from 'react';
import styled from 'styled-components';

const MycommentCard = ({
  id,
  title,
  username,
  created_at,
  thumbnail,
  board_name,
  comment_count,
}) => {
  return (
    <MycommentBox>
      <MycommentIcon>
        <MycommentImg src={thumbnail} />
      </MycommentIcon>
      <Container>
        <CardTitle>
          <CardSpan>[{board_name}]</CardSpan>
          {title}
        </CardTitle>
        <CardBottom>
          <CardAuthor>{username}</CardAuthor>
          <CardDate>{created_at}</CardDate>
          <CardComment>
            <CommentImg src="/images/Mypage/chat_g.png" />
            {comment_count}
          </CardComment>
        </CardBottom>
      </Container>
    </MycommentBox>
  );
};

export default MycommentCard;

const MycommentBox = styled.div`
  display: grid;
  grid-template-columns: 5rem 43rem 7rem;
  margin-top: 1rem;
  background-color: ${props => props.theme.colors.grayDark};
  border-radius: 10px;
  width: 55rem;
  height: 5rem;
`;

const MycommentIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MycommentImg = styled.img`
  width: 40px;
  height: 40px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;

const CardTitle = styled.div`
  font-size: 18px;
  font-family: 'InteropLight';
`;

const CardSpan = styled.span`
  margin-right: 5px;
`;

const CardBottom = styled.div`
  display: flex;

  padding-top: 0.5rem;
  font-size: 14px;
  font-family: 'InteropExtraLight';
`;

const CardAuthor = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.grayLight};
`;

const CardDate = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  color: ${props => props.theme.colors.grayLight};
`;
const CardComment = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  color: ${props => props.theme.colors.grayLight};
`;

const CommentImg = styled.img`
  width: 15px;
  margin-bottom: 2px;
  margin-right: 3px;
`;
