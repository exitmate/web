import PaddedBox from '@/components/common/PaddedBox'
import ProgramCard from '@/components/ProgramCard'
import colors from '@/utils/colors'
import { Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'

export const RecommendedProgramList = () => {
  const { data } = useQuery({
    queryKey: ['programs'],
    queryFn: () =>
      fetch('/api/ai/recommendations')
        .then((res) => res.json())
        .catch(() => {
          return { data: { recommendedProjects: [] } }
        }),
  })

  const isRecommended = data?.data?.recommendedProjects.length > 0

  console.log(data)
  return (
    <RecommendedProgramListContainer isRecommended={isRecommended}>
      <PaddedBox>
        <Title>추천 지원 사업 Top 5</Title>
        <ProgramCardContainer>
          {isRecommended ? (
            data.data.recommendedProjects.map((program: any) => (
              <ProgramCard
                key={program.id}
                title={program.title}
                logoSrc={program.imageUrl}
                createdAt={new Date(program.postedDate)}
                deadline={new Date(program.deadline)}
                host={program.centerName}
                id={program.id.toString()}
                onClick={() => {}}
              />
            ))
          ) : (
            <Text>AI가 열심히 생각중이에요...</Text>
          )}
        </ProgramCardContainer>
      </PaddedBox>
    </RecommendedProgramListContainer>
  )
}

const RecommendedProgramListContainer = styled.div<{ isRecommended: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${({ isRecommended }) => (isRecommended ? '440px' : '200px')};
  box-sizing: border-box;
  background-color: ${colors.gray[1]};
`

const Title = styled.p`
  font-size: 32px;
  font-weight: 700;
  color: ${colors.black};
`

const ProgramCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 16px;
  margin-top: 24px;
  overflow: hidden;
`

export default RecommendedProgramList
