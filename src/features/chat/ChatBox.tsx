import { ChatBubbleItem } from "./ChatBubbleItem";

export const ChatBox = () => {
  return (
    <div>
      <ChatBubbleItem message="Hello" isUser={true} />
      <ChatBubbleItem message="Hello" isUser={false} />
    </div>
  );
};