import React from 'react';
import styled from 'styled-components';

const CardModal = ({ isOpen, onClose }) => {
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return isOpen ? (
    <ModalOverlay onClick={handleOverlayClick}>
      <CardModalContainer>
        <ModalCloseButton onClick={onClose}>&times;</ModalCloseButton>
      </CardModalContainer>
    </ModalOverlay>
  ) : null;
};

export default CardModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardModalContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 400px;
  height: 400px;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;
