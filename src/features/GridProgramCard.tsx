import { ProjectResponse } from '@/app/api/projects/schema'
import PageNation from '@/components/common/PageNation'
import ProgramCard from '@/components/ProgramCard'
import { Filter } from '@/utils/types'
import { Flex } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import FilterSection from './FilterSection'

const buildProjectsUrl = (page: number, filter: Filter) => {
  const params = new URLSearchParams();
  params.set('limit', '15');
  params.set('page', String(page));

  if (filter.applicationType) params.set('applicationType', filter.applicationType);
  if (filter.serviceType) params.set('serviceType', filter.serviceType);
  if (filter.appliableOnly) params.set('appliableOnly', 'true'); // false면 안 붙임

  return `/api/projects?${params.toString()}`;
};

async function fetchPrograms(page: number, filter: Filter): Promise<ProjectResponse> {
  const url = buildProjectsUrl(page, filter);
  const res = await fetch(url, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch /api/projects');
  return res.json();
}

export const GridProgramCard = () => {
  const [filter, setFilter] = useState<Filter>({
    applicationType: null,
    serviceType: null,
    appliableOnly: false,
  })

  const [currentPage, setCurrentPage] = useState(1)

  const { data } = useQuery({
    queryKey: ['projects', currentPage, filter],
    queryFn: () => fetchPrograms(currentPage, filter),
  })

  const items = data?.data ?? [];
  const rows = Math.ceil(items.length / 5);

  return (
    <div>
      <FilterSection filter={filter} setFilter={setFilter} />
      <GridProgramCardContainer>
        <FlexContainer>
          {Array.from(
            { length: rows },
            (_, rowIndex) => (
              <Flex key={rowIndex} gap={4} width="100%">
                {Array.from({ length: 5 }, (_, colIndex) => {
                  const programIndex = rowIndex * 5 + colIndex
                    const program = data?.data[programIndex]

                  return program ? (
                    <ProgramCard key={programIndex} {...program} />
                  ) : (
                    <EmptyCard key={programIndex} />
                  )
                })}
              </Flex>
            ),
          )}
        </FlexContainer>
        <PageNation
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={data?.pagination.totalPages ?? 1}
        />
      </GridProgramCardContainer>
    </div>
  )
}

const GridProgramCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  gap: 48px;
`

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

const EmptyCard = styled.div`
  width: 227px;
  height: 270px;
  background: transparent;
  flex: 1;
  min-width: 0;
`

export default GridProgramCard
