import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RecruitNav from '../RecruitNav';
import ProjectCard from './ProjectCard';

const Project = () => {
  const [isRightPosition, setIsRightPosition] = useState(false);
  const [recruitments, setRecruitments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`http://localhost:8000/recruit`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('서버에서 잘못된 응답을 받았습니다.');
        }
        return response.json();
      })
      .then(result => {
        setRecruitments(result.posts);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recruitments.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const totalPageCount = Math.ceil(recruitments.length / itemsPerPage);
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
        <RecruitNav
          isRightPosition={isRightPosition}
          setIsRightPosition={setIsRightPosition}
        />
        {currentItems.map(recruitment => {
          return (
            <ProjectCard
              key={recruitment.post_id}
              id={recruitment.post_id}
              title={recruitment.title}
              username={recruitment.nickname || recruitment.name}
              created_at={recruitment.created_at}
              activate={recruitment.activate}
              personnel={recruitment.member || 1}
            />
          );
        })}
      </Container>
      <PaginationContainer>{pageNumbers}</PaginationContainer>
    </>
  );
};
export default Project;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
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
