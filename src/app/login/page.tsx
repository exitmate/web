'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const postAuth = searchParams.get('postAuth') === '1'
  const { status } = useSession()

  useEffect(() => {
    if (!postAuth || status !== 'authenticated') return

    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/members/me', { credentials: 'include' })
        if (!res.ok) throw new Error('Failed to fetch /api/members/me')
        const data = await res.json()
        if (cancelled) return
        router.replace(data?.name ? '/' : '/signup')
      } catch (e) {
        console.error(e)
      }
    })()

    return () => { cancelled = true }
  }, [postAuth, status, router])

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