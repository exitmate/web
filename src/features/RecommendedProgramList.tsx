import PaddedBox from '@/components/common/PaddedBox'
import ProgramCard from '@/components/ProgramCard'
import colors from '@/utils/colors'
import { programList } from '@/utils/mocks'
import styled from '@emotion/styled'

export const RecommendedProgramList = () => {
  return (
    <RecommendedProgramListContainer>
      <PaddedBox>
        <Title>추천 지원 사업 Top 5</Title>
        <ProgramCardContainer>
          {programList.slice(0, 5).map((program) => (
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
          ))}
        </ProgramCardContainer>
      </PaddedBox>
    </RecommendedProgramListContainer>
  )
}

const RecommendedProgramListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 440px;
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
