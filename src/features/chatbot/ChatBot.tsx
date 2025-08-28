'use client'

import React, { useState, useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import colors from '@/utils/colors'
import { ChatInput } from '@/features/chat/ChatInput'
import { ChatBubbleItem } from '@/features/chat/ChatBubbleItem'

interface Message {
  id: string
  role: 'user' | 'bot'
  content: string
  timestamp: Date
}

export const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content:
        '안녕하세요! ExitMate 챗봇입니다. 폐업과 관련된 궁금한 점이 있으시면 언제든 물어보세요.',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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

  const handleSend = async (message: string) => {
    const trimmed = message.trim()
    if (!trimmed || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: trimmed,
        }),
      })

      if (!response.ok) {
        throw new Error('채팅 요청에 실패했습니다.')
      }

      const data = await response.json()
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: 'bot',
        content: data.data.answer,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'bot',
        content:
          '죄송합니다. 현재 서비스에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ChatBotContainer>
      <ChatBotMessages ref={chatContainerRef}>
        {messages.map((message, index) => (
          <ChatBubbleItem
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
      <ChatInput
        ref={inputRef}
        onSend={handleSend}
        placeholder="궁금한 점을 물어보세요..."
        value={inputValue}
        onChange={setInputValue}
        disabled={isLoading}
      />
    </ChatBotContainer>
  )
}

const ChatBotContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
`

const ChatBotMessages = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  gap: 8px;
  margin-bottom: 16px;

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
