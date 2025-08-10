import sendIcon from "@/assets/icons/arrow-up.svg";
import colors from "@/utils/colors";
import { Textarea } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";

interface ChatInputProps {
  placeholder: string;
  value: string;
  onSend: (message: string) => void;
  onChange: (value: string) => void;
}

export const ChatInput = ({ onSend, placeholder, value, onChange }: ChatInputProps) => {
  const [active, setActive] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setActive(newValue.length > 0);
    onChange(newValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && active) {
      e.preventDefault();
      onSend(value);
    }
  };

  return (
  <ChatInputContainer>
    <CustomTextarea 
      resize="none" 
      placeholder={placeholder} 
      value={value} 
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
    <SendButton onClick={() => onSend(value)} active={active} disabled={!active}>
      <Image src={sendIcon} alt="send" />
    </SendButton>
  </ChatInputContainer>
  );
};

const ChatInputContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

const CustomTextarea = styled(Textarea)`
  border: 1px solid ${colors.gray[3]};
  outline: none;
  resize: none;
  padding: 16px;
`;

const SendButton = styled.button<{ active: boolean }>`
  position: absolute;
  right: 16px;
  bottom: 16px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? colors.point : colors.gray[3])};
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  cursor: ${({ active }) => (active ? 'pointer' : 'not-allowed')};
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ active }) => (active ? colors.point : colors.gray[3])};
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

export default ChatInput;