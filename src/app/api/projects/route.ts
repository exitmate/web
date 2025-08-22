import { BusinessInfo, Prisma } from '@/generated/prisma'
import prisma from '@/utils/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import z, { ZodError } from 'zod'
import { authOptions } from '../auth/[...nextauth]/authOptions'
import { ErrorResponse, ValidationErrorResponse } from '../schema'
import { ProjectSearchParams } from './schema'

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
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json<ValidationErrorResponse>(
        {
          errors: error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
        { status: 400 },
      )
    }
    return NextResponse.json<ErrorResponse>(
      { error: '서버 오류가 발생했습니다. 다시 시도해주세요.' },
      { status: 500 },
    )
  }
}

function getOrderBy({
  applicationType,
  serviceType,
}: ProjectSearchParams): Prisma.SupportProjectFindManyArgs['orderBy'] {
  if (
    (applicationType && applicationType === 'ALWAYS') ||
    applicationType === 'FIRST_COME'
  ) {
    return {
      createdAt: 'desc',
    }
  }

  if (applicationType === 'DEADLINED') {
    return {
      deadline: 'asc',
    }
  }
}

function getWhere(
  {
    applicationType,
    serviceType,
    maxAmountRange,
    isOpen,
    appliableOnly,
  }: ProjectSearchParams,
  businessInfo: BusinessInfo,
): Prisma.SupportProjectFindManyArgs['where'] {
  const and: Prisma.SupportProjectWhereInput[] = []

  if (isOpen) {
    and.push({ isOpen: true })
  }
  if (applicationType) {
    and.push({ applicationType })
  }
  if (serviceType) {
    and.push({ services: { some: { type: serviceType } } })
  }
  if (maxAmountRange) {
    and.push(salesRangeToCondition(maxAmountRange))
  }

  if (appliableOnly) {
    and.push(getPersonalizedWhere(businessInfo))
  }

  return {
    AND: and,
  }
}

function getPersonalizedWhere(
  business: BusinessInfo,
): Prisma.SupportProjectWhereInput {
  const ret: Prisma.SupportProjectWhereInput[] = []

  // 1) 지역 제한
  // 지역 제한이 있거나, 본인 지역인 것을 검색
  if (business.region) {
    ret.push({
      OR: [
        { eligibility: { is: { mustBeInRegion: null } } },
        { eligibility: { is: { mustBeInRegion: business.region } } },
      ],
    })
  }

  // 2) 폐업 여부
  if (business.isClosed) {
    // 폐업한 경우: 폐업자 전용 혹은 제한 없는 것 검색
    ret.push({
      OR: [
        { eligibility: { is: { closureCondition: 'MUST_BE_CLOSED' } } },
        { eligibility: { is: { closureCondition: 'NONE' } } },
      ],
    })

    const hasClosedDate = !!business.closedAt
    const hasOpenedDate = !!business.openedAt

    const operationDays =
      hasOpenedDate && hasClosedDate
        ? Math.floor(
            (+business.closedAt! - +business.openedAt!) / (1000 * 60 * 60 * 24),
          )
        : null

    if (hasClosedDate) {
      ret.push({
        OR: [
          {
            eligibility: {
              is: { mustBeClosedAfter: { gte: business.closedAt! } },
            },
          },
          {
            eligibility: {
              is: { mustBeClosedWithin: null },
            },
          },
        ],
      })
    }
    if (operationDays !== null) {
      // 둘다 null이거나, mustOperateAtLeast 혹은 mustBeClosedWithin 중 하나가 일치하는 것을 검색
      ret.push({
        OR: [
          {
            eligibility: { is: { mustOperateAtLeast: { lte: operationDays } } },
          }, // 최소 충족
          {
            eligibility: { is: { mustBeClosedWithin: { gte: operationDays } } },
          }, // 최대 충족
          {
            AND: [
              { eligibility: { is: { mustOperateAtLeast: null } } },
              { eligibility: { is: { mustBeClosedWithin: null } } },
            ],
          }, // 둘 다 null
        ],
      })
    } else {
      // 운영일수 계산 불가 시 둘 다 null 인 경우만 허용
      ret.push({
        AND: [
          { eligibility: { is: { mustOperateAtLeast: null } } },
          { eligibility: { is: { mustBeClosedWithin: null } } },
        ],
      })
    }
  } else {
    // 영업 중인 경우: 영업자 전용 혹은 제한 없는 것 검색
    ret.push({
      OR: [
        { eligibility: { is: { closureCondition: 'MUST_BE_NOT_CLOSED' } } },
        { eligibility: { is: { closureCondition: 'NONE' } } },
      ],
    })
  }

  return {
    AND: ret,
  }
}

function salesRangeToCondition(
  range: ProjectSearchParams['maxAmountRange'],
): Prisma.SupportProjectWhereInput {
  switch (range) {
    case 'under_100':
      return { services: { some: { maxAmount: { lte: 100 } } } }
    case '100_to_300':
      return { services: { some: { maxAmount: { gte: 100, lte: 300 } } } }
    case '300_to_500':
      return { services: { some: { maxAmount: { gte: 300, lte: 500 } } } }
    case 'above_500':
      return { services: { some: { maxAmount: { gte: 500 } } } }
    default:
      return {}
  }
}
