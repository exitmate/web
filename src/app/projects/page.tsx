'use client'

import PaddedBox from '@/components/common/PaddedBox'
import AvailableProgramCount from '@/features/AvailableProgramCount'
import { GridProgramCard } from '@/features/GridProgramCard'
import RecommendedProgramList from '@/features/RecommendedProgramList'

const ProjectsPage = () => {

  return (
    <div>
      <RecommendedProgramList />
      <PaddedBox>
        <AvailableProgramCount />
        <GridProgramCard />
      </PaddedBox>
    </div>
  )
}

export default ProjectsPage
