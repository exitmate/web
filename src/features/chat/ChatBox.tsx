import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { ChatBubbleItem } from "./ChatBubbleItem";
import { ChatInput } from "./ChatInput";

interface ChatMessage {
  id: number;
  message: string[];
  isUser: boolean;
}

export const ChatBox = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, message: ["Hello", "Hello", "Hello"], isUser: true },
    { id: 1, message: ["Hello", "Hello", "Hello"], isUser: false }
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (message: string) => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: messages.length,
        message: [message],
        isUser: true
      };
      setMessages(prev => [...prev, newMessage]);
      setInputValue("");
    }
  };

  return (
    <>
    <ChatBoxContainer ref={chatContainerRef}>
      {messages.map((msg, index) => (
        <ChatBubbleItem 
          key={msg.id}
          message={msg.message} 
          isUser={msg.isUser} 
          index={!msg.isUser ? index : undefined} 
        />
      ))}
    </ChatBoxContainer>
    <ChatInput 
        onSend={handleSend} 
        placeholder="메시지를 입력해주세요." 
        value={inputValue}
        onChange={setInputValue}
      />
    </>
  );
};

const ChatBoxContainer = styled.div` 
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 380px;
  overflow-y: auto;
  padding: 36px 0;
  gap: 8px;
`;

export default ChatBox;