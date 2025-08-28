'use client'

import PaddedBox from '@/components/common/PaddedBox'
import AvailableProgramCount from '@/features/AvailableProgramCount'
import { GridProgramCard } from '@/features/GridProgramCard'
import RecommendedProgramList from '@/features/RecommendedProgramList'
import { Filter } from '@/utils/types'
import { useState } from 'react'

const ProgramsPage = () => {
  const [filter, setFilter] = useState<Filter>({
    deadlineType: '모집 유형',
    supportType: '지원 유형',
    highAmountOrder: true,
    onlySuitableForMe: true,
  })

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

export default ProgramsPage
