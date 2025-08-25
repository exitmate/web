import prisma from '@/utils/prisma'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { MyInfoResponse } from '../schema'

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request })
  if (!token) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 })
  }

  const member = await prisma.member.findUnique({
    where: {
      id: token.id,
    },
    omit: {
      id: true,
      kakaoClientId: true,
    },
  })
  if (!member) {
    return NextResponse.json(
      { error: '회원 정보를 찾을 수 없습니다.' },
      { status: 404 },
    )
  }

  return NextResponse.json<MyInfoResponse>({ data: member })
}
