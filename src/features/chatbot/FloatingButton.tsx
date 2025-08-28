'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled from '@emotion/styled'
import colors from '@/utils/colors'
import { ChatBot } from './ChatBot'

export const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  if (!mounted) return null

  return createPortal(
    <>
      <FloatingButtonContainer>
        <FloatingButton onClick={toggleChat} isOpen={isOpen}>
          {isOpen ? '✕' : '💬'}
        </FloatingButton>
      </FloatingButtonContainer>

      {isOpen && (
        <ChatContainer>
          <ChatHeader>
            <ChatTitle>ExitMate 챗봇</ChatTitle>
            <CloseButton onClick={toggleChat}>✕</CloseButton>
          </ChatHeader>
          <ChatBot />
        </ChatContainer>
      )}
    </>,
    document.body,
  )
}

const FloatingButtonContainer = styled.div`
  position: fixed !important;
  bottom: 24px !important;
  right: 24px !important;
  z-index: 999 !important;
  pointer-events: auto !important;
  display: block !important;
`

const FloatingButton = styled.button<{ isOpen: boolean }>`
  width: 60px !important;
  height: 60px !important;
  border-radius: 50% !important;
  background: ${(props) =>
    props.isOpen ? colors.gray[6] : colors.point} !important;
  color: white !important;
  border: none !important;
  font-size: 24px !important;
  cursor: pointer !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  transition: all 0.3s ease !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  position: relative !important;
  z-index: 99999 !important;

  &:hover {
    transform: scale(1.1) !important;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2) !important;
  }

  &:active {
    transform: scale(0.95) !important;
  }
`

const ChatContainer = styled.div`
  position: fixed !important;
  bottom: 100px !important;
  right: 24px !important;
  width: 380px !important;
  height: 600px !important;
  background: white !important;
  border-radius: 12px !important;
  z-index: 99998 !important;
  display: flex !important;
  flex-direction: column !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2) !important;
  overflow: hidden !important;

  @media (max-width: 420px) {
    width: calc(100vw - 48px) !important;
    right: 24px !important;
  }

  animation: slideUp 0.3s ease-out !important;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
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
