import { ProgramDescriptionSection } from '@/features/projects/detail/ProgramDescriptionSection'
import { ProjectDetailCardsButton } from '@/features/projects/detail/ProjectDetailCardsButton'
import ProjectDetailClient from '@/features/projects/detail/ProjectDetailClient'
import { RequiredDocumentsSection } from '@/features/projects/detail/RequiredDocumentsSection'

export default async function ProgramDetailsPage({
}) {
  return (
    <>
      <ProjectDetailClient />
      <ProjectDetailCardsButton />
      <RequiredDocumentsSection />
      <ProgramDescriptionSection />
    </>
  )
}
