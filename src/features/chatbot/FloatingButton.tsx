'use client'

import React, { useState } from 'react'
import styled from '@emotion/styled'
import colors from '@/utils/colors'
import { ChatBot } from './ChatBot'

export const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <FloatingButtonContainer>
        <FloatingButton onClick={toggleChat} isOpen={isOpen}>
          {isOpen ? '✕' : '💬'}
        </FloatingButton>
      </FloatingButtonContainer>

      {isOpen && (
        <ChatModalOverlay onClick={toggleChat}>
          <ChatModal onClick={(e) => e.stopPropagation()}>
            <ChatHeader>
              <ChatTitle>ExitMate 챗봇</ChatTitle>
              <CloseButton onClick={toggleChat}>✕</CloseButton>
            </ChatHeader>
            <ChatBot />
          </ChatModal>
        </ChatModalOverlay>
      )}
    </>
  )
}

const FloatingButtonContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
`

const FloatingButton = styled.button<{ isOpen: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${(props) => (props.isOpen ? colors.gray[6] : colors.point)};
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
`

const ChatModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`

const ChatModal = styled.div`
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: ${colors.point};
  color: white;
`

const ChatTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`
