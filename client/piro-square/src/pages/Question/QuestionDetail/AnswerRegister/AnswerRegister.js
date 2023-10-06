import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { fetchPOST } from '../../../../utils/utils';

const AnswerRegister = ({ onCommentSubmit }) => {
  let { id } = useParams();
  const [comment, setComment] = useState('');
  const editorRef = React.createRef();

  const handleContentChange = newContent => {
    setComment(newContent);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const confirmSubmit = window.confirm('답변글을 등록하시겠습니까?');
    const editorInstance = editorRef.current.getInstance();
    const markdownContent = editorInstance.getMarkdown();
    const url = `http://localhost:8000/comment/create/${id}`;
    const body = {
      content: markdownContent,
    };
    if (confirmSubmit) {
      try {
        const result = await fetchPOST(url, body);
        if (result.success) {
          window.location.reload();
        } else {
          window.location.reload();
        }
      } catch (error) {
        console.error('Error:', error);
        alert('게시글 등록 실패! 다시 시도해주세요.');
      }
    }

    setComment('');
  };

  return (
    <Container>
      <div>
        <Box>
          <Editor
            ref={editorRef}
            height="380px"
            placeholder="소중한 답변 감사합니다!"
            previewStyle="vertical"
            language="ko-KR"
            theme="dark"
            value={comment}
            onChange={handleContentChange}
            disabled={comment.length === 0}
          />
        </Box>
      </div>
      <RegisterBtn onClick={handleSubmit} disabled={comment.length === 0}>
        답변하기
      </RegisterBtn>
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
  color: ${props => props.theme.colors.black};
  padding: 5px;
  font-size: 18px;
  width: 7rem;
  height: 3rem;
  border-radius: 30px;
  margin-left: auto;
  margin-top: 1rem;
  background-color: ${props =>
    props.disabled ? props.theme.colors.grayLight : props.theme.colors.green};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;
