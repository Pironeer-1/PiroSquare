import React from 'react';
import styled from 'styled-components';
import LikeBtn from '../../components/Button/LikeBtn/LikeBtn';
import { useNavigate } from 'react-router-dom';

const QuestionCard = ({
  id,
  title,
  username,
  created_at,
  is_solved,
  is_user_like,
  like_amount,
}) => {
  const navigate = useNavigate();
  const onClickDetailButton = () => {
    navigate(`/question-detail/${id}`);
  };
  const availibilityImg = is_solved
    ? '/images/Question/unsolved.png'
    : '/images/Question/solved.png';

  return (
    <QuestionBox>
      <QuestionIcon onClick={onClickDetailButton}>
        <QuestionImg src={availibilityImg} />
      </QuestionIcon>
      <Container onClick={onClickDetailButton}>
        <CardTitle>{title}</CardTitle>
        <CardBottom>
          <CardAuthor>{username}</CardAuthor>
          <CardDate>{created_at}</CardDate>
        </CardBottom>
      </Container>
      <RightSection>
        <LikeBtn initialLike={is_user_like} likeAmount={like_amount} />
      </RightSection>
    </QuestionBox>
  );
};

export default QuestionCard;

const QuestionBox = styled.div`
  display: grid;
  grid-template-columns: 5rem 43rem 7rem;
  margin-top: 1rem;
  background-color: ${props => props.theme.colors.grayDark};
  border-radius: 10px;
  width: 55rem;
  height: 5rem;
`;

const QuestionIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QuestionImg = styled.img`
  width: 35px;
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

const CardBottom = styled.div`
  display: flex;

  padding-top: 0.5rem;
  font-size: 14px;
  font-family: 'InteropExtraLight';
`;

const CardAuthor = styled.div`
  color: ${props => props.theme.colors.grayLight};
`;

const CardAnswers = styled.div`
  margin-left: 10px;
  color: ${props => props.theme.colors.grayLight};
`;

const AnswersSpan = styled.span`
  margin-right: 3px;
  color: ${props => props.theme.colors.grayLight};
`;

const CardDate = styled.div`
  margin-left: 0.5rem;
  color: ${props => props.theme.colors.grayLight};
`;

const RightSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
