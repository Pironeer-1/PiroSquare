import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FilterBtn from '../../components/Button/FilterBtn/FilterBtn';

const MENU_LIST = [
  { id: 1, title: '스터디 모집', link: '/recruit-study' },
  { id: 2, title: '프로젝트 모집', link: '/recruit-project' },
  { id: 3, title: '채용 공고', link: '/recruit-company' },
];
const RecruitNav = ({ isRightPosition, setIsRightPosition }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('');

  const handleFilterBtnClick = () => {
    const newIsRightPosition = !isRightPosition;
    setIsRightPosition(newIsRightPosition);
  };

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

  const availabilityClassName = isRightPosition ? 'greenWord' : 'grayWord';

  const handlePostBtnClick = () => {
    let newLocation = '';

    switch (location.pathname) {
      case '/recruit-study':
        newLocation = '/write/recruit/study';
        break;
      case '/recruit-project':
        newLocation = '/write/recruit/project';
        break;
      case '/recruit-company':
        newLocation = '/write/recruit/company';
        break;
      default:
        break;
    }

    if (newLocation) {
      navigate(newLocation);
    }
  };

  return (
    <Container>
      <Title>모집 / 공고</Title>
      <TopSection>
        <PostBtn onClick={handlePostBtnClick}>글쓰기</PostBtn>
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
        <FilterBox>
          <FilterBtn
            onClick={handleFilterBtnClick}
            isRightPosition={isRightPosition}
          />
          <FilterName className={availabilityClassName}>
            {isRightPosition ? '모집' : '전체'}
          </FilterName>
        </FilterBox>
      </TopSection>
    </Container>
  );
};
export default RecruitNav;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin-top: 30px;
  font-family: 'InteropLight';
  font-size: 34px;
`;

const TopSection = styled.div`
  margin: 2rem auto 1rem auto;
  display: flex;
  justify-content: space-between;
  width: 50rem;
  align-items: center;
`;

const PostBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: white solid 2px;
  color: white;
  padding: 6px;
  font-size: 16px;
  width: 7rem;
  height: 3rem;
  border-radius: 30px;
  background-color: black;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: black;
  }
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
