import React from 'react';
import styled from 'styled-components';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

const AnswerRegister = () => {
  return (
    <Container>
      <div>
        <Box>
          <Editor
            height="380px"
            placeholder="소중한 답변 감사합니다!"
            previewStyle="vertical"
            language="ko-KR"
            theme="dark"
          />
        </Box>
      </div>
      <RegisterBtn>답변하기</RegisterBtn>
    </Container>
  );
};

export default AnswerRegister;

const Container = styled.div`
  margin-top: 1rem;
  width: 55rem;
  padding: 3rem;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.black};
`;

const Box = styled.div``;

const RegisterBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: #0bec12 solid 2px;
  color: ${props => props.theme.colors.green};
  padding: 5px;
  font-size: 18px;
  width: 7rem;
  height: 3rem;
  border-radius: 30px;
  margin-left: auto;
  margin-top: 1rem;
  background-color: black;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.green};
    color: black;
  }
`;
