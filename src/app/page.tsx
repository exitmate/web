import ClientLayout from '@/components/ClientLayout'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/authOptions'
import ProjectsPage from './projects/page'

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <ClientLayout session={session}>
      <ProjectsPage />
    </ClientLayout>
  )
}
