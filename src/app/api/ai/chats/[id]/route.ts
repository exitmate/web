import prisma from '@/utils/prisma'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { ChatbotSessionDetailResponse } from '../schema'
import { buildErrorResponse } from '@/app/api/utils'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = await getToken({ req: request })
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sessionId = (await params).id

    const chatbotSession = await prisma.chatbotSession.findFirst({
      where: {
        id: sessionId,
        createdById: token.id,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })

    if (!chatbotSession) {
      return NextResponse.json(
        { error: 'Chatbot session not found' },
        { status: 404 },
      )
    }

    return NextResponse.json<ChatbotSessionDetailResponse>({
      data: chatbotSession,
    })
  } catch (error) {
    return NextResponse.json(
      buildErrorResponse(
        error as Error,
        '채팅 세션 조회 중 오류가 발생했습니다.',
      ),
      { status: 500 },
    )
  }
}
