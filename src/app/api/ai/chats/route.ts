import prisma from '@/utils/prisma'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { buildErrorResponse } from '../../utils'
import {
  ChatBridgeResponseSchema,
  ChatRequestSchema,
  ChatResponse,
} from './schema'
import z from 'zod'
import { getBusinessInfoEntity } from '../utils'

const AI_SERVER_URL = process.env.AI_SERVER_URL

export async function POST(request: NextRequest) {
  try {
    const token = await getToken({ req: request })
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { question } = ChatRequestSchema.parse(body)

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

    if (!response.ok) {
      return NextResponse.json(
        buildErrorResponse(
          new Error('AI 서버 요청 실패'),
          '채팅 요청 처리 중 오류가 발생했습니다.',
        ),
        { status: response.status },
      )
    }

    const { answer } = ChatBridgeResponseSchema.parse(await response.json())

    return NextResponse.json<ChatResponse>({
      data: { answer },
    })
  } catch (error) {
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
