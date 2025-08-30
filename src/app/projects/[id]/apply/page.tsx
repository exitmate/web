'use client'
import PaddedBox from '@/components/common/PaddedBox'
import { AILoadingScreen } from '@/components/ui/AILoadingScreen'
import { ApplicationForm } from '@/features/projects/apply/ApplicationForm'
import { ProjectApplyStep } from '@/features/projects/apply/ProjectApplyStep'
import ProjectDetailClient from '@/features/projects/detail/ProjectDetailClient'
import { useEffect, useState } from 'react'

const ApplyPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <>
        <ProjectDetailClient />
        <AILoadingScreen />
      </>
    );
  }
  
  return (
    <>
      <ProjectDetailClient />
      <ProjectApplyStep isCompleted={isCompleted} step={step} />
      <PaddedBox style={{ padding: '67px 0' }}>
        <ApplicationForm isCompleted={isCompleted} setIsCompleted={setIsCompleted} step={step} setStep={setStep}  />
      </PaddedBox>
    </>
  )
}

export default ApplyPage