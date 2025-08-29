import prisma from '@/utils/prisma'
import { AuthOptions } from 'next-auth'
import KakaoProvider from 'next-auth/providers/kakao'

export const authOptions: AuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (!user) return token
      const { id: kakaoClientId, name: kakaoNickname } = user
      let member = await prisma.member.findUnique({
        where: {
          kakaoClientId,
        },
      })
      if (!member) {
        member = await prisma.member.create({
          data: {
            kakaoClientId,
            kakaoNickname: kakaoNickname ?? '',
          },
        })
      }
      token = {
        id: member.id,
        kakaoClientId,
        kakaoNickname: member.kakaoNickname,
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = token
      }
      return session
    },
  },
}
