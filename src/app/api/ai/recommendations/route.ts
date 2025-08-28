import prisma from '@/utils/prisma'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'
import { buildErrorResponse } from '../../utils'
import { getBusinessInfoEntity } from '../utils'
import {
  RecommendationBridgeResponseSchema,
  RecommendationResponse,
} from './schema'

const AI_SERVER_URL = process.env.AI_SERVER_URL

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request })
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
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

    const response = await fetch(`${AI_SERVER_URL}/api/recommendations`, {
      method: 'POST',
      body: JSON.stringify({
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
          '추천 요청 처리 중 오류가 발생했습니다.',
        ),
        { status: response.status },
      )
    }

    const { recommended_policy_ids: recommendedProjectIds } =
      RecommendationBridgeResponseSchema.parse(await response.json())
    const recommendedProjects = await prisma.supportProject.findMany({
      where: {
        id: { in: recommendedProjectIds },
      },
    })
    return NextResponse.json<RecommendationResponse>({
      data: { recommendedProjects },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        buildErrorResponse(error, '추천 요청 처리 중 오류가 발생했습니다.'),
        { status: 400 },
      )
    }
    return NextResponse.json(
      buildErrorResponse(
        error as Error,
        '추천 요청 처리 중 오류가 발생했습니다.',
      ),
      { status: 500 },
    )
  }
}
