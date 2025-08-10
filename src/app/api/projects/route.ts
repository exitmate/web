import { SupportProject, SupportProjectWhereInputSchema } from '@/generated/zod'
import prisma from '@/utils/prisma'
import { NextResponse } from 'next/server'
import z from 'zod'
import { ProjectSearchSchema } from './schema'
import { ErrorResponse, PaginatedDataResponse } from '../schema'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/authOptions'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json<ErrorResponse>(
        { error: '로그인이 필요합니다.' },
        { status: 401 },
      )
    }
    const { searchParams } = new URL(request.url)

    const params = Object.fromEntries(searchParams.entries())
    const validatedParams = ProjectSearchSchema.parse(params)

    const { applicationType, serviceType, page, limit, isOpen } =
      validatedParams

    const skip = (page - 1) * limit

    const where: z.infer<typeof SupportProjectWhereInputSchema> = {}

    if (applicationType) {
      where.applicationType = applicationType
    }

    if (isOpen !== null) {
      where.isOpen = isOpen
    }

    if (serviceType) {
      where.services = {
        some: {
          type: serviceType,
        },
      }
    }

    const projects = await prisma.supportProject.findMany({
      where,
      include: {
        services: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    })

    const totalCount = await prisma.supportProject.count({
      where,
    })

    const totalPages = Math.ceil(totalCount / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    const response = {
      data: projects,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage,
        hasPrevPage,
      },
      filters: {
        applicationType,
        serviceType,
        isOpen,
      },
    }
    return NextResponse.json<PaginatedDataResponse<SupportProject[]>>(response)
  } catch (error) {
    console.error('지원사업 조회 중 오류 발생:', error)
    return NextResponse.json<ErrorResponse>(
      { error: '지원사업 조회 중 오류가 발생했습니다.' },
      { status: 500 },
    )
  }
}
