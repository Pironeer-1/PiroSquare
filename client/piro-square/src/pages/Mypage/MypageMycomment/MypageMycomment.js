import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MypageNav from '../MypageNav';
import MycommentCard from './MycommentCard';

const MypageMycomment = () => {
  const [mycomment, setMycomment] = useState([]);
  useEffect(() => {
    fetch('/data/myComment.json')
      .then(response => response.json())
      .then(result => {
        setMycomment(result);
      });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mycomment.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const totalPageCount = Math.ceil(mycomment.length / itemsPerPage);
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
    <Container>
      <MypageNav />

      <BottomSection>
        {currentItems.map(Mylike => {
          return (
            <MycommentCard
              key={Mylike.id}
              id={Mylike.id}
              title={Mylike.title}
              username={Mylike.username}
              created_at={Mylike.created_at}
              is_user_like={Mylike.is_user_like}
              like_amount={Mylike.like_amount}
              thumbnail={Mylike.thumbnail}
              board_name={Mylike.board_name}
              comment_count={Mylike.comment_count}
            />
          );
        })}
      </BottomSection>
      <PaginationContainer>{pageNumbers}</PaginationContainer>
    </Container>
  );
};
export default MypageMycomment;

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
