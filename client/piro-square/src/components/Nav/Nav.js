import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const NAV_LIST = [
  { id: 1, title: '자유게시판', link: '/free' },
  { id: 2, title: '질문', link: '/question' },
  { id: 3, title: '모집/채용', link: '/recruit-study' },
  { id: 4, title: '공지', link: '/announce' },
];
const Nav = () => {
  const { userData } = useContext(AuthContext);
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

  const handleLogout = async event => {
    event.preventDefault();
    const confirmLogout = window.confirm('정말로 로그아웃을 하시겠습니까?');

    if (confirmLogout) {
      try {
        const response = await fetch(`http://localhost:8000/auth/logout`, {
          method: 'POST',
          credentials: 'include',
        });

        if (response.ok) {
          window.location.reload();
        } else {
          console.error('Logout failed:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
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
      <LeftSection>
        <LogoutSection onClick={handleLogout}>로그아웃</LogoutSection>
        <UserSection to="/my-page/update">
          <UserImg src="/images/Nav/sample_img.png" />
          {userData.data.name}
        </UserSection>
      </LeftSection>
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
  height: 3rem;
  margin-top: 1rem;
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

const LeftSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 3rem;
`;

const LogoutSection = styled.div`
  white-space: nowrap;
  &:hover {
    border-bottom: 1px solid #0bec12;
    cursor: pointer;
  }
`;
