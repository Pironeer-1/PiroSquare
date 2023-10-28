import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Container>
      <PironeerBox>
        <PironeerImg src="/images/Footer/pironeer_web.png" />
        <Pironeer>Pironeer</Pironeer>
      </PironeerBox>
    </Container>
  );
};
export default Footer;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PironeerBox = styled.div`
  display: flex;
  margin-top: 5px;
`;

const PironeerImg = styled.img`
  width: 40px;
`;

const Pironeer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'InteropExtraLight';
  color: ${props => props.theme.colors.grayLight};
`;
