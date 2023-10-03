import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import MypageNav from './MypageNav';
import html2canvas from 'html2canvas';

const Mypage = () => {
  const [information, setInformation] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8000/mypage`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(result => {
        setInformation(result?.userInfo[0]);
      });
  }, []);

  console.log(information);
  const CardRef = useRef(null);

  const FrontImgBase64 = information.image;

  const handleCapture = () => {
    html2canvas(CardRef.current, {
      scale: 4,
      allowTaint: true,
      useCORS: true,
      logging: false,
    }).then(canvas => {
      const capturedImage = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = capturedImage;
      link.download = 'card_capture.png';
      link.click();
    });
  };

  return (
    <Container>
      <MypageNav />
      <CardSection ref={CardRef}>
        <Card>
          <BackSection>
            <LogoSection>
              <LogoImg src="/images/Nav/piro_logo.png" />
              <PhraseImg src="/images/Mypage/PIROGRAMMING.png" />
            </LogoSection>
            <ContentSection>
              <NickName>{information.nickname}</NickName>
              <Introduce>{information.introduce}</Introduce>
              <Contact>{information?.email}</Contact>
            </ContentSection>
          </BackSection>
        </Card>
        <RightCard style={{ backgroundImage: `url(${FrontImgBase64})` }}>
          <FrontSection>
            <FrontInformation>
              <FrontImg src="/images/Nav/piro_logo.png" />
              <FrontName>{information.name}</FrontName>
              <FrontChapter>
                Pirogrammer <ChapterNumber>{information.year}</ChapterNumber>
              </FrontChapter>
            </FrontInformation>
          </FrontSection>
        </RightCard>
      </CardSection>
      <CardCapture onClick={handleCapture}>
        캡쳐하기
        <CaptureImg src="/images/Mypage/photo-capture_g.png" />
      </CardCapture>
    </Container>
  );
};
export default Mypage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 55rem;
  margin: 0 auto;
`;

const CardSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
  margin: 2rem auto;
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  width: 22rem;
  height: 28rem;
  background-color: ${props => props.theme.colors.black};
  border-radius: 10px;
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
`;

const RightCard = styled.div`
  display: flex;
  justify-content: center;
  width: 22rem;
  height: 28rem;
  opacity: 0.8;
  background-size: cover;
  background-position: center;
  background-color: ${props => props.theme.colors.grayLight};
  border-radius: 10px;
  z-index: 1;
`;

const BackSection = styled.div`
  display: grid;
  width: 22rem;
  grid-template-columns: 1fr 4fr;
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoImg = styled.img`
  width: 40px;
  margin: 15px auto;
`;

const PhraseImg = styled.img`
  width: 20px;
  margin: 10px auto;
`;

const ContentSection = styled.div`
  margin: 1rem;
`;

const NickName = styled.h1`
  font-size: 24px;
  padding: 1rem;
  border-bottom: 2px solid #0bec12;
  text-align: right;
`;

const Introduce = styled.div`
  margin-top: 2rem;
  min-height: 18rem;
  font-size: 18px;
  word-break: break-all;
`;

const Contact = styled.div`
  font-family: 'InteropLight';
  font-size: 16px;
`;

const FrontSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 22rem;
  height: 10rem;
  z-index: 2;
  background-color: ${props => props.theme.colors.black};
  margin-top: auto;
  border-radius: 120px 0 10px 5px;
  box-shadow:
    5px 19px 38px rgba(0, 0, 0, 0.3),
    5px 15px 12px rgba(0, 0, 0, 0.22);
`;

const FrontInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
  margin-left: 10rem;
`;

const FrontImg = styled.img`
  width: 3rem;
`;

const FrontName = styled.h1`
  margin-top: 1rem;
  font-size: 28px;
`;

const FrontChapter = styled.div`
  display: flex;
  font-family: 'Hubballi';
  font-size: 22px;
  margin-top: 5px;
  margin-right: 20px;
  color: ${props => props.theme.colors.green};
`;

const ChapterNumber = styled.div`
  color: ${props => props.theme.colors.green};
  font-family: 'Hubballi';
  margin-left: 5px;
`;

const CardCapture = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: #0bec12 solid 2px;
  color: ${props => props.theme.colors.green};
  margin: 10px auto;
  padding: 10px;
  font-size: 20px;
  width: 10rem;
  height: 4rem;
  border-radius: 30px;
  background-color: black;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.green};
    color: black;

    & > img {
      content: url('/images/Mypage/photo-capture.png');
    }
  }
`;

const CaptureImg = styled.img`
  width: 25px;
  margin-left: 5px;
`;
