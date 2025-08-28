'use client'

import type { Member } from '@/generated/prisma'
import { useAuthStore } from '@/stores/auth'
import useUserStore from '@/stores/user'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useEffect, useMemo, useRef } from 'react'

type MeResponse = { data: Member }

async function fetchMe(): Promise<MeResponse> {
  const res = await fetch('/api/members/me', { credentials: 'include' })
  const json = await res.json()
  return json as MeResponse
}

export function SessionBridge() {
  const { status } = useSession()
  const setStatus = useAuthStore(s => s.setStatus)
  const setMember = useUserStore(s => s.setMember)
  useEffect(() => {
    if (status === 'loading') setStatus('checking')
    else if (status === 'authenticated') setStatus('authed')
    else setStatus('guest')
  }, [status, setStatus])

  const queryEnabled = status === 'authenticated'
  const queryOptions = useMemo(
    () => ({
      queryKey: ['me'],
      queryFn: fetchMe,
      enabled: queryEnabled,
      refetchOnWindowFocus: false,
      staleTime: 60_000,
    }),
    [queryEnabled]
  )
  const meQuery = useQuery(queryOptions)

  const lastIdRef = useRef<string | null>(null)
  useEffect(() => {
    const next = meQuery.data?.data
    console.log('[SessionBridge] member =', next)
    if (!next) return
    if (lastIdRef.current === next.id) return
    lastIdRef.current = next.id
    setMember({ ...next })
  }, [meQuery.data, setMember])

  return null
}