import prisma from '@/utils/prisma'
import { redirect } from 'next/navigation'
import { ProjectDetailProvider } from '../../../features/projects/detail/ProjectDetailContext'
import ProjectDetailClient from '@/features/projects/detail/ProjectDetailClient'

export default async function ProgramDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (!id || id.length !== 24) {
    redirect('/')
  }
  const program = await prisma.supportProject.findUnique({
    where: {
      id,
    },
  })
  if (!program) {
    redirect('/')
  }
  return (
    <ProjectDetailProvider project={program}>
      <ProjectDetailClient />
    </ProjectDetailProvider>
  )
}
