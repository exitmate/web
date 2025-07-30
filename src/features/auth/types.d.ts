declare global {
  module 'next-auth/jwt' {
    interface JWT {
      id: string
      kakaoClientId: string
      kakaoNickname: string
    }
    interface Session {
      user: JWT
    }
  }
}
