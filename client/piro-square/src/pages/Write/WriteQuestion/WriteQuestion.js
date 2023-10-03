import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import WriteTopSection from '../WriteTopSection/WriteTopSection';
import Register from '../Register';
import { fetchPOST } from '../../../utils/utils';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

const WriteQuestion = () => {
  const [title, setTitle] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [content, setContent] = useState('');
  const [btnAble, setBtnAble] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const editorRef = React.createRef();

  const handleContentChange = newContent => {
    setContent(newContent);
  };

  const handleLocation = () => {
    const currentPathname = location.pathname;
    let nextUrl = '';

    if (currentPathname === '/write/free') {
      nextUrl = `/free`;
    } else if (currentPathname === '/write/question') {
      nextUrl = `/question`;
    } else if (currentPathname === '/write/recruit/study') {
      nextUrl = `/recruit-study`;
    } else if (currentPathname === '/write/recruit/project') {
      nextUrl = `/recruit-project`;
    } else if (currentPathname === '/write/recruit/company') {
      nextUrl = `/recruit-company`;
    }

    navigate(nextUrl);
  };

  useEffect(() => {
    if (title.length >= 2) {
      setBtnAble(true);
    } else {
      setBtnAble(false);
    }
  }, [title]);

  const onSubmit = async event => {
    event.preventDefault();

    const url = `http://192.168.0.22:8000/post/create`;

    const editorInstance = editorRef.current.getInstance();
    const markdownContent = editorInstance.getMarkdown();

    const body = {
      title: title,
      content: markdownContent,
      selectedBoard: selectedBoard,
    };
    console.log(body);

    try {
      const result = await fetchPOST(url, body);
      console.log(result);

      if (result.success) {
        handleLocation();
      } else {
        alert('게시글 등록 실패! 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('게시글 등록 실패! 다시 시도해주세요.');
    }
  };
  return (
    <Container>
      <Title>질문하기</Title>
      <WriteTopSection
        title={title}
        selectedBoard={selectedBoard}
        setTitle={setTitle}
        setSelectedBoard={setSelectedBoard}
      />
      <QuilContainer>
        <Editor
          ref={editorRef}
          height="600px"
          placeholder="질문을 작성해주세요"
          previewStyle="vertical"
          language="ko-KR"
          theme="dark"
          onChange={handleContentChange}
          value={content}
        />
      </QuilContainer>
      <Register onSubmit={onSubmit} btnAble={btnAble} />
    </Container>
  );
};

export default WriteQuestion;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 55rem;
  min-height: 50rem;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-family: 'InteropLight';
  font-size: 34px;
`;

const QuilContainer = styled.div`
  margin-top: 2rem;
`;
