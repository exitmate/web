'use client'

import { MarkdownRender } from '@/components/ui/MarkdownRender'
import colors from '@/utils/colors'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'

interface ChatBotBubbleProps {
  message: string
  isUser: boolean
  index?: number
}

export const ChatBotBubble = ({
  message,
  isUser,
  index,
}: ChatBotBubbleProps) => {
  // 문자열에서 줄바꿈 처리
  // const formatMessage = (msg: string) => {
  //   return msg.split('\n').map((line, i) => (
  //     <span key={i}>
  //       {line}
  //       {i < msg.split('\n').length - 1 && <br />}
  //     </span>
  //   ))
  // }

  return (
    <ChatBotBubbleContainer isUser={isUser} index={index}>
      <MarkdownRender markdown={message} />
    </ChatBotBubbleContainer>
  )
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const ChatBotBubbleContainer = styled.div<{ isUser: boolean; index?: number }>`
  display: flex;
  flex-direction: column;
  max-width: 280px;
  width: fit-content;
  padding: 12px 16px 0 16px;
  font-size: 14px;
  line-height: 1.4;
  border-radius: 12px;
  color: ${({ isUser }) => (isUser ? colors.white : colors.gray[8])};
  background-color: ${({ isUser }) => (isUser ? colors.point : colors.gray[3])};
  align-self: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  opacity: ${({ isUser }) => (isUser ? 1 : 0)};
  white-space: pre-wrap;
  word-wrap: break-word;
  animation: ${({ isUser }) =>
    isUser
      ? 'none'
      : css`
          ${fadeInUp} 0.3s ease-out both
        `};
  animation-delay: 0s;
  animation-fill-mode: forwards;
  will-change: transform, opacity;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }

  & div p {
    margin: 0 !important;
    line-height: 1.5 !important;
  }
`

export default ChatBotBubble
