import colors from "@/utils/colors";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

interface ChatBubbleItemProps {
  message: string[];
  isUser: boolean;
  index?: number;
}

export const ChatBubbleItem = ({ message, isUser, index }: ChatBubbleItemProps) => {
  return <ChatBubbleItemContainer isUser={isUser} index={index}>{message.map((msg, msgIndex) => <div key={msgIndex}>{msg}</div>)}</ChatBubbleItemContainer>;
};

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ChatBubbleItemContainer = styled.div<{ isUser: boolean; index?: number }>`
  display: flex;
  flex-direction: column;
  max-width: 391px;
  width: fit-content;
  padding: 20px;
  font-size: 16px;
  gap: 8px;
  border-radius: 10px;
  color: ${({ isUser }) => (isUser ? colors.white : colors.gray[7])};
  background-color: ${({ isUser }) => (isUser ? colors.point : colors.gray[1])};
  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  opacity: ${({ isUser}) => (isUser ? 1 : 0)};
  animation: ${({ isUser }) => (isUser ? 'none' : css`${fadeInUp} 0.5s ease-out both`)};
  animation-delay: ${({ isUser, index }) => (isUser ? '0s' : `${(index || 0) * 0.2}s`)};
  animation-fill-mode: forwards;
  will-change: transform, opacity;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;

export default ChatBubbleItem;