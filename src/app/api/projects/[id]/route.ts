import prisma from '@/utils/prisma'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'
import { ErrorResponse, ValidationErrorResponse } from '../../schema'
import { buildErrorResponse } from '../../utils'
import { ProjectDetailRequestSchema } from './schema'

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const token = await getToken({ req: request })
    if (!token) {
      return NextResponse.json<ErrorResponse>(
        { error: '로그인이 필요합니다.' },
        { status: 401 },
      )
    }
    const { id: projectId } = ProjectDetailRequestSchema.parse(
      new URLSearchParams(request.nextUrl.searchParams),
    )

    const project = await prisma.supportProject.findUnique({
      where: {
        id: projectId,
      },
      include: {
        services: true,
        eligibility: true,
      },
    })

    if (!project) {
      return NextResponse.json<ErrorResponse>(
        { error: '프로젝트를 찾을 수 없습니다.' },
        { status: 404 },
      )
    }

    return NextResponse.json(project)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(buildErrorResponse(error), { status: 400 })
    }
    return NextResponse.json(
      buildErrorResponse(
        error as Error,
        '서버 오류가 발생했습니다. 다시 시도해주세요.',
      ) as ErrorResponse,
      { status: 500 },
    )
  }
}
