interface ChatBubbleItemProps {
  message: string;
  isUser: boolean;
}

export const ChatBubbleItem = ({ message, isUser }: ChatBubbleItemProps) => {
  return <div>{message}</div>;
};