import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterBtn from '../../components/Button/FilterBtn/FilterBtn';
import FreeCard from './FreeCard';
import Pagination from '../../components/Pagination/Pagination';

const Free = () => {
  const [isRightPosition, setIsRightPosition] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const handleFilterBtnClick = () => {
    setIsRightPosition(!isRightPosition);
  };

  const navigate = useNavigate();

  const handleFreeBtnClick = () => {
    navigate('/free');
  };

  const handleWriteBtnClick = () => {
    navigate('/write/free');
  };

  const [frees, setFrees] = useState([]);

  useEffect(() => {
    if (!isRightPosition) {
      fetch('/data/freeData.json')
        .then(response => response.json())
        .then(result => {
          setFrees([...result.posts]); // 새로운 배열로 상태 업데이트
          console.log(result.posts);
        });
    } else {
      // 인기순 데이터를 가져오는 로직
      fetch('/data/likeFreeData.json')
        .then(response => response.json())
        .then(result => {
          setFrees([...result.posts]); // 새로운 배열로 상태 업데이트
          console.log(result.posts);
        });
    }
  }, [isRightPosition]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = frees.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const totalPageCount = Math.ceil(frees.length / itemsPerPage);

  const availabilityClassName = isRightPosition ? 'greenWord' : 'grayWord';

  return (
    <>
      <Container>
        <Title onClick={handleFreeBtnClick}>자유게시판</Title>
        <TopSection>
          <SearchBar onSearch={setSearchKeyword} />
          <FilterBox>
            <FilterBtn
              onClick={handleFilterBtnClick}
              isRightPosition={isRightPosition}
            />
            <FilterName className={availabilityClassName}>
              {isRightPosition ? '인기순' : '최신순'}
            </FilterName>
          </FilterBox>

          <WriteBtn onClick={handleWriteBtnClick}>글쓰기</WriteBtn>
        </TopSection>
        <BottomSection>
          {currentItems.map(Free => {
            return (
              <FreeCard
                key={Free.post_id}
                post_id={Free.post_id}
                title={Free.title}
                user_name={Free.user_name}
                created_at={Free.created_at}
                answers_amount={Free.answers_amount}
                is_user_like={Free.is_user_like}
                like_amount={Free.likes_count}
                thumbnail={Free.thumbnail}
                comment_count={Free.comments_count}
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
export default Free;

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
  justify-content: space-between;
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

const WriteBtn = styled.button`
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
