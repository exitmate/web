'use client'
import PaddedBox from '@/components/common/PaddedBox'
import { ApplicationForm } from '@/features/projects/apply/ApplicationForm'
import { ProjectApplyStep } from '@/features/projects/apply/ProjectApplyStep'
import ProjectDetailClient from '@/features/projects/detail/ProjectDetailClient'
import { useParams } from 'next/navigation'

const ApplyPage = () => {
  const { id } = useParams()
  return (
    <>
      <ProjectDetailClient />
      <ProjectApplyStep isCompleted={[true, false]} step={1} />
      <PaddedBox style={{ padding: '67px 0' }}>
        <ApplicationForm />
      </PaddedBox>
    </>
  )
}

export default ApplyPage