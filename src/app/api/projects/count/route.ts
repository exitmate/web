import prisma from '@/utils/prisma'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { getPersonalizedWhere } from '../search'
import { AppliableProjectCountResponse } from './schema'

export async function GET(request: NextRequest) {
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
  const myAppliableCount = await prisma.supportProject.count({ where })
  const todayAppliableCount = await prisma.supportProject.count({
    where: {
      isOpen: true,
      deadline: {
        gte: new Date(),
      },
    },
  })
  return NextResponse.json<AppliableProjectCountResponse>({
    data: { myAppliableCount, todayAppliableCount },
  })
}
