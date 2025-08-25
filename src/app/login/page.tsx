'use client'

    import { SessionProvider, signIn, useSession } from 'next-auth/react'

export default function LoginPage() {
  return (
    <div>
      <SessionProvider>
        <LoginInner />
      </SessionProvider>
    </div>
  )
}

const LoginInner = () => {
  const { data: session, status } = useSession()
  console.log(session)
  console.log(status)
  return (
    <div>
      <button onClick={() => signIn('kakao', { callbackUrl: '/login' })}>Kakao Login</button>
    </div>
  )
}
