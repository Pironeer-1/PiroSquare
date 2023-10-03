import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SearchBar = ({ onSearch }) => {
  const [userInput, setUserInput] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = event => {
    setUserInput(event.target.value);
  };

  const onSubmit = () => {
    onSearch(userInput);

    const currentPathname = location.pathname;
    let searchUrl = '';

    if (currentPathname === '/free') {
      searchUrl = `/free/search?keyword=${userInput}`;
    } else if (currentPathname === '/question') {
      searchUrl = `/question/search?keyword=${userInput}`;
    }

    navigate(searchUrl, {
      state: { value: userInput },
    });
  };

  return (
    <Container>
      <SearchBox>
        <SearchInput
          placeholder="제목으로 검색하세요"
          id="search"
          value={userInput}
          type="text"
          onChange={handleSearch}
        />
        <SearchImg src="/images/Search/search.png" onClick={onSubmit} />
      </SearchBox>
    </Container>
  );
};

export default SearchBar;

const Container = styled.div``;

const SearchBox = styled.div`
  display: grid;
  grid-template-columns: 28rem 3rem;
  width: 32rem;
  height: 3rem;
  background-color: #a3a3a3;
  border-radius: 30px;
  margin-right: auto;
`;

const SearchInput = styled.input`
  display: flex;
  justify-content: center;
  margin: auto;
  width: 26rem;
  height: 2.4rem;
  font-size: 18px;
  color: black;
  background-color: transparent;
  border: none;
`;

const SearchImg = styled.img`
  width: 32px;
  height: 32px;
  margin: auto;
  cursor: pointer;
`;
