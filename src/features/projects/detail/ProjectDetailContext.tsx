'use client'

import { createContext, useContext, ReactNode } from 'react'
import { SupportProject } from '@/generated/prisma'

interface ProjectDetailContextType {
  project: SupportProject
}

const ProjectDetailContext = createContext<
  ProjectDetailContextType | undefined
>(undefined)

interface ProjectDetailProviderProps {
  children: ReactNode
  project: SupportProject
}

export function ProjectDetailProvider({
  children,
  project,
}: ProjectDetailProviderProps) {
  const value: ProjectDetailContextType = {
    project,
  }

  return (
    <ProjectDetailContext.Provider value={value}>
      {children}
    </ProjectDetailContext.Provider>
  )
}

export function useProjectDetail() {
  const context = useContext(ProjectDetailContext)
  if (context === undefined) {
    throw new Error(
      'useProjectDetail must be used within a ProjectDetailProvider',
    )
  }
  return context
}
