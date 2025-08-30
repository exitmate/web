import { BusinessInfo, SenderType } from '@/generated/prisma'
import prisma from '@/utils/prisma'
import { getBusinessInfoEntity } from '../utils'

export async function createChatbotSession(memberId: string) {
  const chatbotSession = await prisma.chatbotSession.create({
    data: {
      createdById: memberId,
    },
  })
  return chatbotSession
}

export async function saveMessage(
  sessionId: string,
  content: string,
  senderType: SenderType,
) {
  const message = await prisma.chatbotMessage.create({
    data: {
      sessionId,
      content,
      senderType,
    },
  })
  return message
}

export async function getPromptResponse(
  question: string,
  businessInfo: BusinessInfo,
) {
  const AI_SERVER_URL = process.env.AI_SERVER_URL
  const response = await fetch(`${AI_SERVER_URL}/api/chatbot`, {
    method: 'POST',
    body: JSON.stringify({
      question,
      businessInfo: getBusinessInfoEntity(businessInfo),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response
}
