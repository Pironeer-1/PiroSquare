import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import QuestionSection from './QuestionSection/QuestionSection';
import SubInfoSection from './QuestionSection/SubInfoSection';
import AnswerRegister from './AnswerRegister/AnswerRegister';
import AnswerSection from './AnswerSection/AnswerSection';
import Paginator from '../../../components/Paginator/Paginator';
import { useParams } from 'react-router-dom';

const QuestionDetail = () => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const toggleAnswer = () => {
    setIsAnswerVisible(!isAnswerVisible);
  };

  let { id } = useParams();
  const [questionDetail, setQuestionDetail] = useState([]);
  useEffect(() => {
    fetch(`http://192.168.0.22:8000/question/detail/${id}`)
      .then(response => response.json())
      .then(result => {
        setQuestionDetail(result.question);
        console.log('Q', result.question);
      });
  }, []);

  const [answerDetail, setAnswerDetail] = useState([]);
  // useEffect(() => {
  //   fetch('/data/answers.json')
  //     .then(response => response.json())
  //     .then(result => {
  //       setAnswerDetail(result);
  //     });
  // }, []);

  useEffect(() => {
    fetch(`http://192.168.0.22:8000/question/detail/${id}`)
      .then(response => response.json())
      .then(result => {
        setAnswerDetail(result.comments);
        console.log(result.comments);
        console.log('A', result.comments);
      });
  }, []);

  console.log('a', answerDetail);
  const navigate = useNavigate();
  const onClickListButton = () => {
    navigate(`/question`);
  };

  return (
    <Container>
      <ListBtn onClick={onClickListButton}>
        <ListImg src="/images/Question/toList.png" />
        <ListSpan>목록으로</ListSpan>
      </ListBtn>
      <Title>{questionDetail.title}</Title>
      <SubInfoSection
        is_solved={questionDetail.is_solved}
        answers_amount={questionDetail.answers_amount}
        created_at={questionDetail.created_at}
      />
      <QuestionSection
        user={questionDetail.username}
        profile={questionDetail.userProfile}
        content={questionDetail.content}
        codeLanguage={questionDetail.code_language}
        code={questionDetail.code}
        is_user_like={questionDetail.is_user_like}
        like_amount={questionDetail.like_amount}
      />
      <AnswerBtn onClick={toggleAnswer}>
        {isAnswerVisible ? (
          <span style={{ color: '#0bec12' }}>답변하기</span>
        ) : (
          '답변하기'
        )}
        <AnswerImg src="/images/Button/Answer.png" />
      </AnswerBtn>
      {isAnswerVisible && <AnswerRegister />}
      <AnswerSection answerDetail={answerDetail} />
      <Paginator />
    </Container>
  );
};
export default QuestionDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 55rem;
  margin: 0 auto;
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

const Title = styled.h1`
  font-family: 'InteropExtraLight';
  margin-top: 1rem;
  font-size: 32px;
`;

const AnswerBtn = styled.div`
  display: flex;
  align-items: center;
  text-align: end;
  margin: 10px 0 0 auto;
  color: ${props => props.theme.colors.grayLight};
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.colors.green};
  }
`;

const AnswerImg = styled.img`
  width: 25px;
  margin-left: 10px;
  margin-right: 10px;
`;
