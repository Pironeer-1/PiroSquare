import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AnnouncementCard from './AnnouncementCard';

const Announce = () => {
  const [announcements, setAnnouncements] = useState([]);
  useEffect(() => {
    fetch('/data/announce.json')
      .then(response => response.json())
      .then(result => {
        setAnnouncements(result);
      });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPageCount = Math.ceil(announcements.length / itemsPerPage);

  const maxPageNumbersToShow = 5;
  const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

  const startPage =
    currentPage <= halfMaxPageNumbersToShow
      ? 1
      : currentPage + halfMaxPageNumbersToShow > totalPageCount
      ? totalPageCount - maxPageNumbersToShow + 1
      : currentPage - halfMaxPageNumbersToShow;

  const endPage =
    startPage + maxPageNumbersToShow > totalPageCount
      ? totalPageCount
      : startPage + maxPageNumbersToShow - 1;

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
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
      <Title>공지</Title>
      <AnnouncementBox>
        {announcements
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map(announcement => {
            return (
              <AnnouncementCard
                key={announcement.id}
                id={announcement.id}
                title={announcement.title}
                username={announcement.username}
                created_at={announcement.created_at}
                sort={announcement.sort}
              />
            );
          })}
      </AnnouncementBox>
      <PaginationContainer>
        {currentPage > 1 && (
          <PageNumber onClick={() => handlePageChange(currentPage - 1)}>
            &lt;
          </PageNumber>
        )}
        {pageNumbers}
        {currentPage < totalPageCount && (
          <PageNumber onClick={() => handlePageChange(currentPage + 1)}>
            &gt;
          </PageNumber>
        )}
      </PaginationContainer>
    </Container>
  );
};
export default Announce;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: 3rem;
  font-family: 'InteropLight';
  font-size: 34px;
`;

const AnnouncementBox = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const PaginationContainer = styled.div`
  margin-top: 5rem;
  display: flex;
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
