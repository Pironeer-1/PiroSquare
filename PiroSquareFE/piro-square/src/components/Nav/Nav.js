import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const NAV_LIST = [
  { id: 1, title: '자유게시판', link: '/free' },
  { id: 2, title: '질문', link: '/question' },
  { id: 3, title: '모집/채용', link: '/recruit-study' },
  { id: 4, title: '공지', link: '/announce' },
];
const Nav = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('');

  React.useEffect(() => {
    const matchingMenu = NAV_LIST.find(item =>
      location.pathname.startsWith(item.link),
    );
    if (location.pathname === '/') {
      setActiveMenu('');
    }
    if (location.pathname === '/my-page/update') {
      setActiveMenu('');
    } else if (matchingMenu) {
      setActiveMenu(matchingMenu.link);
    }
  }, [location.pathname]);
  return (
    <Container>
      <RightSection>
        <LogoSection to="/">
          <LogoImg src="/images/Nav/piro_logo.png" />
          <LogoPhrase>PIROSQUARE</LogoPhrase>
        </LogoSection>
        <MenuSection>
          {NAV_LIST.map(item => (
            <MenuList
              key={item.id}
              to={item.link}
              className={activeMenu === item.link ? 'active' : ''}
            >
              {item.title}
            </MenuList>
          ))}
        </MenuSection>
      </RightSection>
      <UserSection to="/my-page/update">
        <UserImg src="/images/Nav/sample_img.png" />
        김피로
      </UserSection>
    </Container>
  );
};
export default Nav;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RightSection = styled.div`
  display: flex;
  margin-left: 10px;
`;

const LogoSection = styled(Link)`
  display: flex;
  margin: 1rem;
`;

const LogoImg = styled.img`
  width: 3rem;
`;

const LogoPhrase = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-family: 'Hubballi';
  margin-left: 1rem;
`;

const MenuSection = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2rem;
  white-space: nowrap;
`;

const MenuList = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  margin: 0.5rem;
  padding: 0.5rem;
  font-family: 'InteropLight';
  color: white;
  border-bottom: ${({ active }) => (active ? '1px solid #0bec12' : 'none')};
  &.active {
    border-bottom: 1px solid #0bec12;
  }
  &:hover {
    border-bottom: 1px solid #0bec12;
    cursor: pointer;
  }
`;

const UserSection = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 3rem;
  border: 1px solid #2c2d2e;
  border-radius: 30px;
  color: white;
  height: 3rem;
  padding: 12px;
  white-space: nowrap;
  &:hover {
    color: black;
    background-color: white;
  }
`;

const UserImg = styled.img`
  width: 1.2rem;
  margin-right: 0.5rem;
`;
