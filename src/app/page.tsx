import ClientLayout from '@/components/ClientLayout'
import Main from '@/features/auth/Main'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <ClientLayout session={session}>
      <Main />
    </ClientLayout>
  )
}
