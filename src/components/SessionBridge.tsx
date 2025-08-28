'use client'

import type { Member } from '@/generated/prisma'
import { useAuthStore } from '@/stores/auth'
import useUserStore from '@/stores/user'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useEffect, useRef } from 'react'

type MeResponse = { data: Member }

async function fetchMe(): Promise<MeResponse> {
  const res = await fetch('/api/members/me', { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to fetch /api/members/me')
  return res.json()
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

  const { data } = useQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
    enabled: status === 'authenticated',
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 0,
    select: (res) => res.data,
  })

  const lastIdRef = useRef<string | null>(null)
  useEffect(() => {
    if (!data) return
    if (lastIdRef.current === data.id) return
    lastIdRef.current = data.id
    setMember({ ...data })
  }, [data, setMember])

  return null
}