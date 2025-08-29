'use client'
import ProjectDetailClient from '@/features/projects/detail/ProjectDetailClient'
import { useParams } from 'next/navigation'

const ApplyPage = () => {
  const { id } = useParams()
  return (
    <ProjectDetailClient />
  )
}

export default ApplyPage