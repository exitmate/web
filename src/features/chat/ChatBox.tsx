import { ChatBubbleItem } from "./ChatBubbleItem";

export const ChatBox = () => {
  return (
    <div>
      <ChatBubbleItem message={["Hello", "Hello", "Hello"]} isUser={true} index={0} />
      <ChatBubbleItem message={["Hello", "Hello", "Hello"]} isUser={false} index={1} />
    </div>
  );
};