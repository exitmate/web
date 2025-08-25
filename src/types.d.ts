declare global {
  module 'next-auth/jwt' {
    interface DefaultJWT {
      id: string
      kakaoClientId: string
      kakaoNickname: string
    }
    interface Session {
      user: DefaultJWT
    }
  }
}
