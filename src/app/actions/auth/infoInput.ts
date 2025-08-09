import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { MemberSchema } from '@/generated/zod'
import { getServerSession } from 'next-auth'
import z from 'zod'

const today = new Date()

const infoInputSchema = MemberSchema.pick({
  name: true,
  email: true,
  birthDate: true,
  gender: true,
  agreedPrivacyPolicy: true,
  agreedTermsOfUse: true,
  agreedDataUsage: true,
  agreedMarketing: true,
}).extend({
  agreedPrivacyPolicy: z.literal(true),
  agreedTermsOfUse: z.literal(true),
  agreedDataUsage: z.literal(true),
  birthDate: z
    .date()
    .min(new Date('1910-01-01'))
    .max(new Date(today.getFullYear() - 19, today.getMonth(), today.getDate())),
})

export const infoInput = async (formData: FormData) => {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return {
      success: false,
      error: '로그인이 필요합니다',
    }
  }

  const user = session.user as any
  const userId = user.id
  const kakaoClientId = user.kakaoClientId
  const kakaoNickname = user.kakaoNickname

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
      user: session.user,
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
