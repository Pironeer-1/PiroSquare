import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LikeBtn from '../../../../components/Button/LikeBtn/LikeBtn';

const QuestionSection = ({
  user,
  profile,
  content,
  codeLanguage,
  code,
  like_amount,
  is_user_like,
}) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    if (like_amount !== undefined && is_user_like !== undefined) {
      setDataLoaded(true);
    }
  }, [like_amount, is_user_like]);

  return (
    <Container>
      <TopSection>
        <UserSection>
          <UserProfile>
            <UserImg src={profile} />
          </UserProfile>
          <UserName>{user}</UserName>
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
  );
};
export default QuestionSection;

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
