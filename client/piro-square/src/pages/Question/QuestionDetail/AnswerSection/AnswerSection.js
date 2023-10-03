import React from 'react';
import styled from 'styled-components';
import AnswerCard from './AnswerCard';

const AnswerSection = ({ answerDetail }) => {
  console.log(answerDetail);
  return (
    <Container>
      <TopSection>
        <Title>Answer</Title>
        <FilterSection>
          <FilterName> Sort by:</FilterName>
          <FilterPopular>Popular</FilterPopular>
          <FilterNew>New</FilterNew>
        </FilterSection>
      </TopSection>
      <BottomSection>
        {answerDetail.map(Answer => {
          return (
            <AnswerCard
              key={Answer.id}
              id={Answer.id}
              profile={Answer.userProfile}
              username={Answer.username}
              created_at={Answer.created_at}
              is_user_like={Answer.is_user_like}
              like_amount={Answer.like_amount}
              code={Answer.code}
              codeLanguage={Answer.code_language}
              content={Answer.content}
              comments={Answer.comments}
            />
          );
        })}
      </BottomSection>
    </Container>
  );
};
export default AnswerSection;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopSection = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-family: 'Hubballi';
  font-size: 32px;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

const FilterName = styled.div`
  font-family: 'Hubballi';
`;

const FilterPopular = styled.div`
  font-family: 'Hubballi';
  margin-left: 1.5rem;
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.colors.green};
  }
`;

const FilterNew = styled.div`
  font-family: 'Hubballi';
  margin-left: 1rem;
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.colors.green};
  }
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;
