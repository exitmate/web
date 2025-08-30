'use client'

import React, { useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import colors from '@/utils/colors'
import { ChatInput } from '@/features/chat/ChatInput'
import { ChatBotBubble } from '../ChatBotBubble'
import { Message, ChatbotSession } from '../types'

interface ChatSectionProps {
  messages: Message[]
  currentSessionId?: string
  sessions: ChatbotSession[]
  inputValue: string
  isLoading: boolean
  isOpen: boolean
  onSend: (message: string) => void
  onInputChange: (value: string) => void
  onToggleSessionList: () => void
}

export const ChatSection = ({
  messages,
  currentSessionId,
  sessions,
  inputValue,
  isLoading,
  isOpen,
  onSend,
  onInputChange,
  onToggleSessionList,
}: ChatSectionProps) => {
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <ChatSectionContainer isOpen={isOpen}>
      <ChatHeader>
        <MenuButton onClick={onToggleSessionList}>
          <MenuBar />
          <MenuBar />
          <MenuBar />
        </MenuButton>
        <ChatTitle>
          {currentSessionId
            ? sessions
                .find((s) => s.id === currentSessionId)
                ?.messages[0]?.content.substring(0, 20) + '...' || '채팅'
            : '새로운 대화'}
        </ChatTitle>
      </ChatHeader>
      <ChatBotMessages ref={chatContainerRef}>
        {messages.map((message, index) => (
          <ChatBotBubble
            key={message.id}
            message={message.content}
            isUser={message.role === 'user'}
            index={index}
          />
        ))}
        {isLoading && (
          <LoadingBubble>
            <LoadingDots>
              <span></span>
              <span></span>
              <span></span>
            </LoadingDots>
          </LoadingBubble>
        )}
      </ChatBotMessages>
      <ChatInputWrapper>
        <ChatInput
          ref={inputRef}
          onSend={onSend}
          placeholder="궁금한 점을 물어보세요..."
          value={inputValue}
          onChange={onInputChange}
          disabled={isLoading}
        />
      </ChatInputWrapper>
    </ChatSectionContainer>
  )
}

const ChatSectionContainer = styled.div<{ isOpen: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateX(${(props) => (props.isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  z-index: 5;
`

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid ${colors.gray[2]};
  background: ${colors.gray[1]};
`

const ChatTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${colors.gray[8]};
`

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background: ${colors.gray[2]};
  }
`

const MenuBar = styled.div`
  width: 18px;
  height: 2px;
  background: ${colors.gray[7]};
  border-radius: 1px;
`

const ChatBotMessages = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  overflow-y: auto;
  gap: 8px;
  margin-bottom: 16px;
  padding: 20px;
  min-height: 0;
  line-height: 1.2;

  scrollbar-width: thin;
  scrollbar-color: ${colors.gray[3]} transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.gray[3]};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${colors.gray[4]};
  }
`

const LoadingBubble = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 8px 0;
`

const LoadingDots = styled.div`
  background: ${colors.gray[2]};
  border-radius: 18px;
  padding: 12px 16px;
  display: flex;
  gap: 4px;

  span {
    width: 6px;
    height: 6px;
    background: ${colors.gray[5]};
    border-radius: 50%;
    animation: loading 1.4s infinite ease-in-out;

    &:nth-of-type(1) {
      animation-delay: -0.32s;
    }

    &:nth-of-type(2) {
      animation-delay: -0.16s;
    }
  }

  @keyframes loading {
    0%,
    80%,
    100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
`

const ChatInputWrapper = styled.div`
  flex-shrink: 0;
  margin-top: auto;
  padding: 0 20px 20px 20px;
`
