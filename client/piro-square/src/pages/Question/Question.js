import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterBtn from '../../components/Button/FilterBtn/FilterBtn';
import FilterBtn2 from '../../components/Button/FilterBtn/FilterBtn2';
import QuestionCard from './QuestionCard';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';

const Question = () => {
  const [isRightPosition1, setIsRightPosition1] = useState(false);
  const [isRightPosition2, setIsRightPosition2] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();
  const handleWriteBtnClick = () => {
    navigate('/write/question');
  };

  const handleQuestionBtnClick = () => {
    navigate('/question');
  };

  const handleFilterBtnClick = () => {
    setIsRightPosition1(!isRightPosition1);
    if (isRightPosition2 === true) {
      setIsRightPosition2(isRightPosition1);
    }
  };

  const handleFilterBtnClick2 = () => {
    setIsRightPosition2(!isRightPosition2);
    if (isRightPosition1 === true) {
      setIsRightPosition1(isRightPosition2);
    }
  };

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let url = '';

    if (isRightPosition1) {
      url = 'data/solvedData.json'; // Fetch solved questions data
    } else if (isRightPosition2) {
      url = 'data/unSolvedData.json'; // Fetch unsolved questions data
    } else {
      url = 'data/questionData.json'; // Fetch all questions data
    }

    fetch(url)
      .then(response => response.json())
      .then(result => {
        setQuestions(result);
      });
  }, [isRightPosition1, isRightPosition2]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const totalPageCount = Math.ceil(questions.length / itemsPerPage);

  const availabilityClassName1 = isRightPosition1 ? 'greenWord' : 'grayWord';
  const availabilityClassName2 = isRightPosition2 ? 'greenWord' : 'grayWord';
  return (
    <>
      <Container>
        <Title onClick={handleQuestionBtnClick}>질문</Title>
        <TopSection>
          <SearchBar onSearch={setSearchKeyword} />
          <FilterBox>
            <FilterBtn
              onClick={handleFilterBtnClick}
              isRightPosition={isRightPosition1}
            />
            <FilterName className={availabilityClassName1}>
              {isRightPosition1 ? '해결' : '전체'}
            </FilterName>
          </FilterBox>
          <FilterBox2>
            <FilterBtn2
              onClick={handleFilterBtnClick2}
              isRightPosition={isRightPosition2}
            />
            <FilterName2 className={availabilityClassName2}>
              {isRightPosition2 ? '미해결' : '전체'}
            </FilterName2>
          </FilterBox2>
          <AskBtn onClick={handleWriteBtnClick}>질문하기</AskBtn>
        </TopSection>
        <BottomSection>
          {currentItems.map(question => {
            return (
              <QuestionCard
                key={question.post_id}
                id={question.post_id}
                title={question.title}
                username={question.user_name}
                created_at={question.created_at}
                is_user_like={question.is_user_like}
                is_solved={question.activate}
                like_amount={question.likes_count}
              />
            );
          })}
        </BottomSection>
      </Container>
      <Pagination
        currentPage={currentPage}
        totalPageCount={totalPageCount}
        onPageChange={handlePageChange}
      />
    </>
  );
};
export default Question;

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

const FilterBox2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 3rem;
  margin: auto;
`;

const FilterName2 = styled.div`
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
