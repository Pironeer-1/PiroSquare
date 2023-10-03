import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const MENU_LIST = [
  { id: 1, title: '회원명함', link: '/my-page/card' },
  { id: 2, title: '회원정보 수정', link: '/my-page/update' },
  { id: 3, title: '내가 쓴 글', link: '/my-page/my-post' },
  { id: 4, title: '댓글 쓴 글', link: '/my-page/my-comment' },
  { id: 5, title: '좋아요 한 글', link: '/my-page/my-like' },
];
const MypageNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('');

  React.useEffect(() => {
    const matchingMenu = MENU_LIST.find(item =>
      location.pathname.startsWith(item.link),
    );
    if (location.pathname === '/') {
      setActiveMenu('');
    } else if (matchingMenu) {
      setActiveMenu(matchingMenu.link);
    }
  }, [location.pathname]);

  return (
    <Container>
      <Title>My Page</Title>
      <TopSection>
        <Options>
          {MENU_LIST.map(item => (
            <Option
              key={item.id}
              to={item.link}
              className={activeMenu === item.link ? 'active' : ''}
            >
              {item.title}
            </Option>
          ))}
        </Options>
      </TopSection>
    </Container>
  );
};
export default MypageNav;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin-top: 30px;
  font-family: 'Hubballi';
  font-size: 34px;
`;

const TopSection = styled.div`
  margin: 2rem auto 1rem auto;
  display: flex;
  justify-content: space-between;
  width: 50rem;
  align-items: center;
`;

const Options = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const Option = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 3rem;
  border: 2px solid #0bec12;
  border-radius: 30px;
  padding: 6px;
  margin: 0px 1rem;
  color: white;
  cursor: pointer;
  &.active {
    background-color: #0bec12;
    color: black;
  }

  &:hover {
    background-color: #0bec12;
    color: black;
  }
`;
