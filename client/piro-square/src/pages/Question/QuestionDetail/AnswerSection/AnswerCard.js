import React from 'react';
import styled from 'styled-components';
import LikeBtn from '../../../../components/Button/LikeBtn/LikeBtn';
import Comment from '../../../../components/Comment/Comment';

const AnswerCard = ({
  username,
  profile,
  content,
  codeLanguage,
  code,
  created_at,
  like_amount,
  is_user_like,
  comments,
}) => {
  console.log(comments);
  return (
    <>
      <Container>
        <TopSection>
          <UserSection>
            <UserProfile>
              <UserImg src={profile} />
            </UserProfile>
            <UserName>{username}</UserName>
            <UserCreate>{created_at}</UserCreate>
          </UserSection>
          <LikeSection>
            <LikeBtn initialLike={is_user_like} likeAmount={like_amount} />
          </LikeSection>
        </TopSection>
        <BottomSection>
          <ContentSection>{content}</ContentSection>
          <CodeSection>
            <CodeLanguage>{codeLanguage}</CodeLanguage>
            <CodeContents>{code}</CodeContents>
          </CodeSection>
        </BottomSection>
      </Container>
      <CommentSection>
        <Comment comments={comments} />
      </CommentSection>
    </>
  );
};
export default AnswerCard;

const Container = styled.div`
  margin-top: 2rem;
  background-color: ${props => props.theme.colors.grayDark};
  border-radius: 10px;
  width: 55rem;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LikeSection = styled.div`
  display: flex;
  margin: 1.5rem;
  justify-content: center;
  align-items: center;
`;
const UserSection = styled.div`
  display: flex;
  margin: 1.5rem;
  height: 50px;
`;

const UserProfile = styled.div`
  margin-left: 0.5rem;
`;

const UserImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  font-size: 20px;
`;

const UserCreate = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Hubballi';
  margin-left: 10px;
  color: ${props => props.theme.colors.grayLight};
`;

const BottomSection = styled.div`
  padding: 0.5rem 2rem;
`;

const ContentSection = styled.div`
  font-family: 'InteropLight';
  line-height: 1.3;
  word-break: keep-all;
`;

const CodeSection = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  width: 50rem;
  background-color: black;
`;

const CodeLanguage = styled.div`
  color: ${props => props.theme.colors.grayLight};
`;

const CodeContents = styled.div`
  margin: 1rem;
  color: ${props => props.theme.colors.green};
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
