import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MypageNav from '../MypageNav';
import MypostCard from './MypostCard';

const MypageMypost = () => {
  const [mypost, setMypost] = useState([]);
  useEffect(() => {
    fetch('/data/myPost.json')
      .then(response => response.json())
      .then(result => {
        setMypost(result);
      });
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mypost.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const totalPageCount = Math.ceil(mypost.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPageCount; i++) {
    pageNumbers.push(
      <PageNumber
        key={i}
        onClick={() => handlePageChange(i)}
        className={i === currentPage ? 'active' : ''}
      >
        {i}
      </PageNumber>,
    );
  }

  return (
    <>
      <Container>
        <MypageNav />

        <BottomSection>
          {currentItems.map(Mypost => {
            return (
              <MypostCard
                key={Mypost.id}
                id={Mypost.id}
                title={Mypost.title}
                created_at={Mypost.created_at}
                thumbnail={Mypost.thumbnail}
                board_name={Mypost.board_name}
              />
            );
          })}
        </BottomSection>
      </Container>
      <PaginationContainer>{pageNumbers}</PaginationContainer>
    </>
  );
};
export default MypageMypost;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 55rem;
  margin: 0 auto;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const PaginationContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

const PageNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-left: 1rem;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  &.active {
    background-color: ${props => props.theme.colors.green};
    color: black;
  }
`;
