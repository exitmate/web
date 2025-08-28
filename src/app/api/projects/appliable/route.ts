import prisma from '@/utils/prisma'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'
import { buildErrorResponse } from '../../utils'
import { getPersonalizedWhere } from '../search'
import { IsAppliableRequestSchema, IsAppliableResponse } from './schema'

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
        { error: 'BusinessInfo not found' },
        { status: 404 },
      )
    }

    const where = getPersonalizedWhere(businessInfo)
    const { id } = IsAppliableRequestSchema.parse({
      id: request.nextUrl.searchParams.get('id'),
    })
    const projects = await prisma.supportProject.findUnique({
      where: {
        ...where,
        id,
      },
    })
    return NextResponse.json<IsAppliableResponse>({
      data: { isAppliable: projects !== null },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(buildErrorResponse(error), { status: 400 })
    }
    return NextResponse.json(
      buildErrorResponse(error as Error, '서버 오류가 발생했습니다.'),
      { status: 500 },
    )
  }
}
