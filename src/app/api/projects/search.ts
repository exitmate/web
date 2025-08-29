import { BusinessInfo, Prisma } from '@/generated/prisma/client'
import prisma from '@/utils/prisma'
import { ProjectSearchParams } from './schema'

export function getOrderBy({
  applicationType,
  serviceType,
}: ProjectSearchParams): Prisma.SupportProjectFindManyArgs['orderBy'] {
  const ret: Prisma.SupportProjectFindManyArgs['orderBy'] = []
  if (
    serviceType === 'STORE_DEMOLITION_SUBSIDY' ||
    serviceType === 'CLOSURE_SUPPORT_SUBSIDY'
  ) {
    ret.push({
      maxAmount: 'desc',
    })
  }
  if (
    (applicationType && applicationType === 'ALWAYS') ||
    applicationType === 'FIRST_COME'
  ) {
    ret.push({
      createdAt: 'desc',
    })
  }

  if (applicationType === 'DEADLINED') {
    ret.push({
      deadline: 'asc',
    })
  }

  return ret
}

export function getWhere(
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

  and.push({ isOpen })
  if (isOpen) {
    and.push({
      deadline: {
        gte: new Date(),
      },
    })
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

export function getPersonalizedWhere(
  business: BusinessInfo,
): Prisma.SupportProjectWhereInput {
  const ret: Prisma.SupportProjectWhereInput[] = []

  // 1) 지역 제한
  // 지역 제한이 있거나, 본인 지역인 것을 검색
  if (business.region) {
    const splittedRegion = business.region.split(' ')
    const regionOr: Prisma.SupportProjectWhereInput[] = [
      { eligibility: { is: { mustBeInRegion: null } } },
    ]
    splittedRegion.forEach((region) => {
      regionOr.push({
        eligibility: {
          is: { mustBeInRegion: region },
        },
      })
    })
    regionOr.push({
      eligibility: {
        is: { mustBeInRegion: business.region },
      },
    })
    ret.push({ OR: regionOr })
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
      // 폐업한 경우, 그리고 폐업 날짜가 정해진 경우
      ret.push({
        AND: [
          {
            OR: [
              {
                eligibility: {
                  is: { mustOperateAtLeast: { lte: operationDays! } },
                },
              },
              { eligibility: { is: { mustOperateAtLeast: null } } },
            ],
          },
          {
            OR: [
              {
                eligibility: {
                  is: { mustBeClosedWithin: { gte: operationDays! } },
                },
              },
              { eligibility: { is: { mustBeClosedWithin: null } } },
            ],
          },
          {
            OR: [
              {
                eligibility: {
                  is: { mustBeClosedAfter: { gte: business.closedAt! } },
                },
              },
              { eligibility: { is: { mustBeClosedAfter: null } } },
            ],
          },
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

export async function getAllProjects(skip: number, take: number) {
  const where = {
    isOpen: true,
  }

  const projects = await prisma.supportProject.findMany({
    where,
    skip,
    take,
  })

  const totalCount = await prisma.supportProject.count({
    where,
  })

  return {
    projects,
    totalCount,
  }
}

function salesRangeToCondition(
  range: ProjectSearchParams['maxAmountRange'],
): Prisma.SupportProjectWhereInput {
  switch (range) {
    case 'under_100':
      return { maxAmount: { lte: 1_000_000 } }
    case '100_to_300':
      return { maxAmount: { gte: 1_000_000, lte: 3_000_000 } }
    case '300_to_500':
      return { maxAmount: { gte: 3_000_000, lte: 5_000_000 } }
    case 'above_500':
      return { maxAmount: { gte: 5_000_000 } }
    default:
      return {}
  }
}
