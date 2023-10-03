import React, { useState, useRef, useMemo } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
const Quil = ({ content, setContent }) => {
  const quillRef = useRef();

  const imageHandler = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('img', file);
      try {
        const result = await axios.post('http://localhost:3000/img', formData);
        console.log('성공 시, 백엔드가 보내주는 데이터', result.data.url);
        const IMG_URL = result.data.url;

        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'image', IMG_URL);
      } catch (error) {
        console.log('실패..');
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          ['clean'],
        ],

        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);
  const formats = [
    'font',
    'size',
    'header',
    'color',
    'background',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  const handleContentChange = newContent => {
    setContent(newContent);
  };

  return (
    <Container>
      <QuilContainer>
        <ReactQuill
          style={{
            height: '35rem',
            width: '55rem',
            backgroundColor: '#2C2D2E',
          }}
          ref={quillRef}
          theme="snow"
          value={content}
          modules={modules}
          formats={formats}
          onChange={handleContentChange}
          placeholder="내용을 입력하세요."
        />
      </QuilContainer>
    </Container>
  );
};

export default Quil;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 55rem;
  margin: 0 auto;
`;

const QuilContainer = styled.div`
  & span .ql-picker {
    color: #06c;
  }

  & .ql-editor {
    font-size: 18px;
    background-color: ${props => props.theme.colors.black};
    border: none;
    color: white;
  }

  & .ql-toolbar ql-snow {
    border: none;
    background-color: ${props => props.theme.colors.black};
  }

  & .ql-container ql-snow {
    border: none;
  }

  & .ql-editor.ql-blank::before {
    color: ${props => props.theme.colors.grayLight};
  }

  & .ql-snow .ql-picker-options .ql-picker-item {
    color: #06c;
  }
`;
