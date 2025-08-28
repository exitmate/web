import prisma from '@/utils/prisma'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'
import { PaginatedDataResponse } from '../schema'
import { ProjectSearchParams, ProjectSearchSchema } from './schema'
import { SupportProjectSchema } from '@/generated/zod'
import {
  buildErrorResponse,
  getPaginatedParams,
  getPaginationInfo,
} from '../utils'
import { getAllProjects, getOrderBy, getWhere } from './search'

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request })
    const { searchParams } = new URL(request.url)
    const params = Object.fromEntries(searchParams.entries())
    const projectSearchParams = ProjectSearchSchema.parse(params)
    const { skip, take } = getPaginatedParams(
      projectSearchParams.page,
      projectSearchParams.limit,
    )
    // 로그인 하지 않은 경우
    if (!token) {
      return getUnloggedInResponse(skip, take, projectSearchParams)
    }

    const businessInfo = await prisma.businessInfo.findFirst({
      where: {
        memberId: token.id,
      },
    })
    // businessInfo가 없는 경우, 로그인하지 않은 경우와 동일하게 처리
    if (!businessInfo) {
      return getUnloggedInResponse(skip, take, projectSearchParams)
    }
    const where = getWhere(projectSearchParams, businessInfo)
    const orderBy = getOrderBy(projectSearchParams)

    const projects = await prisma.supportProject.findMany({
      where,
      orderBy,
      skip,
      take,
    })

    const totalCount = await prisma.supportProject.count({
      where,
    })
    return NextResponse.json<
      PaginatedDataResponse<typeof SupportProjectSchema>
    >({
      data: projects,
      pagination: getPaginationInfo(
        projectSearchParams.page,
        projectSearchParams.limit,
        totalCount,
      ),
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

async function getUnloggedInResponse(
  skip: number,
  take: number,
  searchParams: ProjectSearchParams,
) {
  const { projects, totalCount } = await getAllProjects(skip, take)
  return NextResponse.json<PaginatedDataResponse<typeof SupportProjectSchema>>({
    data: projects,
    pagination: getPaginationInfo(
      searchParams.page,
      searchParams.limit,
      totalCount,
    ),
  })
}
