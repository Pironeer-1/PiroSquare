import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterBtn from '../../components/Button/FilterBtn/FilterBtn';
import QuestionCard from './QuestionCard';
import { useNavigate, useLocation } from 'react-router-dom';

const QuestionSearch = () => {
  const [loading, setLoading] = useState(true);
  const [isRightPosition, setIsRightPosition] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const value = location.state.value;

  const handleWriteBtnClick = () => {
    navigate('/write/question');
  };
  const handlequestionBtnClick = () => {
    navigate('/question');
  };

  const handleFilterBtnClick = () => {
    setIsRightPosition(!isRightPosition);
  };
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch('/data/questionData.json')
      .then(response => response.json())
      .then(result => {
        setQuestions(result);
      });
  }, []);

  // useEffect(() => {
  //   fetch(`http://10.58.52.80:8000/question/search?keyword=${value}`, {
  //     method: 'GET',
  //   })
  //     .then(response => response.json())
  //     .then(result => {
  //       setFrees(result);
  //       setLoading(false);
  //     });
  // }, []);

  const filteredQuestions = questions.filter(Question => {
    return Question.title.includes(searchKeyword);
  });

  const availabilityClassName = isRightPosition ? 'greenWord' : 'grayWord';
  return (
    <Container>
      <Title onClick={handlequestionBtnClick}>질문</Title>
      <TopSection>
        <SearchBar onSearch={setSearchKeyword} />
        <FilterBox>
          <FilterBtn
            onClick={handleFilterBtnClick}
            isRightPosition={isRightPosition}
          />
          <FilterName className={availabilityClassName}>
            {isRightPosition ? '해결' : '전체'}
          </FilterName>
        </FilterBox>
        <AskBtn onClick={handleWriteBtnClick}>질문하기</AskBtn>
      </TopSection>
      <BottomSection>
        {filteredQuestions.map(question => {
          return (
            <QuestionCard
              key={question.id}
              id={question.id}
              title={question.title}
              username={question.username}
              created_at={question.created_at}
              answers_amount={question.answers_amount}
              is_user_like={question.is_user_like}
              is_solved={question.is_solved}
              like_amount={question.like_amount}
            />
          );
        })}
      </BottomSection>
    </Container>
  );
};
export default QuestionSearch;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 55rem;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin-top: 30px;
  font-family: 'InteropLight';
  font-size: 34px;
  cursor: pointer;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 2rem;
  width: 55rem;
`;

const FilterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 3rem;
  margin: auto;
`;

const FilterName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  color: ${props => props.theme.colors.grayLight};
  &.greenWord {
    color: ${props => props.theme.colors.green};
  }

  &.grayWord {
    color: ${props => props.theme.colors.grayLight};
  }
`;

const AskBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: white solid 2px;
  color: white;
  padding: 6px;
  font-size: 16px;
  width: 7rem;
  height: 2.4rem;
  border-radius: 30px;
  margin-left: 1rem;
  background-color: black;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: black;
  }
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;
