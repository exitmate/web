import prisma from '@/utils/prisma'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'
import { ErrorResponse, ValidationErrorResponse } from '../schema'
import {
  BusinessInfoInputResponse,
  BusinessInfoInputSchema,
  BusinessInfoResponse,
} from './schema'

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request })

    if (!token) {
      return NextResponse.json<ErrorResponse>(
        { error: '로그인이 필요합니다' },
        { status: 401 },
      )
    }
    const { id: userId } = token
    const businessInfo = await prisma.businessInfo.findUnique({
      where: { memberId: userId },
    })
    if (!businessInfo) {
      return NextResponse.json<ErrorResponse>(
        { error: '사업자 정보가 존재하지 않습니다' },
        { status: 404 },
      )
    }
    return NextResponse.json<BusinessInfoResponse>({
      data: businessInfo,
    })
  } catch (error) {
    return NextResponse.json<ErrorResponse>(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 },
    )
  }
}

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
    console.log('business', body)

    const data = BusinessInfoInputSchema.parse(body)

    // 기존 BusinessInfo 확인
    const existingBusinessInfo = await prisma.businessInfo.findUnique({
      where: { memberId: userId },
    })

    if (existingBusinessInfo) {
      return NextResponse.json<ErrorResponse>(
        {
          error: '이미 사업자 정보가 존재합니다.',
        },
        { status: 409 },
      )
    }

    // 새로 생성
    const businessInfo = await prisma.businessInfo.create({
      data: {
        ...data,
        memberId: userId,
      },
    })

    return NextResponse.json<BusinessInfoInputResponse>({
      data: businessInfo,
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

export async function PUT(request: NextRequest) {
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

    const data = BusinessInfoInputSchema.parse(body)

    // 기존 BusinessInfo 확인
    const existingBusinessInfo = await prisma.businessInfo.findUnique({
      where: { memberId: userId },
    })

    if (!existingBusinessInfo) {
      return NextResponse.json<ErrorResponse>(
        {
          error:
            '사업자 정보가 존재하지 않습니다. POST 메소드를 사용하여 새로 생성해주세요.',
        },
        { status: 404 },
      )
    }

    // 업데이트
    const businessInfo = await prisma.businessInfo.update({
      where: { memberId: userId },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json<BusinessInfoInputResponse>({
      data: businessInfo,
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
