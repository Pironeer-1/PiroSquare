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
  const [answerDetail, setAnswerDetail] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/question/detail/${id}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(result => {
        setQuestionDetail(result?.question);
        setAnswerDetail(result?.comments);
        console.log(result.question);
        console.log(result.comments);
      });
  }, []);

  const dateString = questionDetail.created_at;
  const datePart = dateString?.split('T')[0];

  const navigate = useNavigate();
  const onClickListButton = () => {
    navigate(`/question`);
  };

  const AnswerComponent = ({ result }) => {
    const isEmptyComments = result.comments.length === 0;

    return (
      <div>
        {isEmptyComments ? (
          <BeFirst>
            <strong>{questionDetail.nickname}</strong>님의 첫번째 답변자가
            되어주세요!
          </BeFirst>
        ) : (
          <AnswerSection answerDetail={answerDetail} />
        )}
      </div>
    );
  };

  return (
    <Container>
      <ListBtn onClick={onClickListButton}>
        <ListImg src="/images/Question/toList.png" />
        <ListSpan>목록으로</ListSpan>
      </ListBtn>
      <Title>{questionDetail.title}</Title>
      <SubInfoSection
        user_id={questionDetail.user_id}
        is_solved={questionDetail.activate}
        answers_amount={questionDetail.comments_count}
        created_at={datePart}
      />
      <QuestionSection
        user={questionDetail.nickname}
        post_id={questionDetail.post_id}
        profile={questionDetail.image}
        content={questionDetail.content}
        codeLanguage={questionDetail.code_language}
        code={questionDetail.code}
        is_user_like={questionDetail.is_user_like}
        like_amount={questionDetail.likes_count}
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
      <AnswerComponent result={{ comments: answerDetail }} />{' '}
      {/* AnswerComponent를 호출하고 answerDetail을 전달 */}
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

const BeFirst = styled.div`
  display: flex;
  justify-content: end;
  margin: 2rem;
`;
