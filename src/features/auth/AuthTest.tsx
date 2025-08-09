'use client'

import { useSession } from 'next-auth/react'

export default function AuthTest() {
  const session = useSession()
  console.log(session)
  return <div></div>
}
