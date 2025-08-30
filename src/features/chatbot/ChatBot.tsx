'use client'

import React, { useState } from 'react'
import styled from '@emotion/styled'
import { ChatList } from './chatlist/ChatList'
import { ChatSection } from './chatsection/ChatSection'
import { Message, ChatbotSession } from './types'

export const ChatBot = () => {
  const [sessions, setSessions] = useState<ChatbotSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string>()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'bot',
      content:
        '안녕하세요! ExitMate 챗봇입니다. 폐업과 관련된 궁금한 점이 있으시면 언제든 물어보세요.',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingSessions, setIsLoadingSessions] = useState(true)
  const [isSessionListOpen, setIsSessionListOpen] = useState(false)

  // 채팅방 목록 불러오기
  const loadSessions = async () => {
    try {
      const response = await fetch('/api/ai/chats')
      if (!response.ok) {
        throw new Error('채팅방 목록을 불러오는데 실패했습니다.')
      }
      const data = await response.json()
      setSessions(data.data)

      // 첫 번째 세션이 있으면 자동으로 선택하지 않음 - 새로운 대화 화면 유지
    } catch (error) {
      console.error('Failed to load sessions:', error)
    } finally {
      setIsLoadingSessions(false)
    }
  }

  // 특정 세션의 메시지 불러오기
  const loadMessagesForSession = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/ai/chats/${sessionId}`)
      if (!response.ok) {
        throw new Error('채팅 메시지를 불러오는데 실패했습니다.')
      }
      const data = await response.json()

      const formattedMessages: Message[] = data.data.messages.map(
        (msg: any) => ({
          id: msg.id,
          role: msg.senderType === 'MEMBER' ? 'user' : 'bot',
          content: msg.content,
          timestamp: new Date(msg.createdAt),
        }),
      )

      // 첫 번째 메시지가 봇 메시지가 아니면 환영 메시지 추가
      if (
        formattedMessages.length === 0 ||
        formattedMessages[0].role === 'user'
      ) {
        formattedMessages.unshift({
          id: 'welcome',
          role: 'bot',
          content:
            '안녕하세요! ExitMate 챗봇입니다. 폐업과 관련된 궁금한 점이 있으시면 언제든 물어보세요.',
          timestamp: new Date(),
        })
      }

      setMessages(formattedMessages)
      setCurrentSessionId(sessionId)
      setIsSessionListOpen(false) // 채팅방 선택 시 목록 닫기
    } catch (error) {
      console.error('Failed to load messages:', error)
    }
  }

  // 컴포넌트 마운트 시 채팅방 목록 불러오기
  React.useEffect(() => {
    loadSessions()
  }, [])

  // 새 채팅방 생성
  const createNewSession = () => {
    setCurrentSessionId(undefined)
    setMessages([
      {
        id: 'welcome',
        role: 'bot',
        content:
          '안녕하세요! ExitMate 챗봇입니다. 폐업과 관련된 궁금한 점이 있으시면 언제든 물어보세요.',
        timestamp: new Date(),
      },
    ])
    setIsSessionListOpen(false) // 새 채팅방 생성 시 목록 닫기
  }

  // 채팅방 목록 토글
  const toggleSessionList = () => {
    setIsSessionListOpen(!isSessionListOpen)
  }

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
          chatbotSessionId: currentSessionId,
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

      // 새로운 세션이 생성된 경우
      if (!currentSessionId && data.data.chatbotSessionId) {
        setCurrentSessionId(data.data.chatbotSessionId)
        // 세션 목록 새로고침
        await loadSessions()
      }
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

  // 초기 로딩 상태는 표시하지 않음 - 채팅방 목록을 열 때만 표시

  return (
    <ChatBotContainer>
      <ChatList
        sessions={sessions}
        currentSessionId={currentSessionId}
        isLoadingSessions={isLoadingSessions}
        isOpen={isSessionListOpen}
        onSessionSelect={loadMessagesForSession}
        onNewChat={createNewSession}
        onBackToChat={toggleSessionList}
      />

      <ChatSection
        messages={messages}
        currentSessionId={currentSessionId}
        sessions={sessions}
        inputValue={inputValue}
        isLoading={isLoading}
        isOpen={!isSessionListOpen}
        onSend={handleSend}
        onInputChange={setInputValue}
        onToggleSessionList={toggleSessionList}
      />
    </ChatBotContainer>
  )
}

const ChatBotContainer = styled.div`
  display: flex;
  height: 100%;
  min-height: 0;
  position: relative;
  overflow: hidden;
`
