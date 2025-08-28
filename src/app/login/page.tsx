'use client'

import useUserStore from '@/stores/user'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const postAuth = searchParams.get('postAuth') === '1'
  const { status } = useSession()
  const { member } = useUserStore()

  useEffect(() => {
    if (!postAuth || status !== 'authenticated') return
    router.replace(member?.name ? '/' : '/signup')
  }, [postAuth, status, router, member])

  return (
    <div>
      <button
        onClick={() =>
          signIn('kakao', { callbackUrl: '/login?postAuth=1' })
        }
      >
        Kakao Login
      </button>
    </div>
  )
}