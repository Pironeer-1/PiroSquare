import React from 'react';
import styled from 'styled-components';

const Register = ({ onSubmit, btnAble }) => {
  const handleClick = () => {
    if (!btnAble) {
      alert('제목은 2자 이상, 내용은 10자 이상을 준수해주세요!');
      return;
    }
    onSubmit();
  };

  return (
    <Container>
      <RegisterBtn onClick={handleClick} disabled={!btnAble}>
        등록하기
      </RegisterBtn>
    </Container>
  );
};
export default Register;

// const Register = ({onClick}) => {
//   return (
//     <Container onClick={onClick}>
//       <RegisterBtn>등록하기</RegisterBtn>
//     </Container>
//   );
// };
// export default Register;

const Container = styled.div`
  margin-top: 4rem;
  margin-left: auto;
`;

const RegisterBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 2px ${props => (props.disabled ? '#ccc' : '#0bec12')};
  color: ${props => (props.disabled ? '#ccc' : props.theme.colors.green)};
  margin-left: 5px;
  margin-bottom: 10px;
  padding: 5px;
  font-size: 18px;
  width: 7rem;
  height: 3rem;
  border-radius: 30px;
  background-color: black;
  cursor: pointer;
  &:hover {
    background-color: ${props =>
      props.disabled ? 'transparent' : props.theme.colors.green};
    color: ${props => (props.disabled ? '#ccc' : 'black')};
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`;
