import prisma from '@/utils/prisma'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'
import { DataResponse, ErrorResponse, ValidationErrorResponse } from '../schema'
import { infoInputSchema } from './schema'

export async function POST(request: NextRequest) {
  try {
    const token = await getToken({ req: request })

    if (!token) {
      return NextResponse.json<ErrorResponse>(
        { error: '로그인이 필요합니다' },
        { status: 401 },
      )
    }

    const { id: userId } = token
    const body = await request.json()

    const data = infoInputSchema.parse(body)

    const updatedMember = await prisma.member.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name,
        email: data.email,
        birthDate: data.birthDate,
        gender: data.gender,
        agreedPrivacyPolicy: data.agreedPrivacyPolicy,
        agreedTermsOfUse: data.agreedTermsOfUse,
        agreedDataUsage: data.agreedDataUsage,
        agreedMarketing: data.agreedMarketing,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json<DataResponse<typeof updatedMember>>({
      data: updatedMember,
    })
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

    console.error('서버 오류:', error)
    return NextResponse.json<ErrorResponse>(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 },
    )
  }
}
