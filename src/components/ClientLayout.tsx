'use client'

import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

interface ClientLayoutProps {
  children: React.ReactNode
  session: Session | null
}

export default function ClientLayout({ children, session }: ClientLayoutProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
