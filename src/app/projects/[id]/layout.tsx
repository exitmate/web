import { ProjectDetailProvider } from "@/features/projects/detail/ProjectDetailContext"
import prisma from "@/utils/prisma"
import { redirect } from "next/navigation"

// app/project/layout.tsx
export const metadata = {
  title: 'Projects',
}

export default async function ProjectDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode
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
      {children}
    </ProjectDetailProvider>
  )
}