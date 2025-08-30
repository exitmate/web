'use client'

import React from 'react'
import styled from '@emotion/styled'
import colors from '@/utils/colors'
import { ChatbotSession } from '../types'

interface ChatListProps {
  sessions: ChatbotSession[]
  currentSessionId?: string
  isLoadingSessions: boolean
  isOpen: boolean
  onSessionSelect: (sessionId: string) => void
  onNewChat: () => void
  onBackToChat: () => void
}

export const ChatList = ({
  sessions,
  currentSessionId,
  isLoadingSessions,
  isOpen,
  onSessionSelect,
  onNewChat,
  onBackToChat,
}: ChatListProps) => {
  return (
    <SessionList isOpen={isOpen}>
      <SessionHeader>
        <SessionTitle>채팅방 목록</SessionTitle>
        <HeaderButtons>
          <NewChatButton onClick={onNewChat}>새 채팅</NewChatButton>
          <BackToChatButton onClick={onBackToChat}>
            <BackIcon>←</BackIcon>
          </BackToChatButton>
        </HeaderButtons>
      </SessionHeader>
      <SessionItems>
        {isLoadingSessions ? (
          <LoadingContainer>
            <LoadingText>채팅방을 불러오는 중...</LoadingText>
          </LoadingContainer>
        ) : (
          sessions.map((session) => (
            <SessionItem
              key={session.id}
              isActive={currentSessionId === session.id}
              onClick={() => onSessionSelect(session.id)}
            >
              <SessionName>
                {session.messages.length > 0
                  ? session.messages[0].content.substring(0, 40) +
                    (session.messages[0].content.length > 40 ? '...' : '')
                  : '새로운 대화'}
              </SessionName>
              <SessionDate>
                {new Date(session.createdAt).toLocaleDateString()}
              </SessionDate>
            </SessionItem>
          ))
        )}
      </SessionItems>
    </SessionList>
  )
}

const SessionList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${colors.gray[1]};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transform: translateX(${(props) => (props.isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease-in-out;
  z-index: 10;
`

const SessionHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${colors.gray[2]};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeaderButtons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const SessionTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${colors.gray[8]};
`

const NewChatButton = styled.button`
  background: ${colors.point};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${colors.gray[7]};
  }
`

const BackToChatButton = styled.button`
  background: ${colors.gray[5]};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 6px 8px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(63, 138, 227, 0.2);

  &:hover {
    background: ${colors.gray[7]};
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(63, 138, 227, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`

const BackIcon = styled.span`
  font-size: 14px;
  font-weight: bold;
`

const SessionItems = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px;
`

const SessionItem = styled.div<{ isActive: boolean }>`
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 4px;
  background: ${(props) => (props.isActive ? colors.sub : 'transparent')};
  border: 1px solid
    ${(props) => (props.isActive ? colors.point : 'transparent')};

  &:hover {
    background: ${(props) => (props.isActive ? colors.sub : colors.gray[2])};
  }
`

const SessionName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.gray[8]};
  margin-bottom: 4px;
  line-height: 1.3;
`

const SessionDate = styled.div`
  font-size: 12px;
  color: ${colors.gray[5]};
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
`

const LoadingText = styled.div`
  color: ${colors.gray[6]};
  font-size: 14px;
`
