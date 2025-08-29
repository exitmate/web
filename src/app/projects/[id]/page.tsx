import { ProgramDescriptionSection } from '@/features/projects/detail/ProgramDescriptionSection'
import { ProjectDetailCardsButton } from '@/features/projects/detail/ProjectDetailCardsButton'
import ProjectDetailClient from '@/features/projects/detail/ProjectDetailClient'
import { RequiredDocumentsSection } from '@/features/projects/detail/RequiredDocumentsSection'
import prisma from '@/utils/prisma'
import { redirect } from 'next/navigation'
import { ProjectDetailProvider } from '../../../features/projects/detail/ProjectDetailContext'

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
      <ProjectDetailCardsButton />
      <RequiredDocumentsSection />
      <ProgramDescriptionSection />
    </ProjectDetailProvider>
  )
}
