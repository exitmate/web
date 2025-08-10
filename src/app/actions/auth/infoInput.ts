'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { infoInputSchema } from './schema'
import { getServerSession } from 'next-auth'
import z from 'zod'
import type { ActionResult } from '../schema'

export const infoInput = async (
  prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> => {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return {
      success: false,
      error: '로그인이 필요합니다',
    }
  }

  const user = session.user as {
    id: string
    kakaoClientId: string
    kakaoNickname: string
  }
  const { id: userId, kakaoClientId, kakaoNickname } = user

  console.log('현재 로그인한 사용자:', {
    userId,
    kakaoClientId,
    kakaoNickname,
  })

  try {
    const data = infoInputSchema.parse(Object.fromEntries(formData))
    console.log('폼 데이터:', data)

    return {
      success: true,
      data,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      }
    }
    throw error
  }
}
