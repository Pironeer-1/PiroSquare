import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import MypageNav from '../MypageNav';
import { useNavigate } from 'react-router-dom';
import { fetchPOST } from '../../../utils/utils';

const MypageUpdate = () => {
  const [information, setInformation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://192.168.1.184:8000/mypage`, {
      method: 'GET',
      credentials: 'include',
    })
      // fetch('/data/userData.json')
      .then(response => response.json())
      .then(result => {
        setInformation(result?.userInfo[0]);
      });
  }, []);

  const [email, setEmail] = useState(information?.email || '');
  const [nickname, setNickname] = useState(information?.nickname || '');
  const [introduction, setIntroduction] = useState(
    information?.introduce || '',
  );
  const [imgUrl, setImgUrl] = useState(information?.image || '');
  const inputRef = useRef(null);

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handleImgChange = e => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImgUrl(imageUrl);
    }
  };

  const handleIntroductionChange = e => {
    setIntroduction(e.target.value);
  };

  const handleNickNameChange = e => {
    setNickname(e.target.value);
  };

  const user_id = information.user_id;
  console.log('user_id', user_id);

  const onSubmit = async event => {
    event.preventDefault();
    const url = `http://192.168.1.184:8000/mypage/updateUser/${user_id}`;
    console.log(url);
    const body = {
      email: email,
      nickname: nickname,
      introduce: introduction,
      image: imgUrl,
      user_id: user_id,
    };
    console.log(body);
    console.log(url);
    const result = await fetchPOST(url, body);
    console.log(result);
    navigate('/my-page/card');
  };

  // const onSubmit = async event => {
  //   event.preventDefault();
  //   const url = 'http://localhost:8000/post/create';
  //   const body = {
  // email: email,
  // nickname: nickname,
  // introduction: introduction,
  // imgUrl: imgUrl,
  //   };
  //   const result = await fetchPOST(url, body);
  //   console.log(result);
  //   setTitle('');
  //   setContent('');
  //   navigate('/');
  // };

  return (
    <Container>
      <MypageNav />
      <MainInformation>
        <InformationBox>
          <InfoTitle>이름</InfoTitle>
          <InfoContent>{information?.name}</InfoContent>
        </InformationBox>
        <InformationBox>
          <InfoTitle>기수</InfoTitle>
          <InfoContent>{information?.year}</InfoContent>
        </InformationBox>
      </MainInformation>
      <DownInformation>
        <Email>
          <EmailBox>
            <EmailTitle>이메일</EmailTitle>
            <EmailContent
              placeholder={information?.email}
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </EmailBox>
          <EmailLabel>이메일 주소 '@' 포함</EmailLabel>
        </Email>
        <SubInformation>
          <ImgSection>
            <ProfileImgSection>
              <ProfileImg src={imgUrl ? imgUrl : information?.image} />
              <ProfileInput
                type="file"
                accept="image/*"
                onChange={handleImgChange}
                style={{ display: 'none' }}
                ref={inputRef}
              />
            </ProfileImgSection>
            <ImgBtn onClick={() => inputRef.current.click()}>
              이미지 변경
            </ImgBtn>
            <ImgLabel>이미지 비율 11:14 권장</ImgLabel>
          </ImgSection>

          <SubInfoSection>
            <NickName>
              <NickNameBox>
                <NickNameTitle>닉네임</NickNameTitle>
                <NickNameContent
                  placeholder={information?.nickname}
                  type="text"
                  value={nickname}
                  onChange={handleNickNameChange}
                />
              </NickNameBox>
              <NickNameLabel>10자 이하</NickNameLabel>
            </NickName>
            <Introduce>
              <IntroduceTitle>소개</IntroduceTitle>
              <IntroduceContent
                placeholder={information?.introduce}
                type="text"
                value={introduction}
                onChange={handleIntroductionChange}
              />
              <IntroduceLabel>40자 이하</IntroduceLabel>
            </Introduce>
          </SubInfoSection>
        </SubInformation>
        <UpdateBtn onClick={onSubmit}>수정하기</UpdateBtn>
      </DownInformation>
    </Container>
  );
};

export default MypageUpdate;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainInformation = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem auto;
  width: 55rem;
  border-bottom: 2px solid #0bec12;
  padding-bottom: 1rem;
`;

const InformationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16rem;
  font-size: 17px;
  margin-left: 30px;
`;

const InfoTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 3rem;
  background-color: ${props => props.theme.colors.black};
`;

const InfoContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 3rem;
  background-color: ${props => props.theme.colors.grayDark};
`;

const DownInformation = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const SubInformation = styled.div`
  display: flex;
  justify-content: center;
  width: 55rem;
`;

const ImgSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImgLabel = styled.label`
  color: ${props => props.theme.colors.grayLight};
  margin-top: 2px;
  margin-left: 5rem;
`;

const ProfileImgSection = styled.div`
  margin-top: 2rem;
  margin-left: 5rem;
  width: 11rem;
  height: 14rem;
  background-color: ${props => props.theme.colors.grayDark};
`;

const ProfileImg = styled.img`
  width: 11rem;
  height: 14rem;
`;
const ProfileInput = styled.input``;
const SubInfoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const NickName = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
`;

const NickNameBox = styled.div`
  display: flex;
`;

const NickNameTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 3rem;
  background-color: ${props => props.theme.colors.black};
`;

const NickNameContent = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: black;
  font-size: 16px;
  width: 15rem;
  height: 3rem;
  padding-left: 1rem;
  background-color: ${props => props.theme.colors.grayLight};
`;

const NickNameLabel = styled.label`
  color: ${props => props.theme.colors.grayLight};
  margin-top: 2px;
  margin-left: auto;
`;

const Introduce = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 2rem;
`;

const IntroduceTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 3rem;
  background-color: ${props => props.theme.colors.black};
`;

const IntroduceContent = styled.textarea`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: black;
  font-size: 16px;
  width: 23rem;
  height: 5rem;
  padding: 0.5rem;
  background-color: ${props => props.theme.colors.grayLight};
`;

const IntroduceLabel = styled.label`
  color: ${props => props.theme.colors.grayLight};
  margin-top: 2px;
  margin-left: auto;
`;

const ImgBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 3rem;
  border: none;
  margin-left: 5rem;
  font-size: 16px;
  background-color: ${props => props.theme.colors.black};
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.colors.grayLight};
  }
`;

const UpdateBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: #0bec12 solid 2px;
  color: ${props => props.theme.colors.green};
  margin: 1rem auto;
  padding: 5px;
  font-size: 20px;
  width: 10rem;
  height: 4rem;
  border-radius: 30px;
  background-color: black;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.green};
    color: black;
  }
`;

const Email = styled.div`
  display: flex;
  flex-direction: column;
  width: 39rem;
  margin: 0 auto;
`;

const EmailBox = styled.div`
  display: flex;
  justify-content: center;
  margin-left: auto;
  width: 36rem;
`;

const EmailTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 3rem;
  background-color: ${props => props.theme.colors.black};
`;

const EmailContent = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: black;
  font-size: 16px;
  width: 29rem;
  height: 3rem;
  padding-left: 1rem;
  background-color: ${props => props.theme.colors.grayLight};
`;

const EmailLabel = styled.label`
  color: ${props => props.theme.colors.grayLight};
  margin-top: 2px;
  margin-left: auto;
`;
