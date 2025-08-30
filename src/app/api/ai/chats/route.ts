import prisma from '@/utils/prisma'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { buildErrorResponse } from '../../utils'
import {
  ChatBridgeResponseSchema,
  ChatbotRequestSchema,
  ChatbotResponse,
  ChatbotSessionListResponse,
} from './schema'
import z from 'zod'
import { createChatbotSession, getPromptResponse, saveMessage } from './chat'
import { SenderType } from '@/generated/prisma'

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request })
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const chatbotSessions = await prisma.chatbotSession.findMany({
    where: {
      createdById: token.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      messages: {
        take: 1,
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })

  return NextResponse.json<ChatbotSessionListResponse>({
    data: chatbotSessions,
  })
}
export async function POST(request: NextRequest) {
  try {
    const token = await getToken({ req: request })
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    let { question, chatbotSessionId } = ChatbotRequestSchema.parse(body)

    if (!chatbotSessionId) {
      // 채팅방 id가 undefined일 경우 생성
      const chatbotSession = await createChatbotSession(token.id)
      chatbotSessionId = chatbotSession.id
    }

    await saveMessage(chatbotSessionId, question, SenderType.MEMBER)

    const businessInfo = await prisma.businessInfo.findFirst({
      where: {
        memberId: token.id,
      },
    })
    if (!businessInfo) {
      return NextResponse.json(
        { error: 'Business info not found' },
        { status: 404 },
      )
    }

    const response = await getPromptResponse(question, businessInfo)

    if (!response.ok) {
      console.error(await response.text())
      return NextResponse.json(
        buildErrorResponse(
          new Error('AI 서버 요청 실패'),
          '채팅 요청 처리 중 오류가 발생했습니다.',
        ),
        { status: response.status },
      )
    }

    const { answer } = ChatBridgeResponseSchema.parse(await response.json())

    await saveMessage(chatbotSessionId, answer, SenderType.BOT)

    return NextResponse.json<ChatbotResponse>({
      data: { answer, chatbotSessionId },
    })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        buildErrorResponse(error, '채팅 요청 처리 중 오류가 발생했습니다.'),
        { status: 400 },
      )
    }
    return NextResponse.json(
      buildErrorResponse(
        error as Error,
        '채팅 요청 처리 중 오류가 발생했습니다.',
      ),
      { status: 500 },
    )
  }
}
