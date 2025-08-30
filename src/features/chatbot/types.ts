export interface Message {
  id: string
  role: 'user' | 'bot'
  content: string
  timestamp: Date
}

export interface ChatbotSession {
  id: string
  createdAt: string
  messages: {
    id: string
    content: string
    senderType: 'MEMBER' | 'BOT'
    createdAt: string
  }[]
}
