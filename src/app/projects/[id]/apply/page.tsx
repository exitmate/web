'use client'
import { ProjectApplyStep } from '@/features/projects/apply/ProjectApplyStep'
import ProjectDetailClient from '@/features/projects/detail/ProjectDetailClient'
import { useParams } from 'next/navigation'

const ApplyPage = () => {
  const { id } = useParams()
  return (
    <>
      <ProjectDetailClient />
      <ProjectApplyStep isCompleted={[true, false]} step={1} />
    </>
  )
}

export default ApplyPage