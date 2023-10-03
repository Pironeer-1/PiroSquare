import React from 'react';
import styled from 'styled-components';

const FilterBtn = ({ onClick, isRightPosition }) => {
  return (
    <Container onClick={onClick}>
      <Circle className={isRightPosition ? 'right' : 'left'} />
    </Container>
  );
};

export default FilterBtn;

const Container = styled.div`
  display: flex;
  padding: auto;
  cursor: pointer;
  background-color: ${props => props.theme.colors.grayDark};
  width: 3.5rem;
  height: 1.5rem;
  border-radius: 30px;
`;

const Circle = styled.div`
  display: flex;
  margin: auto auto auto 2px;
  background-color: ${props => props.theme.colors.green};
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s ease;
  border-radius: 50%;

  &.right {
    transform: translateX(195%);
  }

  &.left {
    transform: translateX(20%);
    background-color: ${props => props.theme.colors.black};
  }
`;
